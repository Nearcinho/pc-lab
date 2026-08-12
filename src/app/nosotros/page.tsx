import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
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
    text: "Una configuración basada en tu uso real, no en una lista genérica de componentes.",
  },
  {
    n: "02",
    title: "Montado con cuidado",
    text: "Cada componente se instala y organiza pensando en rendimiento, temperatura, estabilidad y mantenimiento.",
  },
  {
    n: "03",
    title: "Configurado para rendir",
    text: "BIOS, drivers y configuración preparados para que el hardware trabaje como debe.",
  },
  {
    n: "04",
    title: "Probado antes de entregarlo",
    text: "Comprobamos el funcionamiento del equipo antes de que llegue a ti.",
  },
];

const experience = [
  { year: "2023", event: "Final de la LLA · Riot Games", place: "Chile" },
  { year: undefined, event: "Finales de Counter-Strike 2", place: "Argentina Game Show" },
  { year: undefined, event: "Red Bull Campus Clutch", place: undefined },
  { year: undefined, event: "Arena BK", place: "Chile" },
  { year: undefined, event: "PCs para influencers y creadores", place: undefined },
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
                <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                  <span className="inline-block h-px w-10 bg-brand/40" aria-hidden />
                  Quién está detrás de PC LAB
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-8 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-[4.2rem]">
                  Tu PC merece el mismo cuidado que
                  <span className="block text-gradient">tendría el nuestro.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
                  PC LAB nació de una pasión por los ordenadores que empezó mucho antes de convertirse en un
                  trabajo.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <Link
                  href="#filosofia"
                  className="group mt-10 inline-flex items-center gap-3 rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-brand/60 hover:text-brand"
                >
                  Conoce cómo trabajamos
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

      {/* 02 — THE PHILOSOPHY */}
      <section id="filosofia" className="light-section scroll-mt-24 bg-background py-28 sm:py-40" aria-label="La filosofía de PC LAB">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-[4.5rem]">
              Cada ordenador tiene una razón para existir.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-[0.5fr_1fr] lg:gap-24">
            <Reveal delay={0.08}>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-brand-2 sm:text-3xl">
                No creemos en montar el PC más caro. Creemos en construir el PC correcto.
              </p>
            </Reveal>
            <div className="space-y-12">
              <Reveal delay={0.12}>
                <div className="border-t border-border pt-6">
                  <p className="text-lg leading-[1.75] text-muted-2 sm:text-xl">
                    Por eso empezamos por ti: lo que haces, lo que juegas, lo que necesitas y cuánto quieres
                    invertir.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="border-t border-border pt-6">
                  <p className="text-lg leading-[1.75] text-muted-2 sm:text-xl">
                    Cada componente tiene que tener sentido. Cada decisión tiene que estar justificada.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — WHAT THE CUSTOMER ACTUALLY RECEIVES */}
      <section className="bg-background py-28 sm:py-40" aria-label="Lo que recibes">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-10">
            <div>
              <Reveal>
                <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                  <span className="inline-block h-px w-10 bg-border-strong" aria-hidden />
                  Incluido en cada PC LAB
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-7 max-w-2xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]">
                  Lo que recibes va más allá de un PC ensamblado.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.14}>
              <p className="max-w-xs text-sm leading-relaxed text-muted-2">
                Recibes un equipo pensado para ti, construido con cuidado y revisado antes de llegar a tus
                manos.
              </p>
            </Reveal>
          </div>

          <div className="mt-2 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={0.05 * i}>
                <article className="border-t border-border py-10">
                  <span className="font-mono text-sm font-medium tracking-tight text-muted">{p.n}</span>
                  <h3 className="mt-5 font-display text-2xl font-medium tracking-tight sm:text-[1.7rem]">{p.title}</h3>
                  <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted-2">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — THE EXPERIENCE */}
      <section className="light-section bg-2 py-28 sm:py-40" aria-label="Experiencia">
        <div className="container-x">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#6a6a6a]">
              <span className="inline-block h-px w-10 bg-[#0a0a0a]/30" aria-hidden />
              Experiencia que se nota en cada detalle
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-8 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Antes de construir PCs para clientes, los construía para escenarios donde no había margen para
              equivocarse.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-2xl text-lg leading-[1.75] text-muted-2 sm:text-xl">
              Desde pequeño, montar y entender ordenadores ha sido una pasión. Con el tiempo, esa pasión se
              convirtió en experiencia profesional trabajando con hardware, gaming y tecnología.
            </p>
          </Reveal>

          <div className="mt-16 border-t border-border">
            {experience.map((e, i) => (
              <Reveal key={e.event} delay={0.04 * i}>
                <div className="grid gap-2 border-b border-border py-8 sm:grid-cols-[0.4fr_1fr_0.5fr] sm:items-baseline sm:gap-8 sm:py-10">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                    {e.year ?? "—"}
                  </p>
                  <p className="font-display text-2xl font-medium tracking-tight sm:text-3xl">{e.event}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted sm:text-right">
                    {e.place ?? "\u00A0"}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-14 max-w-2xl text-base leading-[1.75] text-muted-2 sm:text-lg">
              Trabajar en entornos donde un equipo tiene que funcionar sin margen de error te enseña una cosa:
              que la atención al detalle no es opcional. Esa es la misma atención que aplicamos a cada PC que
              construimos para ti.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 05 — THE DIFFERENCE */}
      <section className="flex min-h-[70svh] items-center bg-background py-32 sm:py-40" aria-label="La diferencia" >
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-7xl lg:text-[5.5rem]">
              No queremos que recibas un PC.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-7xl lg:text-[5.5rem]">
              Queremos que recibas <span className="text-gradient">TU PC.</span>
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
              Uno que tenga sentido para lo que haces hoy y que siga teniendo sentido mañana.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-14 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              Porque cuando un ordenador está bien diseñado, se nota.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 06 — THE FOUNDER */}
      <section className="bg-[#0a0a0a] py-28 sm:py-36" aria-label="El fundador">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                <span className="inline-block h-px w-10 bg-brand/40" aria-hidden />
                El fundador
                <span className="inline-block h-px w-10 bg-brand/40" aria-hidden />
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-7 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                Nicolás Sánchez Negrete
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-3 text-sm font-medium text-muted-2">Fundador de PC LAB</p>
            </Reveal>

            <div className="mt-12 space-y-7 text-left sm:text-center">
              <Reveal delay={0.16}>
                <p className="text-base leading-[1.8] text-muted-2 sm:text-lg">
                  Mi relación con los ordenadores empezó desde muy pequeño. Lo que comenzó como una pasión por
                  entender, desmontar y montar hardware terminó convirtiéndose en una carrera alrededor de la
                  tecnología, el gaming y el hardware.
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="text-base leading-[1.8] text-muted-2 sm:text-lg">
                  Después de años trabajando con componentes, marcas, gaming y esports, decidí llevar esa
                  experiencia a algo más personal: construir ordenadores que realmente tengan sentido para quien
                  los va a utilizar.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p className="pt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
                  PC LAB nace con una idea sencilla:{" "}
                  <span className="text-brand">tratar cada ordenador como si fuera mío.</span>
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — FINAL CTA */}
      <section className="light-section bg-2 py-32 sm:py-44" aria-label="Empieza tu proyecto">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Tu ordenador empieza contigo.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
              Cuéntanos qué quieres hacer, cuánto quieres invertir y qué esperas de tu equipo.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-10 py-4 text-sm font-semibold text-[#051018] transition-all duration-300 hover:bg-[#8ae1ff]"
              >
                Empezar mi proyecto
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/servicios"
                className="group inline-flex items-center gap-2 rounded-full border border-border-strong px-10 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/60 hover:text-brand"
              >
                Ver servicios
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}