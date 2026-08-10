import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Servicios de PC Personalizados en Madrid",
  description:
    "Descubre los servicios de PC LAB: diseño de PCs personalizados, asesoría, ensamblaje, configuración, testing, upgrades y mantenimiento en Madrid.",
  alternates: { canonical: "/servicios" },
};

const solutions = [
  {
    n: "01",
    title: "PC personalizado",
    description: "Un ordenador diseñado alrededor de lo que haces, lo que necesitas y lo que quieres conseguir.",
    text: "Gaming, creación de contenido, streaming, desarrollo, IA o productividad. Elegimos cada componente según tu uso y tu presupuesto.",
    points: ["Gaming", "Creación", "Trabajo · IA · Desarrollo"],
    cta: "Diseñar mi PC",
    href: "/configurador",
  },
  {
    n: "02",
    title: "Diseño y asesoría",
    description: "Si no sabes exactamente qué necesitas, empezamos por ahí.",
    text: "Analizamos tu presupuesto, tus aplicaciones, tus juegos y tus prioridades para proponerte una configuración equilibrada y justificada pieza a pieza.",
    points: ["Análisis de necesidades", "Selección de componentes", "Propuesta personalizada"],
    cta: "Hablar con PC LAB",
    href: "/contacto",
  },
  {
    n: "03",
    title: "Ensamblaje y puesta a punto",
    description: "Tu PC no termina cuando se montan los componentes.",
    text: "Montamos, configuramos y preparamos el equipo para que llegue listo para rendir.",
    points: ["Montaje y cable management", "BIOS, drivers y configuración", "Testing y validación"],
    cta: "Preparar mi PC",
    href: "/contacto",
  },
  {
    n: "04",
    title: "Upgrades y mantenimiento",
    description: "Si tu PC ya existe, también podemos hacerlo mejor.",
    text: "Analizamos tu equipo actual y determinamos qué merece la pena actualizar, qué puede mantenerse y qué no necesitas cambiar.",
    points: ["GPU · CPU · RAM · SSD", "Limpieza y mantenimiento", "Compatibilidad antes de actualizar"],
    cta: "Mejorar mi PC",
    href: "/contacto",
  },
];

const process = [
  {
    n: "01",
    title: "Compatibilidad",
    text: "Cada componente se verifica para trabajar correctamente con el resto.",
  },
  {
    n: "02",
    title: "Ensamblaje",
    text: "Montaje limpio y cable management pensado para rendimiento y mantenimiento.",
  },
  {
    n: "03",
    title: "Configuración",
    text: "BIOS, drivers y parámetros del sistema preparados para tu hardware.",
  },
  {
    n: "04",
    title: "Testing",
    text: "CPU, GPU, memoria y temperaturas se ponen a prueba bajo carga.",
  },
  {
    n: "05",
    title: "Validación",
    text: "Comprobamos que el equipo funciona como debe antes de entregarlo.",
  },
];

const decisions = [
  { situation: "Quiero un PC nuevo", solution: "PC personalizado", href: "/configurador" },
  { situation: "Sé lo que quiero, pero necesito ayuda para elegir", solution: "Diseño y asesoría", href: "/contacto" },
  { situation: "Ya tengo los componentes", solution: "Ensamblaje y puesta a punto", href: "/contacto" },
  { situation: "Ya tengo un PC", solution: "Upgrades y mantenimiento", href: "/contacto" },
];

export default function ServiciosPage() {
  return (
    <>
      {/* 01 — HERO */}
      <section className="relative overflow-hidden bg-background pt-36 pb-24 sm:pt-44 sm:pb-32" aria-label="Servicios de PC LAB">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,209,255,0.08),transparent_70%)]" aria-hidden />

        <div className="container-x relative">
          <div className="max-w-4xl">
            <Reveal>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                Servicios PC LAB
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-[4.6rem]">
                Todo lo que necesitas. En un solo lugar.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-2 sm:text-xl">
                Desde diseñar un PC desde cero hasta mejorar el que ya tienes. Te ayudamos a elegir, construir,
                configurar y mantener un equipo pensado para ti.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row">
                <Link href="/contacto">
                  <Button size="lg" variant="brand">
                    Empezar mi proyecto <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </Link>
                <Link
                  href="#proceso"
                  className="group inline-flex items-center gap-3 rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-brand/60 hover:text-brand"
                >
                  Ver cómo trabajamos
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 — THE FOUR SOLUTIONS */}
      <section className="light-section bg-2 py-28 sm:py-40" aria-label="Nuestras soluciones">
        <div className="container-x">
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:gap-x-14">
            {solutions.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 0.08}>
                <article className="flex h-full flex-col border-t border-border-strong pt-10">
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
                    {s.n}
                  </p>
                  <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 font-display text-lg font-medium tracking-tight text-foreground/90">
                    {s.description}
                  </p>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted-2">{s.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.points.map((p) => (
                      <li key={p} className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-2">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href={s.href}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
                    >
                      {s.cta}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — WHAT EVERY PC LAB BUILD INCLUDES */}
      <section id="proceso" className="bg-background py-28 sm:py-40" aria-label="El proceso de calidad de PC LAB">
        <div className="container-x">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand">
              Cada PC LAB pasa por aquí
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              No solo lo ensamblamos. Lo dejamos listo.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-2">
              Cada equipo personalizado pasa por un proceso de revisión antes de llegar a tus manos.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06}>
                <div className="border-b border-border py-10 pr-8 sm:border-r sm:last:border-r-0 lg:border-b-0">
                  <p className="font-mono text-[11px] font-medium tracking-[0.22em] text-muted">{p.n}</p>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-2">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — THE DIFFERENCE */}
      <section className="light-section bg-2 py-32 sm:py-44" aria-label="La diferencia de PC LAB">
        <div className="container-x">
          <div className="max-w-4xl">
            <Reveal>
              <p className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl">
                No vendemos una lista de componentes.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-brand-2 sm:text-6xl">
                Diseñamos una máquina.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-12 max-w-2xl text-lg leading-[1.75] text-muted-2 sm:text-xl">
                Un PC personalizado no consiste en juntar piezas caras. Consiste en encontrar el equilibrio
                correcto entre rendimiento, presupuesto, temperatura, ruido, compatibilidad y lo que realmente
                vas a hacer con él.
              </p>
            </Reveal>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {["Entender.", "Diseñar.", "Validar."].map((word, i) => (
                <Reveal key={word} delay={i * 0.08}>
                  <p className="font-display text-5xl font-semibold tracking-tight text-foreground/90 sm:text-6xl">
                    {word}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — WHICH ONE IS FOR YOU? */}
      <section className="bg-background py-28 sm:py-40" aria-label="Qué necesitas">
        <div className="container-x">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              ¿Qué necesitas?
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {decisions.map((d, i) => (
              <Reveal key={d.situation} delay={(i % 2) * 0.06}>
                <Link
                  href={d.href}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-border bg-surface/50 px-7 py-6 transition-colors duration-300 hover:border-brand/50"
                >
                  <div>
                    <p className="text-sm text-muted-2">{d.situation}</p>
                    <p className="mt-1 font-display text-xl font-semibold tracking-tight text-brand transition-colors group-hover:text-brand-2 sm:text-2xl">
                      {d.solution}
                    </p>
                  </div>
                  <ArrowRight className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — FINAL CTA */}
      <section className="light-section bg-2 py-32 sm:py-44" aria-label="Empieza tu proyecto">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
              Tu máquina empieza con una conversación.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl">
              Cuéntanos qué quieres hacer, cuánto quieres invertir y qué esperas de tu equipo.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contacto">
                <Button size="lg" variant="brand">
                  Empezar mi proyecto <ArrowRight className="size-4" aria-hidden />
                </Button>
              </Link>
              <Link href="/proyectos">
                <Button size="lg" variant="outline">Ver proyectos</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}