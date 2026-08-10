import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden
      {...props}
    >
      <defs>
        <linearGradient id="pc-lab-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bfeaff" />
          <stop offset="1" stopColor="#4fd1ff" />
        </linearGradient>
      </defs>
      <path
        d="M24 3 L42 13.5 V34.5 L24 45 L6 34.5 V13.5 Z"
        stroke="url(#pc-lab-grad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M15 32 L24 10 L33 32 L25.5 32 L24 27 L22.5 32 Z"
        fill="url(#pc-lab-grad)"
      />
      <path d="M21 34.5 H27" stroke="url(#pc-lab-grad)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}