"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string[];
}

export function Accordion({ items, type = "single", defaultValue = [], className, ...props }: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultValue);

  const toggle = (value: string) => {
    if (type === "single") {
      setOpen(open[0] === value ? [] : [value]);
    } else {
      setOpen((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    }
  };

  return (
    <div className={cn("space-y-3", className)} {...props}>
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div
            key={item.value}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors duration-300",
              isOpen ? "border-brand/30 bg-surface-2/60" : "border-border bg-surface/50 hover:border-border-strong"
            )}
          >
            <button
              type="button"
              onClick={() => toggle(item.value)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-base font-semibold text-foreground">{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn("shrink-0", isOpen ? "text-brand" : "text-muted")}
              >
                <ChevronDown className="size-5" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}