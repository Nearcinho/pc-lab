"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Gamepad2, MonitorPlay, Boxes, BrainCircuit, Briefcase, Wallet, Check, PlugZap, Rocket, ArrowRight,
  Monitor, MonitorOff,
} from "lucide-react";
import { USE_CASES, BUDGET_TIERS, UseCase, BudgetTier, PROFILES } from "@/lib/profiles";
import { categories, Category, partById } from "@/lib/parts";
import { computeBuild, BuildSelection } from "@/lib/build-engine";
import type { Resolution } from "@/lib/benchmarks";
import { FpsPanel } from "@/components/builder/fps-panel";
import { cn, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const USE_ICONS: Record<UseCase, React.ComponentType<{ className?: string }>> = {
  gaming: Gamepad2,
  streaming: MonitorPlay,
  render: Boxes,
  ia: BrainCircuit,
  productividad: Briefcase,
};

const USE_INTRO: Record<UseCase, string> = {
  gaming: "Priorizamos la tarjeta gráfica y la CPU con mejor rendimiento en juegos, sin descuidar todo lo demás.",
  streaming: "Necesita un buen encoder (NVIDIA), CPU potente y RAM suficiente para jugar y emitir a la vez.",
  render: "Los núcleos y la VRAM mandan: CPUs de 16 núcleos, gráficas con 16 GB+ y RAM generosa.",
  ia: "Modelos locales y compilaciones: mucha VRAM, muchos núcleos y RAM a raudales.",
  productividad: "Respuesta ágil en todo, sin florituras: equilibrio entre CPU, RAM y almacenamiento.",
};

// Nombre comercial de cada tier para el feedback junto al campo de presupuesto.
const TIER_NAMES: Record<BudgetTier, string> = {
  1: "Gama de entrada",
  2: "Gama media",
  3: "Gama alta",
  4: "Gama entusiasta",
  5: "Gama extrema",
};

// Monitor genérico recomendado por tier (ids de peripheralParts en parts.ts).
const MONITOR_BY_TIER: Record<BudgetTier, string> = {
  1: "mon-24-165-ips",
  2: "mon-27-165-ips",
  3: "mon-27-180-ips",
  4: "mon-27-240-oled",
  5: "mon-32-240-oled",
};

const MONITOR_OPTIONS: { key: boolean; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: false, label: "Sin monitor", desc: "Solo el equipo: ya tengo pantalla o la compro aparte.", icon: MonitorOff },
  { key: true, label: "Con monitor", desc: "Incluimos un monitor acorde a la gama del equipo.", icon: Monitor },
];

const BUDGET_MIN = 400;
const BUDGET_MAX = 6000;
const BUDGET_STEP = 50;

function tierFor(value: number): BudgetTier {
  if (value <= 1200) return 1;
  if (value <= 1800) return 2;
  if (value <= 2500) return 3;
  if (value <= 3500) return 4;
  return 5;
}

