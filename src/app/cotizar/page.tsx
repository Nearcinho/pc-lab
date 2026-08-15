import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/components/quote/quote-form";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Solicitar cotización",
  description:
    "Revisa tu configuración y pídenos cotización: te enviamos un presupuesto cerrado en menos de 24 horas laborables.",
  robots: { index: false },
};

export default function CotizarPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-x max-w-5xl">
        <SectionHeading
          as="h1"
          eyebrow="Cotización"
          title="Revisa tu build y pide presupuesto"
          description="Sin compromiso: te enviamos una cotización cerrada y detallada en menos de 24 horas laborables."
        />
        <div className="mt-12">
          <Suspense>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
