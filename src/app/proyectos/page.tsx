import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { projects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cta } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Propuestas de diseño | PC LAB",
  description:
    "Propuestas de PC a medida: perfiles de uso, hardware seleccionado y rendimiento estimado. Cada diseño parte de tu caso real.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <>
      <div className="pt-36 pb-20">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Propuestas del estudio"
            title="Diseños que parten de tu caso."
            description="Cada propuesta es un escenario de uso: quién es, qué necesita y qué hardware lo resuelve. La tuya saldrá de una consulta, no de una plantilla."
          />

          <div className="mt-14 space-y-8">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                <article className="grid overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-56 bg-surface-2 p-4 lg:min-h-0">
                    <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
                    <Image
                      src={p.image}
                      alt={`Propuesta ${p.name}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-contain p-6"
                    />
                  </div>
                  <div className="flex flex-col p-7 sm:p-9">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="brand">{p.name}</Badge>
                      <Badge variant="outline">{p.purpose}</Badge>
                    </div>
                    <h2 className="mt-4 font-display text-xl font-bold sm:text-2xl">
                      {p.profile}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-2">{p.brief}</p>

                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {p.hardware.map((h) => (
                        <div key={h.label} className="rounded-lg border border-border bg-surface-2/40 px-3.5 py-2">
                          <span className="text-[10px] uppercase tracking-wide text-muted">{h.label}</span>
                          <p className="text-sm font-semibold">{h.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.benchmarks.map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/40 px-3 py-1 text-xs"
                        >
                          <Check className="size-3 text-brand" aria-hidden />
                          <span className="text-muted">{b.label}:</span>
                          <span className="font-semibold">{b.value}</span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-2 pt-6">
                      <Link href="/contacto">
                        <Button size="sm">Quiero algo así</Button>
                      </Link>
                      <Link href="/garantia">
                        <Button size="sm" variant="ghost">Garantía incluida <ArrowRight className="size-3.5" aria-hidden /></Button>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <Cta />
    </>
  );
}