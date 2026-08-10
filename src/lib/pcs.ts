export interface CatalogSpec {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  power: string;
}

export interface PcBuild {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  category: "gaming" | "workstation" | "streaming";
  tier: string;
  image: string;
  description: string;
  highlights: string[];
  specs: CatalogSpec;
  perf: { gaming: number; streaming: number; render: number; ai: number };
  fps: { game: string; fps: number; res: string }[];
  featured?: boolean;
  badge?: string;
}

export const pcs: PcBuild[] = [
  {
    slug: "poseidon",
    name: "Posidón",
    tagline: "El rey absoluto del rendimiento",
    price: 2749,
    oldPrice: 2999,
    category: "gaming",
    tier: "Configuración tope de gama",
    image: "/builds/titan.svg",
    description:
      "Sin concesiones. Toda la potencia de la RTX 4090 y el mejor procesador gaming del mercado en una torre de referencia. Diseñada para 4K ultra, competición y años de headroom.",
    highlights: ["RTX 4090 24GB", "Ryzen 7 9800X3D", "32GB DDR5 6000", "AIO 360mm", "1000W Platinum"],
    specs: { cpu: "AMD Ryzen 7 9800X3D", gpu: "NVIDIA GeForce RTX 4090", ram: "32GB DDR5 6000", storage: "2TB NVMe Gen5", power: "1000W 80+ Platinum" },
    perf: { gaming: 99, streaming: 97, render: 92, ai: 99 },
    fps: [
      { game: "Cyberpunk 2077", fps: 210, res: "4K · Ray Tracing Ultra" },
      { game: "Fortnite", fps: 340, res: "4K · Épico" },
      { game: "Valorant", fps: 520, res: "1440p · Competitivo" },
    ],
    featured: true,
    badge: "Flagship",
  },
  {
    slug: "aquiles",
    name: "Aquiles",
    tagline: "Gaming sin fricción",
    price: 1649,
    category: "gaming",
    tier: "Rendimiento alto",
    image: "/builds/apex.svg",
    description:
      "El equilibrio perfecto entre rendimiento y precio. 1440p fluido con todo en épico y ray tracing encendido, sin sacrificar presupuesto para periféricos.",
    highlights: ["RTX 4070 Super 12GB", "Ryzen 7 7800X3D", "32GB DDR5 6000", "AIO 240mm", "850W Gold"],
    specs: { cpu: "AMD Ryzen 7 7800X3D", gpu: "NVIDIA GeForce RTX 4070 Super", ram: "32GB DDR5 6000", storage: "1TB NVMe Gen4", power: "850W 80+ Gold" },
    perf: { gaming: 92, streaming: 90, render: 78, ai: 82 },
    fps: [
      { game: "Cyberpunk 2077", fps: 150, res: "1440p · Ultra" },
      { game: "Fortnite", fps: 240, res: "1440p · Épico" },
      { game: "Valorant", fps: 430, res: "1440p · Competitivo" },
    ],
    featured: true,
    badge: "Más vendido",
  },
  {
    slug: "nike",
    name: "Nike",
    tagline: "Esports a 240 Hz",
    price: 1149,
    category: "gaming",
    tier: "Sin competencia",
    image: "/builds/pulse.svg",
    description:
      "Pensada para competición: frecuencias altísimas en los esports más exigentes y latencia mínima. Gráfica sólida y CPU exprimido para el 1% low.",
    highlights: ["RTX 4060 Ti 8GB", "Ryzen 5 9600X", "32GB DDR5 6000", "Aire premium", "650W Gold"],
    specs: { cpu: "AMD Ryzen 5 9600X", gpu: "NVIDIA GeForce RTX 4060 Ti", ram: "32GB DDR5 6000", storage: "1TB NVMe Gen4", power: "650W 80+ Gold" },
    perf: { gaming: 86, streaming: 82, render: 68, ai: 70 },
    fps: [
      { game: "Valorant", fps: 400, res: "1080p · Competitivo" },
      { game: "CS 2", fps: 380, res: "1080p · Alto" },
      { game: "Fortnite", fps: 220, res: "1440p · Épico" },
    ],
  },
  {
    slug: "zeus",
    name: "Zeus",
    tagline: "El Olimpo de la creación",
    price: 3299,
    oldPrice: 3499,
    category: "workstation",
    tier: "Pro creación",
    image: "/builds/forge.svg",
    description:
      "El rey de los dioses en forma de workstation: render, edición 4K/8K y cargas pesadas de IA sin interrupciones. 16 núcleos, 64GB de RAM y una gráfica lista para trabajo profesional.",
    highlights: ["Ryzen 9 9950X", "RTX 4080 Super 16GB", "64GB DDR5", "NVMe Gen5 2TB", "1200W Platinum"],
    specs: { cpu: "AMD Ryzen 9 9950X", gpu: "NVIDIA GeForce RTX 4080 Super", ram: "64GB DDR5 6400", storage: "2TB NVMe Gen5", power: "1200W 80+ Platinum" },
    perf: { gaming: 88, streaming: 96, render: 97, ai: 99 },
    fps: [
      { game: "Render Blender", fps: 420, res: "Muestras por minuto" },
      { game: "DaVinci 4K", fps: 120, res: "Timeline fluida" },
      { game: "LLM local", fps: 90, res: "Tokens por segundo" },
    ],
    featured: true,
    badge: "Pro",
  },
  {
    slug: "atlas",
    name: "Atlas",
    tagline: "Trabajo múltiple sin frenos",
    price: 2199,
    category: "workstation",
    tier: "Productividad",
    image: "/builds/cascade.svg",
    description:
      "Para desarrolladores, diseñadores y analistas que viven en la multitarea. Compila más rápido, virtualiza sin límites y olvídate de qué es un «lag».",
    highlights: ["Ryzen 9 7900X", "RTX 4070 Super", "64GB DDR5", "1TB + 2TB NVMe", "850W Gold"],
    specs: { cpu: "AMD Ryzen 9 7900X", gpu: "NVIDIA GeForce RTX 4070 Super", ram: "64GB DDR5 6000", storage: "3TB NVMe (1+2)", power: "850W 80+ Gold" },
    perf: { gaming: 88, streaming: 92, render: 86, ai: 84 },
    fps: [
      { game: "Compilación", fps: 160, res: "Proyectos enormes" },
      { game: "Multitarea", fps: 3, res: "Pantallas 4K ×2" },
    ],
  },
  {
    slug: "apolo",
    name: "Apolo",
    tagline: "El streamer definitivo",
    price: 1899,
    category: "streaming",
    tier: "Flagship streamer",
    image: "/builds/mono.svg",
    description:
      "Crea, juega y emite a 4K60 con NVENC AV1. Montaje impecable, silencio absoluto y cableado personalizado. La máquina definitiva del streamer.",
    highlights: ["RTX 4070 Ti Super 16GB", "Ryzen 7 7800X3D", "32GB DDR5", "Captura 4K60", "850W Gold"],
    specs: { cpu: "AMD Ryzen 7 7800X3D", gpu: "NVIDIA GeForce RTX 4070 Ti Super", ram: "32GB DDR5 6000", storage: "2TB NVMe Gen4", power: "850W 80+ Gold" },
    perf: { gaming: 95, streaming: 99, render: 82, ai: 88 },
    fps: [
      { game: "Stream 4K60", fps: 60, res: "AV1 · NVENC" },
      { game: "Cyberpunk", fps: 170, res: "1440p · Ultra" },
    ],
    featured: true,
    badge: "Streamer",
  },
];

export function getPcsByCategory(cat: string) {
  return pcs.filter((p) => p.category === cat);
}

export function getPc(slug: string) {
  return pcs.find((p) => p.slug === slug);
}