import { asset } from "@/lib/base";

export interface Project {
  slug: string;
  name: string;
  brief: string;
  purpose: string;
  profile: string;
  image: string;
  hardware: { label: string; value: string }[];
  performance: { label: string; value: string }[];
  benchmarks: { label: string; value: string; note?: string }[];
  category: "gaming" | "workstation" | "streaming";
}

export const projects: Project[] = [
  {
    slug: "propuesta-artemisa",
    name: "Artemisa",
    brief: "Streaming 1080p60, edición 4K en Premiere y comunidad en paralelo: máquina que aguanta días de directo sin estrés.",
    purpose: "PC de streaming para creadora de contenido",
    profile: "Streamer y editora · directos largos",
    image: asset("/builds/mono.svg"),
    hardware: [
      { label: "CPU", value: "Ryzen 7 7800X3D" },
      { label: "GPU", value: "RTX 4070 Ti Super 16 GB" },
      { label: "RAM", value: "32 GB DDR5 6000" },
      { label: "Almacenamiento", value: "2 TB NVMe Gen4" },
      { label: "Refrigeración", value: "AIO 280 mm" },
    ],
    performance: [
      { label: "Streaming + juego simultáneo", value: "Sin pérdida de FPS" },
      { label: "Edición 4K", value: "Timeline fluida" },
      { label: "Ruido bajo carga", value: "38 dB" },
    ],
    benchmarks: [
      { label: "Stream 4K60 · AV1", value: "60 FPS" },
      { label: "Cyberpunk 2077 · 1440p Ultra", value: "170 FPS" },
      { label: "Cinebench R23", value: "18.240 pts" },
    ],
    category: "streaming",
  },
  {
    slug: "propuesta-hades",
    name: "Hades",
    brief: "Simulación y esports 4K al máximo detalle: la GPU y la caché 3D mandan por delante de cualquier marketing de CPU.",
    purpose: "PC gaming 4K para simuladores",
    profile: "Creador de simulación · 4K ultra + ray tracing",
    image: asset("/builds/titan.svg"),
    hardware: [
      { label: "CPU", value: "Ryzen 7 9800X3D" },
      { label: "GPU", value: "RTX 4090 24 GB" },
      { label: "RAM", value: "32 GB DDR5 6000" },
      { label: "Almacenamiento", value: "2 TB NVMe Gen5" },
      { label: "Refrigeración", value: "AIO 360 mm" },
    ],
    performance: [
      { label: "Simulación 4K · Ray Tracing", value: "94 FPS medidos" },
      { label: "1% low", value: "78 FPS" },
      { label: "Temperatura bajo carga", value: "62–68 °C" },
    ],
    benchmarks: [
      { label: "Cyberpunk 2077 · 4K con RT", value: "210 FPS" },
      { label: "3DMark Time Spy", value: "29.850 pts" },
      { label: "Sim (custom workload)", value: "94 FPS", note: "±3 %" },
    ],
    category: "gaming",
  },
  {
    slug: "propuesta-hefesto",
    name: "Hefesto",
    brief: "Render 3D, edición 4K/8K e IA con los tiempos de pipeline recortados: 64 GB, 16 núcleos y VRAM para mantener escenas en memoria.",
    purpose: "Workstation de render 3D y creación",
    profile: "Estudio de creación · render + IA",
    image: asset("/builds/forge.svg"),
    hardware: [
      { label: "CPU", value: "Ryzen 9 9950X (16 núcleos)" },
      { label: "GPU", value: "RTX 4080 Super 16 GB" },
      { label: "RAM", value: "64 GB DDR5 6400" },
      { label: "Almacenamiento", value: "2 TB NVMe Gen5" },
      { label: "Refrigeración", value: "AIO 360 mm" },
    ],
    performance: [
      { label: "Render Blender · escena compleja", value: "x2,1 más rápido que el anterior" },
      { label: "Overclock estable", value: "perfil validado 24 h" },
      { label: "Estabilidad multitarea", value: "12 h sin reinicios" },
    ],
    benchmarks: [
      { label: "Blender BMW", value: "41 s" },
      { label: "Cinebench R23", value: "41.200 pts" },
      { label: "DaVinci 4K", value: "Timeline fluida · multicam" },
    ],
    category: "workstation",
  },
  {
    slug: "propuesta-hestia",
    name: "Hestia",
    brief: "Un PC familiar que comparte dos jugadores y un adulto que trabaja con música: multitarea, 32 GB y espacio de sobra.",
    purpose: "Gaming y estudio para toda la casa",
    profile: "Familia multiusuario · 2+1",
    image: asset("/builds/apex.svg"),
    hardware: [
      { label: "CPU", value: "Ryzen 7 9700X" },
      { label: "GPU", value: "RTX 4070 Super 12 GB" },
      { label: "RAM", value: "32 GB DDR5 6000" },
      { label: "Almacenamiento", value: "1 TB + 2 TB NVMe" },
      { label: "Refrigeración", value: "AIO 240 mm" },
    ],
    performance: [
      { label: "Multiusuario simultáneo", value: "2 cuentas + tarea en fondo" },
      { label: "Edición de audio", value: "Latencia 4 ms" },
      { label: "Ruido", value: "38 dB" },
    ],
    benchmarks: [
      { label: "Fortnite · 1440p Alto", value: "240 FPS" },
      { label: "Valorant · 1440p", value: "430 FPS" },
      { label: "Cinebench R23", value: "26.900 pts" },
    ],
    category: "gaming",
  },
  {
    slug: "propuesta-hermes",
    name: "Hermes",
    brief: "Emisión estable 4K60 con AV1, juego fluido y silencioso: la build pensada para el día a día de un streamer serio.",
    purpose: "PC de streaming orientado a 4K60",
    profile: "Streamer de largo recorrido · 4K60 AV1",
    image: asset("/builds/mono.svg"),
    hardware: [
      { label: "CPU", value: "Ryzen 7 9700X" },
      { label: "GPU", value: "RTX 4070 Ti Super 16 GB" },
      { label: "RAM", value: "32 GB DDR5 6000" },
      { label: "Almacenamiento", value: "2 TB NVMe Gen4" },
      { label: "Refrigeración", value: "AIO 240 mm" },
    ],
    performance: [
      { label: "Stream + juego", value: "0 FPS de pérdida" },
      { label: "Carga prolongada", value: "8 h en directo" },
    ],
    benchmarks: [
      { label: "Stream 4K60 · NVENC AV1", value: "estable" },
      { label: "Valorant · 1440p", value: "400 FPS" },
      { label: "Multi task", value: "CPU 62 %" },
    ],
    category: "streaming",
  },
];