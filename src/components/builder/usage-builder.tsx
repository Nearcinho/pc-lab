"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Gamepad2, MonitorPlay, Boxes, BrainCircuit, Briefcase, Wallet, Check, PlugZap, Rocket, ArrowRight,
} from "lucide-react";
import { USE_CASES, BUDGET_TIERS, UseCase, BudgetTier, PROFILES } from "@/lib/profiles";
import { categories, Category, partById } from "@/lib/parts";
import { computeBuild, BuildSelection } from "@/lib/build-engine";
import { cn } from "@/lib/utils";
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

export function UsageBuilder({ onUseHardware }: { onUseHardware: (sel: BuildSelection) => void }) {
  const [useKey, setUseKey] = React.useState<UseCase | null>(null);
  const [budget, setBudget] = React.useState<BudgetTier | null>(null);
  const reduced = useReducedMotion();

  const profile: BuildSelection | null =
    useKey && budget ? PROFILES[useKey][budget] : null;
  const calc = profile ? computeBuild(profile) : null;
  const issues = calc?.issues ?? [];
  const hasErrors = issues.some((i) => i.severity === "error");
  const hasWarnings = issues.some((i) => i.severity === "warning");

  const resultRef = React.useRef<HTMLDivElement>(null);
  const scrollToResult = () => {
    if (!resultRef.current) return;
    resultRef.current.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const pickUse = (k: UseCase) => {
    setUseKey(k);
    if (budget) {
      window.setTimeout(scrollToResult, 60);
    }
  };
  const pickBudget = (b: BudgetTier) => {
    setBudget(b);
    window.setTimeout(scrollToResult, 60);
  };

  const rows = profile
    ? (Object.keys(profile) as (keyof BuildSelection)[])
        .filter((k) => profile[k])
        .map((k) => ({ label: categories[k as Category].label, part: partById(profile[k]!) }))
    : [];

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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {BUDGET_TIERS.map((t) => {
              const selected = budget === t.key;
              return (
                <motion.button
                  key={t.key}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => pickBudget(t.key)}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300",
                    selected
                      ? "border-brand/60 bg-brand/5 shadow-glow-sm"
                      : "border-border bg-surface-2/40 hover:border-border-strong hover:bg-surface-2/70"
                  )}
                >
                  <span className="font-display text-sm font-semibold">{t.label}</span>
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                      selected ? "border-brand bg-brand text-white" : "border-border text-transparent"
                    )}
                  >
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                </motion.button>
              );
            })}
          </div>

          {useKey && (
            <p className="mt-4 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3 text-xs leading-relaxed text-brand">
              {USE_INTRO[useKey]}
            </p>
          )}
        </div>
      )}

      {profile && calc && (
        <section ref={resultRef} className="scroll-mt-24 rounded-3xl border border-border bg-surface/50 p-5 backdrop-blur sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-semibold">Base recomendada para ti</h3>
              <p className="mt-1 text-xs text-muted">
                {USE_CASES.find((u) => u.key === useKey)?.label} · {BUDGET_TIERS.find((t) => t.key === budget)?.label}. Es un punto de partida: todo es ajustable.
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