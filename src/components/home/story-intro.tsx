"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Cuéntanos qué necesitas.",
    text: "Una conversación sobre tu uso, tu presupuesto y tus planes.",
  },
  {
    n: "02",
    title: "Diseñamos tu configuración.",
    text: "Cada componente, justificado según lo que de verdad vas a hacer.",
  },
  {
    n: "03",
    title: "Montamos y probamos cada detalle.",
    text: "Ensamblaje a mano y test de estrés de 24 horas antes de entregar.",
  },
  {
    n: "04",
    title: "Te entregamos tu equipo.",
    text: "Entrega personalizada en Madrid y soporte después de la compra.",
  },
];

export function StoryIntro() {
  const reduced = useReducedMotion();

  return (
    <section className="light-section bg-background py-20 sm:py-24" aria-label="Qué hacemos">
      <div className="container-x">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <div className="order-2 lg:order-1">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#6a6a6a]"
            >
              <span className="inline-block h-px w-10 bg-[#0a0a0a]/30" aria-hidden />
              01 — Estudio de diseño
            </motion.p>

            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-8 font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[3.9rem]"
            >
              Tu ordenador
              <span className="block text-[#0e6f9e]">Comienza contigo.</span>
            </motion.h2>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="mt-9 max-w-md text-base leading-[1.7] text-[#555555] sm:text-lg"
            >
              Cuéntanos qué quieres hacer, cuánto quieres invertir y qué esperas de tu equipo. Diseñamos
              una configuración personalizada alrededor de ti.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mt-14"
            >
              <h3 className="font-display text-2xl font-medium leading-[1.06] tracking-[-0.02em] sm:text-3xl">
                Así empieza tu PC.
              </h3>
              <ol className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10">
                {steps.map((step, i) => (
                  <motion.li
                    key={step.n}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
                    className="border-t border-[#0a0a0a]/10 pt-4"
                  >
                    <span className="font-mono text-base font-medium tracking-tight text-[#0a0a0a]/25">{step.n}</span>
                    <h4 className="mt-3 font-display text-base font-medium tracking-tight sm:text-lg">{step.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#555555]">{step.text}</p>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>

          <motion.figure
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="order-1 m-0 lg:order-2 lg:sticky lg:top-24 lg:self-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-[#0a0a0a]/10 bg-[#0b0b0f]">
              <Image
                src="/cases/tu-pc.jpg"
                alt="Equipo PC LAB diseñado y ensamblado a medida"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="photo-grade object-cover"
              />
              <div className="photo-tint" aria-hidden />
              <div className="photo-grain" aria-hidden />
              <div className="absolute inset-x-6 top-6 flex items-start justify-between" aria-hidden>
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">Fig. 01</span>
                <span className="size-2 rounded-full bg-[#4fd1ff]" />
              </div>
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[#6a6a6a]">
              <span>PC LAB · Estudio de diseño — 2026</span>
              <span>Madrid</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}