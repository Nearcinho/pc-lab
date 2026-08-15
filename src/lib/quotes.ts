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
