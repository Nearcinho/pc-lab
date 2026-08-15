// Actualización diaria de precios: raspa Amazon.es (componentes y monitores)
// y G2A (Windows 11 Pro) con Edge vía playwright-core, y guarda el resultado
// en data/prices-db.json. Uso: npm run prices:update
//
// Amazon.es tiene anti-bot (Akamai): un fetch simple devuelve 503, así que se
// navega con un Edge real (channel "msedge", sin descargar navegadores) en
// headless. G2A (Cloudflare) es más estricto: en headless corta la conexión
// (ERR_HTTP2_PROTOCOL_ERROR), así que G2A se raspa con una ventana Edge real
// (headful, se abre y se cierra sola) y HTTP/2 desactivado.
// Secuencial, con pausa entre consultas para no gatillar el anti-bot. Si una
// consulta falla (captcha, sin resultados) se registra y NO se pisa el precio
// anterior: queda stale por su checkedAt viejo.
import { chromium, type Browser, type LaunchOptions, type Page } from "playwright-core";
import { PART_PRICES } from "../src/lib/pricing";
import { peripheralParts } from "../src/lib/parts";
import { readPricesDb, upsertPrice } from "../src/lib/prices-db";

const DELAY_MS = 2500;
const NAV_TIMEOUT_MS = 30_000;

interface ProductQuery {
  id: string;
  query: string;
  source: "amazon.es" | "g2a.com";
  /** Rango de cordura en €: precios fuera se descartan como outliers. */
  min: number;
  max: number;
}

// Límites generosos (±~3x) alrededor del último precio investigado: filtran
// accesorios y outliers absurdos sin ajuste manual por pieza.
function bounds(reference: number): { min: number; max: number } {
  return { min: Math.max(3, Math.round(reference * 0.3)), max: Math.round(reference * 3) };
}

const AMAZON_QUERIES: Record<string, string> = {
  "cpu-r5-7600": "Ryzen 5 7600",
  "cpu-r7-7800x3d": "Ryzen 7 7800X3D",
  "cpu-r7-9800x3d": "Ryzen 7 9800X3D",
  "cpu-r7-9700x": "Ryzen 7 9700X",
  "cpu-r9-9950x": "Ryzen 9 9950X",
  "gpu-rtx5060": "RTX 5060",
  "gpu-rtx5070": "RTX 5070",
  "gpu-rtx5070ti": "RTX 5070 Ti",
  "gpu-rtx5080": "RTX 5080",
  "gpu-rx9070": "RX 9070",
  "gpu-rx9070xt": "RX 9070 XT",
  "mb-b650m": "placa base B650M",
  "mb-x670e": "placa base X670E",
  "mb-x870e": "placa base X870E",
  "ram-16-5600": "DDR5 16GB 5600",
  "ram-32-5600": "DDR5 32GB 5600",
  "ram-32-6000": "DDR5 32GB 6000 CL30",
  "ram-64-6000": "DDR5 64GB 6000",
  "ram-128-5600": "DDR5 128GB 5600",
  "ssd-1tb-g4": "SSD NVMe 1TB PCIe 4.0",
  "ssd-2tb-g4": "SSD NVMe 2TB PCIe 4.0",
  "ssd-2tb-g5": "SSD NVMe 2TB PCIe 5.0",
  "ssd-4tb-g4": "SSD NVMe 4TB PCIe 4.0",
  "cool-air-single": "ventilador CPU torre",
  "cool-aio-240": "refrigeración líquida 240mm",
  "cool-aio-360": "refrigeración líquida 360mm",
  "psu-gold-550": "fuente alimentación 550W 80 Plus Gold",
  "psu-gold-750": "fuente alimentación 750W 80 Plus Gold",
  "psu-gold-850": "fuente alimentación 850W 80 Plus Gold",
  "psu-gold-1000": "fuente alimentación 1000W 80 Plus Gold",
  "case-itx": "caja PC Mini-ITX",
  "case-matx": "caja PC Micro-ATX",
  "case-atx": "caja PC ATX",
  "case-atx-tg": "caja PC ATX cristal templado",
  "case-eatx": "caja PC E-ATX full tower",
};

function buildProductList(): ProductQuery[] {
  const list: ProductQuery[] = [];
  for (const [id, entry] of Object.entries(PART_PRICES)) {
    if (id === "os-win-pro") {
      list.push({ id, query: "windows 11 pro", source: "g2a.com", ...bounds(entry.price) });
      continue;
    }
    const query = AMAZON_QUERIES[id];
    if (!query) {
      console.warn(`!! Sin consulta Amazon mapeada para ${id}, se omite`);
      continue;
    }
    list.push({ id, query, source: "amazon.es", ...bounds(entry.price) });
  }
  // Monitores genéricos del catálogo: mon-<pulgadas>-<hz>-<panel>[, ultrawide].
  for (const part of peripheralParts) {
    if (part.kind !== "monitor") continue;
    const uw = part.name.includes("Ultrawide") || part.name.includes("Superultrawide");
    const query =
      `monitor ${part.monitorSize} ${part.refreshHz}Hz ${part.panel}` +
      (uw ? " ultrawide" : "");
    list.push({ id: part.id, query, source: "amazon.es", ...bounds(part.price) });
  }
  return list;
}

