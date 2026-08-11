"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { asset } from "@/lib/base";

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
    image: asset("/cases/mantenimiento.png"),
    alt: "Mantenimiento de un PC en PC LAB",
  },
] as const;

export function ServicesStrip({ autoRotate = false }: { autoRotate?: boolean }) {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState<number | null>(autoRotate ? 0 : null);
  const hovering = React.useRef(false);

  React.useEffect(() => {
    if (!autoRotate || reduced) return;
    const id = window.setInterval(() => {
      if (hovering.current) return;
      setActive((i) => (i === null ? 0 : (i + 1) % services.length));
    }, 4000);
    return () => window.clearInterval(id);
  }, [autoRotate, reduced]);

  return (
    <>
      {/* Móvil */}
      <div className="space-y-14 lg:hidden">
        {services.map((s) => (
          <article key={s.n}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-surface-2">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="100vw"
                className="photo-grade object-cover"
              />
              <div className="photo-tint" aria-hidden />
              <div className="photo-grain" aria-hidden />
              <span className="absolute left-5 top-5 font-mono text-sm font-medium tracking-[0.2em] text-white/70">
                {s.n}
              </span>
            </div>
            <div className="mt-7">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-2">{s.description}</p>
              {s.line && (
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">{s.line}</p>
              )}
              <div className="mt-6">
                <Link
                  href={s.href}
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
                >
                  {s.cta}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Escritorio */}
      <div
        className="hidden lg:flex justify-center"
        onMouseEnter={() => {
          hovering.current = true;
        }}
        onMouseLeave={() => {
          hovering.current = false;
          setActive(null);
        }}
      >
        <div
          className="relative w-auto overflow-hidden bg-[#050505]"
          style={{ aspectRatio: "16 / 9", height: "min(70vh, 88vw * 9 / 16)" }}
        >
          <div className="absolute inset-0 flex gap-px">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <Link
                  key={s.n}
                  href={s.href}
                  onMouseEnter={() => setActive(i)}
                  aria-expanded={isActive}
                  className={`relative h-full cursor-pointer overflow-hidden text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 ${isActive ? "flex-[2.6]" : "flex-1"}`}
                >
                  <div
                    className={`absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? "scale-110" : "scale-100"}`}
                  >
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 1536px) 50vw, 33vw"
                      className="photo-grade object-cover"
                    />
                  </div>
                  <div className="photo-tint" aria-hidden />
                  <div className="photo-grain" aria-hidden />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/25 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="p-6 xl:p-8">
                      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
                        {s.n}
                      </p>
                      <h2
                        className={`mt-2 font-display font-semibold tracking-tight text-white transition-all duration-500 ${isActive ? "text-3xl" : "text-xl"}`}
                      >
                        {s.title}
                      </h2>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="expanded"
                            initial={reduced ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 14 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">{s.description}</p>
                            {s.line && (
                              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
                                {s.line}
                              </p>
                            )}
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                              {s.cta}
                              <ArrowRight className="size-4" aria-hidden />
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}