"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle, ArrowLeft, FileDown, Inbox, Loader2, Lock, LogOut, RefreshCw, Trash2,
} from "lucide-react";
import { categories, partById, Category } from "@/lib/parts";
import { PART_PRICES, ASSEMBLY_FEE, displayPrice, PRICES_UPDATED } from "@/lib/pricing";
import type { BudgetTier } from "@/lib/profiles";
import type { QuoteRecord, QuoteStatus } from "@/lib/quotes";
import { QUOTE_STATUSES } from "@/lib/quotes";
import { siteConfig } from "@/lib/site";
import { cn, formatNumber } from "@/lib/utils";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PIN_KEY = "pclab:admin-pin";

const STATUS_VARIANT: Record<QuoteStatus, "brand" | "warning" | "success" | "default"> = {
  nueva: "brand",
  en_proceso: "warning",
  enviada: "success",
  cerrada: "default",
};

const BUILD_ORDER = [
  "cpu", "motherboard", "gpu", "ram", "storage", "cooling", "psu", "case", "os", "peripheral", "monitor", "extra",
];

interface QuoteLine {
  category: string;
  name: string;
  price: number | null; // null → "a confirmar"
}

function quoteLines(quote: QuoteRecord): QuoteLine[] {
  const keys = [...BUILD_ORDER, ...Object.keys(quote.build).filter((k) => !BUILD_ORDER.includes(k))];
  const seen = new Set<string>();
  const lines: QuoteLine[] = [];
  for (const key of keys) {
    const id = quote.build[key];
    if (!id || id === "none" || seen.has(key)) continue;
    seen.add(key);
    const part = partById(id);
    lines.push({
      category: categories[key as Category]?.label ?? key,
      name: part?.name ?? id,
      price: PART_PRICES[id]?.price ?? null,
    });
  }
  return lines;
}

function presetTier(quote: QuoteRecord): BudgetTier | undefined {
  const tier = Number(quote.preset?.split("-")[1]);
  return ([1, 2, 3, 4, 5] as const).includes(tier as BudgetTier) ? (tier as BudgetTier) : undefined;
}

function defaultFee(quote: QuoteRecord): number {
  const tier = presetTier(quote);
  // Con preset conocido, fee de su tier; si no, fee base (100 €).
  return tier ? ASSEMBLY_FEE[tier] : ASSEMBLY_FEE[1];
}

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" });
}

