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

const steps = [
  {
    n: "01",
    label: "Selección",
    text: "La configuración se revisa antes de comprar cualquier componente.",
  },
  {
    n: "02",
    label: "Ensamblaje",
    text: "El montaje se realiza con especial atención al cableado, la refrigeración y el acabado.",
  },
  {
    n: "03",
    label: "Comprobación",
    text: "El equipo se prueba antes de entregarlo para verificar estabilidad, temperaturas y funcionamiento.",
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

      {/* 02 — CÓMO SE CONSTRUYE Y QUÉ RECIBE EL CLIENTE */}
      <section className="light-section bg-background py-28 sm:py-36" aria-label="Cómo se construye cada PC">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <Reveal y={36} className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[#0a0a0a]/10 bg-surface-2">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={asset("/cases/ensamblado.png")}
                  className="h-full w-full object-cover"
                >
                  <source src={asset("/videos/cable-management.mp4")} type="video/mp4" />
                </video>
                <div className="photo-tint" aria-hidden />
                <div className="photo-grain" aria-hidden />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/60 via-transparent to-transparent" aria-hidden />
                <span className="absolute bottom-5 left-5 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/70">
                  Taller PC LAB · Ensamblaje
                </span>
                <span className="absolute bottom-5 right-5 size-2 rounded-full bg-brand" aria-hidden />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand-2">
                  <span className="inline-block h-px w-10 bg-[#0a0a0a]/30" aria-hidden />
                  Lo que recibes
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                  Cada PC pasa por mis manos.
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-6 max-w-lg text-base leading-[1.75] text-muted-2 sm:text-lg">
                  No ensamblamos PCs en serie. Cada equipo se monta individualmente, revisando cada
                  componente, cada conexión y cada detalle antes de entregarlo.
                </p>
              </Reveal>

              <div className="mt-10 border-t border-[#0a0a0a]/10">
                {steps.map((s, i) => (
                  <Reveal key={s.n} delay={0.05 * i}>
                    <div className="grid gap-2 border-b border-[#0a0a0a]/10 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand-2">{s.n}</span>
                      <div>
                        <h3 className="font-display text-xl font-medium tracking-tight sm:text-2xl">{s.label}</h3>
                        <p className="mt-1.5 max-w-md text-sm leading-[1.75] text-muted-2">{s.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.12}>
                <p className="mt-10 text-xl font-medium leading-[1.5] text-foreground sm:text-2xl">
                  El objetivo no es que solo funcione.
                  <span className="block">Es que <span className="text-brand">puedas confiar en él.</span></span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}