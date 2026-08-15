// Base de datos local de precios (data/prices-db.json), actualizada a diario
// por scripts/update-prices.mts desde Amazon.es y G2A. Solo se importa en
// servidor (API routes) y en el script: el admin la pide por POST /api/prices.
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "prices-db.json");

export const PRICE_HISTORY_LIMIT = 90;

export interface PriceHistoryPoint {
  /** Fecha del registro (YYYY-MM-DD). */
  date: string;
  price: number;
}

export interface PriceDbEntry {
  price: number;
  currency: "EUR";
  url: string;
  source: "amazon.es" | "g2a.com";
  /** ISO de la última comprobación con éxito. */
  checkedAt: string;
  history: PriceHistoryPoint[];
}

export type PricesDb = Record<string, PriceDbEntry>;

export async function readPricesDb(): Promise<PricesDb> {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as PricesDb)
      : {};
  } catch {
    return {};
  }
}

/** Último precio conocido de una pieza, o null si no hay registro. */
export function latestPrice(db: PricesDb, partId: string): number | null {
  return db[partId]?.price ?? null;
}

/**
 * Inserta o actualiza el precio de una pieza y añade el punto al histórico
 * (un registro por día como máximo; se conservan los últimos 90).
 */
export async function upsertPrice(
  partId: string,
  entry: Omit<PriceDbEntry, "history">
): Promise<PricesDb> {
  const db = await readPricesDb();
  const prev = db[partId];
  const date = entry.checkedAt.slice(0, 10);
  const history = [...(prev?.history ?? [])];
  const last = history[history.length - 1];
  if (last?.date === date) last.price = entry.price;
  else history.push({ date, price: entry.price });
  db[partId] = { ...entry, history: history.slice(-PRICE_HISTORY_LIMIT) };
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
  return db;
}
