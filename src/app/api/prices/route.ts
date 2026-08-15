import { adminPin } from "@/app/api/quotes/store";
import { readPricesDb } from "@/lib/prices-db";

// POST /api/prices — devuelve la base de datos local de precios
// (data/prices-db.json) al panel de administración. Mismo patrón que
// /api/quotes/list: POST porque con `output: "export"` un GET que lee
// `request` rompe la ruta en dev.
export async function POST(request: Request) {
  if (request.headers.get("x-admin-pin") !== adminPin()) {
    return Response.json({ ok: false, error: "PIN incorrecto." }, { status: 401 });
  }
  const prices = await readPricesDb();
  return Response.json({ ok: true, prices }, { status: 200 });
}