/** «1.234,56 €» / «17.29 EUR» → número. */
function parseEuro(text: string): number | null {
  const m = text.replace(/\s/g, "").match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?)/);
  if (!m) return null;
  let s = m[1];
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  const n = Number(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

async function scrapeAmazon(page: Page, query: string, min: number, max: number) {
  const url = `https://www.amazon.es/s?k=${encodeURIComponent(query)}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
  try {
    await page.waitForSelector('div[data-component-type="s-search-result"]', { timeout: 10_000 });
  } catch {
    const html = await page.content();
    if (/captcha|robot|unusual traffic/i.test(html)) throw new Error("captcha anti-bot");
    throw new Error("sin resultados");
  }
  // Primer precio de tarjeta de producto dentro del rango de cordura.
  const prices = await page.$$eval(
    'div[data-component-type="s-search-result"]',
    (cards) =>
      cards.slice(0, 10).map((card) => {
        const el = card.querySelector("span.a-price span.a-offscreen");
        return el?.textContent?.trim() ?? null;
      })
  );
  for (const text of prices) {
    if (!text) continue;
    const price = parseEuro(text);
    if (price !== null && price >= min && price <= max) {
      return { price, url };
    }
  }
  throw new Error(`precios fuera de rango (${prices.filter(Boolean).join(" · ") || "ninguno"})`);
}

async function scrapeG2a(page: Page, query: string, min: number, max: number) {
  const url = `https://www.g2a.com/es/search?query=${encodeURIComponent(query)}`;
  // G2A con HTTP/1.1 forzado tarda en hacer commit; "domcontentloaded" puede
  // no llegar, así que se navega con "commit" y se espera al render en cliente.
  await page.goto(url, { waitUntil: "commit", timeout: NAV_TIMEOUT_MS });
  await page.waitForTimeout(10_000);
  const text = await page.evaluate(() => document.body.innerText);
  if (/captcha|are you a robot|unusual traffic/i.test(text)) throw new Error("captcha anti-bot");
  if (!text.includes("resultados") && !text.includes("results")) throw new Error("página sin resultados");
  // G2A muestra los precios como «17.29 EUR» (locale ES pero sufijo EUR).
  const matches = text.match(/\d{1,3}[.,]\d{2}\s*(?:€|EUR)/g) ?? [];
  for (const m of matches) {
    const price = parseEuro(m);
    if (price !== null && price >= min && price <= max) return { price, url };
  }
  throw new Error("sin precio en rango");
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function launchEdge(options: LaunchOptions): Promise<Browser> {
  try {
    return await chromium.launch({ channel: "msedge", ...options });
  } catch (err) {
    console.error("No se pudo lanzar Edge (channel msedge):", err);
    console.error("Probando con channel chrome como plan B…");
    return await chromium.launch({ channel: "chrome", ...options });
  }
}

/** Raspa un lote de productos con un navegador propio; reintenta los fallos una vez. */
async function runBatch(
  products: ProductQuery[],
  launchOptions: LaunchOptions
): Promise<{ ok: number; failures: string[] }> {
  if (!products.length) return { ok: 0, failures: [] };
  const browser = await launchEdge(launchOptions);
  // Sin userAgent personalizado: el UA real de Edge pasa el anti-bot de G2A
  // (Akamai deniega el acceso con un UA Edg/131 fabricado).
  const context = await browser.newContext({
    locale: "es-ES",
    viewport: { width: 1366, height: 900 },
  });
  const page = await context.newPage();

  let ok = 0;
  const scrape = async (p: ProductQuery) => {
    const { price, url } =
      p.source === "g2a.com"
        ? await scrapeG2a(page, p.query, p.min, p.max)
        : await scrapeAmazon(page, p.query, p.min, p.max);
    await upsertPrice(p.id, {
      price,
      currency: "EUR",
      url,
      source: p.source,
      checkedAt: new Date().toISOString(),
    });
    console.log(`OK  ${p.id}: ${price} € (${p.source})`);
  };

  const failed: ProductQuery[] = [];
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    try {
      await scrape(p);
      ok++;
    } catch (err) {
      console.log(`!!  ${p.id}: FALLO — ${err instanceof Error ? err.message.split("\n")[0] : err}`);
      failed.push(p);
    }
    if (i < products.length - 1) await sleep(DELAY_MS);
  }

  // Segunda oportunidad (p.ej. primera carga fría del navegador).
  const failures: string[] = [];
  for (const p of failed) {
    await sleep(DELAY_MS);
    try {
      await scrape(p);
      ok++;
    } catch (err) {
      const reason = err instanceof Error ? err.message.split("\n")[0] : String(err);
      failures.push(`${p.id} (${p.query}): ${reason}`);
      console.log(`!!  ${p.id}: FALLO definitivo — ${reason}`);
    }
  }

  await browser.close();
  return { ok, failures };
}

async function main() {
  // Filtro opcional para pruebas: --only=cpu-r5-7600,os-win-pro
  const onlyArg = process.argv.find((a) => a.startsWith("--only="));
  const only = onlyArg ? onlyArg.slice("--only=".length).split(",").filter(Boolean) : null;
  const all = buildProductList();
  const products = only ? all.filter((p) => only.includes(p.id)) : all;
  console.log(`Actualizando ${products.length} productos (${new Date().toISOString()})\n`);

  const amazon = products.filter((p) => p.source === "amazon.es");
  const g2a = products.filter((p) => p.source === "g2a.com");

  const a = await runBatch(amazon, { headless: true });
  // G2A (Cloudflare) bloquea el headless: ventana real + HTTP/1.1.
  const g = await runBatch(g2a, { headless: false, args: ["--disable-http2"] });

  const ok = a.ok + g.ok;
  const failures = [...a.failures, ...g.failures];
  const db = await readPricesDb();
  console.log(`\n${ok}/${products.length} actualizados. Entradas totales en la DB: ${Object.keys(db).length}.`);
  if (failures.length) {
    console.log("Fallos (se conserva el precio anterior):");
    for (const f of failures) console.log(`  - ${f}`);
  }
  process.exit(ok >= products.length / 2 ? 0 : 1);
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
