"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ServiceFramesProps = {
  frames: readonly string[];
  alt: string;
};

/** Diaporama frames PNG — crossfade, ratio préservé (pas de GIF / ken-burns). */
export function ServiceFrames({ frames, alt }: ServiceFramesProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (frames.length < 2) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % frames.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [frames.length]);

  return (
    <div className="relative aspect-[3/4] overflow-hidden border border-hairline bg-asphalt">
      {frames.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 hero-slide ${i === active ? "is-active" : ""}`}
          aria-hidden={i !== active}
        >
          <Image
            src={src}
            alt={i === active ? alt : ""}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-palette-ink/80 to-transparent px-4 pb-4 pt-16">
        <p className="text-[10px] uppercase tracking-[0.28em] text-bone/75">
          Vue animée · {active + 1}/{frames.length}
        </p>
      </div>
    </div>
  );
}
