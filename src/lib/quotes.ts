export type QuoteStatus = "nueva" | "en_proceso" | "enviada" | "cerrada";

export const QUOTE_STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: "nueva", label: "Nueva" },
  { value: "en_proceso", label: "En proceso" },
  { value: "enviada", label: "Enviada" },
  { value: "cerrada", label: "Cerrada" },
];

export interface QuoteComment {
  at: string; // ISO
  text: string;
}

export interface ShippingInfo {
  name?: string;
  address?: string;
  city?: string;
  zip?: string;
  province?: string;
  phone?: string;
  carrier?: string;
  tracking?: string;
}

export interface QuoteRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  build: Record<string, string>;
  preset?: string;
  presetLabel?: string;
  estimate?: number;
  status: QuoteStatus;
  // Campos opcionales (registros antiguos no los tienen):
  fee?: number;
  discount?: number;
  quoteNotes?: string;
  paid?: boolean | { at?: string };
  shipping?: ShippingInfo;
  comments?: QuoteComment[];
}

export function isPaid(q: QuoteRecord): boolean {
  return Boolean(q.paid);
}

export function paidAt(q: QuoteRecord): string | undefined {
  return typeof q.paid === "object" ? q.paid.at : undefined;
}

/**
 * Nº de cotización público: iniciales de cada parte del nombre + fecha de
 * solicitud (DDMMYY). P.ej. José Ramírez García, 15/08/2026 → "JRG-150826".
 */
export function quoteNumber(q: { name: string; createdAt: string }): string {
  const initials = q.name
    .trim()
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
  const d = new Date(q.createdAt);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${initials || "CL"}-${dd}${mm}${yy}`;
}
