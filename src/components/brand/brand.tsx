import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/site";

interface BrandProps extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
  showText?: boolean;
}

export function Brand({ className, showText = true, ...props }: BrandProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — Inicio`}
      className={cn("group inline-flex items-center gap-2.5", className)}
      {...props}
    >
      <span className="relative transition-transform duration-500 group-hover:scale-105">
        <Logo />
      </span>
      {showText && (
        <span className="font-display text-[19px] font-semibold tracking-[0.2em] text-foreground">
          PC LAB<span className="text-muted-2">·Estudio</span>
        </span>
      )}
    </Link>
  );
}