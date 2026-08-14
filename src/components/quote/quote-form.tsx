"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2, Send, Settings2 } from "lucide-react";
import { categories, partById, Category } from "@/lib/parts";
import { PROFILES, USE_CASES, BUDGET_TIERS, UseCase, BudgetTier } from "@/lib/profiles";
import { PART_PRICES, priceBuild, displayPrice, PRICES_UPDATED } from "@/lib/pricing";
import type { BuildSelection } from "@/lib/build-engine";
import { formatNumber } from "@/lib/utils";
import { Input, Textarea, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const STORAGE_KEY = "pclab:quote-build";

// Orden de las categorías en el resumen (igual que en el builder).
const BUILD_ORDER: (keyof BuildSelection)[] = [
  "cpu", "motherboard", "gpu", "ram", "storage", "cooling", "psu", "case", "os", "peripheral", "monitor", "extra",
];

interface LoadedBuild {
  build: BuildSelection;
  notes: string;
  preset?: string;
  presetLabel?: string;
  tier?: BudgetTier;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  website?: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

function parsePreset(raw: string | null): { build: BuildSelection; tier: BudgetTier; label: string; preset: string } | undefined {
  if (!raw) return undefined;
  const [useKey, tierKey] = raw.split("-");
  if (!(useKey in PROFILES) || !["1", "2", "3", "4", "5"].includes(tierKey)) return undefined;
  const tier = Number(tierKey) as BudgetTier;
  const useLabel = USE_CASES.find((u) => u.key === useKey)?.label ?? useKey;
  const tierLabel = BUDGET_TIERS.find((t) => t.key === tier)?.label ?? "";
  return {
    build: PROFILES[useKey as UseCase][tier],
    tier,
    label: `${useLabel} · ${tierLabel}`,
    preset: raw,
  };
}

export function QuoteForm() {
  const params = useSearchParams();
  const [loaded, setLoaded] = React.useState<LoadedBuild | null | undefined>(undefined);
  const [state, setState] = React.useState<FormState>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "ok" | "error">("idle");
  const [quoteId, setQuoteId] = React.useState("");

  React.useEffect(() => {
    // La lectura de sessionStorage solo puede hacerse en el cliente; se
    // envuelve en una función async para no setear estado de forma síncrona
    // en el cuerpo del efecto (react-hooks/set-state-in-effect).
    void (async () => {
      // 1) Build guardada desde el configurador (sessionStorage).
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { build?: BuildSelection; notes?: string };
          if (parsed.build && Object.keys(parsed.build).length > 0) {
            setLoaded({ build: parsed.build, notes: parsed.notes ?? "" });
            if (parsed.notes) setState((p) => ({ ...p, message: parsed.notes ?? "" }));
            return;
          }
        }
      } catch {
        // sessionStorage no disponible o JSON corrupto: seguimos con el preset.
      }

      // 2) Preset por URL (?preset=gaming-2), validado contra PROFILES.
      const preset = parsePreset(params.get("preset"));
      if (preset) {
        setLoaded({ build: preset.build, notes: "", preset: preset.preset, presetLabel: preset.label, tier: preset.tier });
        return;
      }

      setLoaded(null);
    })();
  }, [params]);

  const estimate = React.useMemo(() => {
    if (!loaded) return undefined;
    // Con preset usamos el fee de su tier; sin tier, el fee base.
    const tier = loaded.tier ?? 1;
    return displayPrice(priceBuild(loaded.build, tier).total);
  }, [loaded]);

  const update = (k: keyof FormState, v: string) => {
    setState((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (state.name.trim().length < 2) e.name = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = "Introduce un email válido.";
    if (state.phone && !/^[+0-9 ]{6,16}$/.test(state.phone)) e.phone = "Teléfono no válido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (state.website) return; // honeypot
    if (!loaded || !validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          phone: state.phone,
          message: state.message,
          build: loaded.build,
          preset: loaded.preset,
          presetLabel: loaded.presetLabel,
          estimate,
          website: state.website,
        }),
      });
      const data = (await res.json()) as { ok: boolean; id?: string };
      if (!res.ok || !data.ok) throw new Error("failed");
      setQuoteId(data.id ?? "");
      setStatus("ok");
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // sin sessionStorage: no pasa nada
      }
    } catch {
      setStatus("error");
    }
  };

  if (loaded === undefined) return null;

  if (loaded === null) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-surface/50 p-8 text-center backdrop-blur">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-brand/25 bg-brand/5 text-brand">
          <Settings2 className="size-6" aria-hidden />
        </span>
        <h2 className="mt-5 font-display text-xl font-semibold">Aún no hay ninguna configuración</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Configura tu PC pieza a pieza o parte de uno de nuestros equipos recomendados y vuelve aquí para pedir la
          cotización.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/configurador">Abrir el configurador</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/pcs/gaming">Ver PCs recomendados</Link>
          </Button>
        </div>
      </div>
    );
  }

  const rows = BUILD_ORDER.filter((k) => loaded.build[k] && loaded.build[k] !== "none").map((k) => {
    const part = partById(loaded.build[k]!);
    return {
      category: categories[k as Category]?.label ?? k,
      name: part?.name ?? loaded.build[k]!,
      priced: Boolean(part && PART_PRICES[part.id]),
    };
  });

  return (
    <AnimatePresence mode="wait">
      {status === "ok" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-emerald-400/30 bg-emerald-400/5 px-8 py-16 text-center"
          role="status"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
            <CheckCircle2 className="size-8" aria-hidden />
          </span>
          <h2 className="font-display text-2xl font-bold">Solicitud recibida</h2>
          <p className="max-w-md text-sm text-muted">
            Te contactaremos en menos de 24 horas laborables con tu cotización detallada.
            {quoteId && (
              <>
                {" "}
                Referencia: <span className="font-mono text-foreground">{quoteId}</span>
              </>
            )}
          </p>
          <Button asChild variant="secondary" className="mt-2">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Resumen de la build */}
          <aside className="h-fit rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-base font-semibold">Tu configuración</h2>
              {loaded.presetLabel && <Badge variant="brand">{loaded.presetLabel}</Badge>}
            </div>
            <dl className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
              {rows.map((r) => (
                <div key={r.category} className="flex items-baseline justify-between gap-3">
                  <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">{r.category}</dt>
                  <dd className="text-right font-medium text-foreground/90">{r.name}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-2xl border border-brand/25 bg-brand/5 px-4 py-3">
              <p className="font-display text-2xl font-semibold text-brand">
                {estimate ? `${formatNumber(estimate)} €` : "A confirmar"}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted">
                Estimación orientativa con IVA: componentes a precio de mercado ({PRICES_UPDATED}) más montaje, test de
                24 h y configuración. La cotización final se confirma contigo.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="mt-3">
              <Link href="/configurador">Modificar configuración</Link>
            </Button>
          </aside>

          {/* Formulario */}
          <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur sm:p-8">
            {/* honeypot hidden field */}
            <input
              type="text"
              name="website"
              value={state.website ?? ""}
              onChange={(e) => update("website", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <fieldset>
                <Label htmlFor="qf-name">Nombre completo</Label>
                <Input id="qf-name" value={state.name} onChange={(e) => update("name", e.target.value)} placeholder="Pablo García" aria-invalid={Boolean(errors.name)} />
                <FieldError>{errors.name}</FieldError>
              </fieldset>
              <fieldset>
                <Label htmlFor="qf-email">Email</Label>
                <Input id="qf-email" type="email" value={state.email} onChange={(e) => update("email", e.target.value)} placeholder="tu@email.com" aria-invalid={Boolean(errors.email)} />
                <FieldError>{errors.email}</FieldError>
              </fieldset>
            </div>

            <fieldset>
              <Label htmlFor="qf-phone">Teléfono (opcional)</Label>
              <Input id="qf-phone" type="tel" value={state.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+34 600 000 000" aria-invalid={Boolean(errors.phone)} />
              <FieldError>{errors.phone}</FieldError>
            </fieldset>

            <fieldset>
              <Label htmlFor="qf-message">Peticiones especiales</Label>
              <Textarea
                id="qf-message"
                value={state.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="PC full white, sin RGB, entrega antes de fecha X, periféricos concretos…"
                aria-invalid={Boolean(errors.message)}
              />
              <FieldError>{errors.message}</FieldError>
            </fieldset>

            {status === "error" && (
              <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
                <AlertCircle className="size-4" aria-hidden /> No hemos podido enviar la solicitud. Inténtalo de nuevo en
                unos minutos.
              </p>
            )}

            <div className="flex flex-col items-center gap-3 pt-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
                {status === "loading" ? <Loader2 className="animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
                {status === "loading" ? "Enviando…" : "Solicitar cotización"}
              </Button>
              <p className="text-center text-xs text-muted">
                Sin compromiso: usamos tus datos solo para preparar y enviarte la cotización.
              </p>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
