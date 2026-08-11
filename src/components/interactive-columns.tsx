"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type DifferenceItem = {
  kicker: string;
  title: string;
  text: string;
};

export function InteractiveColumns({
  items,
  active: controlledActive,
  onSelect,
}: {
  items: DifferenceItem[];
  active?: number;
  onSelect?: (index: number) => void;
}) {
  const reduced = useReducedMotion();
  const [internal, setInternal] = React.useState(0);
  const active = controlledActive ?? internal;

  const select = (i: number) => {
    setInternal(i);
    onSelect?.(i);
  };

  return (
    <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
      {items.map((d, i) => {
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
  );
}