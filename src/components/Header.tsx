"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { bookerLink, isNavActive, navLinks } from "@/lib/nav";
import { site } from "@/lib/site";
import { NavIcon } from "@/components/NavIcon";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed left-1/2 top-3 z-50 w-[min(100%-2rem,72rem)] -translate-x-1/2 md:top-4 md:w-[min(100%-3rem,72rem)] lg:w-[min(100%-4rem,72rem)]">
      <div
        className={`pointer-events-auto overflow-hidden rounded-2xl border border-hairline backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
          scrolled || open
            ? "bg-ink/80 shadow-[0_10px_40px_rgba(0,0,0,0.28)]"
            : "bg-ink/60 shadow-[0_8px_28px_rgba(0,0,0,0.18)]"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-2.5 md:px-6 md:py-3">
          <Link
            href="/"
            className="font-display text-xl tracking-tight text-bone md:text-2xl"
          >
            {site.shortName}
            <span className="text-bic">.</span>
          </Link>

          <nav
            className="hidden items-center gap-6 md:flex lg:gap-8"
            aria-label="Navigation principale"
          >
            {navLinks.map((l) => {
              const isActive = isNavActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-bic" : "text-concrete hover:text-bic"
                  }`}
                >
                  <NavIcon icon={l.icon} motion={l.motion} size={15} />
                  {l.label}
                </Link>
              );
            })}
            <ThemeToggle />
            <Link
              href={bookerLink.href}
              aria-current={
                isNavActive(pathname, bookerLink.href) ? "page" : undefined
              }
              className="group inline-flex items-center gap-2 rounded-full border border-bic bg-bic px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-palette-bone transition hover:bg-transparent hover:text-bic"
            >
              <NavIcon
                icon={bookerLink.icon}
                motion={bookerLink.motion}
                size={14}
              />
              Booker
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Link
              href={bookerLink.href}
              className="group inline-flex items-center gap-1.5 rounded-full border border-bic bg-bic px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-palette-bone"
            >
              <NavIcon
                icon={bookerLink.icon}
                motion={bookerLink.motion}
                size={12}
              />
              Booker
            </Link>
            <button
              type="button"
              className="text-bone"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="border-t border-hairline px-4 py-5 md:hidden"
            aria-label="Menu mobile"
          >
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => {
                const isActive = isNavActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`group inline-flex items-center gap-3 font-display text-2xl ${
                        isActive ? "text-bic" : "text-bone"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <NavIcon
                        icon={l.icon}
                        motion={l.motion}
                        size={22}
                        className="text-bic"
                      />
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
