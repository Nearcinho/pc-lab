import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            <span className="size-1 rounded-full bg-brand" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <Tag className="font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-6xl lg:leading-[1.05]">
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="text-base leading-relaxed text-muted-2 sm:text-lg lg:text-xl lg:leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
}