async function generateQuotePdf(opts: {
  quote: QuoteRecord;
  lines: QuoteLine[];
  fee: number;
  discount: number;
  notes: string;
}) {
  const { quote, lines, fee, discount, notes } = opts;
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 16;
  const brand: [number, number, number] = [79, 209, 255];
  const dark: [number, number, number] = [24, 28, 36];

  // Cabecera
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageW, 34, "F");
  doc.setTextColor(...brand);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("PC LAB", margin, 15);
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Estudio de PC a medida", margin, 22);
  doc.text(`${siteConfig.email} · ${siteConfig.phone}`, margin, 28);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("COTIZACIÓN", pageW - margin, 15, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Nº ${quote.id}`, pageW - margin, 21, { align: "right" });
  doc.text(`Fecha: ${formatDate(quote.createdAt)}`, pageW - margin, 27, { align: "right" });

  // Datos del cliente
  let y = 44;
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Cliente", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  y += 6;
  doc.text(quote.name, margin, y);
  y += 5;
  doc.text(quote.email, margin, y);
  if (quote.phone) {
    y += 5;
    doc.text(quote.phone, margin, y);
  }
  if (quote.presetLabel) {
    doc.setFont("helvetica", "bold");
    doc.text("Configuración", pageW / 2 + 10, 44);
    doc.setFont("helvetica", "normal");
    doc.text(quote.presetLabel, pageW / 2 + 10, 50);
  }
  y += 8;

  // Tabla de piezas
  const components = lines.reduce((s, l) => s + (l.price ?? 0), 0);
  const eur = (n: number) => `${formatNumber(n)} €`;
  const body: string[][] = lines.map((l) => [l.category, l.name, l.price === null ? "A confirmar" : eur(l.price)]);
  body.push(["", "Montaje, test de 24 h y configuración", eur(fee)]);
  if (discount > 0) body.push(["", "Descuento", `-${eur(discount)}`]);

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["Componente", "Pieza", "Precio"]],
    body,
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2.5, textColor: [40, 40, 40] },
    headStyles: { fillColor: dark, textColor: brand, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: {
      0: { cellWidth: 40 },
      2: { cellWidth: 30, halign: "right" },
    },
  });

  const finalY =
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 60;

  // Total destacado
  const total = displayPrice(components + fee - discount);
  doc.setFillColor(...dark);
  doc.roundedRect(pageW - margin - 90, finalY + 6, 90, 16, 2, 2, "F");
  doc.setTextColor(...brand);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`TOTAL: ${eur(total)}`, pageW - margin - 45, finalY + 16.5, { align: "center" });
  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("IVA incluido", pageW - margin - 45, finalY + 21, { align: "center" });

  // Notas y condiciones
  let fy = finalY + 32;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  if (notes.trim()) {
    doc.setFont("helvetica", "bold");
    doc.text("Notas", margin, fy);
    doc.setFont("helvetica", "normal");
    fy += 5;
    const wrapped = doc.splitTextToSize(notes.trim(), pageW - margin * 2) as string[];
    doc.text(wrapped, margin, fy);
    fy += wrapped.length * 4.5 + 4;
  }
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  const legal = [
    "Oferta válida durante 30 días desde la fecha de emisión.",
    `Precios de componentes a precio de mercado (${PRICES_UPDATED}), sujetos a confirmación en el momento del pedido.`,
    "El montaje, el test de estabilidad de 24 h y la puesta a punto están incluidos en todos los equipos PC LAB.",
  ];
  for (const line of legal) {
    const wrapped = doc.splitTextToSize(line, pageW - margin * 2) as string[];
    doc.text(wrapped, margin, fy);
    fy += wrapped.length * 4 + 1;
  }

  doc.save(`cotizacion-${quote.id}-${slugify(quote.name)}.pdf`);
}

export function AdminDashboard() {
  const [pin, setPin] = React.useState("");
  const [authed, setAuthed] = React.useState(false);
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [quotes, setQuotes] = React.useState<QuoteRecord[]>([]);
  const [selected, setSelected] = React.useState<QuoteRecord | null>(null);
  const [fee, setFee] = React.useState(0);
  const [discount, setDiscount] = React.useState(0);
  const [notes, setNotes] = React.useState("");
  const [pdfBusy, setPdfBusy] = React.useState(false);

  const fetchQuotes = React.useCallback(async (pinValue: string): Promise<boolean> => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/quotes/list", { method: "POST", headers: { "x-admin-pin": pinValue } });
      if (res.status === 401) {
        setAuthError("PIN incorrecto. Inténtalo de nuevo.");
        sessionStorage.removeItem(PIN_KEY);
        setAuthed(false);
        return false;
      }
      if (!res.ok) throw new Error("failed");
      const data = (await res.json()) as { quotes: QuoteRecord[] };
      setQuotes(data.quotes);
      setAuthed(true);
      return true;
    } catch {
      setAuthError("No se pudo cargar la lista. ¿Está el servidor en marcha?");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // Auto-login con el PIN guardado en sesión (solo existe en el cliente).
    void (async () => {
      const saved = sessionStorage.getItem(PIN_KEY);
      if (!saved) return;
      const ok = await fetchQuotes(saved);
      if (ok) setPin(saved);
    })();
  }, [fetchQuotes]);

  const login = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const ok = await fetchQuotes(pin);
    if (ok) sessionStorage.setItem(PIN_KEY, pin);
  };

  const logout = () => {
    sessionStorage.removeItem(PIN_KEY);
    setAuthed(false);
    setSelected(null);
    setQuotes([]);
    setPin("");
  };

  const changeStatus = async (id: string, status: QuoteStatus) => {
    const res = await fetch("/api/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
      setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("¿Eliminar esta solicitud? Esta acción no se puede deshacer.")) return;
    const res = await fetch("/api/quotes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      setSelected((prev) => (prev?.id === id ? null : prev));
    }
  };

  const openQuote = (q: QuoteRecord) => {
    setSelected(q);
    setFee(defaultFee(q));
    setDiscount(0);
    setNotes(q.message ?? "");
  };

  const downloadPdf = async () => {
    if (!selected) return;
    setPdfBusy(true);
    try {
      await generateQuotePdf({ quote: selected, lines: quoteLines(selected), fee, discount, notes });
    } finally {
      setPdfBusy(false);
    }
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm rounded-3xl border border-border bg-surface/50 p-8 backdrop-blur">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-brand/25 bg-brand/5 text-brand">
          <Lock className="size-6" aria-hidden />
        </span>
        <h1 className="mt-5 text-center font-display text-xl font-semibold">Área de administración</h1>
        <p className="mt-2 text-center text-sm text-muted">Introduce el PIN para gestionar las cotizaciones.</p>
        <form onSubmit={login} className="mt-6 space-y-4">
          <fieldset>
            <Label htmlFor="admin-pin">PIN</Label>
            <Input
              id="admin-pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              autoFocus
            />
          </fieldset>
          {authError && (
            <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
              <AlertCircle className="size-4" aria-hidden /> {authError}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading || !pin}>
            {loading ? <Loader2 className="animate-spin" aria-hidden /> : <Lock className="size-4" aria-hidden />}
            Entrar
          </Button>
        </form>
      </div>
    );
  }

  if (selected) {
    const lines = quoteLines(selected);
    const components = lines.reduce((s, l) => s + (l.price ?? 0), 0);
    const total = displayPrice(components + fee - discount);
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
            <ArrowLeft className="size-4" aria-hidden /> Volver a la lista
          </Button>
          <Badge variant={STATUS_VARIANT[selected.status]}>
            {QUOTE_STATUSES.find((s) => s.value === selected.status)?.label}
          </Badge>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Desglose */}
          <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
            <h1 className="font-display text-lg font-semibold">Cotización {selected.id}</h1>
            <p className="mt-1 text-sm text-muted">
              {selected.name} · {selected.email}
              {selected.phone && ` · ${selected.phone}`} · {formatDate(selected.createdAt)}
            </p>
            {selected.presetLabel && (
              <p className="mt-1 text-sm text-brand">{selected.presetLabel}</p>
            )}

            <dl className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
              {lines.map((l) => (
                <div key={l.category} className="flex items-baseline justify-between gap-3">
                  <dt className="text-muted">
                    <span className="mr-2 text-xs font-semibold uppercase tracking-wide">{l.category}</span>
                    {l.name}
                  </dt>
                  <dd className={cn("shrink-0 font-medium", l.price === null && "text-amber-600")}>
                    {l.price === null ? "A confirmar" : `${formatNumber(l.price)} €`}
                  </dd>
                </div>
              ))}
            </dl>

            {selected.message && (
              <div className="mt-5 rounded-xl bg-surface-2/50 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Mensaje del cliente</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground/90">{selected.message}</p>
              </div>
            )}
          </div>

          {/* Ajustes y total */}
          <div className="h-fit space-y-5 rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur lg:sticky lg:top-24">
            <div className="grid grid-cols-2 gap-4">
              <fieldset>
                <Label htmlFor="q-fee">Fee de montaje (€)</Label>
                <Input
                  id="q-fee"
                  type="number"
                  min={0}
                  value={fee}
                  onChange={(e) => setFee(Math.max(0, Number(e.target.value) || 0))}
                />
              </fieldset>
              <fieldset>
                <Label htmlFor="q-discount">Descuento (€)</Label>
                <Input
                  id="q-discount"
                  type="number"
                  min={0}
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, Number(e.target.value) || 0))}
                />
              </fieldset>
            </div>
            <fieldset>
              <Label htmlFor="q-notes">Notas para la cotización</Label>
              <Textarea
                id="q-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Condiciones, plazos, alternativas de piezas…"
              />
            </fieldset>

            <dl className="space-y-1.5 border-t border-border/60 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Componentes</dt>
                <dd className="font-medium">{formatNumber(components)} €</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Montaje y configuración</dt>
                <dd className="font-medium">{formatNumber(fee)} €</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <dt>Descuento</dt>
                  <dd className="font-medium">-{formatNumber(discount)} €</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-border/60 pt-2">
                <dt className="font-display font-semibold">TOTAL</dt>
                <dd className="font-display text-2xl font-semibold text-brand">{formatNumber(total)} €</dd>
              </div>
            </dl>

            <div className="flex items-center gap-2">
              <Label htmlFor="q-status" className="shrink-0">Estado</Label>
              <Select
                id="q-status"
                value={selected.status}
                onChange={(v) => void changeStatus(selected.id, v as QuoteStatus)}
                options={QUOTE_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
              />
            </div>

            <Button className="w-full" size="lg" onClick={() => void downloadPdf()} disabled={pdfBusy}>
              {pdfBusy ? <Loader2 className="animate-spin" aria-hidden /> : <FileDown className="size-4" aria-hidden />}
              Descargar cotización PDF
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Solicitudes de cotización</h1>
          <p className="mt-1 text-sm text-muted">{quotes.length} {quotes.length === 1 ? "solicitud" : "solicitudes"}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => void fetchQuotes(pin)} disabled={loading}>
            <RefreshCw className={cn("size-4", loading && "animate-spin")} aria-hidden /> Actualizar
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="size-4" aria-hidden /> Salir
          </Button>
        </div>
      </div>

      {authError && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
          <AlertCircle className="size-4" aria-hidden /> {authError}
        </p>
      )}

      {quotes.length === 0 && !loading ? (
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface/50 px-8 py-16 text-center">
          <Inbox className="size-10 text-muted" aria-hidden />
          <p className="text-sm text-muted">Todavía no hay solicitudes. Las que lleguen desde /cotizar aparecerán aquí.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <AnimatePresence initial={false}>
            {quotes.map((q) => (
              <motion.article
                key={q.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-surface/50 p-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{q.name}</p>
                    <Badge variant={STATUS_VARIANT[q.status]}>
                      {QUOTE_STATUSES.find((s) => s.value === q.status)?.label ?? q.status}
                    </Badge>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted">
                    {q.presetLabel ?? "Configuración personalizada"} · {formatDate(q.createdAt)}
                  </p>
                </div>
                <p className="shrink-0 font-display text-lg font-semibold text-brand">
                  {q.estimate ? `${formatNumber(q.estimate)} €` : "—"}
                </p>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Select
                    aria-label={`Estado de la solicitud de ${q.name}`}
                    value={q.status}
                    onChange={(v) => void changeStatus(q.id, v as QuoteStatus)}
                    options={QUOTE_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
                    className="w-36"
                  />
                  <Button variant="secondary" size="sm" onClick={() => openQuote(q)}>
                    Abrir cotización
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => void remove(q.id)} aria-label={`Eliminar solicitud de ${q.name}`}>
                    <Trash2 className="size-4 text-red-500" aria-hidden />
                  </Button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
