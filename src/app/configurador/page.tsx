import type { Metadata } from "next";
import { Configurator } from "@/components/builder/configurator";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Simulador de PC a medida",
  description:
    "Configura tu PC pieza a pieza o cuéntanos para qué lo vas a usar y tu presupuesto. Compatibilidad automática y sin precios: la cotización llega tras la consultoría.",
  alternates: { canonical: "/configurador" },
};

export default function ConfiguradorPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container-x mb-10">
        <SectionHeading
          as="h1"
          eyebrow="Simulador de builds"
          title="Prueba tu PC antes de pedirlo"
          description="Elige los componentes tú mismo o dinos para qué lo vas a usar y tu presupuesto aproximado. Sin precios aquí: la cotización la cerramos contigo en la consultoría."
        />
        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-center text-xs text-muted">
          <Badge variant="outline">Compatibilidad automática</Badge>
          <Badge variant="outline">FPS estimados</Badge>
          <Badge variant="outline">Fuente recomendada</Badge>
          <Badge variant="outline">Montaje artesanal</Badge>
          <Badge variant="outline">Presupuesto tras consulta</Badge>
        </div>
      </div>
      <Configurator />
    </div>
  );
}