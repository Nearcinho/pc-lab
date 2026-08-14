import { adminPin, readQuotes } from "@/app/api/quotes/store";

// GET /api/quotes no es viable: con `output: "export"` cualquier handler GET
// que lea `request` (headers, url…) rompe TODA la ruta en dev (Next exige
// force-static). Los métodos no-GET sí funcionan, así que el listado para el
// admin se sirve por POST con el mismo header `x-admin-pin`.
export async function POST(request: Request) {
  if (request.headers.get("x-admin-pin") !== adminPin()) {
    return Response.json({ ok: false, error: "PIN incorrecto." }, { status: 401 });
  }
  const quotes = await readQuotes();
  const sorted = [...quotes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return Response.json({ ok: true, quotes: sorted }, { status: 200 });
}
