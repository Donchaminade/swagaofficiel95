"use client";

import { Reveal, STAGGER } from "@/components/Reveal";
import { site } from "@/lib/site";
import { Medal } from "lucide-react";

type AchievementStripProps = {
  /** Variante compacte sous le hero, ou bloc section. */
  variant?: "hero" | "section";
  className?: string;
};

/** Drapeau Cameroun : vert | rouge | jaune + étoile jaune (SVG inline). */
function CameroonFlag({ className = "" }: { className?: string }) {
  return (
    <span
      className={`cameroon-flag inline-flex shrink-0 ${className}`}
      role="img"
      aria-label="drapeau Cameroun"
    >
      <svg
        viewBox="0 0 45 30"
        width="36"
        height="24"
        className="h-[20px] w-auto sm:h-[24px]"
        aria-hidden
      >
        <rect width="15" height="30" fill="#007A5E" />
        <rect x="15" width="15" height="30" fill="#CE1126" />
        <rect x="30" width="15" height="30" fill="#FCD116" />
        <polygon
          fill="#FCD116"
          points="22.5,9 23.6,12.4 27.2,12.4 24.3,14.5 25.4,17.9 22.5,15.8 19.6,17.9 20.7,14.5 17.8,12.4 21.4,12.4"
        />
      </svg>
    </span>
  );
}

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
        <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-palette-bone sm:text-xs">
          <span>
            {a.event}
            <span className="text-palette-concrete"> · {a.location}</span>
          </span>
          <CameroonFlag />
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
