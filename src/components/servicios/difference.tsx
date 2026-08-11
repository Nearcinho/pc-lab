"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { asset } from "@/lib/base";

const differences = [
  {
    kicker: "Diseño a medida",
    title: "Cada PC empieza por ti.",
    text: "No vendemos torres de catálogo. Escuchamos tu uso, tu presupuesto y tu futuro antes de elegir un solo componente.",
    video: asset("/videos/compatibility.mp4"),
  },
  {
    kicker: "Ensamblado con criterio",
    title: "Montaje limpio, sin prisas.",
    text: "Cable management ordenado, conexiones verificadas y configuración completa antes de cerrar la torre.",
    video: asset("/videos/cable-management.mp4"),
  },
  {
    kicker: "Probado antes de entregar",
    title: "Si falla, se queda en el taller.",
    text: "Test de estabilidad y rendimiento bajo carga real. Tu equipo llega funcionando, no a medias.",
    video: asset("/videos/testing.mp4"),
  },
  {
    kicker: "Garantía, por escrito",
    title: "1 año de garantía.",
    text: "En el ensamblado, más la garantía de cada componente que entrega el fabricante. Sin letra pequeña.",
    video: asset("/videos/optimizacion.mp4"),
  },
];

export function Difference() {
  const reduced = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const diff = differences[active];

  const select = React.useCallback((i: number) => {
    setActive(i);
    videoRef.current?.play().catch(() => {});
  }, []);

  React.useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, [active]);

  return (
    <section className="bg-background py-28 sm:py-40" aria-label="La diferencia que marca PC LAB">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted"
            >
              <span className="inline-block h-px w-10 bg-border-strong" aria-hidden />
              La diferencia
            </motion.p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-7 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.2rem]"
            >
              La diferencia que marca PC LAB.
            </motion.h2>

            <div className="mt-14">
              {differences.map((d, i) => {
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
                    className={`block w-full cursor-pointer border-t pt-6 text-left transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-0 ${isActive ? "border-brand/60" : "border-border hover:border-foreground/30"}`}
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span
                        className={`font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-brand" : "text-muted"}`}
                      >
                        {d.kicker}
                      </span>
                      <span
                        className={`font-display text-2xl font-medium tracking-tight transition-colors duration-300 sm:text-3xl ${isActive ? "text-foreground" : "text-muted-2"}`}
                      >
                        {d.title}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          key="text"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="block overflow-hidden"
                        >
                          <span className="block pt-4 text-base leading-relaxed text-muted-2">{d.text}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            <div className="relative overflow-hidden border border-border">
              <div className="relative aspect-[4/3] sm:aspect-[16/10]">
                <AnimatePresence initial={false} mode="sync">
                  <motion.video
                    key={diff.video}
                    ref={videoRef}
                    src={diff.video}
                    poster={asset("/builds/mono.svg")}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    aria-label={`${diff.kicker}: ${diff.title}`}
                  />
                </AnimatePresence>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/55 via-transparent to-transparent"
                  aria-hidden
                />
                <p
                  className="absolute bottom-5 left-6 rounded-sm bg-black/45 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/80"
                  aria-hidden
                >
                  Taller — {diff.kicker}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}