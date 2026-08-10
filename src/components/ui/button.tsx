import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[#0c0c0c] text-white ring-1 ring-white/20 hover:ring-[#4fd1ff]/60 hover:bg-[#111111] hover:text-[#4fd1ff]",
        secondary:
          "border border-border-strong bg-surface-2/60 text-foreground backdrop-blur hover:border-brand/50 hover:text-brand",
        ghost: "text-muted-2 hover:text-foreground hover:bg-surface-2/70",
        outline: "border border-border-strong bg-transparent text-foreground hover:border-brand/60 hover:text-brand",
        brand: "bg-brand text-[#051018] hover:bg-[#8ae1ff] shadow-[0_0_40px_-14px_var(--brand-alpha)]",
        gradient:
          "bg-gradient-to-r from-brand to-[#bfeaff] text-[#051018] shadow-[0_0_44px_-12px_var(--brand-alpha)] hover:saturate-125",
        accent: "bg-brand text-[#051018] hover:bg-[#8ae1ff]",
        danger: "bg-red-600/90 text-white hover:bg-red-500",
      },
      size: {
        default: "h-12 px-7 text-[15px]",
        sm: "h-10 px-5 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "size-12",
        "icon-sm": "size-10",
        "icon-lg": "size-14",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      const child = React.Children.only(props.children) as React.ReactElement<
        React.HTMLAttributes<HTMLElement>
      >;
      const childProps = child.props as React.HTMLAttributes<HTMLElement>;
      return React.cloneElement(child, {
        ...childProps,
        className: cn(buttonVariants({ variant, size }), childProps.className),
      });
    }
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };