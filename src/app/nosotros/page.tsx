import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { asset } from "@/lib/base";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quiénes somos | PC LAB",
  description:
    "Conoce por qué existe PC LAB y cómo la trayectoria de su fundador — hardware, gaming e industria tecnológica — se convierte en criterio a tu favor. Consultoría antes que comisión.",
  alternates: { canonical: "/nosotros" },
};

const portraitAlt = "Nicolás Sánchez Negrete, fundador de PC LAB";

const experience = [
  {
    label: "MADBOX PC",
    title: "Reviews y análisis de hardware",
    text: "El análisis de componentes de PC permitió conocer el hardware más allá de las especificaciones: entender qué ofrece realmente cada componente y para quién tiene sentido.",
  },
  {
    label: "GIGABYTE · AORUS",
    title: "Experiencia dentro de la industria tecnológica",
    text: "Trabajo en marketing y estrategia de marca dentro del ecosistema de hardware y gaming, colaborando con partners, comunidades y profesionales de distintos mercados.",
  },
  {
    label: "HOY · PC LAB",
    title: "Todo ese conocimiento, aplicado a una persona",
    text: "PC LAB nace para convertir esa experiencia en algo más cercano: ayudarte a tomar una decisión técnica que tenga sentido para ti y para tu presupuesto.",
  },
];

const principles = [
  "Tu presupuesto importa.",
  "Tu forma de usar el ordenador importa.",
  "Los juegos que juegas importan.",
  "Lo que quieres hacer mañana también importa.",
];

