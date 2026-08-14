export type QuoteStatus = "nueva" | "en_proceso" | "enviada" | "cerrada";

export const QUOTE_STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: "nueva", label: "Nueva" },
  { value: "en_proceso", label: "En proceso" },
  { value: "enviada", label: "Enviada" },
  { value: "cerrada", label: "Cerrada" },
];

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
}
