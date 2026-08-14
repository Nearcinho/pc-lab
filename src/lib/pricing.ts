// Precios de mercado en España (agosto 2026) investigados por componente.
// Fuentes: Amazon.es vía ryzen.es (CPUs, ofertas Prime), agregadores ES
// (DropReference) para GPUs, e idealo.es/PCComponentes para el resto.
// Foto del mercado del 14-08-2026: RAM y GPUs en escasez, precios volátiles.
import type { BuildSelection } from "@/lib/build-engine";
import type { BudgetTier } from "@/lib/profiles";

export interface PriceEntry {
  price: number;
  source: string;
  note?: string;
}

export const PART_PRICES: Record<string, PriceEntry> = {
  // CPUs — Amazon.es (Prime, envío incluido) vía ryzen.es, 14-08-2026
  "cpu-r5-7600": { price: 189, source: "Amazon.es (ryzen.es)" },
  "cpu-r7-7800x3d": { price: 320, source: "Amazon.es (ryzen.es)" },
  "cpu-r7-9800x3d": { price: 429, source: "Amazon.es (ryzen.es)" },
  "cpu-r7-9700x": { price: 254, source: "Amazon.es (ryzen.es)" },
  "cpu-r9-9950x": { price: 485, source: "Amazon.es (ryzen.es)" },
  // GPUs — serie RTX 50 actual (las RTX 40 están descatalogadas).
  // Fuentes: Coolmod/Amazon vía chollometro (5060), DropReference en vivo
  // (5070, 5070 Ti), PCComponentes Palit GamingPro (5080), 14-08-2026.
  "gpu-rtx5060": { price: 300, source: "Coolmod 299,95 € (MSI Ventus 2X, iguala Amazon)" },
  "gpu-rtx5070": { price: 622, source: "DropReference (mejor oferta en vivo)" },
  "gpu-rtx5070ti": { price: 943, source: "DropReference (mejor oferta en vivo)", note: "Stock raro en tienda grande" },
  "gpu-rtx5080": { price: 1150, source: "PCComponentes (Palit GamingPro 1.149,90 €)" },
  // RX 7000: stock residual
  "gpu-rx7900xtx": { price: 929, source: "DropReference (agregador ES)", note: "Stock residual" },
  // Placas (chipset, gama media) — idealo.es / PCComponentes
  "mb-b650m": { price: 175, source: "idealo.es (MSI B650M Gaming Plus WiFi)" },
  "mb-x670e": { price: 289, source: "PCComponentes (MSI MAG X670E Tomahawk)" },
  "mb-x870e": { price: 291, source: "idealo.es (MSI MAG X870E Tomahawk)" },
  // RAM DDR5 — escasez global 2026, precios 4-5x sept-2025
  "ram-16-5600": { price: 260, source: "Estimado (Amazon US/FR, sin tienda ES accesible)", note: "No verificado en ES" },
  "ram-32-5600": { price: 370, source: "idealo.es (Crucial 32GB 5600)" },
  "ram-32-6000": { price: 450, source: "rampricehistory.com (mín. ES 412, media 606)" },
  "ram-64-6000": { price: 990, source: "idealo.es (G.Skill Trident Z5 Neo 64GB)" },
  "ram-128-5600": { price: 745, source: "idealo.es (kit 128GB, mín.)", note: "Dispersión extrema por escasez" },
  // SSD NVMe — idealo.es / PCComponentes
  "ssd-1tb-g4": { price: 149, source: "idealo.es (Kingston NV3 1TB)" },
  "ssd-2tb-g4": { price: 230, source: "PCComponentes (Kingston NV3 2TB)" },
  "ssd-2tb-g5": { price: 390, source: "idealo.es (Samsung 9100 Pro 2TB)" },
  "ssd-4tb-g4": { price: 550, source: "idealo.es (Samsung 990 EVO Plus 4TB)" },
  // Refrigeración — idealo.es
  "cool-air-single": { price: 35, source: "idealo.es (Thermalright Assassin X 120)" },
  "cool-aio-240": { price: 85, source: "idealo.es (MSI MAG CoreLiquid I240)" },
  "cool-aio-360": { price: 110, source: "idealo.es (MSI MAG CoreLiquid I360)" },
  // Fuentes 80+ Gold — idealo.es
  "psu-gold-550": { price: 75, source: "idealo.es (be quiet! Pure Power 12 550W)" },
  "psu-gold-750": { price: 90, source: "idealo.es (MSI MAG A750GL)" },
  "psu-gold-850": { price: 105, source: "idealo.es (MSI MAG A850GL)" },
  "psu-gold-1000": { price: 140, source: "idealo.es (Corsair RM1000e 2025)" },
  // Cajas — idealo.es
  "case-atx": { price: 105, source: "idealo.es (NZXT H5 Flow)" },
  "case-eatx": { price: 180, source: "idealo.es (Phanteks Enthoo Pro 2)" },
  // SO — PCComponentes (licencia OEM digital)
  "os-win-home": { price: 110, source: "PCComponentes (Windows 11 Home OEM)" },
};

// Fee de montaje, test de 24 h y configuración según gama del equipo.
export const ASSEMBLY_FEE: Record<BudgetTier, number> = {
  1: 100,
  2: 125,
  3: 150,
  4: 175,
  5: 200,
};

export interface BuildPrice {
  components: number;
  fee: number;
  total: number;
  missing: string[];
}

/** Suma el precio de los componentes de una selección y añade el fee de montaje. */
export function priceBuild(sel: BuildSelection, tier: BudgetTier): BuildPrice {
  const missing: string[] = [];
  let components = 0;
  for (const id of Object.values(sel)) {
    if (!id || id === "none") continue;
    const entry = PART_PRICES[id];
    if (entry) components += entry.price;
    else missing.push(id);
  }
  const fee = ASSEMBLY_FEE[tier];
  return { components, fee, total: components + fee, missing };
}

/** Redondeo comercial hacia arriba: al 10 superior; si termina en 40, al 50. */
export function displayPrice(total: number): number {
  let rounded = Math.ceil(total / 10) * 10;
  if (rounded % 100 === 40) rounded += 10;
  return rounded;
}

export const PRICES_UPDATED = "agosto de 2026";
