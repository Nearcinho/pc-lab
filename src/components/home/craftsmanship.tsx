"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const details = [
  { kicker: "Cable Management", text: "Orden por dentro. Precisión en cada conexión.", video: "/videos/cable-management.mp4" },
  { kicker: "Compatibilidad", text: "Cada componente elegido para trabajar en conjunto.", video: "/videos/compatibility.mp4" },
  { kicker: "Optimización", text: "BIOS, drivers y configuración preparados para rendir.", video: "/videos/optimizacion.mp4" },
  { kicker: "Testing", text: "Probamos el equipo antes de entregarlo.", video: "/videos/testing.mp4" },
];

export function Craftsmanship() {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const detail = details[active];

  const advance = React.useCallback(() => {
    setActive((i) => (i + 1) % details.length);
  }, []);

  const select = React.useCallback((i: number) => {
    setActive(i);
    videoRef.current?.play().catch(() => {});
  }, []);

  React.useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [active]);

  return (
    <section className="light-section bg-background py-28 sm:py-36" aria-label="Artesanía">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[#6a6a6a]"
            >
              <span className="inline-block h-px w-10 bg-[#0a0a0a]/30" aria-hidden />
              04 — Artesanía
            </motion.p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-7 max-w-2xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-[3.4rem]"
            >
              Lo que no se ve también importa.
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          className="mt-12"
        >
          <div className="relative overflow-hidden border border-border">
            <div className="relative aspect-[16/9] sm:aspect-[21/9]">
              <AnimatePresence initial={false} mode="sync">
                <motion.video
                  key={detail.video}
                  ref={videoRef}
                  src={detail.video}
                  poster="/builds/apex.svg"
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onEnded={advance}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label={`${detail.kicker}: ${detail.text}`}
                />
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/55 via-transparent to-transparent" aria-hidden />
              <p className="absolute bottom-5 left-6 rounded-sm bg-black/45 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/80" aria-hidden>
                Taller — {detail.kicker}
              </p>
              <p className="absolute bottom-5 right-6 rounded-sm bg-black/45 px-2 py-1 font-mono text-[10px] font-medium tracking-[0.28em] text-white/80" aria-hidden>
                {String(active + 1).padStart(2, "0")} / 04
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={d.kicker}
                type="button"
                onClick={() => select(i)}
                aria-pressed={isActive}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 * i }}
                className={`group block cursor-pointer border-t pt-5 text-left transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-0 ${isActive ? "border-brand/60" : "border-border hover:border-foreground/30"}`}
              >
                <span
                  className={`block font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-brand" : "text-muted group-hover:text-foreground"}`}
                >
                  {d.kicker}
                </span>
                <span className={`mt-3 block text-sm leading-relaxed transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-2 group-hover:text-foreground/90"}`}>{d.text}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}