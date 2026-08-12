"use client";

import Link from "next/link";
import { Reveal, STAGGER } from "@/components/Reveal";
import { navLinks } from "@/lib/nav";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink px-5 py-10 md:px-8">
      <Reveal
        variant="section-fade-up"
        delay={STAGGER.section}
        className="mx-auto flex max-w-6xl flex-col gap-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-display text-2xl text-bone">
            {site.shortName}
            <span className="text-bic">.</span>
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-concrete">
            © {new Date().getFullYear()} {site.name} — Lomé, Togo
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.18em] text-concrete"
          aria-label="Pied de page"
        >
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-bic">
              {l.label}
            </Link>
          ))}
        </nav>
      </Reveal>
    </footer>
  );
}
