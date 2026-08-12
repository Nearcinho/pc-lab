"use client";

import * as React from "react";
import {
  BENCHMARK_DATA_DATE,
  BENCHMARK_SOURCES,
  GAMES,
  RESOLUTIONS,
  Resolution,
  FpsResult,
} from "@/lib/benchmarks";
import { cn, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FpsPanelProps {
  fps: Record<Resolution, FpsResult[]>;
  defaultRes?: Resolution;
}

export function FpsPanel({ fps, defaultRes = "1440p" }: FpsPanelProps) {
  const [res, setRes] = React.useState<Resolution>(defaultRes);
  const results = fps[res] ?? [];
  const gameMeta = new Map(GAMES.map((g) => [g.key, g]));

  return (
    <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-display text-sm font-semibold">FPS estimados en juegos</h4>
        <div className="flex gap-1.5" role="group" aria-label="Resolución">
          {RESOLUTIONS.map((r) => (
            <button
              key={r.key}
              onClick={() => setRes(r.key)}
              aria-pressed={res === r.key}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                res === r.key
                  ? "bg-brand/15 text-brand"
                  : "text-muted hover:bg-surface-2/60 hover:text-foreground"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        {results.map((r) => {
          const meta = gameMeta.get(r.game);
          return (
            <div
              key={r.game}
              className="flex items-center justify-between gap-3 rounded-xl bg-surface-2/50 px-4 py-2.5 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate text-foreground/90">{meta?.name ?? r.game}</p>
                {meta && <p className="truncate text-[11px] text-muted">{meta.settings}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <Badge variant={r.measured ? "success" : "outline"} className="px-2 py-0.5 text-[10px]">
                  {r.measured ? "Medido" : "Estimado"}
                </Badge>
                <span className="font-display font-semibold text-brand">{formatNumber(r.fps)} fps</span>
              </div>
            </div>
          );
        })}
        {results.length === 0 && (
          <p className="text-sm text-muted">Completa el wizard para ver estimaciones de rendimiento.</p>
        )}
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-[11px] leading-relaxed text-muted">
          Datos de benchmarks públicos ({BENCHMARK_DATA_DATE}). Estimaciones orientativas, ±10% según
          drivers/configuración.
        </p>
        <ul className="mt-2 space-y-1">
          {BENCHMARK_SOURCES.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener"
                className="text-[11px] text-brand underline-offset-2 transition-colors hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
