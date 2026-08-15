"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle, ArrowLeft, ClipboardList, CreditCard, FileDown, Inbox, Loader2, Lock, LogOut,
  MessageSquare, Plus, RefreshCw, Save, ShieldCheck, Trash2, Truck, Users, X,
} from "lucide-react";
import { allParts, categories, partById, Category } from "@/lib/parts";
import { PART_PRICES, ASSEMBLY_FEE, displayPrice, PRICES_UPDATED } from "@/lib/pricing";
import type { BudgetTier } from "@/lib/profiles";
import type { QuoteRecord, QuoteStatus, ShippingInfo } from "@/lib/quotes";
import { QUOTE_STATUSES, isPaid, paidAt } from "@/lib/quotes";
import { ASSEMBLY_WARRANTY, CATEGORY_WARRANTY } from "@/lib/warranty";
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

const SHIPPING_FIELDS: { key: keyof ShippingInfo; label: string; placeholder: string }[] = [
  { key: "name", label: "Destinatario", placeholder: "Nombre y apellidos" },
  { key: "address", label: "Dirección", placeholder: "Calle, número, piso" },
  { key: "city", label: "Ciudad", placeholder: "Madrid" },
  { key: "zip", label: "Código postal", placeholder: "28001" },
  { key: "province", label: "Provincia", placeholder: "Madrid" },
  { key: "phone", label: "Teléfono de contacto", placeholder: "+34 600 000 000" },
  { key: "carrier", label: "Transportista", placeholder: "SEUR, MRW, Correos…" },
  { key: "tracking", label: "Nº de seguimiento", placeholder: "Código de tracking" },
];

interface QuoteLine {
  key: string;
  category: string;
  name: string;
  price: number | null; // null → "a confirmar"
}

