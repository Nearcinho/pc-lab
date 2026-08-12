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
    title: "Pensado para ti",
    text: "Elegimos cada componente según tu uso, tu presupuesto y lo que realmente necesitas.",
  },
  {
    n: "02",
    title: "Construido con cuidado",
    text: "Montamos cada equipo con atención a cada conexión, el cableado, la refrigeración y los pequeños detalles.",
  },
  {
    n: "03",
    title: "Probado antes de entregarlo",
    text: "Configuramos y ponemos a prueba el equipo para comprobar estabilidad, temperaturas y funcionamiento.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      {/* 01 — QUIÉN ESTÁ DETRÁS DE PC LAB */}
      <section className="relative overflow-hidden bg-background pt-36 pb-24 sm:pt-44 sm:pb-28" aria-label="Quién está detrás de PC LAB">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,209,255,0.08),transparent_70%)]" aria-hidden />

        <div className="container-x relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                  <span className="inline-block h-px w-10 bg-brand/40" aria-hidden />
                  Quién está detrás de PC LAB
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-8 max-w-3xl font-display text-[2.2rem] font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[2.75rem]">
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
      <section className="light-section bg-background py-28 sm:py-32" aria-label="Lo que recibe el cliente">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              No solo recibes un PC.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
              Recibes un equipo diseñado, construido y preparado alrededor de ti.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={0.05 * i}>
                <article className="border-t border-[#0a0a0a]/10 py-9 lg:py-10">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand-2">{p.n}</span>
                  <h3 className="mt-5 font-display text-2xl font-medium tracking-tight sm:text-[1.7rem]">{p.title}</h3>
                  <p className="mt-3 max-w-[32ch] text-sm leading-[1.75] text-muted-2">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <p className="mt-20 max-w-2xl font-display text-3xl font-semibold leading-[1.15] tracking-tight text-brand-2 sm:text-5xl">
              Porque un PC personalizado no consiste en juntar componentes. Consiste en hacer que todo tenga
              sentido.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}