interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  message?: string;
  website?: string;
}

const RATE_MS = 60_000;
const requests = new Map<string, number>();

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

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, error: "Solicitud inválida." }, { status: 400 });
  }

  // honeypot
  if (body.website) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const type = (body.type ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2) {
    return Response.json({ ok: false, error: "El nombre es demasiado corto." }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Email inválido." }, { status: 422 });
  }
  if (message.length < 10) {
    return Response.json({ ok: false, error: "El mensaje es demasiado corto." }, { status: 422 });
  }

  // Simulated delivery. Plug your email provider here (e.g. Resend, Postmark).
  console.info("[PC LAB] Nuevo mensaje de contacto", {
    name,
    email,
    phone: body.phone ?? "",
    type,
    message,
    receivedAt: new Date().toISOString(),
  });

  return Response.json({ ok: true }, { status: 200 });
}
