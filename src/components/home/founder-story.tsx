"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function FounderStory() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-[#0a0a0a] py-28 sm:py-40" aria-label="Confianza">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted"
            >
              <span className="inline-block h-px w-10 bg-border-strong" aria-hidden />
              05 — Confianza
            </motion.p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-7 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-[3.2rem]"
            >
              Detrás de cada PC hay experiencia.
            </motion.h2>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
              className="mt-8 max-w-lg text-base leading-[1.75] text-muted-2 sm:text-lg"
            >
              Un ordenador a medida solo merece la pena si está bien construido. Por eso cada equipo nace de
              un proceso real: selección de componentes que trabajan en conjunto, ensamblaje a mano y prueba
              de estrés antes de salir del taller. Tú no necesitas dominar el hardware; nosotros nos
              encargamos.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              className="mt-10"
            >
              <Link
                href="/faq"
                className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-brand"
              >
                <HelpCircle className="size-4 text-brand transition-transform duration-300 group-hover:rotate-6" aria-hidden />
                Preguntas frecuentes
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="rounded-2xl border border-border bg-surface p-8 sm:p-10"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              Garantía, por escrito
            </p>

            <p className="mt-8 font-mono text-sm text-muted-2">Todos los equipos PC LAB incluyen</p>
            <p className="mt-4 font-display text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl">
              1 año de garantía
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-2">
              En el ensamblado, más la garantía de cada componente que entrega el fabricante.
            </p>

            <Link
              href="/garantia"
              className="group mt-10 inline-flex items-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/60 hover:text-brand"
            >
              Ver toda la garantía
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}