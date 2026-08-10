"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Builder } from "@/components/builder/builder";
import { UsageBuilder } from "@/components/builder/usage-builder";
import type { BuildSelection } from "@/lib/build-engine";

type Mode = "hardware" | "usage";

const MODES: { key: Mode; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "hardware", label: "Elegir componentes yo mismo", desc: "Configurador pieza a pieza con compatibilidad automática.", icon: Cpu },
  { key: "usage", label: "Según mi uso y presupuesto", desc: "Te proponemos una base de hardware en dos respuestas.", icon: Wand2 },
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
      <div className="mx-auto mb-8 grid max-w-3xl gap-3 sm:grid-cols-2">
        {MODES.map((m) => {
          const Icon = m.icon;
          const selected = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              aria-pressed={selected}
              className={cn(
                "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300",
                selected
                  ? "border-brand/60 bg-brand/5 shadow-glow-sm"
                  : "border-border bg-surface/50 hover:border-border-strong hover:bg-surface-2/40"
              )}
            >
              <span className={cn("rounded-lg p-2", selected ? "bg-brand/15 text-brand" : "bg-surface-2/60 text-muted")}>
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-display text-sm font-semibold">{m.label}</span>
                <span className="mt-0.5 block text-[11px] leading-relaxed text-muted">{m.desc}</span>
              </span>
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