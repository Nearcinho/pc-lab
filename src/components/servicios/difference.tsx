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
    <section className="relative bg-[#0a0a0a]" aria-label="La diferencia que marca PC LAB">
      <div className="absolute inset-0 overflow-hidden">
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            aria-label={`${diff.kicker}: ${diff.title}`}
          />
        </AnimatePresence>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/60 to-[#050505]/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-[#050505]/50"
          aria-hidden
        />
      </div>

      <div className="relative container-x py-32 sm:py-44">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/60"
            >
              <span className="inline-block h-px w-10 bg-white/30" aria-hidden />
              La diferencia
            </motion.p>
            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-balance text-white sm:text-5xl lg:text-[3.6rem]"
            >
              La diferencia que marca PC LAB.
            </motion.h2>
          </div>
          <p
            className="hidden rounded-sm bg-black/45 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-white/80 lg:block"
            aria-hidden
          >
            Taller — {diff.kicker}
          </p>
        </div>

        <div className="mt-20 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {differences.map((d, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={d.kicker}
                type="button"
                onClick={() => select(i)}
                aria-pressed={isActive}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.06 * i }}
                className={`group block min-h-56 cursor-pointer border-t border-white/20 p-6 text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-0 lg:border-l lg:border-t-0 lg:min-h-72 lg:p-8 ${isActive ? "bg-white/[0.07] backdrop-blur-sm" : "hover:bg-white/[0.03]"}`}
              >
                <span
                  className={`font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-brand" : "text-white/50"}`}
                >
                  {d.kicker}
                </span>
                <span className="mt-4 flex min-h-16 items-end">
                  <span
                    className={`font-display text-2xl font-medium tracking-tight transition-colors duration-300 sm:text-[1.7rem] ${isActive ? "text-white" : "text-white/60"}`}
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
                      <span className="block pt-4 text-sm leading-relaxed text-white/70">{d.text}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}