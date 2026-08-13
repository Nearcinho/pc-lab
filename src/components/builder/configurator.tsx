"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, Wand2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Builder } from "@/components/builder/builder";
import { UsageBuilder } from "@/components/builder/usage-builder";
import { Badge } from "@/components/ui/badge";
import type { BuildSelection } from "@/lib/build-engine";

type Mode = "hardware" | "usage";

const MODES: {
  key: Mode;
  label: string;
  desc: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "hardware", label: "Elegir componentes yo mismo", desc: "Configurador pieza a pieza con compatibilidad automática.", icon: Cpu },
  { key: "usage", label: "Según mi uso y presupuesto", desc: "Te proponemos una base de hardware en dos respuestas.", hint: "Recomendado si no sabes por dónde empezar", icon: Wand2 },
];

export function Configurator() {
  const [mode, setMode] = React.useState<Mode>("hardware");
  const [initial, setInitial] = React.useState<BuildSelection | undefined>(undefined);

  const applyUsageSelection = (sel: BuildSelection) => {
    setInitial(sel);
    setMode("hardware");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mx-auto mb-10 grid max-w-4xl gap-4 sm:grid-cols-2">
        {MODES.map((m) => {
          const Icon = m.icon;
          const selected = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              aria-pressed={selected}
              className={cn(
                "group relative flex flex-col rounded-3xl border p-6 text-left transition-all duration-300 motion-safe:hover:-translate-y-1 sm:p-7",
                selected
                  ? "border-brand/60 bg-brand/5 shadow-glow"
                  : "border-border bg-surface/50 hover:border-border-strong hover:bg-surface-2/40 hover:shadow-glow-sm"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl transition-colors duration-300 sm:size-14",
                    selected ? "bg-brand/15 text-brand" : "bg-surface-2/60 text-muted group-hover:text-foreground"
                  )}
                >
                  <Icon className="size-7 sm:size-8" aria-hidden />
                </span>
                {selected && (
                  <Badge variant="brand" className="px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
                    Activo
                  </Badge>
                )}
              </div>
              <span className="mt-5 block font-display text-lg font-semibold sm:text-xl">{m.label}</span>
              <span className="mt-1.5 block text-sm leading-relaxed text-muted">{m.desc}</span>
              {m.hint && (
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/25 bg-brand/5 px-3 py-1 text-[11px] font-medium text-brand">
                  <Sparkles className="size-3" aria-hidden />
                  {m.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === "hardware" ? <Builder initial={initial} /> : <UsageBuilder onUseHardware={applyUsageSelection} />}
      </motion.div>
    </div>
  );
}