export function UsageBuilder({ onUseHardware }: { onUseHardware: (sel: BuildSelection) => void }) {
  const [useKey, setUseKey] = React.useState<UseCase | null>(null);
  const [budgetValue, setBudgetValue] = React.useState<number | null>(null);
  const [wantsMonitor, setWantsMonitor] = React.useState<boolean | null>(null);
  const reduced = useReducedMotion();

  const budget: BudgetTier | null = budgetValue != null ? tierFor(budgetValue) : null;
  const answered = useKey != null && budget != null && wantsMonitor != null;

  const profile: BuildSelection | null =
    useKey && budget && wantsMonitor != null
      ? wantsMonitor
        ? { ...PROFILES[useKey][budget], monitor: MONITOR_BY_TIER[budget] }
        : PROFILES[useKey][budget]
      : null;
  const calc = profile ? computeBuild(profile) : null;
  const issues = calc?.issues ?? [];
  const hasErrors = issues.some((i) => i.severity === "error");
  const hasWarnings = issues.some((i) => i.severity === "warning");

  const monitorPart = profile?.monitor ? partById(profile.monitor) : undefined;
  const defaultRes: Resolution = monitorPart?.displayRes ?? "1440p";

  const resultRef = React.useRef<HTMLDivElement>(null);
  const scrollToResult = () => {
    if (!resultRef.current) return;
    resultRef.current.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };
  const scrollIfAnswered = (complete: boolean) => {
    if (complete) window.setTimeout(scrollToResult, 60);
  };

  const pickUse = (k: UseCase) => {
    setUseKey(k);
    scrollIfAnswered(budget != null && wantsMonitor != null);
  };
  const onBudgetInput = (raw: string) => {
    const n = Number(raw);
    const value = raw.trim() === "" || Number.isNaN(n) ? null : n;
    setBudgetValue(value);
    scrollIfAnswered(useKey != null && value != null && wantsMonitor != null);
  };
  const pickMonitor = (wants: boolean) => {
    setWantsMonitor(wants);
    scrollIfAnswered(useKey != null && budget != null);
  };

  const rows = profile
    ? (Object.keys(profile) as (keyof BuildSelection)[])
        .filter((k) => profile[k])
        .map((k) => ({ label: categories[k as Category].label, part: partById(profile[k]!) }))
    : [];

  const tierInfo = budget ? BUDGET_TIERS.find((t) => t.key === budget) : null;

  return (
    <div className="space-y-10">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/5 text-brand">
            <Gamepad2 className="size-5" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold">Dinos para qué la vas a usar</h2>
            <p className="text-xs text-muted">Con dos respuestas te proponemos una base sólida y sin sobrecostes.</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => {
            const Icon = USE_ICONS[u.key];
            const selected = useKey === u.key;
            return (
              <motion.button
                key={u.key}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={() => pickUse(u.key)}
                aria-pressed={selected}
                className={cn(
                  "flex flex-col rounded-2xl border p-4 text-left transition-all duration-300",
                  selected
                    ? "border-brand/60 bg-brand/5 shadow-glow-sm"
                    : "border-border bg-surface-2/40 hover:border-border-strong hover:bg-surface-2/70"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={cn("rounded-lg p-2", selected ? "bg-brand/15 text-brand" : "bg-surface-2/60 text-muted")}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                      selected ? "border-brand bg-brand text-white" : "border-border text-transparent"
                    )}
                  >
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                </div>
                <p className="mt-3 font-display text-[15px] font-semibold">{u.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted">{u.desc}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {useKey && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/5 text-brand">
              <Wallet className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">Presupuesto aproximado</h2>
              <p className="text-xs text-muted">Orientativo: el precio final lo cerramos juntos en la consultoría.</p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface-2/40 px-5 py-4 transition-all duration-300 focus-within:border-brand/60 focus-within:bg-brand/5 focus-within:shadow-glow-sm">
              <Wallet className="size-6 shrink-0 text-brand" aria-hidden />
              <input
                type="number"
                inputMode="numeric"
                min={BUDGET_MIN}
                step={BUDGET_STEP}
                value={budgetValue ?? ""}
                onChange={(e) => onBudgetInput(e.target.value)}
                placeholder="p. ej. 2000"
                aria-label="Presupuesto en euros"
                className="w-full min-w-0 bg-transparent font-display text-2xl font-semibold outline-none placeholder:font-normal placeholder:text-muted/50"
              />
              <span className="shrink-0 font-display text-2xl font-semibold text-muted" aria-hidden>
                €
              </span>
            </div>

            <input
              type="range"
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={BUDGET_STEP}
              value={budgetValue ?? BUDGET_MIN}
              onChange={(e) => onBudgetInput(e.target.value)}
              aria-label="Ajustar presupuesto"
              className="mt-4 w-full accent-brand"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-muted">
              <span>{formatNumber(BUDGET_MIN)} €</span>
              <span>{formatNumber(BUDGET_MAX)} €</span>
            </div>

            {budget && tierInfo && (
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/5 px-3.5 py-1.5 text-xs font-medium text-brand">
                <Check className="size-3.5" aria-hidden />
                {TIER_NAMES[budget]} · {tierInfo.label}
              </p>
            )}
          </div>

          <p className="mt-4 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-xs leading-relaxed text-brand">
            {USE_INTRO[useKey]}
          </p>
        </div>
      )}

      {useKey && budget && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/5 text-brand">
              <Monitor className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">¿Quieres incluir monitor?</h2>
              <p className="text-xs text-muted">Te proponemos uno acorde a la gama del equipo, sin sobrecostes.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {MONITOR_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const selected = wantsMonitor === opt.key;
              return (
                <motion.button
                  key={opt.label}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => pickMonitor(opt.key)}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300",
                    selected
                      ? "border-brand/60 bg-brand/5 shadow-glow-sm"
                      : "border-border bg-surface-2/40 hover:border-border-strong hover:bg-surface-2/70"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                      selected ? "bg-brand/15 text-brand" : "bg-surface-2/60 text-muted"
                    )}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-base font-semibold">{opt.label}</span>
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                          selected ? "border-brand bg-brand text-white" : "border-border text-transparent"
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} aria-hidden />
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">{opt.desc}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {answered && profile && calc && (
        <section ref={resultRef} className="scroll-mt-24 rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold">Base recomendada para ti</h3>
              <p className="mt-1 text-xs text-muted">
                {USE_CASES.find((u) => u.key === useKey)?.label} · Presupuesto ~{formatNumber(budgetValue ?? 0)} €
                {wantsMonitor ? " · Con monitor" : ""}. Es un punto de partida: todo es ajustable.
              </p>
            </div>
            <Badge variant={hasErrors ? "danger" : hasWarnings ? "warning" : "success"}>
              {hasErrors ? "Requiere revisar" : hasWarnings ? "Revisar avisos" : "Compatible"}
            </Badge>
          </div>

          <dl className="mt-5 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            {rows.map(({ label, part }) => (
              <div key={label} className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-1.5">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-medium">{part?.name ?? <span className="text-muted/50">—</span>}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 grid gap-2 sm:grid-cols-1">
            <div className="rounded-xl bg-surface-2/60 p-3">
              <p className="flex items-center justify-center gap-1 text-[11px] text-muted">
                <PlugZap className="size-3" aria-hidden /> Fuente recomendada
              </p>
              <p className="mt-0.5 text-center font-display font-semibold">{calc.psuRecommended} W</p>
            </div>
          </div>

          {issues.length > 0 && (
            <ul className="mt-4 space-y-2">
              {issues.map((iss, i) => (
                <li key={i} className="rounded-xl bg-surface-2/50 px-3 py-2 text-xs text-muted">
                  <span className={cn("font-semibold", iss.severity === "error" ? "text-red-700" : "text-amber-700")}>
                    {iss.title}:
                  </span>{" "}
                  {iss.detail}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <FpsPanel key={defaultRes} fps={calc.fps} defaultRes={defaultRes} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/contacto">
                Solicitar la cotización <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onUseHardware(profile)}>
              <Rocket className="size-4" aria-hidden /> Quiero ajustar el hardware yo mismo
            </Button>
          </div>
          <p className="mt-3 text-[11px] text-muted">
            Sin compromiso: te pasamos la propuesta completa con precios tras la consultoría.
          </p>
        </section>
      )}
    </div>
  );
}
