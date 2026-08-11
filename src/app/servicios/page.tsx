import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ServicesStrip } from "@/components/servicios/services-strip";

export const metadata: Metadata = {
  title: "Servicios de PC Personalizados en Madrid",
  description:
    "Diseño, ensamblado, upgrades y mantenimiento de PCs en Madrid. PC LAB crea y prepara equipos personalizados según tus necesidades.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      {/* 01 — HERO */}
      <section
        className="relative overflow-hidden bg-background pt-36 pb-24 sm:pt-44 sm:pb-32"
        aria-label="Servicios de PC LAB"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,209,255,0.08),transparent_70%)]"
          aria-hidden
        />

        <div className="container-x relative">
          <div className="max-w-4xl">
            <Reveal>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                Servicios PC LAB
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-[4.6rem]">
                Todo lo que necesitas para tu PC.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-2 sm:text-xl">
                Desde diseñar tu equipo desde cero hasta mejorarlo y mantenerlo en perfecto estado.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
                {["Diseño de PC", "Ensamblado de PC", "Upgrades de PC", "Mantenimiento de PC"].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-muted-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-12">
                <Link href="/contacto">
                  <Button size="lg" variant="brand">
                    Empezar mi proyecto <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — LOS CUATRO SERVICIOS */}
      <section className="bg-background pb-32 sm:pb-40" aria-label="Servicios de PC LAB">
        <ServicesStrip />
      </section>
    </>
  );
}