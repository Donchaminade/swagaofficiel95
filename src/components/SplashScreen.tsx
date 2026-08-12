"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

type Phase = "visible" | "exiting" | "gone";

const HOLD_MS = 1500;
const EXIT_MS = 450;
const HOLD_REDUCED_MS = 600;
const EXIT_REDUCED_MS = 200;

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? HOLD_REDUCED_MS : HOLD_MS;
    const exit = reduced ? EXIT_REDUCED_MS : EXIT_MS;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => {
      setPhase("exiting");
      document.body.style.overflow = prevOverflow;
    }, hold);

    const goneTimer = window.setTimeout(() => setPhase("gone"), hold + exit);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(goneTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`splash-screen fixed inset-0 z-[200] flex items-center justify-center bg-palette-ink ${
        phase === "exiting"
          ? "splash-screen--out pointer-events-none"
          : "pointer-events-auto"
      }`}
      aria-hidden={phase !== "visible"}
      role="presentation"
    >
      <div className="splash-screen__mark flex flex-col items-center gap-3 px-6 text-center">
        <p className="font-display text-[clamp(2.75rem,12vw,5.5rem)] font-extrabold leading-none tracking-tight text-palette-bone">
          {site.shortName}
          <span className="text-bic">.</span>
        </p>
        <span className="splash-screen__rule h-0.5 w-12 bg-bic" aria-hidden />
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-palette-concrete">
          Danse · Contenu · Pubs
        </p>
      </div>
    </div>
  );
}
