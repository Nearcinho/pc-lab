import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { StoryIntro } from "@/components/home/story-intro";
import { UseCases } from "@/components/home/use-cases";
import { Craftsmanship } from "@/components/home/craftsmanship";
import { FounderStory } from "@/components/home/founder-story";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "PC LAB·Estudio | Custom PC Design Studio en Madrid",
  description:
    "PC LAB diseña los ordenadores a medida que de verdad necesitas: gaming, creación, trabajo e IA. Configuración personalizada, ensamblaje premium y testing de 24 h en Madrid.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryIntro />
      <UseCases />
      <Craftsmanship />
      <FounderStory />
      <FinalCta />
    </>
  );
}