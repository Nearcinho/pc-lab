"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Cpu, CircuitBoard, Gauge, MemoryStick, HardDrive, Wind, PlugZap, Box, Disc,
  Headphones, Sparkles, Check, AlertTriangle, Info, Rocket, ChevronRight, RotateCcw, Monitor,
} from "lucide-react";
import {
  categories, Category, Part, partById,
  cpuParts, motherboardParts, gpuParts, ramParts, storageParts,
  coolingParts, psuParts, caseParts, osParts, peripheralParts, extraParts, allParts,
} from "@/lib/parts";
import { computeBuild, BuildSelection, BuildIssue } from "@/lib/build-engine";
import type { Resolution } from "@/lib/benchmarks";
import { FpsPanel } from "@/components/builder/fps-panel";
import { BuildRender } from "@/components/builder/build-render";
import { partImage } from "@/lib/part-images";
import { cn, formatNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

type StepKey = "cpu" | "motherboard" | "gpu" | "ram" | "storage" | "cooling" | "psu" | "case" | "os" | "monitor";

interface StepMeta {
  key: StepKey;
  label: string;
  short: string;
  desc: string;
  stages: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepMeta[] = [
  { key: "cpu", label: "Procesador", short: "CPU", desc: "Elige la plataforma y el modelo según tu presupuesto y uso.", stages: ["Marca", "Familia", "Modelo"], icon: Cpu },
  { key: "motherboard", label: "Placa base", short: "Placa", desc: "Solo mostramos placas compatibles con el socket de tu procesador.", stages: ["Socket", "Chipset", "Modelo"], icon: CircuitBoard },
  { key: "gpu", label: "Gráfica", short: "GPU", desc: "La pieza que más pesa en juegos, render e IA.", stages: ["Marca", "Familia", "Modelo"], icon: Gauge },
  { key: "ram", label: "Memoria RAM", short: "RAM", desc: "Capacidad y frecuencia adaptada a tu placa base.", stages: ["Capacidad", "Frecuencia"], icon: MemoryStick },
  { key: "storage", label: "Almacenamiento", short: "SSD", desc: "Tu biblioteca de juegos y proyectos, a toda velocidad.", stages: ["Capacidad", "Generación"], icon: HardDrive },
  { key: "cooling", label: "Refrigeración", short: "Refri.", desc: "Aire silencioso o líquido, siempre que lo aguante la caja.", stages: ["Tipo", "Variante"], icon: Wind },
  { key: "psu", label: "Fuente", short: "Fuente", desc: "Energía limpia y holgada para tu consumo.", stages: ["Certificación", "Potencia"], icon: PlugZap },
  { key: "case", label: "Caja", short: "Caja", desc: "Formato y compatibilidad total con todo lo elegido.", stages: ["Tamaño", "Modelo"], icon: Box },
  { key: "os", label: "Sistema", short: "SO", desc: "El software que lo gobierna todo.", stages: ["Sistema"], icon: Disc },
  { key: "monitor", label: "Monitor", short: "Monitor", desc: "Opcional: la pantalla define la resolución de los FPS estimados.", stages: ["Pulgadas", "Tasa de refresco", "Panel"], icon: Monitor },
];
const ORDER: StepKey[] = STEPS.map((s) => s.key);
const stepMeta = (k: StepKey) => STEPS.find((s) => s.key === k)!;

// Nº de elecciones que completan cada paso: en algunos, el modelo final
// es una elección extra más allá de los grupos de la etapa.
const PICK_COUNT: Record<StepKey, number> = {
  cpu: 3,
  motherboard: 3,
  gpu: 3,
  ram: 3,
  storage: 3,
  cooling: 3,
  psu: 2,
  case: 2,
  os: 1,
  monitor: 3,
};

interface ChoiceGroup {
  key: string;
  label: string;
  hint?: string;
  count: number;
}

interface StepView {
  groups?: ChoiceGroup[];
  parts?: Part[];
  notes: string[];
}

function groupBy(parts: Part[], pick: (p: Part) => string): ChoiceGroup[] {
  const map = new Map<string, Part[]>();
  for (const p of parts) {
    const k = pick(p);
    if (!k) continue;
    const list = map.get(k);
    if (list) {
      list.push(p);
    } else {
      map.set(k, [p]);
    }
  }
  return [...map.entries()]
    .map(([key, list]) => ({
      key,
      label: key,
      count: list.length,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, "es"));
}

function specLine(p: Part): string {
  switch (p.category) {
    case "cpu":
      return `${p.cores} núcleos · ${p.threads} hilos · ${p.boostGhz} GHz`;
    case "motherboard":
      return `${p.chipset ?? ""} · ${p.socket ?? ""}${p.wifi ? " · WiFi" : ""}`;
    case "gpu":
      return `${p.vramGb} GB VRAM`;
    case "ram":
      return `${p.speed ?? ""}`;
    case "storage":
      return `${p.speed ?? ""} · ${p.pcieGen ?? ""}`;
    case "cooling":
      return p.type === "air" ? `Aire · ${p.height} mm de alto` : `Líquida · radiador ${p.radiatorSupport} mm`;
    case "psu":
      return `${p.watts} W · 80+ ${p.rating}`;
    case "case":
      return `GPU máx ${p.maxGpuLength} mm · ${p.size ?? ""}`;
    case "os":
      return p.noOs ? "Instálalo tú mismo" : "Licencia + instalación";
    case "peripheral":
      return [p.monitorSize, p.refreshHz ? `${p.refreshHz} Hz` : "", p.panel ?? "", p.displayRes ?? ""].filter(Boolean).join(" · ");
    default:
      return "";
  }
}

function coolingTypeLabel(p: Part): string {
  return p.type === "air" ? "Aire" : "Líquida";
}

function coolingVariantLabel(p: Part): string {
  return p.type === "air"
    ? (p.height ?? 0) >= 160
      ? "Doble torre"
      : "Torre simple"
    : `${p.radiatorSupport} mm`;
}

// Etiqueta de capacidad de SSD: 0.5 TB se muestra como "500 GB".
function capacityLabel(p: Part): string {
  const tb = p.capacityTb ?? 0;
  return tb < 1 ? `${Math.round(tb * 1000)} GB` : `${tb} TB`;
}

// Reconstruye la cadena jerárquica de un paso a partir de la pieza elegida.
function chainFromSel(sel: BuildSelection): Partial<Record<StepKey, string[]>> {
  const res: Partial<Record<StepKey, string[]>> = {};
  const hasPart = (k: StepKey) => {
    const id = sel[k];
    if (!id) return;
    const p = partById(id);
    if (!p) return false;
    switch (k) {
      case "cpu":
        res.cpu = [p.brand, p.family!, p.id];
        break;
      case "motherboard":
        res.motherboard = [p.socket!, p.chipset!, p.id];
        break;
      case "gpu":
        res.gpu = [p.brand, p.family!, p.id];
        break;
      case "ram":
        res.ram = [`${p.memoryGb} GB`, `${p.speedMhz} MT/s`, p.id];
        break;
      case "storage":
        res.storage = [capacityLabel(p), p.pcieGen!, p.id];
        break;
      case "cooling":
        res.cooling = [coolingTypeLabel(p), coolingVariantLabel(p), p.id];
        break;
      case "psu":
        res.psu = [`80+ ${p.rating}`, p.id];
        break;
      case "case":
        res.case = [p.size!, p.id];
        break;
      case "os":
        res.os = [p.id];
        break;
      case "monitor":
        res.monitor = [p.monitorSize!, `${p.refreshHz} Hz`, p.panel ?? "", p.id];
        break;
      default:
        break;
    }
    return true;
  };
  ORDER.forEach((k) => hasPart(k));
  return res;
}

function boardRecommended(p: Part, sel: BuildSelection): boolean {
  const cpu = sel.cpu ? partById(sel.cpu) : undefined;
  if (!cpu || !p.tier) return false;
  const cpuTier: "mid" | "high" = (cpu.perf ?? 0) >= 92 ? "high" : "mid";
  return p.tier === cpuTier;
}

function stepView(key: StepKey, chain: string[], sel: BuildSelection): StepView {
  switch (key) {
    case "cpu": {
      if (chain.length === 0) {
        return { groups: groupBy(cpuParts, (p) => p.brand), notes: [] };
      }
      if (chain.length === 1) {
        const list = cpuParts.filter((p) => p.brand === chain[0]);
        return { groups: groupBy(list, (p) => p.family!), notes: [] };
      }
      return { parts: cpuParts.filter((p) => p.brand === chain[0] && p.family === chain[1]), notes: [] };
    }
    case "motherboard": {
      const cpu = sel.cpu ? partById(sel.cpu) : undefined;
      if (chain.length === 0) {
        const list = cpu ? motherboardParts.filter((p) => p.socket === cpu.socket) : motherboardParts;
        return {
          groups: groupBy(list, (p) => p.socket!),
          notes: cpu
            ? [`Solo se muestran placas con socket ${cpu.socket}, el de tu ${cpu.name}.`]
            : ["Elige primero el procesador: la lista de placas solo enseñará las compatibles con su socket."],
        };
      }
      if (chain.length === 1) {
        const list = motherboardParts.filter((p) => p.socket === chain[0]);
        return { groups: groupBy(list, (p) => p.chipset!), notes: [] };
      }
      return { parts: motherboardParts.filter((p) => p.socket === chain[0] && p.chipset === chain[1]), notes: [] };
    }
    case "gpu": {
      if (chain.length === 0) {
        return { groups: groupBy(gpuParts, (p) => p.brand), notes: [] };
      }
      if (chain.length === 1) {
        const list = gpuParts.filter((p) => p.brand === chain[0]);
        return { groups: groupBy(list, (p) => p.family!), notes: [] };
      }
      return { parts: gpuParts.filter((p) => p.brand === chain[0] && p.family === chain[1]), notes: [] };
    }
    case "ram": {
      const mb = sel.motherboard ? partById(sel.motherboard) : undefined;
      if (chain.length === 0) {
        return {
          groups: groupBy(ramParts, (p) => `${p.memoryGb} GB`),
          notes: mb ? [`Tu placa (${mb.name}) admite hasta ${mb.ramMaxMhz} MT/s: la frecuencia se adaptará a ella.`] : [],
        };
      }
      if (chain.length === 1) {
        const gb = Number(chain[0].split(" ")[0]);
        let list = ramParts.filter((p) => p.memoryGb === gb);
        const notes: string[] = [];
        if (mb) {
          const before = list.length;
          list = list.filter((p) => (p.speedMhz ?? 0) <= (mb.ramMaxMhz ?? 0));
          if (list.length < before) {
            notes.push(`Se ocultaron kits de más de ${mb.ramMaxMhz} MT/s: tu placa no los soporta de forma estable.`);
          }
        }
        return { groups: groupBy(list, (p) => `${p.speedMhz} MT/s`), notes };
      }
      return {
        parts: ramParts.filter((p) => `${p.memoryGb} GB` === chain[0] && `${p.speedMhz} MT/s` === chain[1]),
        notes: [],
      };
    }
    case "storage": {
      const mb = sel.motherboard ? partById(sel.motherboard) : undefined;
      if (chain.length === 0) {
        return { groups: groupBy(storageParts, capacityLabel), notes: [] };
      }
      if (chain.length === 1) {
        const list = storageParts.filter((p) => capacityLabel(p) === chain[0]);
        const notes: string[] = [];
        if (mb && list.some((p) => p.pcieGen === "Gen 5")) {
          const max = mb.pcieGen ?? "Gen 4";
          notes.push(
            max === "Gen 5"
              ? "Tu placa tiene ranura M.2 Gen 5: el SSD Gen 5 funcionará a plena velocidad."
              : `Tu placa (${mb.name}) tiene ranuras ${max}: un SSD Gen 5 funcionará a velocidad ${max}, igual de rápido para juegos.`
          );
        }
        return { groups: groupBy(list, (p) => p.pcieGen!), notes };
      }
      return {
        parts: storageParts.filter((p) => capacityLabel(p) === chain[0] && p.pcieGen === chain[1]),
        notes: [],
      };
    }
    case "cooling": {
      const casePart = sel.case ? partById(sel.case) : undefined;
      if (chain.length === 0) {
        return {
          groups: groupBy(coolingParts, coolingTypeLabel),
          notes: casePart
            ? [`La caja ${casePart.name} admite radiadores hasta ${casePart.radiatorMax} mm.`]
            : ["Si eliges primero la caja, el radiador se adaptará a lo que admita."],
        };
      }
      if (chain.length === 1) {
        const kind = chain[0];
        let list = coolingParts.filter((p) => coolingTypeLabel(p) === kind);
        const notes: string[] = [];
        if (casePart) {
          const before = list.length;
          list = list.filter((p) => p.type === "air" || (casePart.radiatorMax ?? 0) >= (p.radiatorSupport ?? 0));
          if (list.length < before) {
            notes.push(`La caja ${casePart.name} no admite radiadores de más de ${casePart.radiatorMax} mm: se ocultaron.`);
          }
        }
        return {
          groups: groupBy(list, coolingVariantLabel),
          notes,
        };
      }
      return {
        parts: coolingParts.filter(
          (p) => coolingTypeLabel(p) === chain[0] && coolingVariantLabel(p) === chain[1]
        ),
        notes: [],
      };
    }
    case "psu": {
      const calc = computeBuild(sel);
      const min = calc.psuRecommended;
      const eligible = min > 0 ? psuParts.filter((p) => (p.watts ?? 0) >= min) : [...psuParts];
      const notes =
        min > 0
          ? eligible.length < psuParts.length
            ? [`Tu build consume ~${formatNumber(calc.wattage)} W en carga. Recomendamos ${min} W o más: se ocultaron fuentes por debajo.`]
            : [`Tu build consume ~${formatNumber(calc.wattage)} W en carga; ${min} W es el mínimo recomendado.`]
          : [];
      if (chain.length === 0) {
        return { groups: groupBy(eligible, (p) => `80+ ${p.rating}`), notes };
      }
      return {
        parts: eligible.filter((p) => `80+ ${p.rating}` === chain[0]),
        notes,
      };
    }
    case "case": {
      const mb = sel.motherboard ? partById(sel.motherboard) : undefined;
      const gpu = sel.gpu ? partById(sel.gpu) : undefined;
      const cooling = sel.cooling ? partById(sel.cooling) : undefined;
      if (chain.length === 0) {
        return {
          groups: groupBy(caseParts, (p) => p.size!),
          notes: mb ? [`Tu placa (${mb.name}) es ${mb.form}: solo se mostrarán cajas compatibles con ese formato.`] : [],
        };
      }
      const size = chain[0];
      const reasons: string[] = [];
      const parts = caseParts.filter((p) => {
        if (p.size !== size) return false;
        if (mb && p.formSupport && !p.formSupport.includes(mb.form ?? "ATX")) {
          reasons.push(`«${p.name}» no admite tu placa ${mb.form}.`);
          return false;
        }
        if (gpu && (p.maxGpuLength ?? 0) < (gpu.lengthMm ?? 0)) {
          reasons.push(`«${p.name}» no admite la gráfica de ${gpu.lengthMm} mm (máx ${p.maxGpuLength} mm).`);
          return false;
        }
        if (cooling && cooling.type === "air" && (p.maxCoolerHeight ?? 0) < (cooling.height ?? 0)) {
          reasons.push(`«${p.name}» no admite el disipador de ${cooling.height} mm (máx ${p.maxCoolerHeight} mm).`);
          return false;
        }
        if (cooling && cooling.type !== "air" && (p.radiatorMax ?? 0) < (cooling.radiatorSupport ?? 0)) {
          reasons.push(`«${p.name}» no admite un radiador de ${cooling.radiatorSupport} mm (máx ${p.radiatorMax} mm).`);
          return false;
        }
        return true;
      });
      return { parts, notes: reasons };
    }
    case "os": {
      return { parts: osParts, notes: [] };
    }
    case "monitor": {
      const mons = peripheralParts.filter((p) => p.kind === "monitor");
      // Tras "Sin monitor" la cadena queda en ["none"]: mostramos el inicio.
      if (chain.length === 0 || chain[0] === "none") {
        return { groups: groupBy(mons, (p) => p.monitorSize!), notes: [] };
      }
      if (chain.length === 1) {
        const list = mons.filter((p) => p.monitorSize === chain[0]);
        return { groups: groupBy(list, (p) => `${p.refreshHz} Hz`), notes: [] };
      }
      if (chain.length === 2) {
        const list = mons.filter((p) => p.monitorSize === chain[0] && `${p.refreshHz} Hz` === chain[1]);
        return { groups: groupBy(list, (p) => p.panel ?? ""), notes: [] };
      }
      return {
        parts: mons.filter(
          (p) => p.monitorSize === chain[0] && `${p.refreshHz} Hz` === chain[1] && (p.panel ?? "") === chain[2]
        ),
        notes: [],
      };
    }
    default:
      return { groups: [], notes: [] };
  }
}

function issueContent(issue: BuildIssue) {
  return [
    issue.severity === "error" ? <AlertTriangle key="e" className="size-4 shrink-0 text-red-600" aria-hidden /> : null,
    issue.severity === "warning" ? <AlertTriangle key="w" className="size-4 shrink-0 text-amber-600" aria-hidden /> : null,
    issue.severity === "info" ? <Info key="i" className="size-4 shrink-0 text-brand" aria-hidden /> : null,
  ];
}

export function Builder({ initial }: { initial?: BuildSelection }) {
  const [sel, setSel] = React.useState<BuildSelection>(() => ({ ...(initial ?? {}) }));
  const [chain, setChain] = React.useState<Partial<Record<StepKey, string[]>>>(() => chainFromSel(initial ?? {}));
  const [active, setActive] = React.useState<StepKey>("cpu");
  const [notes, setNotes] = React.useState("");
  const calc = computeBuild(sel);
  const monitorRes: Resolution =
    (sel.monitor ? partById(sel.monitor)?.displayRes : undefined) ?? "1440p";
  const reduced = useReducedMotion();
  const perfRef = React.useRef<HTMLDivElement>(null);

  const scrollToPerf = () => {
    if (!perfRef.current) return;
    perfRef.current.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const doneCount = ORDER.filter((k) => Boolean(sel[k])).length;

  const handlePick = (key: StepKey, pick: string) => {
    const max = PICK_COUNT[key];
    let cur = chain[key] ?? [];
    // Elegir un monitor tras "Sin monitor" reinicia la cadena del paso.
    if (key === "monitor" && pick !== "none" && cur[0] === "none") cur = [];
    // Si el paso ya estaba completo, la nueva elección SUSTITUYE a la
    // anterior: nunca se acumulan dos componentes en la misma categoría.
    const nextChain = (cur.length >= max ? cur.slice(0, max - 1) : cur).concat(pick);
    const completes = nextChain.length === max || (key === "monitor" && pick === "none");
    const nextSel = { ...sel } as Record<string, string>;
    if (completes) nextSel[key] = pick;

    // Cascada: la pieza recién elegida manda; se descartan las selecciones
    // de otras categorías que hayan quedado incompatibles.
    const cleared: StepKey[] = [];
    const drop = (k: StepKey) => {
      if (nextSel[k]) {
        delete nextSel[k];
        cleared.push(k);
      }
    };
    const cpu = partById(nextSel.cpu);
    const mb = partById(nextSel.motherboard);
    const ram = partById(nextSel.ram);
    const gpu = partById(nextSel.gpu);
    const cooling = partById(nextSel.cooling);
    const box = partById(nextSel.case);
    if (cpu && mb && cpu.socket !== mb.socket) drop(key === "motherboard" ? "cpu" : "motherboard");
    if (mb?.ramMaxMhz && ram?.speedMhz && ram.speedMhz > mb.ramMaxMhz) drop(key === "ram" ? "motherboard" : "ram");
    if (gpu?.lengthMm && box?.maxGpuLength && gpu.lengthMm > box.maxGpuLength) drop(key === "case" ? "gpu" : "case");
    if (mb?.form && box?.formSupport && !box.formSupport.includes(mb.form)) drop(key === "case" ? "motherboard" : "case");
    if (
      cooling &&
      box &&
      ((cooling.radiatorSupport && box.radiatorMax && cooling.radiatorSupport > box.radiatorMax) ||
        (cooling.height && box.maxCoolerHeight && cooling.height > box.maxCoolerHeight))
    ) {
      drop(key === "cooling" ? "case" : "cooling");
    }

    setSel(nextSel as BuildSelection);
    setChain((prev) => {
      const next = { ...prev, [key]: nextChain };
      for (const k of cleared) next[k] = [];
      return next;
    });
    const idx = ORDER.indexOf(key);
    if (completes && idx < ORDER.length - 1) {
      setActive(ORDER[idx + 1]);
    }
  };

  const jump = (key: StepKey, depth: number) => {
    const cur = chain[key] ?? [];
    if (depth >= cur.length) {
      setActive(key);
      return;
    }
    setChain((prev) => ({ ...prev, [key]: cur.slice(0, depth) }));
    setSel((prev) => {
      const next = { ...prev };
      delete (next as unknown as Record<string, string>)[key];
      return next;
    });
    setActive(key);
  };

  const reset = () => {
    setSel({});
    setChain({});
    setNotes("");
    setActive("cpu");
  };

  const toggleAddon = (slot: "peripheral" | "extra", id: string) =>
    setSel((prev) => {
      if (prev[slot] === id) {
        const next = { ...prev };
        delete next[slot];
        return next;
      }
      return { ...prev, [slot]: id };
    });

  const meta = stepMeta(active);
  const cur = chain[active] ?? [];
  const view = stepView(active, cur, sel);
  const stageName = meta.stages[Math.min(cur.length, meta.stages.length - 1)];
  const stepIndex = ORDER.indexOf(active);
  const isDone = Boolean(sel[active]);
  const psuRecommendedId =
    active === "psu" && view.parts && view.parts.length > 0
      ? [...view.parts].sort((a, b) => (a.watts ?? 0) - (b.watts ?? 0))[0].id
      : undefined;

  return (
    <div id="pc-builder" className="container-x">
      <Reveal>
        <div className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-surface/50 p-3 backdrop-blur lg:flex-nowrap lg:overflow-x-auto no-scrollbar">
          <span className="mr-1 hidden shrink-0 text-xs font-medium uppercase tracking-wider text-muted md:inline">
            Paso {stepIndex + 1} de {ORDER.length}
          </span>
          {STEPS.map((s, i) => {
            const done = Boolean(sel[s.key]);
            const isActive = active === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all",
                  isActive
                    ? "bg-brand/15 text-brand"
                    : done
                    ? "bg-emerald-600/12 text-emerald-700 hover:bg-emerald-600/20"
                    : "text-muted hover:bg-surface-2/60 hover:text-foreground"
                )}
              >
                <s.icon className="size-4" aria-hidden />
                <span className="hidden sm:inline">{s.short}</span>
                <span className="text-[10px] text-muted/60">{i + 1}</span>
                {done && <Check className="size-3" aria-hidden />}
              </button>
            );
          })}
          <Button variant="ghost" size="sm" className="ml-auto shrink-0" onClick={reset}>
            <RotateCcw className="size-3.5" aria-hidden /> Reiniciar
          </Button>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <motion.div
          key={active}
          initial={reduced ? false : { opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-3xl border border-border bg-surface/50 p-4 backdrop-blur sm:p-6"
        >
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/5 text-brand">
                <meta.icon className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Paso {stepIndex + 1} de {ORDER.length} · {meta.label}
                </p>
                <h2 className="font-display text-lg font-semibold">{meta.label}</h2>
                <p className="text-xs text-muted">{meta.desc}</p>
              </div>
            </div>
            {isDone && (
              <Button variant="ghost" size="sm" onClick={() => jump(active, Math.max(0, cur.length - 1))}>
                Quitar selección
              </Button>
            )}
          </div>

          {cur.length > 0 && (
            <nav aria-label={`Selección de ${meta.label}`} className="mb-4 flex flex-wrap items-center gap-1.5 text-xs">
              {cur.map((pick, i) => {
                const isLeaf = i === cur.length - 1;
                const label = isLeaf ? (pick === "none" ? "Sin monitor" : (partById(pick)?.name ?? pick)) : pick;
                return (
                  <React.Fragment key={i}>
                    {i > 0 && <ChevronRight className="size-3 text-muted/50" aria-hidden />}
                    {isLeaf ? (
                      <span className="rounded-md bg-brand/10 px-2 py-1 font-medium text-brand">{label}</span>
                    ) : (
                      <button
                        onClick={() => jump(active, i + 1)}
                        className="rounded-md border border-border bg-surface-2/50 px-2 py-1 text-muted transition-colors hover:border-border-strong hover:text-foreground"
                      >
                        {label}
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
            {stageName}
          </p>

          {active === "monitor" && cur.length === 0 && (
            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <motion.button
                key="monitor-none"
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={() => handlePick(active, "none")}
                aria-pressed={sel.monitor === "none"}
                className={cn(
                  "group flex flex-col rounded-2xl border p-4 text-left transition-all duration-300",
                  sel.monitor === "none"
                    ? "border-brand/60 bg-brand/5 shadow-glow-sm"
                    : "border-border bg-surface-2/40 hover:border-border-strong hover:bg-surface-2/70"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-md border border-border bg-surface-2/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
                    Opcional
                  </span>
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                      sel.monitor === "none" ? "border-brand bg-brand text-white" : "border-border text-transparent"
                    )}
                  >
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                </div>
                <p className="mt-2.5 font-display text-[15px] font-semibold leading-snug">Sin monitor</p>
                <p className="mt-1 text-[11px] text-muted">Solo el equipo: los FPS se estiman a 1440p.</p>
                <span className="mt-2 text-[10px] uppercase tracking-wide text-muted/60">
                  Seleccionar
                </span>
              </motion.button>
            </div>
          )}

          {view.groups && view.groups.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {view.groups.map((g) => (
                    <motion.button
                      key={g.key}
                      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => handlePick(active, g.key)}
                      className={cn(
                        "group flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-300",
                        "border-border bg-surface-2/40 hover:border-border-strong hover:bg-surface-2/70"
                      )}
                    >
                      <div>
                        <p className="font-display text-[15px] font-semibold">{g.label}</p>
                        <p className="mt-0.5 text-[11px] text-muted">
                          {g.count} {g.count === 1 ? "opción" : "opciones"}
                        </p>
                        {g.hint && <p className="mt-0.5 text-[11px] text-brand">{g.hint}</p>}
                      </div>
                      <ChevronRight
                        className="size-4 shrink-0 text-muted/40 transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                        aria-hidden
                      />
                    </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}

          {view.parts && (
            <div className="grid gap-3 sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {view.parts.map((p) => {
                  const selected = sel[active as keyof BuildSelection] === p.id;
                  const badgeText =
                    p.id === psuRecommendedId
                      ? "Recomendada"
                      : boardRecommended(p, sel)
                      ? "Recomendada"
                      : undefined;
                  return (
                    <motion.button
                      key={p.id}
                      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => handlePick(active, p.id)}
                      aria-pressed={selected}
                      className={cn(
                        "group flex flex-col rounded-2xl border p-4 text-left transition-all duration-300",
                        selected
                          ? "border-brand/60 bg-brand/5 shadow-glow-sm"
                          : "border-border bg-surface-2/40 hover:border-border-strong hover:bg-surface-2/70"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-md border border-border bg-surface-2/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
                          {p.brand}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {badgeText && <Badge variant="brand">{badgeText}</Badge>}
                          {p.recommended && <Badge variant="brand">Recomendado</Badge>}
                          {p.best && <Badge variant="success">Tope gama</Badge>}
                          <span
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                              selected ? "border-brand bg-brand text-white" : "border-border text-transparent"
                            )}
                          >
                            <Check className="size-3" strokeWidth={3} aria-hidden />
                          </span>
                        </div>
                      </div>
                      <p className="mt-2.5 font-display text-[15px] font-semibold leading-snug">{p.name}</p>
                      <p className="mt-1 text-[11px] text-muted">{specLine(p)}</p>
                      <span className="mt-2 text-[10px] uppercase tracking-wide text-muted/60">
                        Seleccionar
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
              {view.parts.length === 0 && (
                <p className="sm:col-span-2 rounded-xl bg-surface-2/50 px-4 py-3 text-sm text-muted">
                  No hay opciones compatibles con esta combinación. Vuelve atrás con el enlace superior.
                </p>
              )}
            </div>
          )}

          {view.notes.length > 0 && (
            <div className="mt-4 space-y-2">
              {view.notes.map((n, i) => (
                <p
                  key={i}
                  className="flex gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2.5 text-xs leading-relaxed text-amber-700"
                >
                  <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  {n}
                </p>
              ))}
            </div>
          )}

          {active === "os" && (
            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-2/50 text-muted">
                  <Headphones className="size-4" aria-hidden />
                  <Sparkles className="size-3 -ml-1" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold">Opcionales</h3>
                  <p className="text-[11px] text-muted">No afectan al montaje: se suman a la configuración.</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[...peripheralParts.filter((p) => p.kind !== "monitor"), ...extraParts].map((p) => {
                  const slot: "peripheral" | "extra" = p.category === "peripheral" ? "peripheral" : "extra";
                  const selected = sel[slot] === p.id;
                  return (
                    <motion.button
                      key={p.id}
                      initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => toggleAddon(slot, p.id)}
                      aria-pressed={selected}
                      className={cn(
                        "flex flex-col rounded-2xl border p-4 text-left transition-all duration-300",
                        selected
                          ? "border-brand/60 bg-brand/5 shadow-glow-sm"
                          : "border-border bg-surface-2/40 hover:border-border-strong hover:bg-surface-2/70"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-md border border-border bg-surface-2/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
                          {p.category === "peripheral" ? "Periférico" : "Extra"}
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
                      <p className="mt-2.5 font-display text-[15px] font-semibold leading-snug">{p.name}</p>
                      <p className="mt-1 text-[11px] text-muted">{p.brand}</p>
                      <span className="mt-2 text-[10px] uppercase tracking-wide text-muted/60">
                        {selected ? "Añadido" : "Añadir"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-2/50 text-muted">
                    <Sparkles className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold">Otros / petición especial</h3>
                    <p className="text-[11px] text-muted">
                      Solo informativo: lo tenemos en cuenta al preparar tu cotización, no cambia el rendimiento estimado.
                    </p>
                  </div>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="PC full white, sin RGB, presupuesto de extras…"
                  aria-label="Otros / petición especial"
                  className="w-full resize-y rounded-xl border border-border bg-surface-2/40 px-3 py-2.5 text-sm placeholder:text-muted/50 focus:border-brand/60 focus:outline-none"
                />
              </div>
            </div>
          )}
        </motion.div>

        <aside className="space-y-5">
          <div className="sticky top-24 rounded-3xl border border-border bg-surface/60 p-5 backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-semibold">Resumen del build</h3>
              <Badge variant={calc.issues.some((i) => i.severity === "error") ? "danger" : calc.issues.some((i) => i.severity === "warning") ? "warning" : "success"}>
                {calc.issues.some((i) => i.severity === "error") ? "Requiere cambios" : calc.issues.some((i) => i.severity === "warning") ? "Revisar avisos" : "Compatible"}
              </Badge>
            </div>

            <dl className="mt-4 max-h-64 space-y-1.5 overflow-y-auto pr-1 text-sm no-scrollbar">
              {[...ORDER, "peripheral", "extra"].map((c) => {
                const part = sel[c as keyof BuildSelection] ? allParts.find((p) => p.id === sel[c as keyof BuildSelection]) : undefined;
                const label =
                  c === "monitor" && sel.monitor === "none"
                    ? "Sin monitor"
                    : (part?.name ?? <span className="text-muted/50">—</span>);
                return (
                  <div key={c} className="flex items-center justify-between gap-2">
                    <dt className="text-muted">{categories[c as Category].label}</dt>
                    <dd className="flex min-w-0 items-center justify-end gap-2 text-right font-medium">
                      {part && (
                        <Image
                          src={partImage(part)}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 shrink-0 rounded-lg border border-border bg-surface-2/60 object-cover"
                        />
                      )}
                      <span className="truncate">{label}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>

            {notes.trim() && (
              <div className="mt-3 rounded-xl bg-surface-2/50 px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Notas</p>
                <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-foreground/90">{notes}</p>
              </div>
            )}

            <div className="mt-4 grid gap-2 text-center">
              <div className="rounded-xl bg-surface-2/60 p-2.5">
                <p className="flex items-center justify-center gap-1 text-[11px] text-muted">
                  <PlugZap className="size-3" aria-hidden /> Fuente recomendada
                </p>
                <p className="font-display font-semibold">{calc.psuRecommended} W</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-surface-2/50 px-4 py-3">
              <span className="text-xs leading-relaxed text-muted">
                El precio final se consensúa en la consultoría: sin sorpresas.
              </span>
            </div>

            <Button className="mt-4 w-full" size="lg" onClick={scrollToPerf}>
              <Rocket className="size-4" aria-hidden /> Ver rendimiento estimado
            </Button>
            <Button
              variant="secondary"
              className="mt-2 w-full"
              disabled={!calc.complete || calc.issues.some((i) => i.severity === "error")}
            >
              Solicitar montaje
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted">
              {doneCount} de {ORDER.length} pasos completados.
            </p>
          </div>
        </aside>
      </div>

      {calc.issues.length > 0 && (
        <div className="mt-6 rounded-3xl border border-border bg-surface/60 p-5">
          <h4 className="flex items-center gap-2 font-display text-sm font-semibold">
            <Info className="size-4 text-brand" aria-hidden /> Análisis de compatibilidad
          </h4>
          <ul className="mt-3 space-y-2.5">
            {calc.issues.map((iss, i) => (
              <li key={i} className="flex gap-2.5 rounded-xl bg-surface-2/50 p-3 text-sm">
                {issueContent(iss)}
                <div>
                  <p className={cn(
                    "font-medium",
                    iss.severity === "error" ? "text-red-700" : iss.severity === "warning" ? "text-amber-700" : "text-brand"
                  )}>
                    {iss.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{iss.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {calc.complete && (
        <motion.section
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur"
        >
          <h3 className="font-display text-xl font-semibold">Tu PC, montado</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Visualización orientativa generada a partir de tu configuración.
          </p>
          <BuildRender selection={sel} className="mt-5 h-auto w-full rounded-2xl border border-border" />
        </motion.section>
      )}

      <PerformancePanel ref={perfRef} calc={calc} monitorRes={monitorRes} />
    </div>
  );
}

function PerformancePanel({ calc, monitorRes, ref }: {
  calc: Awaited<ReturnType<typeof computeBuild>>;
  monitorRes: Resolution;
  ref: React.Ref<HTMLDivElement>;
}) {
  return (
    <section ref={ref} id="rendimiento" className="mt-14 scroll-mt-24">
      <Reveal>
        <h3 className="font-display text-xl font-semibold">Rendimiento y FPS estimados</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Estimaciones orientativas basadas en datos de referencia de hardware actual. El resultado final puede variar según drivers, juegos y perfiles.
        </p>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface/50 p-6 backdrop-blur">
          <h4 className="font-display text-sm font-semibold">Índice de rendimiento (0–100)</h4>
          <div className="mt-5 space-y-4">
            {(["gaming", "streaming", "render", "ai", "productivity"] as const).map((k) => (
              <PerformanceBar key={k} label={labelForKey(k)} value={calc.performance[k]} />
            ))}
          </div>
        </div>

        <FpsPanel fps={calc.fps} defaultRes={monitorRes} />
      </div>
    </section>
  );
}

function labelForKey(k: keyof { gaming: number; streaming: number; render: number; ai: number; productivity: number }) {
  const map = {
    gaming: "Gaming",
    streaming: "Streaming",
    render: "Render 3D",
    ai: "IA / Local",
    productivity: "Productividad",
  };
  return map[k];
}

function PerformanceBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-display text-sm font-semibold text-brand">{value}/100</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-2/70">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}