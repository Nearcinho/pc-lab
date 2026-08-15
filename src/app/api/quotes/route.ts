import type { QuoteRecord, QuoteStatus } from "@/lib/quotes";
import { adminPin, readQuotes, writeQuotes } from "@/app/api/quotes/store";

// Notas sobre `output: "export"`:
// - `export const dynamic = "force-dynamic"` está prohibido y rompe la ruta.
// - Un handler GET que lea `request` (p.ej. headers) rompe TODA la ruta en
//   dev: el listado para el admin vive en ./list/route.ts como POST.
// - POST/PATCH/DELETE sí funcionan en dev; en producción el sitio es estático
//   y estas rutas no existen (el formulario solo opera en dev/self-host).

interface QuotePayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  build?: Record<string, string>;
  preset?: string;
  presetLabel?: string;
  estimate?: number;
  website?: string;
}

const STATUSES: QuoteStatus[] = ["nueva", "en_proceso", "enviada", "cerrada"];

const RATE_MS = 60_000;
const requests = new Map<string, number>();

function isAuthorized(request: Request) {
  return request.headers.get("x-admin-pin") === adminPin();
}

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const last = requests.get(ip) ?? 0;
  if (now - last < RATE_MS) {
    return Response.json(
      { ok: false, error: "Demasiados intentos. Espera un momento y prueba de nuevo." },
      { status: 429 }
    );
  }
  requests.set(ip, now);
  if (requests.size > 5000) requests.clear();

  let body: QuotePayload;
  try {
    body = (await request.json()) as QuotePayload;
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // honeypot
  if (body.website) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = (body.message ?? "").trim();
  const build = body.build && typeof body.build === "object" ? body.build : {};

  if (name.length < 2) {
    return Response.json({ ok: false, error: "El nombre es demasiado corto." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Email inválido." }, { status: 422 });
  }
  if (Object.keys(build).length === 0) {
    return Response.json({ ok: false, error: "La solicitud no incluye ninguna configuración." }, { status: 422 });
  }

  const record: QuoteRecord = {
    id: newId(),
    createdAt: new Date().toISOString(),
    name,
    email,
    phone,
    message,
    build,
    preset: body.preset,
    presetLabel: body.presetLabel,
    estimate: typeof body.estimate === "number" && Number.isFinite(body.estimate) ? body.estimate : undefined,
    status: "nueva",
  };

  try {
    const quotes = await readQuotes();
    quotes.push(record);
    await writeQuotes(quotes);
  } catch {
    return Response.json({ ok: false, error: "No se pudo guardar la solicitud." }, { status: 500 });
  }

  return Response.json({ ok: true, id: record.id }, { status: 200 });
}

const SHIPPING_KEYS = ["name", "address", "city", "zip", "province", "phone", "carrier", "tracking"] as const;

interface PatchBody {
  id?: string;
  status?: string;
  build?: Record<string, unknown>;
  fee?: number;
  discount?: number;
  quoteNotes?: string;
  paid?: boolean | { at?: string };
  shipping?: Record<string, unknown>;
  comment?: string;
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ ok: false, error: "PIN incorrecto." }, { status: 401 });
  }

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  if (!body.id) {
    return Response.json({ ok: false, error: "Falta el id de la solicitud." }, { status: 422 });
  }
  if (body.status !== undefined && !STATUSES.includes(body.status as QuoteStatus)) {
    return Response.json({ ok: false, error: "Estado no válido." }, { status: 422 });
  }

  const quotes = await readQuotes();
  const quote = quotes.find((q) => q.id === body.id);
  if (!quote) {
    return Response.json({ ok: false, error: "Solicitud no encontrada." }, { status: 404 });
  }

  if (body.status !== undefined) quote.status = body.status as QuoteStatus;

  if (body.build && typeof body.build === "object") {
    const build: Record<string, string> = {};
    for (const [k, v] of Object.entries(body.build)) {
      if (typeof v === "string") build[k] = v;
    }
    quote.build = build;
  }

  if (typeof body.fee === "number" && Number.isFinite(body.fee) && body.fee >= 0) quote.fee = body.fee;
  if (typeof body.discount === "number" && Number.isFinite(body.discount) && body.discount >= 0) {
    quote.discount = body.discount;
  }
  if (typeof body.quoteNotes === "string") quote.quoteNotes = body.quoteNotes;

  if (body.paid !== undefined) {
    quote.paid =
      typeof body.paid === "boolean"
        ? body.paid
        : { at: typeof body.paid?.at === "string" ? body.paid.at : new Date().toISOString() };
  }

  if (body.shipping && typeof body.shipping === "object") {
    const shipping: QuoteRecord["shipping"] = {};
    for (const key of SHIPPING_KEYS) {
      const v = body.shipping[key];
      if (typeof v === "string" && v.trim()) shipping[key] = v.trim();
    }
    quote.shipping = shipping;
  }

  if (typeof body.comment === "string" && body.comment.trim()) {
    quote.comments = [...(quote.comments ?? []), { at: new Date().toISOString(), text: body.comment.trim() }];
  }

  await writeQuotes(quotes);
  return Response.json({ ok: true, quote }, { status: 200 });
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ ok: false, error: "PIN incorrecto." }, { status: 401 });
  }

  let body: { id?: string };
  try {
    body = (await request.json()) as { id?: string };
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  if (!body.id) {
    return Response.json({ ok: false, error: "Falta el id de la solicitud." }, { status: 422 });
  }

  const quotes = await readQuotes();
  const next = quotes.filter((q) => q.id !== body.id);
  if (next.length === quotes.length) {
    return Response.json({ ok: false, error: "Solicitud no encontrada." }, { status: 404 });
  }
  await writeQuotes(next);
  return Response.json({ ok: true }, { status: 200 });
}
