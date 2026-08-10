export type Workload =
  | "gaming"
  | "streaming"
  | "render"
  | "ai"
  | "video"
  | "productivity";

export interface WorkloadDef {
  key: Workload;
  label: string;
  short: string;
  description: string;
  icon: string;
}

export const workloads: WorkloadDef[] = [
  { key: "gaming", label: "Gaming", short: "FPS y 4K", description: "La máxima tasa de fotogramas en tus juegos favoritos", icon: "gamepad-2" },
  { key: "streaming", label: "Streaming", short: "Jugar y emitir", description: "Juega y emite en alta calidad a la vez", icon: "videotape" },
  { key: "render", label: "Render 3D", short: "Blender / C4D", description: "Renderiza escenas complejas en minutos", icon: "box" },
  { key: "ai", label: "IA (Local LLM)", short: "Inferencia", description: "Ejecuta y entrena modelos de IA en local", icon: "brain-circuit" },
  { key: "video", label: "Edición de vídeo", short: "4K / 8K", description: "Timelines fluidas en Premiere y DaVinci", icon: "clapperboard" },
  { key: "productivity", label: "Productividad", short: "Multitarea", description: "Código, compilación y decenas de pestañas", icon: "braces" },
];

export interface WorkloadResult {
  score: number;
  label: string;
  bottleneck: string;
  note: string;
  recommendation: string;
  gpuTip?: string;
  cpuTip?: string;
  ramTip?: string;
}

const configs: Record<Workload, {
  label: string;
  steps: (g: number, ga: number, gr: number, c: number, cg: number, r: number) => number;
  rec: string;
  gpuTip?: string;
  cpuTip?: string;
  ramTip?: string;
}> = {
  gaming: {
    label: "Gaming",
    steps: (g, _c, _gr, _cp, cg, r) => 0.6 * g + 0.32 * cg + 0.08 * Math.min(100, r * 1.2),
    rec: "Centra el presupuesto en la gráfica y en un procesador con mucha caché para juegos. Con 16 GB de RAM tienes lo esencial; 32 GB da margen para el resto de apps.",
    gpuTip: "La gráfica manda: cada recorte en CPU se nota menos que uno en GPU.",
    cpuTip: "Un CPU con gran caché L3 (Ryzen X3D) eleva los mínimos de FPS.",
    ramTip: "16 GB es el mínimo hoy; 32 GB para jugar con Discord, navegador y captura abiertos.",
  },
  streaming: {
    label: "Streaming",
    steps: (g, _ga, _gr, c, _cg, r) => 0.5 * g + 0.42 * c + 0.08 * Math.min(100, r * 1.1),
    rec: "Combina una gráfica NVIDIA con NVENC para codificar en alta calidad sin robar FPS, y un CPU de 8+ núcleos para el juego y OBS a la vez.",
    gpuTip: "Busca una gráfica con NVENC de última generación; encodea en AV1 sin penalizar el juego.",
    cpuTip: "De 8 núcleos o más (Ryzen 7 / Intel i7) para emitir sin caídas.",
    ramTip: "32 GB: el encoder, el juego y OBS suman mucha memoria viva.",
  },
  render: {
    label: "Render 3D",
    steps: (g, _ga, gr, c, _cg, r) => 0.5 * gr + 0.35 * c + 0.15 * Math.min(100, r),
    rec: "Prioriza VRAM abundante para renderizar por GPU (Blender/Cycles, V-Ray) y un CPU con muchos núcleos para el resto del pipeline.",
    gpuTip: "VRAM de 16-24 GB hace que las escenas pesadas dejen de cargar cachés al disco.",
    ramTip: "32-64 GB aceleran escenas con cientos de assets en memoria.",
  },
  ai: {
    label: "IA (Local LLM)",
    steps: (g, ga, _gr, c, _cg, r) => 0.62 * ga + 0.28 * c + 0.1 * Math.min(100, r),
    rec: "La VRAM lo decide todo: los mejores modelos de lenguaje local viven en la memoria de la GPU.",
    gpuTip: "RTX con 16-24 GB de VRAM permiten cargar modelos medianos enteros en local.",
    cpuTip: "Un buen CPU con AVX-512 acelera ciertos kernels y la tokenización.",
    ramTip: "64 GB ayudan si trabajas con datasets grandes o ejecutas varios procesos.",
  },
  video: {
    label: "Edición de vídeo",
    steps: (g, _ga, gr, c, _cg, r) => 0.45 * g + 0.4 * c + 0.15 * Math.min(100, r),
    rec: "La edición 4K premia un equilibrio: GPU para preview y efectos, CPU para códecs y RAM abundante para el timeline.",
    gpuTip: "NVIDIA con códecs AV1 acelera export y preview en DaVinci Resolve.",
    cpuTip: "El H.264/H.265 usa del CPU; más núcleos reducen tiempos de render.",
    ramTip: "32 GB para 4K, 64 GB para 8K o composiciones muy pesadas.",
  },
  productivity: {
    label: "Productividad",
    steps: (g, _ga, _gr, c, _cg, r) => 0.55 * c + 0.25 * g + 0.2 * Math.min(100, r),
    rec: "Compilación, código, virtualización… aquí manda el CPU y la RAM. Una gráfica discreta razonable es suficiente.",
    cpuTip: "CPU de 8+ núcleos con buen boost multiplica la productividad de compilación.",
    ramTip: "32 GB bien; 64 GB si corres Docker, VMs o múltiples sesiones de desarrollo.",
  },
};

export function computeWorkload(
  workload: Workload,
  gpuPerf: number,
  gpuAi: number,
  gpuRender: number,
  cpuPerf: number,
  cpuGaming: number,
  ramGb: number
): WorkloadResult {
  const cfg = configs[workload];
  const score = Math.max(0, Math.min(100, Math.round(cfg.steps(gpuPerf, gpuAi, gpuRender, cpuPerf, cpuGaming, ramGb))));

  const tier =
    score >= 90 ? "Nivel Pro" :
    score >= 75 ? "Sobrado" :
    score >= 60 ? "Fluido" :
    score >= 45 ? "Correcto" : "Básico";

  const candidates = [
    { name: "gráfica", v: workload === "ai" ? gpuAi : workload === "render" ? gpuRender : gpuPerf },
    { name: "CPU", v: workload === "gaming" ? cpuGaming : cpuPerf },
    { name: "RAM", v: Math.min(100, ramGb * 1.2) },
  ];
  const bottleneck = candidates.reduce((a, b) => (a.v < b.v ? a : b)).name;

  return {
    score,
    label: tier,
    bottleneck,
    note:
      workload === "gaming"
        ? "El cuello de botella principal en gaming suele ser la tarjeta gráfica. Subir la GPU da el mayor salto de FPS."
        : workload === "ai"
        ? "En IA la VRAM es el factor decisivo; la RAM mantiene datasets cargados."
        : "El cuello de botella principal suele estar en los componentes que puntúan más bajo. Refuerza primero sus CPU/RAM.",
    recommendation: cfg.rec,
    gpuTip: cfg.gpuTip,
    cpuTip: cfg.cpuTip,
    ramTip: cfg.ramTip,
  };
}