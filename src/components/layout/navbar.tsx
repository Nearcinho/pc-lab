"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Brand } from "@/components/brand/brand";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/site";

function NavItem({ label, href, items }: { label: string; href: string; items?: { label: string; href: string; description: string }[] }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const hrefFor = href === "/servicios" ? "/#servicios" : href;
  const isActive = pathname === href || (items?.some((c) => pathname === c.href) ?? false);
  const isDropdown = Boolean(items?.length);

  return (
    <div
      className="relative"
      onMouseEnter={() => isDropdown && setOpen(true)}
      onMouseLeave={() => isDropdown && setOpen(false)}
    >
      <Link
        href={hrefFor}
        aria-haspopup={isDropdown ? "true" : undefined}
        aria-expanded={isDropdown ? open : undefined}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
          isActive ? "text-brand" : "text-muted-2 hover:text-foreground"
        )}
      >
        {label}
        {isDropdown && (
          <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden />
        )}
      </Link>
      <AnimatePresence>
        {isDropdown && open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
          >
            <div className="glass-strong overflow-hidden rounded-2xl p-2 shadow-card">
              {items!.map((child) => {
                const childActive = pathname === child.href;
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 transition-colors",
                      childActive ? "bg-brand/10" : "hover:bg-surface-2/80"
                    )}
                  >
                    <span className={cn("block text-sm font-semibold", childActive ? "text-brand" : "text-foreground")}>
                      {child.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">{child.description}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [prevPath, setPrevPath] = React.useState(pathname);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "py-2" : "py-5")}>
      <nav aria-label="Navegación principal" className="container-x">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled
              ? "glass-strong rounded-full py-2 pl-5 pr-2 shadow-card"
              : "rounded-full py-2 pl-5 pr-2"
          )}
        >
          <Brand />

          <div className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.children ? (
                <NavItem key={item.href} href={item.href} label={item.label} items={item.children} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href === "/servicios" ? "/#servicios" : item.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                    pathname === item.href ? "text-brand" : "text-muted-2 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/contacto">
              <Button size="sm" className="bg-brand text-[#051018] hover:bg-[#8ae1ff]">Empezar proyecto</Button>
            </Link>
          </div>

          <button
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface-2/60 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="container-x lg:hidden"
          >
            <div className="glass-strong mt-2 overflow-hidden rounded-2xl p-3">
              {mainNav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href === "/servicios" ? "/#servicios" : item.href}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm font-medium",
                      pathname === item.href ? "bg-brand/10 text-brand" : "text-foreground hover:bg-surface-2/60"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-6 py-2.5 text-sm text-muted hover:bg-surface-2/60 hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-4">
                <Link href="/configurador">
                  <Button variant="secondary" className="w-full">Configurador</Button>
                </Link>
                <Link href="/contacto">
                  <Button className="w-full bg-brand text-[#051018] hover:bg-[#8ae1ff]">Contactar</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}