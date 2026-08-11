import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { asset } from "@/lib/base";

export const metadata: Metadata = {
  title: "Servicios de PC Personalizados en Madrid",
  description:
    "Diseño, ensamblado, upgrades y mantenimiento de PCs en Madrid. PC LAB crea y prepara equipos personalizados según tus necesidades.",
  alternates: { canonical: "/servicios" },
};

const services = [
  {
    n: "01",
    title: "Diseño del PC",
    description:
      "Definimos el equipo adecuado para ti según lo que haces, lo que necesitas y cuánto quieres invertir.",
    line: "Gaming · Creación · Trabajo · IA",
    cta: "Diseñar mi PC",
    href: "/configurador",
    image: asset("/cases/tu-pc.jpg"),
    alt: "Diseño de un PC a medida en PC LAB",
  },
  {
    n: "02",
    title: "Ensamblado del PC",
    description:
      "Montamos tus componentes con precisión y dejamos el equipo configurado, optimizado y listo para rendir.",
    line: "Montaje · Configuración · Testing",
    cta: "Ensamblar mi PC",
    href: "/contacto",
    image: asset("/cases/gaming.jpg"),
    alt: "Ensamblado profesional de un PC en PC LAB",
  },
  {
    n: "03",
    title: "Upgrades de PC",
    description:
      "Analizamos tu equipo actual y actualizamos solo lo que realmente necesitas para mejorar su rendimiento.",
    line: "GPU · CPU · RAM · SSD",
    cta: "Mejorar mi PC",
    href: "/contacto",
    image: asset("/cases/creacion.jpg"),
    alt: "Mejora de rendimiento de un PC en PC LAB",
  },
  {
    n: "04",
    title: "Mantenimiento de PC",
    description: "Cuida el rendimiento de tu equipo con limpieza, revisión y mantenimiento preventivo.",
    line: undefined,
    cta: "Mantener mi PC",
    href: "/contacto",
    image: asset("/cases/trabajo.jpg"),
    alt: "Mantenimiento de un PC en PC LAB",
  },
] as const;

function ServiceCard({ service, light }: { service: (typeof services)[number]; light: boolean }) {
  return (
    <Reveal className="h-full">
      <article className="group flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-surface-2">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="photo-grade object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent opacity-80" aria-hidden />
          <div className="photo-tint" aria-hidden />
          <div className="photo-grain" aria-hidden />
          <span className="absolute left-5 top-5 font-mono text-sm font-medium tracking-[0.2em] text-white/70">
            {service.n}
          </span>
        </div>

        <div className="mt-8 flex flex-1 flex-col">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{service.title}</h2>
          <p className={`mt-4 max-w-md text-base leading-relaxed ${light ? "text-[#333333]" : "text-muted-2"}`}>
            {service.description}
          </p>
          {service.line && (
            <p className={`mt-5 font-mono text-xs uppercase tracking-[0.18em] ${light ? "text-[#666666]" : "text-muted"}`}>
              {service.line}
            </p>
          )}
          <div className="mt-auto pt-8">
            <Link
              href={service.href}
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
            >
              {service.cta}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

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
            <Reveal delay={0.24}>
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

      {/* 02 — SERVICIOS 01 + 02 */}
      <section className="light-section bg-2 py-28 sm:py-40" aria-label="Diseño y ensamblado de PC">
        <div className="container-x">
          <div className="grid gap-x-14 gap-y-20 sm:grid-cols-2">
            {services.slice(0, 2).map((s) => (
              <ServiceCard key={s.n} service={s} light />
            ))}
          </div>
        </div>
      </section>

      {/* 03 — SERVICIOS 03 + 04 */}
      <section className="bg-background py-28 sm:py-40" aria-label="Upgrades y mantenimiento de PC">
        <div className="container-x">
          <div className="grid gap-x-14 gap-y-20 sm:grid-cols-2">
            {services.slice(2).map((s) => (
              <ServiceCard key={s.n} service={s} light={false} />
            ))}
          </div>
        </div>
      </section>

      {/* 04 — FINAL CTA */}
      <section className="relative overflow-hidden bg-background py-32 sm:py-44" aria-label="Empieza tu proyecto">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[24rem] bg-[radial-gradient(50%_70%_at_50%_100%,rgba(79,209,255,0.07),transparent_70%)]"
          aria-hidden
        />
        <div className="container-x relative text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              ¿Qué necesita tu PC?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
              Cuéntanos qué tienes, qué quieres conseguir y cuánto quieres invertir.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <Link href="/contacto">
                <Button size="lg" variant="brand">
                  Hablar con PC LAB <ArrowRight className="size-4" aria-hidden />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}