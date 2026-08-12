import { Part, partById, Category } from "@/lib/parts";
import { estimateFps, FpsResult, Resolution, RESOLUTIONS } from "@/lib/benchmarks";

export interface BuildSelection {
  cpu?: string;
  motherboard?: string;
  gpu?: string;
  ram?: string;
  storage?: string;
  cooling?: string;
  psu?: string;
  case?: string;
  os?: string;
  peripheral?: string;
  monitor?: string;
  extra?: string;
}

export type Severity = "error" | "warning" | "info";

export interface BuildIssue {
  severity: Severity;
  title: string;
  detail: string;
}

export interface PerformanceMetric {
  gaming: number;
  streaming: number;
  render: number;
  ai: number;
  productivity: number;
  overall: number;
}

export interface BuildComputation {
  total: number;
  wattage: number;
  psuRecommended: number;
  performance: PerformanceMetric;
  fps: Record<Resolution, FpsResult[]>;
  issues: BuildIssue[];
  missing: Category[];
  complete: boolean;
}

function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function recommendedPsu(wattage: number, gpu?: Part): number {
  const base = Math.ceil(wattage / 0.75);
  if (gpu?.psuMin) return Math.max(base, gpu.psuMin);
  return base;
}

export function computeBuild(sel: BuildSelection): BuildComputation {
  const parts: Part[] = [];
  let total = 0;
  let wattage = 0;
  const issues: BuildIssue[] = [];
  const missing: Category[] = [];

  const required: Category[] = ["cpu", "gpu", "ram", "storage", "cooling", "psu", "case", "os"];
  for (const key of required) {
    const id = sel[key as keyof BuildSelection];
    if (!id) {
      missing.push(key);
    } else {
      const part = partById(id);
      if (part) {
        parts.push(part);
        total += part.price;
        wattage += part.power;
      }
    }
  }

  // Optional add-ons
  for (const key of ["peripheral", "monitor", "extra"]) {
    const id = sel[key as keyof BuildSelection];
    if (id) {
      const part = partById(id);
      if (part) {
        parts.push(part);
        total += part.price;
        wattage += part.power;
      }
    }
  }

  const cpu = parts.find((p) => p.category === "cpu");
  const mb = parts.find((p) => p.category === "motherboard");
  const gpu = parts.find((p) => p.category === "gpu");
  const psu = parts.find((p) => p.category === "psu");
  const cooling = parts.find((p) => p.category === "cooling");
  const casePart = parts.find((p) => p.category === "case");
  const ram = parts.find((p) => p.category === "ram");

  if (cpu && mb && cpu.socket && mb.socket && cpu.socket !== mb.socket) {
    issues.push({
      severity: "error",
      title: "Socket incompatible",
      detail: `El ${cpu.name} usa socket ${cpu.socket}, pero la placa ${mb.name} es ${mb.socket}. Elige una placa compatible (${cpu.socket}).`,
    });
  }

  if (psu) {
    const requiredPsu = recommendedPsu(wattage, gpu);
    const psuFloor = Math.max(wattage * 1.15, gpu?.psuMin ?? 0);
    if (psu.watts && psu.watts < psuFloor) {
      issues.push({
        severity: "error",
        title: "Fuente insuficiente",
        detail: `Tu configuración consume unos ${wattage} W en carga. Con una fuente de ${psu.watts} W puede reiniciarse bajo carga máxima. Recomendamos al menos ${requiredPsu} W.`,
      });
    } else if (psu.watts && psu.watts < requiredPsu) {
      issues.push({
        severity: "warning",
        title: "Fuente justa",
        detail: `La fuente de ${psu.watts} W funciona, pero irás más holgado con ${requiredPsu} W para evitar ruido y voltajes ajustados.`,
      });
    }
  }

  if (casePart && gpu && casePart.maxGpuLength) {
    const gpuLen = gpu.lengthMm ?? 340;
    if (gpuLen > casePart.maxGpuLength) {
      issues.push({
        severity: "error",
        title: "Gráfica demasiado larga",
        detail: `La ${gpu.name} necesita ~${gpuLen} mm de hueco. Esta caja admite hasta ${casePart.maxGpuLength} mm.`,
      });
    }
  }

  if (casePart && cooling && casePart.maxCoolerHeight && cooling.height) {
    if (cooling.height > casePart.maxCoolerHeight) {
      issues.push({
        severity: "error",
        title: "Torre demasiado alta",
        detail: `El disipador de ${cooling.height} mm no cabe en esta caja (máximo ${casePart.maxCoolerHeight} mm).`,
      });
    }
  }

  if (cpu && cooling && cooling.type === "air" && cpu.power > 125) {
    issues.push({
      severity: "warning",
      title: "Refrigeración corta",
      detail: `El ${cpu.name} disipa hasta ${cpu.power} W. Un AIO de 240 mm+ mantendrá temperaturas y boost estables.`,
    });
  }

  if (cpu && ram && cpu.cores && cpu.cores >= 12 && ram.memoryGb && ram.memoryGb < 32) {
    issues.push({
      severity: "warning",
      title: "RAM justa para tu CPU",
      detail: `Con ${cpu.cores} núcleos te recomendamos 32 GB o más para multitarea pesada.`,
    });
  }

  const gpuPerf = gpu?.perf ?? 0;
  const cpuPerf = cpu?.perf ?? 0;
  const ramMb = Math.min(100, (ram?.memoryGb ?? 0) * 1.35);

  const gaming = clampScore(0.6 * gpuPerf + 0.3 * (cpu?.gaming ?? 0) + 0.1 * ramMb);
  const streaming = clampScore(0.45 * gpuPerf + 0.4 * cpuPerf + 0.15 * ramMb);
  const render = clampScore(0.55 * (gpu?.render ?? gpuPerf) + 0.35 * cpuPerf + 0.1 * ramMb);
  const ai = clampScore(0.65 * (gpu?.ai ?? gpuPerf) + 0.2 * cpuPerf + 0.15 * ramMb);
  const productivity = clampScore(0.5 * cpuPerf + 0.25 * gpuPerf + 0.25 * ramMb);
  const overall = clampScore((gaming + streaming + render + ai + productivity) / 5);

  const fps = Object.fromEntries(
    RESOLUTIONS.map((r) => [r.key, estimateFps(gpu?.id, cpu?.id, r.key)])
  ) as Record<Resolution, FpsResult[]>;

  return {
    total,
    wattage,
    psuRecommended: recommendedPsu(wattage, gpu),
    performance: { gaming, streaming, render, ai, productivity, overall },
    fps,
    issues,
    missing,
    complete: missing.length === 0,
  };
}

export function buildSummary(sel: BuildSelection) {
  return Object.entries(sel)
    .filter(([, v]) => v)
    .map(([k, v]) => ({ category: k as Category, part: partById(v as string) }));
}

export function compatibilityScore(sel: BuildSelection): number {
  const c = computeBuild(sel);
  const errors = c.issues.filter((i) => i.severity === "error").length;
  if (errors > 0) return 30;
  const warnings = c.issues.filter((i) => i.severity === "warning").length;
  if (warnings > 0) return 75;
  return 100;
}