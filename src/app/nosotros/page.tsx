import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/base";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Quiénes somos | PC LAB",
  description:
    "PC LAB aplica a tu ordenador el mismo cuidado que pondría en el suyo: diseño a medida, montaje cuidadoso, configuración y pruebas antes de entregar.",
  alternates: { canonical: "/nosotros" },
};

const portraitAlt = "Nicolás Sánchez Negrete, fundador de PC LAB";

const principles = [
  {
    n: "01",
    title: "Elegido con criterio",
    text: "Cada componente responde a tu presupuesto, tu uso y al resto del equipo.",
  },
  {
    n: "02",
    title: "Ensamblado con cuidado",
    text: "Cableado, refrigeración, conexiones y montaje realizados pensando en rendimiento y mantenimiento.",
  },
  {
    n: "03",
    title: "Probado antes de entregarlo",
    text: "Configuramos y comprobamos temperaturas, estabilidad y funcionamiento antes de que llegue a tus manos.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* 01 — QUIÉN ESTÁ DETRÁS DE PC LAB */}
      <section className="relative overflow-hidden bg-background pt-36 pb-24 sm:pt-44 sm:pb-28" aria-label="Quién está detrás de PC LAB">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,209,255,0.08),transparent_70%)]" aria-hidden />

        <div className="container-x relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                  <span className="inline-block h-px w-10 bg-brand/40" aria-hidden />
                  Quién está detrás de PC LAB
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-8 max-w-4xl font-display text-[2.3rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-[2.6rem]">
                  <span className="text-brand">"</span>
                  Ensamblo cada PC con el mismo cuidado como{" "}
                  <span className="text-gradient">si fuera el mío.</span>
                  <span className="text-brand">"</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 max-w-xl text-base leading-[1.75] text-muted-2 sm:text-lg">
                  Desde pequeño, construir y entender ordenadores ha sido una pasión. Con el tiempo, esa pasión
                  se convirtió en experiencia profesional trabajando con hardware, gaming y tecnología.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-5 max-w-xl text-base leading-[1.75] text-muted-2 sm:text-lg">
                  PC LAB nace para llevar esa experiencia a algo más personal: construir ordenadores pensados
                  para la persona que realmente los va a utilizar.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p className="mt-9 max-w-xl border-t border-border pt-6 text-sm leading-[1.8] text-muted">
                  Una pasión que comenzó de pequeño y que, con los años, me llevó a trabajar en GIGABYTE y a
                  construir PCs para algunos de los equipos y escenarios más exigentes del gaming y los
                  esports.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2} y={40} className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-surface-2">
                <Image
                  src={asset("/founder/portrait.jpg")}
                  alt={portraitAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="photo-grade object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/50 via-transparent to-transparent" aria-hidden />
                <span className="absolute bottom-4 left-4 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
                  PC LAB · Madrid
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — LO QUE RECIBE EL CLIENTE */}
      <section className="light-section bg-background py-28 sm:py-32" aria-label="Lo que hay detrás de cada PC">
        <div className="container-x">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                Lo que hay detrás de cada PC.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-2 sm:text-lg">
                No se trata solo de ensamblar componentes. Se trata de tomar las decisiones correctas antes,
                durante y después del montaje.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-12 border-t border-[#0a0a0a]/10 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={0.05 * i}>
                <article>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand-2">{p.n}</span>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-tight sm:text-[1.65rem]">{p.title}</h3>
                  <p className="mt-3 max-w-[34ch] text-sm leading-[1.8] text-muted-2">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <p className="mt-24 max-w-2xl text-xl leading-[1.6] text-foreground sm:text-2xl">
              No se trata de poner las mejores piezas.
              <span className="block">Se trata de elegir <span className="font-semibold text-brand">las piezas correctas.</span></span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}