"use client";

import { Reveal, STAGGER } from "@/components/Reveal";
import { site } from "@/lib/site";
import { Medal } from "lucide-react";

type AchievementStripProps = {
  /** Variante compacte sous le hero, ou bloc section. */
  variant?: "hero" | "section";
  className?: string;
};

export function AchievementStrip({
  variant = "section",
  className = "",
}: AchievementStripProps) {
  const a = site.achievement;

  if (variant === "hero") {
    return (
      <div
        className={`inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 border border-bic/50 bg-palette-ink/55 px-3 py-2 backdrop-blur-sm ${className}`}
        data-procope="hero-load"
      >
        <span
          className="flex flex-col items-center gap-0.5 text-bic"
          aria-label="2e prix"
        >
          <Medal
            className="size-5 drop-shadow-[0_0_6px_rgba(192,200,210,0.35)] md:size-6"
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="text-[8px] font-semibold uppercase leading-none tracking-wider text-bic/80">
            {a.placeLabel}
          </span>
        </span>
        <span className="h-4 w-px bg-palette-bone/25" aria-hidden />
        <span className="text-[10px] uppercase tracking-[0.2em] text-palette-bone sm:text-xs">
          {a.event}
          <span className="text-palette-concrete"> · {a.location}</span>
        </span>
      </div>
    );
  }

  return (
    <Reveal
      variant="section-fade-up"
      delay={STAGGER.section}
      className={`border border-bic/40 bg-asphalt px-5 py-6 md:px-8 ${className}`}
    >
      <p className="text-[10px] uppercase tracking-[0.28em] text-bic">
        Distinction
      </p>
      <p className="mt-2 font-display text-2xl tracking-tight text-bone md:text-3xl">
        {a.placeLabel}
        <span className="text-bic"> · </span>
        {a.event}
      </p>
      <p className="mt-2 text-sm text-concrete">{a.long}</p>
    </Reveal>
  );
}
