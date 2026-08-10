"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const useCases = [
  {
    n: "01",
    title: "Gaming",
    text: "Máximo rendimiento para jugar como quieres.",
    image: "/cases/gaming.jpg",
  },
  {
    n: "02",
    title: "Creación",
    text: "Potencia para editar, diseñar y crear sin límites.",
    image: "/cases/creacion.jpg",
  },
  {
    n: "03",
    title: "Trabajo",
    text: "Una estación de trabajo diseñada para tu día a día.",
    image: "/cases/trabajo.jpg",
  },
  {
    n: "04",
    title: "IA & Desarrollo",
    text: "Rendimiento para código, datos e inteligencia artificial.",
    image: "/cases/ia-desarrollo.jpg",
  },
];

export function UseCases() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-background py-28 sm:py-36" aria-label="Casos de uso">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-10">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted"
            >
              <span className="inline-block h-px w-10 bg-border-strong" aria-hidden />
              02 — Casos de uso
            </motion.p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-7 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]"
            >
              Un PC para lo que tú haces.
            </motion.h2>
          </div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
            className="max-w-xs text-sm leading-relaxed text-muted-2"
          >
            Cuatro perfiles, un mismo criterio: que cada equipo responda al uso real.
          </motion.p>
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((uc, i) => (
            <motion.article
              key={uc.n}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.06 * i }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-surface sm:aspect-[4/5]">
                <Image
                  src={uc.image}
                  alt={`PC diseñado para ${uc.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="photo-grade object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent opacity-80" aria-hidden />
                <div className="photo-tint" aria-hidden />
                <div className="photo-grain" aria-hidden />
                <span className="absolute left-5 top-5 font-mono text-sm font-medium tracking-[0.2em] text-white/60">
                  {uc.n}
                </span>
              </div>
              <div className="mt-6">
                <h3 className="font-display text-xl font-medium tracking-tight">{uc.title}</h3>
                <p className="mt-2 max-w-[24ch] text-sm leading-relaxed text-muted-2">{uc.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}