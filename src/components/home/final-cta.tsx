"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function FinalCta() {
  const reduced = useReducedMotion();

  return (
    <section
      className="light-section relative overflow-hidden bg-background py-36 sm:py-52"
      style={{ "--bg": "#ffffff" } as React.CSSProperties}
      aria-label="Empieza tu proyecto"
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(22,143,204,0.07),transparent_70%)]" aria-hidden />

      <div className="container-x relative text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-brand"
        >
          Sin compromiso · Respuesta en 24 h
        </motion.p>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="mx-auto mt-8 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[5.5rem]"
        >
          Tu próximo PC empieza aquí.
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-muted-2 sm:text-xl"
        >
          Cuéntanos qué necesitas. Nosotros diseñamos el resto.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/contacto">
            <span className="group inline-flex items-center gap-2 rounded-full bg-brand px-10 py-4 text-sm font-semibold text-[#051018] transition-all duration-300 hover:bg-[#8ae1ff]">
              Empezar mi proyecto
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
          <Link href="/proyectos">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-strong px-10 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-brand/60 hover:text-brand">
              Ver proyectos
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}