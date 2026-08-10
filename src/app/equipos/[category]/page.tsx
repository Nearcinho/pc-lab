import type { Metadata } from "next";
import { getPcsByCategory } from "@/lib/pcs";
import { CatalogGrid } from "@/components/catalog/catalog-grid";
import { CatalogHero } from "@/components/catalog/catalog-hero";
import { Cta } from "@/components/home/cta";

const meta: Record<string, { title: string; description: string; hero: string; lede: string }> = {
  gaming: {
    title: "PC Gaming a medida | PC LAB Custom PC",
    description: "Equipos gaming ensamblados a mano para 1080p, 1440p o 4K, con test de estrés de 24 h y entrega en Madrid.",
    hero: "PC Gaming",
    lede: "Máxima tasa de fotogramas, mínima latencia y headroom para años. Configuraciones estudiadas a fondo para 1080p, 1440p y 4K con ray tracing.",
  },
  workstation: {
    title: "Workstations para crear | PC LAB Custom PC",
    description: "Workstations de gama pro para render, edición, IA y desarrollo. Certificación de estabilidad 24/7 y entrega en Madrid.",
    hero: "Workstations",
    lede: "Rendimiento sin concesiones para render, edición, IA y desarrollo. Máquinas estables 24/7 con VRAM abundante y memoria de sobra.",
  },
  streaming: {
    title: "PCs de streaming | PC LAB Custom PC",
    description: "Equipos especializados para streaming: NVENC AV1, núcleos de sobra, 32 GB RAM y montaje silencioso premium.",
    hero: "PC Streamer",
    lede: "El aliado del streamer: codifica, juega y mantiene la calidad sin perder ni un frame. Silencio y fiabilidad ante todo.",
  },
};

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const info = meta[category] ?? meta.gaming;
  const builds = getPcsByCategory(category);

  return (
    <>
      <CatalogHero title={info.hero} lede={info.lede} builds={builds} />
      <CatalogGrid
        builds={builds}
        title={`Equipos ${info.hero}`}
        eyebrow="Categoría"
        description="Cada unidad se monta y se prueba antes de salir. Puedes personalizar cualquier configuración en el configurador."
      />
      <Cta />
    </>
  );
}

export async function generateStaticParams() {
  return [{ category: "gaming" }, { category: "workstation" }, { category: "streaming" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const info = meta[category] ?? meta.gaming;
  return {
    title: info.title,
    description: info.description,
    alternates: { canonical: `/equipos/${category}` },
  };
}