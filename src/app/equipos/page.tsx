import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gamepad2, MonitorCog, Laptop } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Soluciones PC LAB | Diseño a medida para gaming, creación y streaming",
  description:
    "No elegimos de catálogo: diseñamos cada PC según tu caso. Gaming, workstations y streaming con consultoría, ensamble premium y certificación de 24 h.",
  alternates: { canonical: "/equipos" },
};

const solutions = [
  {
    slug: "gaming",
    icon: Gamepad2,
    title: "Gaming a medida",
    description:
      "Priorizamos la GPU y la caché correctas para tus títulos, tu resolución y tu tasa de refresco. Sin pagar por marketing.",
    bullets: ["Análisis de tu juego y resolución", "GPU/CPU equilibradas para tu caso", "Optimización de FPS y latencia"],
  },
  {
    slug: "workstation",
    icon: MonitorCog,
    title: "Workstations de creación",
    description:
      "Render, edición 4K/8K, IA y desarrollo: VRAM y núcleos justos para tu pipeline real, no para la hoja de marketing.",
    bullets: ["Render y compilación al máximo", "VRAM y RAM según tu carga", "Estabilidad certificada 24/7"],
  },
  {
    slug: "streaming",
    icon: Laptop,
    title: "Streaming sin sustos",
    description:
      "Codificación NVENC, ruido bajo y multitarea estable para emitir y jugar sin perder un solo frame.",
    bullets: ["NVENC y audio configurados", "Silencio bajo carga", "Perfil de emisión listo para OBS"],
  },
];

export default function EquiposPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-x">
        <SectionHeading
          as="h1"
          eyebrow="Soluciones PC LAB"
          title="No eliges un equipo. Explicas tu caso."
          description="Empezamos por tus necesidades, no por un catálogo. Estas tres vías son el punto de partida de una conversación."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {solutions.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <Link
                href={`/equipos/${c.slug}`}
                className="card-hover group flex h-full flex-col rounded-3xl border border-border bg-surface p-8"
              >
                <span className="flex size-14 items-center justify-center rounded-2xl border border-brand/25 bg-brand/5 text-brand">
                  <c.icon className="size-6" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-xl font-semibold">{c.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-2">{c.description}</p>
                <ul className="mt-5 space-y-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-2 transition-colors group-hover:text-brand">
                    Ver cómo lo diseñamos <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}