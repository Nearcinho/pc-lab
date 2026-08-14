import { asset } from "@/lib/base";
import type { UseCase } from "@/lib/profiles";

export interface Prebuild {
  name: string;
  tagline: string;
  tierLabel: string;
  image: string;
  preset: `${UseCase}-${1 | 2 | 3 | 4 | 5}`;
}

export interface PrebuildCategory {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  use: UseCase;
  builds: Prebuild[];
}

export const prebuildCategories: PrebuildCategory[] = [
  {
    slug: "gaming",
    title: "PC Gaming",
    eyebrow: "Juega a otro nivel",
    description:
      "Equipos montados y calibrados para exprimir cada fotograma: desde 1080p competitivo hasta 4K sin concesiones. Cada uno es un punto de partida totalmente ajustable.",
    use: "gaming",
    builds: [
      { name: "ATLAS", tagline: "Esencial · 1080p fluido", tierLabel: "Esencial", image: asset("/builds/pulse.jpg"), preset: "gaming-1" },
      { name: "ARES", tagline: "Avanzado · 1440p competitivo", tierLabel: "Avanzado", image: asset("/builds/apex.jpg"), preset: "gaming-3" },
      { name: "ZEUS", tagline: "Extremo · 4K sin límites", tierLabel: "Extremo", image: asset("/builds/titan.jpg"), preset: "gaming-5" },
    ],
  },
  {
    slug: "creadores",
    title: "PC para creadores",
    eyebrow: "Crea sin esperar",
    description:
      "Edición de vídeo, diseño 3D y render sin tiempos muertos: núcleos de sobra, VRAM generosa y almacenamiento rápido para que el proyecto mande, no la barra de progreso.",
    use: "render",
    builds: [
      { name: "DÉDALO", tagline: "Esencial · Edición Full HD", tierLabel: "Esencial", image: asset("/builds/cascade.jpg"), preset: "render-1" },
      { name: "HEFESTO", tagline: "Avanzado · Edición 4K y render", tierLabel: "Avanzado", image: asset("/builds/forge.jpg"), preset: "render-3" },
      { name: "POSEIDÓN", tagline: "Extremo · Estudio 8K y 3D pesado", tierLabel: "Extremo", image: asset("/builds/mono.jpg"), preset: "render-5" },
    ],
  },
  {
    slug: "trabajo",
    title: "PC de trabajo",
    eyebrow: "Tu oficina, en serio",
    description:
      "Estaciones de trabajo silenciosas y fiables para el día a día profesional: multitarea ágil, respuesta inmediata y cero dramas de mantenimiento.",
    use: "productividad",
    builds: [
      { name: "ARGOS", tagline: "Esencial · Ofimática y multitarea", tierLabel: "Esencial", image: asset("/builds/mono.jpg"), preset: "productividad-1" },
      { name: "HERMES", tagline: "Avanzado · Multitarea pesada", tierLabel: "Avanzado", image: asset("/builds/pulse.jpg"), preset: "productividad-3" },
      { name: "ATENEA", tagline: "Extremo · Estación de datos", tierLabel: "Extremo", image: asset("/builds/cascade.jpg"), preset: "productividad-5" },
    ],
  },
  {
    slug: "ia",
    title: "PC de IA y desarrollo",
    eyebrow: "Compila, entrena, itera",
    description:
      "Para desarrollo e inteligencia artificial local: mucha VRAM para modelos, núcleos para compilar y RAM para datasets sin salir de tu torre.",
    use: "ia",
    builds: [
      { name: "TALOS", tagline: "Esencial · Código y scripts", tierLabel: "Esencial", image: asset("/builds/forge.jpg"), preset: "ia-1" },
      { name: "PROMETEO", tagline: "Avanzado · IA local y contenedores", tierLabel: "Avanzado", image: asset("/builds/apex.jpg"), preset: "ia-3" },
      { name: "URANO", tagline: "Extremo · Modelos grandes en local", tierLabel: "Extremo", image: asset("/builds/titan.jpg"), preset: "ia-5" },
    ],
  },
];

export function getPrebuildCategory(slug: string) {
  return prebuildCategories.find((c) => c.slug === slug);
}
