import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { founder } from "@/lib/brand";
import { asset } from "@/lib/base";
import { siteConfig } from "@/lib/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Briefcase, Microscope, Layers, Sparkles, Quote } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { Cta } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "Quiénes somos | PC LAB",
  description:
    "La historia de Nicolás Sánchez Negrete, fundador de PC LAB: más de 10 años entre el hardware y el marketing, de Madbox a GIGABYTE, y la idea que dio origen a PC LAB.",
  alternates: { canonical: "/nosotros" },
};

const journey = [
  { icon: Microscope, tag: "Madbox PC", text: "Editor de contenido especializado en tecnología, gaming y hardware: reviews y análisis de componentes de PC para audiencias digitales." },
  { icon: Briefcase, tag: "Experto en hardware", text: "Asesor de configuración de equipos personalizados para clientes con requerimientos técnicos avanzados." },
  { icon: Layers, tag: "GIGABYTE - AORUS", text: "Gerente de Marketing para Latinoamérica: 7 mercados, estrategia regional y la marca líder en componentes en Argentina." },
  { icon: Sparkles, tag: "PC LAB", text: "Fundó PC LAB con un convencimiento: cada persona merece el ordenador diseñado para su alrededor." },
];

const pillars = [
  { title: "Formación de negocio", text: "Ingeniería en Administración de Empresas, mención Marketing. Entiende el negocio del hardware y la parte de servicio." },
  { title: "MBA en curso", text: "Máster en Administración y Dirección de Empresas (EUDE, Madrid) y certificaciones en IA para los negocios: liderazgo con método y visión de largo plazo." },
  { title: "Criterio técnico", text: "Sabe leer una hoja de especificaciones y también la hoja de cartera del cliente. Las dos importan." },
];

export default function NosotrosPage() {
  return (
    <>
      <div className="pt-32 pb-20">
        <div className="container-x">
          <SectionHeading
            as="h1"
            eyebrow="Quiénes somos"
            title="Detrás de PC LAB hay una persona que construyó su vida con el hardware."
            description="Queremos que conozcas al fundador: su camino, su industria y la idea que sostiene cada consulta."
          />

          {/* The founder narrative */}
          <div className="mx-auto mt-16 grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 lg:sticky lg:top-24">
                <div className="pointer-events-none absolute -inset-x-6 -top-10 h-40 bg-[radial-gradient(closest-side,var(--brand-alpha),transparent)] opacity-50" aria-hidden />
                <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-2xl border border-brand/25 bg-brand/10 font-display text-3xl font-bold text-gradient">
                  <Image
                    src={asset("/founder/portrait.jpg")}
                    alt={`Retrato de ${founder.name}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold">{founder.name}</h2>
                <p className="mt-1 text-sm text-muted-2">{founder.role}</p>
                <Link
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-brand transition-colors hover:text-brand-2"
                >
                  <LinkedInIcon className="size-4" />
                  LinkedIn
                </Link>

                <ul className="mt-6 space-y-2">
                  {founder.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl border border-border bg-surface-2/40 p-5">
                  <Quote className="size-5 text-brand/70" aria-hidden />
                  <p className="mt-3 font-display text-base font-semibold leading-snug">&ldquo;{founder.quote}&rdquo;</p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal>
                <p className="text-xl leading-relaxed text-foreground/90">{founder.intro}</p>
              </Reveal>

              {founder.chapters.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.06}>
                  <article className="rounded-3xl border border-border bg-surface p-7">
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-2 sm:text-base">{c.text}</p>
                  </article>
                </Reveal>
              ))}

              <Reveal>
                <div className="rounded-3xl border border-brand/25 bg-brand/5 p-7">
                  <div className="flex flex-wrap gap-2">
                    {journey.map((j) => {
                      const IconCol = j.icon;
                      return (
                        <div key={j.tag} className="flex items-start gap-3 rounded-xl px-2 py-1">
                          <IconCol className="size-5 text-brand" aria-hidden />
                          <div>
                            <p className="text-sm font-semibold">{j.tag}</p>
                            <p className="text-xs leading-relaxed text-muted">{j.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-3">
                {pillars.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.06}>
                    <div className="card-hover h-full rounded-2xl border border-border bg-surface p-5">
                      <h4 className="text-sm font-semibold">{p.title}</h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-2">{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cta />
    </>
  );
}