function quoteLines(build: Record<string, string>): QuoteLine[] {
  const keys = [...BUILD_ORDER, ...Object.keys(build).filter((k) => !BUILD_ORDER.includes(k))];
  const seen = new Set<string>();
  const lines: QuoteLine[] = [];
  for (const key of keys) {
    const id = build[key];
    if (!id || id === "none" || seen.has(key)) continue;
    seen.add(key);
    const part = partById(id);
    lines.push({
      key,
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
  const { ARIAL_REGULAR_B64, ARIAL_BOLD_B64 } = await import("@/lib/pdf/pdf-fonts");

  const doc = new jsPDF();
  // Fuente Unicode embebida: las fuentes estándar de jsPDF corrompen acentos y el símbolo €.
  doc.addFileToVFS("arial.ttf", ARIAL_REGULAR_B64);
  doc.addFont("arial.ttf", "arial", "normal");
  doc.addFileToVFS("arialbd.ttf", ARIAL_BOLD_B64);
  doc.addFont("arialbd.ttf", "arial", "bold");
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 16;
  const brand: [number, number, number] = [79, 209, 255];
  const dark: [number, number, number] = [24, 28, 36];

  // Cabecera
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageW, 34, "F");
  doc.setTextColor(...brand);
  doc.setFont("arial", "bold");
  doc.setFontSize(20);
  doc.text("PC LAB", margin, 15);
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(9);
  doc.setFont("arial", "normal");
  doc.text("Estudio de PC a medida", margin, 22);
  doc.text(`${siteConfig.email} · ${siteConfig.phone}`, margin, 28);
  doc.setFontSize(11);
  doc.setFont("arial", "bold");
  doc.text("COTIZACIÓN", pageW - margin, 15, { align: "right" });
  doc.setFont("arial", "normal");
  doc.setFontSize(9);
  doc.text(`Nº ${quote.id}`, pageW - margin, 21, { align: "right" });
  doc.text(`Fecha: ${formatDate(quote.createdAt)}`, pageW - margin, 27, { align: "right" });

  // Datos del cliente
  let y = 44;
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.setFont("arial", "bold");
  doc.text("Cliente", margin, y);
  doc.setFont("arial", "normal");
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
    doc.setFont("arial", "bold");
    doc.text("Configuración", pageW / 2 + 10, 44);
    doc.setFont("arial", "normal");
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
    styles: { font: "arial", fontSize: 9, cellPadding: 2.5, textColor: [40, 40, 40] },
    headStyles: { font: "arial", fillColor: dark, textColor: brand, fontStyle: "bold" },
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
  doc.setFont("arial", "bold");
  doc.setFontSize(13);
  doc.text(`TOTAL: ${eur(total)}`, pageW - margin - 45, finalY + 16.5, { align: "center" });
  doc.setTextColor(120, 120, 120);
  doc.setFont("arial", "normal");
  doc.setFontSize(8);
  doc.text("IVA incluido", pageW - margin - 45, finalY + 21, { align: "center" });

  // Notas y condiciones
  let fy = finalY + 32;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9);
  if (notes.trim()) {
    doc.setFont("arial", "bold");
    doc.text("Notas", margin, fy);
    doc.setFont("arial", "normal");
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

// ---------------------------------------------------------------------------
// Editor de cotización
// ---------------------------------------------------------------------------

interface Draft {
  build: Record<string, string>;
  fee: number;
  discount: number;
  notes: string;
  status: QuoteStatus;
  paid: boolean;
  paidAt?: string;
  shipping: ShippingInfo;
}

function QuoteEditor({
  quote,
  pin,
  onSaved,
  onBack,
}: {
  quote: QuoteRecord;
  pin: string;
  onSaved: (q: QuoteRecord) => void;
  onBack: () => void;
}) {
  const [draft, setDraft] = React.useState<Draft>(() => ({
    build: { ...quote.build },
    fee: quote.fee ?? defaultFee(quote),
    discount: quote.discount ?? 0,
    notes: quote.quoteNotes ?? quote.message ?? "",
    status: quote.status,
    paid: isPaid(quote),
    paidAt: paidAt(quote),
    shipping: { ...(quote.shipping ?? {}) },
  }));
  const [saving, setSaving] = React.useState(false);
  const [savedFlash, setSavedFlash] = React.useState(false);
  const [saveError, setSaveError] = React.useState("");
  const [commentText, setCommentText] = React.useState("");
  const [commentBusy, setCommentBusy] = React.useState(false);
  const [pdfBusy, setPdfBusy] = React.useState(false);
  const [addCat, setAddCat] = React.useState<string>("cpu");
  const [addPart, setAddPart] = React.useState("");

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));
  const setShip = (k: keyof ShippingInfo, v: string) => update({ shipping: { ...draft.shipping, [k]: v } });

  const lines = quoteLines(draft.build);
  const components = lines.reduce((s, l) => s + (l.price ?? 0), 0);
  const total = displayPrice(components + draft.fee - draft.discount);

  const removePart = (key: string) => {
    const build = { ...draft.build };
    delete build[key];
    update({ build });
  };

  const addComponent = () => {
    if (!addPart) return;
    update({ build: { ...draft.build, [addCat]: addPart } });
    setAddPart("");
  };

  const save = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({
          id: quote.id,
          status: draft.status,
          build: draft.build,
          fee: draft.fee,
          discount: draft.discount,
          quoteNotes: draft.notes,
          paid: draft.paid ? { at: draft.paidAt ?? new Date().toISOString() } : false,
          shipping: draft.shipping,
        }),
      });
      const data = (await res.json()) as { ok: boolean; quote?: QuoteRecord };
      if (!res.ok || !data.ok || !data.quote) throw new Error("failed");
      onSaved(data.quote);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
    } catch {
      setSaveError("No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  const addComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    setCommentBusy(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({ id: quote.id, comment: text }),
      });
      const data = (await res.json()) as { ok: boolean; quote?: QuoteRecord };
      if (!res.ok || !data.ok || !data.quote) throw new Error("failed");
      onSaved(data.quote);
      setCommentText("");
    } catch {
      setSaveError("No se pudo añadir el comentario.");
    } finally {
      setCommentBusy(false);
    }
  };

  const downloadPdf = async () => {
    setPdfBusy(true);
    try {
      await generateQuotePdf({ quote, lines, fee: draft.fee, discount: draft.discount, notes: draft.notes });
    } finally {
      setPdfBusy(false);
    }
  };

  const addableParts = allParts.filter((p) => p.category === addCat);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="size-4" aria-hidden /> Volver
        </Button>
        <div className="flex items-center gap-2">
          {isPaid(quote) && <Badge variant="success">Pagado</Badge>}
          <Badge variant={STATUS_VARIANT[draft.status]}>
            {QUOTE_STATUSES.find((s) => s.value === draft.status)?.label}
          </Badge>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          {/* Configuración editable */}
          <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
            <h2 className="font-display text-lg font-semibold">Cotización {quote.id}</h2>
            <p className="mt-1 text-sm text-muted">
              {quote.name} · {quote.email}
              {quote.phone && ` · ${quote.phone}`} · {formatDate(quote.createdAt)}
            </p>
            {quote.presetLabel && <p className="mt-1 text-sm text-brand">{quote.presetLabel}</p>}

            <ul className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
              {lines.map((l) => (
                <li key={l.key} className="flex items-baseline justify-between gap-3">
                  <span className="text-muted">
                    <span className="mr-2 text-xs font-semibold uppercase tracking-wide">{l.category}</span>
                    <span className="text-foreground/90">{l.name}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className={cn("font-medium", l.price === null && "text-amber-600")}>
                      {l.price === null ? "A confirmar" : `${formatNumber(l.price)} €`}
                    </span>
                    <button
                      type="button"
                      onClick={() => removePart(l.key)}
                      aria-label={`Quitar ${l.name}`}
                      className="rounded-md p-1 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <X className="size-3.5" aria-hidden />
                    </button>
                  </span>
                </li>
              ))}
              {lines.length === 0 && (
                <li className="text-sm text-muted">Sin componentes: añade piezas con el selector de abajo.</li>
              )}
            </ul>

            <div className="mt-4 flex flex-wrap items-end gap-2 rounded-2xl border border-border/60 bg-surface-2/40 p-3">
              <fieldset className="w-40">
                <Label htmlFor="add-cat">Categoría</Label>
                <Select
                  id="add-cat"
                  value={addCat}
                  onChange={(v) => {
                    setAddCat(v);
                    setAddPart("");
                  }}
                  options={BUILD_ORDER.map((k) => ({ value: k, label: categories[k as Category]?.label ?? k }))}
                />
              </fieldset>
              <fieldset className="min-w-52 flex-1">
                <Label htmlFor="add-part">Componente</Label>
                <Select
                  id="add-part"
                  value={addPart}
                  onChange={setAddPart}
                  placeholder="Elige una pieza"
                  options={addableParts.map((p) => ({
                    value: p.id,
                    label: `${p.name}${PART_PRICES[p.id] ? ` · ${formatNumber(PART_PRICES[p.id].price)} €` : ""}`,
                  }))}
                />
              </fieldset>
              <Button type="button" variant="secondary" size="sm" onClick={addComponent} disabled={!addPart}>
                <Plus className="size-4" aria-hidden /> Añadir
              </Button>
            </div>

            {quote.message && (
              <div className="mt-5 rounded-xl bg-surface-2/50 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Mensaje del cliente</p>
                <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground/90">{quote.message}</p>
              </div>
            )}
          </div>

          {/* Garantías (acordeón) */}
          <details className="group rounded-3xl border border-border bg-surface/50 backdrop-blur">
            <summary className="flex cursor-pointer list-none items-center gap-3 p-5 [&::-webkit-details-marker]:hidden">
              <span className="flex size-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/5 text-brand">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-display text-base font-semibold">Garantías de los componentes</span>
                <span className="block text-xs text-muted">
                  1 año PC LAB en el ensamblado + garantía oficial del fabricante por pieza
                </span>
              </span>
              <span className="text-muted transition-transform group-open:rotate-180">
                <ArrowLeft className="size-4 -rotate-90" aria-hidden />
              </span>
            </summary>
            <ul className="space-y-2 border-t border-border/60 p-5 text-sm">
              <li className="flex items-baseline justify-between gap-3 rounded-xl border border-brand/25 bg-brand/5 px-4 py-3">
                <span>
                  <span className="font-medium">Ensamblado PC LAB</span>
                  <span className="mt-0.5 block text-xs text-muted">{ASSEMBLY_WARRANTY.detail}</span>
                </span>
                <span className="shrink-0 font-medium text-brand">{ASSEMBLY_WARRANTY.period}</span>
              </li>
              {lines.map((l) => {
                const w = CATEGORY_WARRANTY[l.key as Category];
                if (!w) return null;
                return (
                  <li key={l.key} className="flex items-baseline justify-between gap-3 rounded-xl bg-surface-2/50 px-4 py-3">
                    <span>
                      <span className="font-medium">{l.name}</span>
                      <span className="mt-0.5 block text-xs text-muted">
                        {l.category} · {w.detail}
                      </span>
                    </span>
                    <span className="shrink-0 font-medium text-foreground/90">{w.period}</span>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>

        <div className="h-fit space-y-5 lg:sticky lg:top-24">
          {/* Estado y pago */}
          <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
              <CreditCard className="size-4 text-brand" aria-hidden /> Estado y pago
            </h3>
            <div className="mt-4 space-y-4">
              <fieldset>
                <Label htmlFor="q-status">Estado</Label>
                <Select
                  id="q-status"
                  value={draft.status}
                  onChange={(v) => update({ status: v as QuoteStatus })}
                  options={QUOTE_STATUSES.map((s) => ({ value: s.value, label: s.label }))}
                />
              </fieldset>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/60 bg-surface-2/40 px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={draft.paid}
                  onChange={(e) =>
                    update({
                      paid: e.target.checked,
                      paidAt: e.target.checked ? (draft.paidAt ?? new Date().toISOString()) : undefined,
                    })
                  }
                  className="size-4 accent-brand"
                />
                <span className="flex-1">
                  <span className="block font-medium">Pagado</span>
                  {draft.paid && draft.paidAt && (
                    <span className="block text-xs text-muted">el {formatDate(draft.paidAt)}</span>
                  )}
                </span>
              </label>
            </div>
          </div>

          {/* Envío */}
          <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
              <Truck className="size-4 text-brand" aria-hidden /> Datos de envío
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {SHIPPING_FIELDS.map((f) => (
                <fieldset key={f.key} className={cn((f.key === "address" || f.key === "name") && "sm:col-span-2")}>
                  <Label htmlFor={`ship-${f.key}`}>{f.label}</Label>
                  <Input
                    id={`ship-${f.key}`}
                    value={draft.shipping[f.key] ?? ""}
                    onChange={(e) => setShip(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                </fieldset>
              ))}
            </div>
          </div>

          {/* Ajustes y total */}
          <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              <fieldset>
                <Label htmlFor="q-fee">Fee de montaje (€)</Label>
                <Input
                  id="q-fee"
                  type="number"
                  min={0}
                  value={draft.fee}
                  onChange={(e) => update({ fee: Math.max(0, Number(e.target.value) || 0) })}
                />
              </fieldset>
              <fieldset>
                <Label htmlFor="q-discount">Descuento (€)</Label>
                <Input
                  id="q-discount"
                  type="number"
                  min={0}
                  value={draft.discount}
                  onChange={(e) => update({ discount: Math.max(0, Number(e.target.value) || 0) })}
                />
              </fieldset>
            </div>
            <fieldset className="mt-4">
              <Label htmlFor="q-notes">Notas para la cotización</Label>
              <Textarea
                id="q-notes"
                value={draft.notes}
                onChange={(e) => update({ notes: e.target.value })}
                placeholder="Condiciones, plazos, alternativas de piezas…"
              />
            </fieldset>

            <dl className="mt-4 space-y-1.5 border-t border-border/60 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Componentes</dt>
                <dd className="font-medium">{formatNumber(components)} €</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Montaje y configuración</dt>
                <dd className="font-medium">{formatNumber(draft.fee)} €</dd>
              </div>
              {draft.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <dt>Descuento</dt>
                  <dd className="font-medium">-{formatNumber(draft.discount)} €</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-border/60 pt-2">
                <dt className="font-display font-semibold">TOTAL</dt>
                <dd className="font-display text-2xl font-semibold text-brand">{formatNumber(total)} €</dd>
              </div>
            </dl>

            {saveError && (
              <p className="mt-3 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
                <AlertCircle className="size-4" aria-hidden /> {saveError}
              </p>
            )}

            <div className="mt-4 grid gap-2">
              <Button onClick={() => void save()} disabled={saving}>
                {saving ? <Loader2 className="animate-spin" aria-hidden /> : <Save className="size-4" aria-hidden />}
                {savedFlash ? "¡Guardado!" : "Guardar cambios"}
              </Button>
              <Button variant="secondary" onClick={() => void downloadPdf()} disabled={pdfBusy}>
                {pdfBusy ? <Loader2 className="animate-spin" aria-hidden /> : <FileDown className="size-4" aria-hidden />}
                Descargar cotización PDF
              </Button>
            </div>
          </div>

          {/* Comentarios internos */}
          <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
              <MessageSquare className="size-4 text-brand" aria-hidden /> Comentarios internos
            </h3>
            {(quote.comments ?? []).length > 0 ? (
              <ul className="mt-4 space-y-2">
                {(quote.comments ?? []).map((c, i) => (
                  <li key={i} className="rounded-xl bg-surface-2/50 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{formatDate(c.at)}</p>
                    <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-foreground/90">{c.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">Sin comentarios todavía.</p>
            )}
            <div className="mt-4 flex items-end gap-2">
              <fieldset className="flex-1">
                <Label htmlFor="q-comment">Añadir comentario</Label>
                <Input
                  id="q-comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Llamé al cliente, queda en confirmar…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      void addComment();
                    }
                  }}
                />
              </fieldset>
              <Button type="button" variant="secondary" size="sm" onClick={() => void addComment()} disabled={commentBusy || !commentText.trim()}>
                {commentBusy ? <Loader2 className="animate-spin" aria-hidden /> : <Plus className="size-4" aria-hidden />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Dashboard principal
// ---------------------------------------------------------------------------

interface ClientGroup {
  email: string;
  name: string;
  phone: string;
  quotes: QuoteRecord[];
  lastAt: string;
  openCount: number;
}

export function AdminDashboard() {
  const [pin, setPin] = React.useState("");
  const [authed, setAuthed] = React.useState(false);
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [quotes, setQuotes] = React.useState<QuoteRecord[]>([]);
  const [view, setView] = React.useState<"quotes" | "clients">("quotes");
  const [clientEmail, setClientEmail] = React.useState<string | null>(null);
  const [selected, setSelected] = React.useState<QuoteRecord | null>(null);

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
    setClientEmail(null);
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
      const data = (await res.json()) as { quote?: QuoteRecord };
      if (data.quote) handleSaved(data.quote);
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

  const handleSaved = (q: QuoteRecord) => {
    setQuotes((prev) => prev.map((x) => (x.id === q.id ? q : x)));
    setSelected((prev) => (prev?.id === q.id ? q : prev));
  };

  const clients = React.useMemo<ClientGroup[]>(() => {
    const map = new Map<string, QuoteRecord[]>();
    for (const q of quotes) {
      const key = q.email.toLowerCase();
      const list = map.get(key);
      if (list) list.push(q);
      else map.set(key, [q]);
    }
    // quotes ya viene ordenado (más reciente primero)
    return [...map.entries()]
      .map(([email, list]) => ({
        email,
        name: list[0].name,
        phone: list[0].phone,
        quotes: list,
        lastAt: list[0].createdAt,
        openCount: list.filter((q) => q.status !== "cerrada").length,
      }))
      .sort((a, b) => b.lastAt.localeCompare(a.lastAt));
  }, [quotes]);

  const activeClient = clientEmail ? clients.find((c) => c.email === clientEmail) : undefined;

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
    return (
      <QuoteEditor
        key={selected.id}
        quote={selected}
        pin={pin}
        onSaved={handleSaved}
        onBack={() => setSelected(null)}
      />
    );
  }

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-surface/50 p-1">
        {(
          [
            { key: "quotes", label: "Solicitudes", icon: ClipboardList, count: quotes.length },
            { key: "clients", label: "Clientes", icon: Users, count: clients.length },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setView(t.key);
              setClientEmail(null);
            }}
            aria-pressed={view === t.key && !clientEmail}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
              view === t.key ? "bg-brand/15 text-brand" : "text-muted hover:text-foreground"
            )}
          >
            <t.icon className="size-4" aria-hidden />
            {t.label}
            <span className="rounded-md bg-surface-2/70 px-1.5 text-xs">{t.count}</span>
          </button>
        ))}
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
  );

  const quoteRow = (q: QuoteRecord) => (
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
          {isPaid(q) && <Badge variant="success">Pagado</Badge>}
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
        <Button variant="secondary" size="sm" onClick={() => setSelected(q)}>
          Abrir cotización
        </Button>
        <Button variant="ghost" size="sm" onClick={() => void remove(q.id)} aria-label={`Eliminar solicitud de ${q.name}`}>
          <Trash2 className="size-4 text-red-500" aria-hidden />
        </Button>
      </div>
    </motion.article>
  );

  // Vista: detalle de cliente
  if (view === "clients" && activeClient) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {header}
        <div className="mt-6">
          <Button variant="ghost" size="sm" onClick={() => setClientEmail(null)}>
            <ArrowLeft className="size-4" aria-hidden /> Todos los clientes
          </Button>
        </div>

        <div className="mt-4 rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold">{activeClient.name}</h2>
              <p className="mt-1 text-sm text-muted">
                {activeClient.email}
                {activeClient.phone && ` · ${activeClient.phone}`}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="brand">{activeClient.quotes.length} {activeClient.quotes.length === 1 ? "cotización" : "cotizaciones"}</Badge>
              {activeClient.openCount > 0 && <Badge variant="warning">{activeClient.openCount} abiertas</Badge>}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">Cliente desde el {formatDate(activeClient.quotes[activeClient.quotes.length - 1].createdAt)}</p>
        </div>

        <h3 className="mt-8 font-display text-base font-semibold">Historial de cotizaciones</h3>
        <div className="mt-4 space-y-3">
          <AnimatePresence initial={false}>{activeClient.quotes.map(quoteRow)}</AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Vista: lista de clientes
  if (view === "clients") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {header}
        {clients.length === 0 && !loading ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface/50 px-8 py-16 text-center">
            <Users className="size-10 text-muted" aria-hidden />
            <p className="text-sm text-muted">Todavía no hay clientes: aparecerán al llegar solicitudes.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false}>
              {clients.map((c) => (
                <motion.button
                  key={c.email}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setClientEmail(c.email)}
                  className="group flex flex-col rounded-2xl border border-border bg-surface/50 p-5 text-left transition-all duration-300 hover:border-border-strong hover:shadow-glow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-base font-semibold">{c.name}</p>
                    <Badge variant="brand">{c.quotes.length}</Badge>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted">{c.email}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted">
                    <span>Última: {formatDate(c.lastAt)}</span>
                    {c.openCount > 0 && <Badge variant="warning">{c.openCount} abiertas</Badge>}
                    {c.quotes.some(isPaid) && <Badge variant="success">Con pagos</Badge>}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    );
  }

  // Vista: lista de solicitudes
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {header}

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
          <AnimatePresence initial={false}>{quotes.map(quoteRow)}</AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
