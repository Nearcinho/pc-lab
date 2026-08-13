// Datos de rendimiento anclados a benchmarks públicos verificables.
// Cada bloque indica su fuente (URL) y fecha de consulta. Los valores
// marcados como "estimado" en tiempo de ejecución se interpolan a partir
// del índice relativo de TechPowerUp — nunca se inventan.

export type Resolution = "1080p" | "1440p" | "4k";

export const RESOLUTIONS: { key: Resolution; label: string }[] = [
  { key: "1080p", label: "1080p" },
  { key: "1440p", label: "1440p" },
  { key: "4k", label: "4K" },
];

// ---------------------------------------------------------------------------
// Índice de rendimiento relativo de GPU (raster, nativo).
// Fuente: gráfico "Relative Performance" de TechPowerUp, escala común
// RTX 4090 = 100, extraído de https://www.techpowerup.com/gpu-specs/geforce-rtx-4090.c3889
// (consultado 2026-08-12). Páginas individuales citadas por GPU.
// ---------------------------------------------------------------------------
export const GPU_REL: Record<string, number> = {
  "gpu-rtx4060": 32, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4060.c4107
  "gpu-rx7600xt": 32, // https://www.techpowerup.com/gpu-specs/radeon-rx-7600-xt.c4190
  "gpu-arc-b580": 32, // https://www.techpowerup.com/gpu-specs/arc-b580.c4244
  "gpu-rtx5060": 39, // https://www.techpowerup.com/gpu-specs/geforce-rtx-5060.c4219
  "gpu-rtx4060ti": 40, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4060-ti-16-gb.c4155
  "gpu-rx9060xt": 43, // 16 GB — https://www.techpowerup.com/gpu-specs/radeon-rx-9060-xt-16-gb.c4293
  "gpu-rx7700xt": 45, // https://www.techpowerup.com/gpu-specs/radeon-rx-7700-xt.c3911
  "gpu-rtx5060ti": 46, // https://www.techpowerup.com/gpu-specs/geforce-rtx-5060-ti-16-gb.c4292
  "gpu-rx7800xt": 51, // https://www.techpowerup.com/gpu-specs/radeon-rx-7800-xt.c3839
  "gpu-rtx4070": 53, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4070.c3924
  "gpu-rtx4070super": 55, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4070-super.c4186
  "gpu-rtx5070": 58, // https://www.techpowerup.com/gpu-specs/geforce-rtx-5070.c4218
  "gpu-rtx4070ti": 59, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4070-ti.c3950
  "gpu-rx9070": 64, // https://www.techpowerup.com/gpu-specs/radeon-rx-9070.c4250
  "gpu-rtx4070ti-super": 65, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4070-ti-super.c4187
  "gpu-rx7900xt": 66, // https://www.techpowerup.com/gpu-specs/radeon-rx-7900-xt.c3912
  "gpu-rx9070xt": 72, // https://www.techpowerup.com/gpu-specs/radeon-rx-9070-xt.c4229
  "gpu-rtx5070ti": 75, // https://www.techpowerup.com/gpu-specs/geforce-rtx-5070-ti.c4243
  "gpu-rtx4080": 76, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4080.c3888
  "gpu-rx7900xtx": 76, // https://www.techpowerup.com/gpu-specs/radeon-rx-7900-xtx.c3941
  "gpu-rtx4080super": 77, // https://www.techpowerup.com/gpu-specs/geforce-rtx-4080-super.c4182
  "gpu-rtx5080": 86, // https://www.techpowerup.com/gpu-specs/geforce-rtx-5080.c4217
  "gpu-rtx4090": 100, // referencia https://www.techpowerup.com/gpu-specs/geforce-rtx-4090.c3889
  "gpu-rtx5090": 131, // https://www.techpowerup.com/gpu-specs/geforce-rtx-5090.c4216
};

// ---------------------------------------------------------------------------
// Índice de rendimiento en juegos de CPU (1080p, RTX 5090, geomean).
// Fuente principal: Tom's Hardware CPU Hierarchy 2026,
// https://www.tomshardware.com/reviews/cpu-hierarchy,4312.html
// (consultado 2026-08-12), renormalizado a Ryzen 7 9800X3D = 100.
// Excepciones citadas inline.
// ---------------------------------------------------------------------------
export const CPU_GAMING_INDEX: Record<string, number> = {
  "cpu-r7-9800x3d": 100, // TH 97.0% (base 9850X3D) → referencia
  "cpu-r9-9950x3d": 98.7, // TH 95.7%
  "cpu-r7-7800x3d": 88.2, // TH 85.6%
  "cpu-r9-7950x3d": 86.5, // TH 83.9%
  "cpu-i9-14900k": 80.6, // TH 78.2%
  "cpu-r9-9950x": 79.3, // TH 76.9%
  "cpu-i7-14700k": 78.8, // TH 76.4%
  "cpu-r9-9900x": 76.2, // TH 73.9%
  "cpu-i5-14600k": 75.0, // TH 72.8%
  "cpu-r5-9600x": 74.8, // TH 72.6%
  "cpu-i9-285k": 74.0, // TH 71.8%
  "cpu-r7-9700x": 73.6, // ComputerBase CPU-Rangliste (720p, RTX 5090): 134 vs 182 FPS del 9800X3D — https://www.computerbase.de/thema/cpu/rangliste/
  "cpu-i5-13600k": 73.1, // TH 70.9%
  "cpu-r7-7700x": 72.8, // TH 70.6%
  "cpu-i7-265k": 72.5, // TH 70.3%
  "cpu-r5-7600": 70, // estimado: ~3% bajo el 7700X (mismo chiplet, -200 MHz) según datos TH
  "cpu-r5-7600x": 69.4, // TH 67.3%
  "cpu-i5-245k": 69.2, // TH 67.1%
  "cpu-i5-14400": 59.8, // TH 58.0%
};

