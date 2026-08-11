"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ServicesStrip } from "@/components/servicios/services-strip";

export function Services() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-background py-28 sm:py-36" aria-label="Servicios">
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
              03 — Servicios
            </motion.p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-7 font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]"
            >
              Todo lo que necesitas para tu PC.
            </motion.h2>
          </div>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
            className="max-w-xs text-sm leading-relaxed text-muted-2"
          >
            Diseño, ensamblado, upgrades y mantenimiento. Un mismo criterio: rendimiento de verdad.
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="mt-12"
        >
          <ServicesStrip />
        </motion.div>
      </div>
    </section>
  );
}
