import * as React from "react";
import { Reveal } from "@/components/ui/reveal";

interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
}

export function LegalPageShell({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="pt-32 pb-20">
      <div className="container-x max-w-3xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 text-muted">{description}</p>
          <p className="mt-2 text-xs text-muted/70">Última actualización: {updated}</p>
        </Reveal>

        <div className="mt-12 space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 0.05, 0.2)}>
              <section id={s.id} className="scroll-mt-24">
                <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                {s.paragraphs?.map((p, pi) => (
                  <p key={pi} className="mt-3 leading-relaxed text-muted">{p}</p>
                ))}
                {s.list && (
                  <ul className="mt-3 space-y-2">
                    {s.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-muted">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}