export type GameKey = "cyberpunk" | "cs2" | "fortnite" | "aaa-avg";

export const GAMES: { key: GameKey; name: string; settings: string }[] = [
  { key: "cyberpunk", name: "Cyberpunk 2077", settings: "Ultra, raster, nativo" },
  { key: "cs2", name: "Counter-Strike 2", settings: "Alto, nativo" },
  { key: "fortnite", name: "Fortnite", settings: "Alto (Lumen/Nanite), nativo" },
  { key: "aaa-avg", name: "Media 8 juegos AAA", settings: "Ultra, nativo (incluye RDR2, Far Cry 6, Forza 5…)" },
];

// FPS medios medidos por Tom's Hardware, GPU Benchmarks Hierarchy
// https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html (consultado 2026-08-12).
// - cyberpunk/cs2/fortnite: suite 2025-2026, testbed Ryzen 7 9800X3D, nativo.
// - aaa-avg: geomean de 8 juegos de la suite 2022-2024 (testbed i9-12900K),
//   https://www.tomshardware.com/reviews/gpu-hierarchy,4388-2.html
// Solo se listan GPUs con datos publicados; el resto se interpolan.
export const GAME_FPS: Record<GameKey, Record<Resolution, Record<string, number>>> = {
  cyberpunk: {
    "1080p": { "gpu-rtx5090": 156.6, "gpu-rtx5080": 143.4, "gpu-rx9070xt": 128.2, "gpu-rtx5070ti": 126.2, "gpu-rtx4080super": 123.8, "gpu-rtx5070": 119.3 },
    "1440p": { "gpu-rtx5090": 134.6, "gpu-rtx5080": 93.5, "gpu-rx9070xt": 81.8, "gpu-rtx5070ti": 80.9, "gpu-rtx4080super": 74.1, "gpu-rtx5070": 69.3 },
    "4k": { "gpu-rtx5090": 61.5, "gpu-rtx5080": 42.6, "gpu-rx9070xt": 37.2, "gpu-rtx5070ti": 35.0, "gpu-rtx4080super": 32.7, "gpu-rtx5070": 31.0 },
  },
  cs2: {
    "1080p": { "gpu-rtx5090": 746.8, "gpu-rx9070xt": 619.9, "gpu-rtx4080super": 616.8, "gpu-rtx5080": 610.7, "gpu-rtx5070ti": 570.9, "gpu-rtx5070": 491.2 },
    "1440p": { "gpu-rtx5090": 623.1, "gpu-rtx5080": 469.8, "gpu-rtx4080super": 461.4, "gpu-rx9070xt": 434.4, "gpu-rtx5070ti": 429.1, "gpu-rtx5070": 356.4 },
    "4k": { "gpu-rtx5090": 417.5, "gpu-rtx5080": 275.2, "gpu-rtx4080super": 259.3, "gpu-rtx5070ti": 246.0, "gpu-rx9070xt": 226.8, "gpu-rtx5070": 192.8 },
  },
  fortnite: {
    "1080p": { "gpu-rtx5090": 170.4, "gpu-rx9070xt": 157.8, "gpu-rtx5080": 141.8, "gpu-rtx4080super": 137.2, "gpu-rtx5070ti": 136.0, "gpu-rtx5070": 120.7 },
    "1440p": { "gpu-rtx5090": 140.8, "gpu-rx9070xt": 120.4, "gpu-rtx5080": 115.7, "gpu-rtx5070ti": 108.3, "gpu-rtx4080super": 107.7, "gpu-rtx5070": 94.1 },
    "4k": { "gpu-rtx5090": 102.8, "gpu-rtx5080": 78.2, "gpu-rtx5070ti": 72.0, "gpu-rx9070xt": 68.0, "gpu-rtx4080super": 68.3, "gpu-rtx5070": 57.8 },
  },
  "aaa-avg": {
    "1080p": { "gpu-rtx4090": 154.1, "gpu-rx7900xtx": 149.0, "gpu-rtx4080super": 148.3, "gpu-rtx4070ti-super": 142.3, "gpu-rtx4070super": 134.2, "gpu-rx7800xt": 129.3, "gpu-rtx4070": 122.0, "gpu-rx7600xt": 91.9, "gpu-rtx4060": 84.9 },
    "1440p": { "gpu-rtx4090": 146.1, "gpu-rx7900xtx": 135.3, "gpu-rtx4080super": 133.0, "gpu-rtx4070ti-super": 122.0, "gpu-rtx4070super": 109.8, "gpu-rx7800xt": 105.8, "gpu-rtx4070": 97.8, "gpu-rx7600xt": 65.9, "gpu-rtx4060": 61.2 },
    "4k": { "gpu-rtx4090": 114.5, "gpu-rx7900xtx": 95.1, "gpu-rtx4080super": 91.9, "gpu-rtx4070ti-super": 78.6, "gpu-rtx4070super": 66.1, "gpu-rx7800xt": 62.3, "gpu-rtx4070": 57.2, "gpu-rx7600xt": 37.1, "gpu-rtx4060": 31.9 },
  },
};

