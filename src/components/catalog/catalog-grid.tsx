"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cpu, Gauge, MemoryStick, HardDrive, PlugZap, ArrowRight } from "lucide-react";
import { PcBuild } from "@/lib/pcs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, formatNumber } from "@/lib/utils";

const specIcons = { cpu: Cpu, gpu: Gauge, ram: MemoryStick, storage: HardDrive, power: PlugZap };

export function CatalogGrid({ builds, title, eyebrow, description }: {
  builds: PcBuild[];
  title: string;
  eyebrow: string;
  description: string;
}) {
  const [filter, setFilter] = React.useState<"all" | string>("all");

  const categories = Array.from(new Set(builds.map((b) => b.category)));

  const list = filter === "all" ? builds : builds.filter((b) => b.category === filter);

  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        {categories.length > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>Todos</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>labCap(c)</FilterChip>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((b, i) => (
            <PcCard key={b.slug} build={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active ? "border-brand/50 bg-brand/10 text-brand" : "border-border text-muted hover:border-border-strong hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function PcCard({ build, index }: { build: PcBuild; index: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article className="card-hover group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/60">
        <div className="relative h-56 overflow-hidden border-b border-border bg-surface-2">
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,var(--brand-alpha),transparent_70%)] opacity-40" aria-hidden />
          <Image
            src={build.image}
            alt={`PC ${build.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          />
          {build.badge && (
            <Badge variant="premium" className="absolute left-4 top-4 glass-strong">{build.badge}</Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight">{build.name}</h3>
              <p className="mt-1 text-sm text-muted">{build.tagline}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-1.5 text-xs text-muted">
            {Object.entries(build.specs).map(([k, v]) => {
              const Icon = specIcons[k as keyof typeof specIcons];
              return (
                <li key={k} className="flex items-center gap-2">
                  {Icon && <Icon className="size-3.5 shrink-0 text-brand" aria-hidden />}
                  <span className="truncate">{v}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
            <PerfChip label="Gaming" value={build.perf.gaming} />
            <PerfChip label="Streaming" value={build.perf.streaming} />
            <PerfChip label="Render" value={build.perf.render} />
            <PerfChip label="IA" value={build.perf.ai} />
          </div>

          <div className="mt-auto pt-6">
            <Button className="w-full" asChild size="sm">
              <Link href={`/equipos/${build.category}`}>Diseñar algo similar <ArrowRight className="size-4" aria-hidden /></Link>
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function PerfChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-base font-bold text-brand">{formatNumber(value)}</span>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}