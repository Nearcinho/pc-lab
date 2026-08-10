"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Cpu, MemoryStick, Monitor, TrendingUp, Lightbulb, MonitorPlay } from "lucide-react";
import { workloads, computeWorkload, Workload } from "@/lib/workload-engine";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CalcInputs {
  workload: Workload;
  gpuPerf: number;
  gpuAi: number;
  gpuRender: number;
  cpuPerf: number;
  cpuGaming: number;
  ramGb: number;
}

const wlIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "gamepad-2": Monitor,
  videotape: MonitorPlay,
  box: Monitor,
  "brain-circuit": Monitor,
  clapperboard: MonitorPlay,
  braces: Monitor,
};

function WlIcon({ name, className }: { name: string; className?: string }) {
  const Icon = wlIcons[name] ?? Monitor;
  return <Icon className={className} aria-hidden />;
}

const RAM_OPTIONS = [16, 32, 64, 128];

export function PerformanceCalculator() {
  const [inputs, setInputs] = React.useState<CalcInputs>({
    workload: "gaming",
    gpuPerf: 75,
    gpuAi: 85,
    gpuRender: 80,
    cpuPerf: 70,
    cpuGaming: 75,
    ramGb: 32,
  });

  const result = computeWorkload(
    inputs.workload,
    inputs.gpuPerf,
    inputs.gpuAi,
    inputs.gpuRender,
    inputs.cpuPerf,
    inputs.cpuGaming,
    inputs.ramGb
  );

  const setGpu = (v: number) =>
    setInputs((p) => ({
      ...p,
      gpuPerf: v,
      gpuAi: Math.round(v * (p.gpuAi / Math.max(p.gpuPerf, 1))),
      gpuRender: Math.round(v * (p.gpuRender / Math.max(p.gpuPerf, 1))),
    }));

  const setCpu = (v: number) =>
    setInputs((p) => ({
      ...p,
      cpuPerf: v,
      cpuGaming: Math.max(p.cpuGaming, Math.min(100, Math.round(v * 0.75 + p.cpuGaming * 0.25))),
    }));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tipo de carga">
          {workloads.map((w) => (
            <button
              key={w.key}
              role="tab"
              aria-selected={inputs.workload === w.key}
              onClick={() => setInputs((p) => ({ ...p, workload: w.key }))}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                inputs.workload === w.key
                  ? "border-brand/50 bg-brand/10 text-brand"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              <WlIcon name={w.icon} className="size-4" />
              {w.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted">
          {workloads.find((w) => w.key === inputs.workload)?.description}
        </p>

        <div className="mt-8 space-y-7">
          <Slider
            label="Tarjeta gráfica"
            value={inputs.gpuPerf}
            icon={<Monitor className="size-4" aria-hidden />}
            onChange={setGpu}
            presets={[
              { label: "Baja", value: 30 },
              { label: "Media", value: 55 },
              { label: "Alta", value: 80 },
              { label: "Tope gama", value: 100 },
            ]}
          />
          <Slider
            label="Procesador"
            value={inputs.cpuPerf}
            icon={<Cpu className="size-4" aria-hidden />}
            onChange={setCpu}
            presets={[
              { label: "Básico", value: 35 },
              { label: "Medio", value: 60 },
              { label: "Alto", value: 85 },
              { label: "Pro", value: 100 },
            ]}
          />
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium">
                <span className="text-brand"><MemoryStick className="size-4" aria-hidden /></span> Memoria RAM
              </label>
              <span className="font-display text-sm font-semibold text-brand">{inputs.ramGb} GB</span>
            </div>
            <div className="flex gap-2">
              {RAM_OPTIONS.map((gb) => (
                <button
                  key={gb}
                  onClick={() => setInputs((p) => ({ ...p, ramGb: gb }))}
                  aria-pressed={inputs.ramGb === gb}
                  className={cn(
                    "flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all",
                    inputs.ramGb === gb
                      ? "border-brand/60 bg-brand/10 text-brand"
                      : "border-border bg-surface-2/40 text-muted hover:border-border-strong hover:text-foreground"
                  )}
                >
                  {gb}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">La RAM afecta sobre todo a multitarea, render e IA.</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">Predicción</h3>
          <Badge variant={result.score >= 75 ? "brand" : result.score >= 50 ? "outline" : "warning"}>
            {result.label}
          </Badge>
        </div>

        <div className="mt-6">
          <div className="flex items-end gap-2">
            <span className="font-display text-6xl font-bold text-gradient">{result.score}</span>
            <span className="pb-2 text-sm text-muted">/ 100</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-surface-2/70">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <p className="flex items-center gap-2 text-muted">
            <TrendingUp className="size-4 text-brand" aria-hidden />
            Cuello de botella principal: <span className="font-medium text-foreground">{result.bottleneck}</span>
          </p>
          {result.gpuTip && <Tip icon={Monitor} text={result.gpuTip} />}
          {result.cpuTip && <Tip icon={Cpu} text={result.cpuTip} />}
          {result.ramTip && <Tip icon={MemoryStick} text={result.ramTip} />}
        </div>

        <div className="mt-6 flex gap-2 rounded-xl bg-surface-2/60 p-4">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden />
          <p className="text-sm leading-relaxed text-muted">{result.recommendation}</p>
        </div>
      </div>
    </div>
  );
}

function Tip({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <p className="flex items-start gap-2 text-muted">
      <Icon className="mt-0.5 size-4 shrink-0 text-brand-2" aria-hidden />
      {text}
    </p>
  );
}

function Slider({ label, value, icon, onChange, presets }: {
  label: string;
  value: number;
  icon: React.ReactNode;
  onChange: (v: number) => void;
  presets: { label: string; value: number }[];
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium">
          <span className="text-brand">{icon}</span> {label}
        </label>
        <span className="font-display text-sm font-semibold text-brand">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`Nivel de ${label.toLowerCase()}`}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-surface-2/70 accent-brand [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-glow-sm"
      />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => onChange(p.value)}
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[11px] transition-colors",
              value === p.value
                ? "border-brand/60 bg-brand/10 text-brand"
                : "border-border text-muted hover:border-border-strong hover:text-foreground"
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}