"use client";

import { site } from "@/lib/site";

function MarqueeItems({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={ariaHidden || undefined}
    >
      {site.marquee.map((item) => (
        <span
          key={item}
          className="font-display text-2xl tracking-tight text-bone/90 md:text-3xl"
        >
          {item}
          <span className="ml-10 text-bic">/</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-hairline bg-asphalt py-4">
      <div className="marquee-track flex w-max">
        <MarqueeItems />
        <MarqueeItems ariaHidden />
      </div>
    </div>
  );
}
