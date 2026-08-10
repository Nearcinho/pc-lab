"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const promises = [
  { n: "01", title: "Ensamblaje a mano", text: "Cada equipo se monta y revisa en el taller." },
  { n: "02", title: "Test de estrés 24 h", text: "Nada sale sin pasar la prueba de estabilidad." },
  { n: "03", title: "Entrega personal en Madrid", text: "Te lo llevamos y comprobamos todo contigo." },
  { n: "04", title: "Soporte post-venta", text: "Seguimos disponibles después de la entrega." },
];

export function FounderStory() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-background py-28 sm:py-40" aria-label="Confianza">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <motion.aside
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="m-0 flex flex-col justify-between border border-border bg-surface-2 p-8 sm:p-10"
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              Garantía, por escrito
            </p>

            <div className="mt-10">
              <p className="font-mono text-sm text-muted-2">Todos los equipos PC LAB incluyen</p>
              <p className="mt-4 font-display text-6xl font-medium leading-none tracking-tight sm:text-7xl">
                1 año
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-2">
                de garantía en el ensamblado, más la garantía de cada componente que entrega el fabricante.
              </p>
            </div>

            <Link
              href="/garantia"
              className="group mt-10 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-brand"
            >
              Ver toda la garantía
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
            </Link>
          </motion.aside>

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
              className="mt-7 font-display text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-[3.2rem]"
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

            <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {promises.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
                  className="border-t border-border pt-4"
                >
                  <span className="font-mono text-sm font-medium tracking-tight text-muted">{p.n}</span>
                  <h4 className="mt-2 font-display text-base font-medium tracking-tight sm:text-lg">{p.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted-2">{p.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
              className="mt-9"
            >
              <Link
                href="/faq"
                className="group inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-brand"
              >
                Preguntas frecuentes
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}