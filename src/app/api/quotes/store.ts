import { promises as fs } from "fs";
import path from "path";
import type { QuoteRecord } from "@/lib/quotes";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "quotes.json");

export function adminPin() {
  return process.env.ADMIN_PIN ?? "1234";
}

export async function readQuotes(): Promise<QuoteRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QuoteRecord[]) : [];
  } catch {
    return [];
  }
}

export async function writeQuotes(quotes: QuoteRecord[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(quotes, null, 2), "utf8");
}