export default function NosotrosPage() {
  return (
    <>
      {/* 01 — HERO */}
      <section className="relative overflow-hidden bg-background pt-36 pb-24 sm:pt-44 sm:pb-32" aria-label="Quién está detrás de PC LAB">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,209,255,0.08),transparent_70%)]" aria-hidden />

        <div className="container-x relative">
          <div className="grid items-end gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Reveal>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                  Quién está detrás
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-7 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-[4.4rem]">
                  Detrás de PC LAB hay una forma distinta de entender los ordenadores.
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
                  No empezamos con una lista de piezas. Empezamos contigo: lo que haces, lo que necesitas y lo
                  que quieres conseguir.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <Link
                  href="#filosofia"
                  className="group mt-10 inline-flex items-center gap-3 rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-brand/60 hover:text-brand"
                >
                  Conoce nuestra forma de trabajar
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden />
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={40} className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface-2">
                <Image
                  src={asset("/founder/portrait.jpg")}
                  alt={portraitAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — WHY PC LAB EXISTS */}
      <section className="light-section bg-2 py-28 sm:py-40" aria-label="Por qué existe PC LAB">
        <div className="container-x">
          <div className="max-w-4xl">
            <Reveal>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
                PC LAB nació de una idea sencilla.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-lg leading-[1.75] text-muted-2 sm:text-xl">
                Hay miles de configuraciones posibles. Eso no significa que todas tengan sentido para la misma
                persona.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 max-w-2xl text-lg leading-[1.75] text-muted-2 sm:text-xl">
                Después de años trabajando cerca del hardware, el gaming y la industria tecnológica, entendí
                algo: elegir un ordenador no debería consistir en comprar la lista con más especificaciones.
                Debería consistir en encontrar la configuración que realmente encaja contigo.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <p className="mt-12 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Por eso creamos PC LAB.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-4 text-lg leading-relaxed text-muted-2">
                Un estudio donde la recomendación viene antes que la venta.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — EXPERIENCE THAT MATTERS */}
      <section className="bg-background py-28 sm:py-40" aria-label="Experiencia que importa">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              La experiencia importa cuando se convierte en criterio.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-[1.75] text-muted-2 sm:text-xl">
              La trayectoria detrás de PC LAB combina años cerca del hardware, el gaming y la industria
              tecnológica. Pero lo importante no es dónde hemos trabajado. Es lo que esa experiencia nos
              permite aportar cuando diseñamos tu equipo.
            </p>
          </Reveal>

          <div className="mt-16 space-y-0 border-t border-border">
            {experience.map((e, i) => (
              <Reveal key={e.label} delay={i * 0.08}>
                <article className="grid gap-4 border-b border-border py-10 sm:grid-cols-[0.4fr_0.6fr] sm:gap-10 sm:py-12">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                    {e.label}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{e.title}</h3>
                    <p className="mt-3 max-w-xl text-base leading-[1.75] text-muted-2">{e.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — THE PHILOSOPHY */}
      <section id="filosofia" className="light-section bg-2 py-28 sm:py-40" aria-label="La filosofía de PC LAB">
        <div className="container-x">
          <div className="max-w-4xl">
            <Reveal>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
                No creemos en el PC perfecto. Creemos en el PC perfecto para ti.
              </h2>
            </Reveal>

            <div className="mt-14 space-y-5">
              {principles.map((p, i) => (
                <Reveal key={p} delay={i * 0.06}>
                  <p className="font-display text-2xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-4xl">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-14 max-w-2xl text-lg leading-[1.75] text-muted-2 sm:text-xl">
                Por eso no empezamos recomendando componentes. Primero entendemos qué necesitas. Después
                buscamos la configuración que mejor equilibre rendimiento, calidad y presupuesto.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-14 font-display text-3xl font-semibold tracking-tight text-brand-2 sm:text-5xl">
                Consultoría antes que comisión.
              </p>
            </Reveal>

            <div className="mt-10 max-w-2xl space-y-4">
              <Reveal delay={0.24}>
                <p className="text-lg leading-relaxed text-muted-2">
                  Si una pieza más barata hace el trabajo igual de bien, te lo diremos.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg leading-relaxed text-muted-2">
                  Si gastar más no aporta una mejora real para tu uso, también te lo diremos.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — THE PERSON BEHIND PC LAB */}
      <section className="bg-background py-28 sm:py-40" aria-label="El fundador de PC LAB">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative order-1 lg:order-none">
              <div className="lg:sticky lg:top-24">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface-2">
                  <Image
                    src={asset("/founder/portrait.jpg")}
                    alt={portraitAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div className="order-2">
              <Reveal>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                  El fundador
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
                  Nicolás Sánchez Negrete
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-2 text-sm font-medium text-muted-2">Fundador de PC LAB</p>
              </Reveal>

              <div className="mt-9 space-y-6">
                <Reveal delay={0.18}>
                  <p className="text-base leading-[1.8] text-muted-2 sm:text-lg">
                    Mi relación con el hardware comenzó mucho antes de PC LAB. La curiosidad por entender cómo
                    funcionan los componentes me llevó a analizarlos, compararlos y aprender continuamente
                    sobre ellos.
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <p className="text-base leading-[1.8] text-muted-2 sm:text-lg">
                    Con el tiempo, esa curiosidad se convirtió en experiencia profesional dentro de la
                    industria tecnológica y del gaming. Hoy utilizo todo ese aprendizaje desde una perspectiva
                    diferente: no para venderte el ordenador más caro, sino para ayudarte a encontrar el que
                    realmente necesitas.
                  </p>
                </Reveal>
                <Reveal delay={0.3}>
                  <p className="text-base leading-[1.8] text-muted-2 sm:text-lg">
                    PC LAB es la forma de llevar esa experiencia a una conversación mucho más personal.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.36}>
                <p className="mt-10 border-t border-border pt-6 font-mono text-xs leading-relaxed tracking-wide text-muted">
                  Administración y Marketing · MBA en curso · Hardware · Gaming · Tecnología
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FINAL CTA */}
      <section className="light-section bg-2 py-32 sm:py-40" aria-label="Empieza tu proyecto">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Tu ordenador empieza con una conversación.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
              Cuéntanos qué quieres hacer, cuánto quieres invertir y qué esperas de tu equipo.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-3 text-base text-muted-2">Te responderemos con una propuesta pensada para ti.</p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contacto">
                <Button size="lg" variant="brand">
                  Empezar mi proyecto <ArrowRight className="size-4" aria-hidden />
                </Button>
              </Link>
              <Link href="/servicios">
                <Button size="lg" variant="outline">Ver cómo trabajamos</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}