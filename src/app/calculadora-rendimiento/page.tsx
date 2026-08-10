import type { Metadata } from "next";
import { PerformanceCalculator } from "@/components/calculator/performance-calculator";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Calculador de rendimiento para PC",
  description:
    "Estima el rendimiento de tu futura configuración para gaming, streaming, render, IA y productividad antes de comprar.",
  alternates: { canonical: "/calculadora-rendimiento" },
};

export default function CalculadoraPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-x">
        <SectionHeading
          as="h1"
          eyebrow="Calculadora"
          title="¿Cuánto rendimiento necesita tu PC?"
          description="Ajusta los niveles de tu futura configuración y descubre qué tal se desenvolverá en cada tipo de carga."
        />
        <div className="mt-14">
          <PerformanceCalculator />
        </div>
      </div>
    </div>
  );
}