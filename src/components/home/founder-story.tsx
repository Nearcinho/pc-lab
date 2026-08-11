"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
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
    <section className="bg-[#0a0a0a] py-28 sm:py-40" aria-label="Confianza">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <motion.aside
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="m-0 flex flex-col justify-between rounded-xl border border-[#2b3f4d]/70 bg-[linear-gradient(180deg,#1d1d20_0%,#141416_100%)] p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_70px_-40px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-brand/50 sm:p-12"
            style={{
              backgroundImage:
                "linear-gradient(180deg,#1d1d20,#141416),repeating-linear-gradient(90deg,rgba(255,255,255,0.02) 0 1px,transparent 1px 3px)",
            }}
          >
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              Garantía, por escrito
            </p>

            <div className="mt-10">
              <p className="font-mono text-sm text-muted-2">Todos los equipos PC LAB incluyen</p>
              <p className="mt-4 font-display text-4xl font-medium leading-[1.06] tracking-tight text-foreground/90 sm:text-5xl">
                1 año de garantía
                <span className="ml-3 inline-block align-baseline font-sans text-sm font-normal leading-relaxed tracking-normal text-muted-2">
                  en el ensamblado, más la garantía de cada componente que entrega el fabricante.
                </span>
              </p>
            </div>

            <Link
              href="/garantia"
              className="group mt-10 inline-flex items-center justify-center gap-3 rounded-sm border border-brand/50 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand transition-all duration-300 hover:border-brand hover:bg-brand/10 hover:shadow-[0_0_24px_-6px_rgba(79,209,255,0.45)]"
            >
              Ver toda la garantía
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
          </motion.aside>

          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2"
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

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:gap-5">
              {promises.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
                  className="group rounded-xl border border-border bg-[#121212] p-6 transition-colors duration-300 hover:border-brand/40"
                >
                  <span className="font-mono text-sm font-medium tracking-tight text-muted transition-all duration-300 group-hover:text-brand group-hover:[text-shadow:0_0_14px_rgba(79,209,255,0.55)]">
                    {p.n}
                  </span>
                  <h4 className="mt-3 font-display text-base font-semibold tracking-tight text-foreground/95 sm:text-lg">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-2">{p.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
              className="mt-12"
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
        </div>
      </div>
    </section>
  );
}