// Peso del factor CPU por juego y resolución. Las mediciones de Tom's se
// hicieron con una 9800X3D (= 100), así que el factor corrige la CPU elegida.
// Justificación publicada: a 1080p la CPU puede marcar ~30% en AAA y domina en
// esports (CS2/Valorant); a 1440p se reduce; a 4K es casi nulo (GPU-bound).
// Fuentes: https://www.tweaktown.com/news/107068/battlefield-6-bench-9800x3d-is-30-faster-than-14900k-at-1080p-hardly-any-difference-4k/index.html
//          https://www.tomshardware.com/reviews/cpu-hierarchy,4312.html
const CPU_WEIGHT: Record<GameKey, Record<Resolution, number>> = {
  cs2: { "1080p": 1.0, "1440p": 0.5, "4k": 0.25 },
  fortnite: { "1080p": 0.6, "1440p": 0.3, "4k": 0.1 },
  cyberpunk: { "1080p": 0.4, "1440p": 0.15, "4k": 0.05 },
  "aaa-avg": { "1080p": 0.4, "1440p": 0.15, "4k": 0.05 },
};

export interface FpsResult {
  game: GameKey;
  fps: number;
  /** true = dato medido publicado; false = interpolado desde el índice TPU */
  measured: boolean;
}

function interpolateGpuFps(table: Record<string, number>, gpuId: string): number | null {
  const rel = GPU_REL[gpuId];
  if (rel == null) return null;
  const points = Object.entries(table)
    .map(([id, fps]) => ({ rel: GPU_REL[id], fps }))
    .filter((p) => p.rel != null)
    .sort((a, b) => a.rel - b.rel);
  if (points.length === 0) return null;
  // Interpolación lineal entre las dos GPUs medidas más cercanas en el índice.
  for (let i = 0; i < points.length - 1; i++) {
    const lo = points[i];
    const hi = points[i + 1];
    if (rel >= lo.rel && rel <= hi.rel) {
      const t = (rel - lo.rel) / (hi.rel - lo.rel);
      return lo.fps + t * (hi.fps - lo.fps);
    }
  }
  // Fuera de rango: escala lineal desde el punto más cercano.
  const nearest = rel < points[0].rel ? points[0] : points[points.length - 1];
  return (nearest.fps * rel) / nearest.rel;
}

/**
 * Estima los FPS de una build para todos los juegos a una resolución dada.
 * Devuelve null si falta GPU o no hay datos para esa GPU.
 */
export function estimateFps(
  gpuId: string | undefined,
  cpuId: string | undefined,
  resolution: Resolution,
): FpsResult[] {
  if (!gpuId || GPU_REL[gpuId] == null) return [];
  const cpuIdx = (cpuId ? CPU_GAMING_INDEX[cpuId] : undefined) ?? 100;
  return GAMES.map(({ key }) => {
    const table = GAME_FPS[key][resolution];
    const measured = gpuId in table;
    const base = measured ? table[gpuId] : interpolateGpuFps(table, gpuId);
    if (base == null) return null;
    const w = CPU_WEIGHT[key][resolution];
    const cpuFactor = 1 + w * (cpuIdx / 100 - 1);
    return { game: key, fps: Math.round(base * cpuFactor), measured };
  }).filter((r): r is FpsResult => r !== null);
}

export const BENCHMARK_SOURCES = [
  { label: "TechPowerUp — Relative Performance (índice por GPU)", url: "https://www.techpowerup.com/gpu-specs/geforce-rtx-4090.c3889" },
  { label: "Tom's Hardware — GPU Benchmarks Hierarchy (FPS por juego)", url: "https://www.tomshardware.com/reviews/gpu-hierarchy,4388.html" },
  { label: "Tom's Hardware — CPU Hierarchy (índice gaming CPU)", url: "https://www.tomshardware.com/reviews/cpu-hierarchy,4312.html" },
  { label: "ComputerBase — CPU-Rangliste (Ryzen 7 9700X)", url: "https://www.computerbase.de/thema/cpu/rangliste/" },
];

export const BENCHMARK_DATA_DATE = "agosto 2026";
