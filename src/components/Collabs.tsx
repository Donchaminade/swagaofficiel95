"use client";

import Image from "next/image";
import { Reveal, STAGGER } from "@/components/Reveal";
import { site } from "@/lib/site";

const PLACEHOLDER = "/images/illustrations/collabs-scene.png";

function artistInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/** Never pass "" to next/image — empty → null (initials) ; missing file path kept as-is. */
function safeSrc(src: string | undefined | null): string | null {
  const s = typeof src === "string" ? src.trim() : "";
  return s.length > 0 ? s : null;
}

function ArtistPortrait({
  name,
  image,
}: {
  name: string;
  image: string | undefined;
}) {
  const src = safeSrc(image) ?? safeSrc(PLACEHOLDER);

  if (!src) {
    return (
      <div
        className="flex h-full min-h-[7.5rem] items-center justify-center bg-asphalt font-display text-2xl tracking-tight text-bic"
        aria-hidden
      >
        {artistInitials(name) || "?"}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      className="object-cover transition duration-500 group-hover:scale-[1.06]"
      sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 180px"
    />
  );
}

export function Collabs() {
  // Locals so React Compiler invalidates when `site` HMR-updates (avoids stale empty src).
  const collabs = site.collabs;
  const sectionImage = safeSrc(site.sectionArt.collabs) ?? PLACEHOLDER;

  return (
    <section
      id="collabs"
      className="relative overflow-hidden bg-asphalt px-5 py-24 md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-12deg, transparent, transparent 12px, #1E6FFF 12px, #1E6FFF 13px)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-bic/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Reveal variant="section-fade-up" delay={STAGGER.section}>
            <p className="text-xs uppercase tracking-[0.3em] text-bic">Collabs</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-bone md:text-6xl">
              Sur scène avec
            </h2>
            <p className="mt-4 max-w-md text-sm text-concrete md:text-base">
              Six artistes, une même énergie street — Lomé et au-delà.
            </p>
          </Reveal>

          <Reveal variant="card-zoom" delay={STAGGER.col[2]}>
            <div className="relative aspect-[4/3] overflow-hidden border border-hairline">
              {sectionImage ? (
                <Image
                  src={sectionImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collabs.map((collab, i) => (
            <Reveal
              key={collab.name}
              variant="card-slide-up"
              delay={STAGGER.col[i % 3] ?? 0.3}
            >
              <li className="group relative isolate flex min-h-[7.5rem] overflow-hidden border border-hairline bg-ink transition hover:border-bic/70">
                <div className="relative w-[38%] shrink-0 self-stretch overflow-hidden sm:w-[42%]">
                  <ArtistPortrait name={collab.name} image={collab.image} />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-bic opacity-80 transition group-hover:opacity-100"
                    aria-hidden
                  />
                </div>

                <div className="relative flex flex-1 flex-col justify-between px-4 py-4 sm:px-5 sm:py-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-bic">
                    {collab.role}
                  </span>
                  <span className="font-display text-2xl leading-none tracking-tight text-bone sm:text-[1.65rem]">
                    {collab.name}
                  </span>
                  <span
                    className="mt-2 block h-px w-10 bg-bic/50 transition group-hover:w-16 group-hover:bg-bic"
                    aria-hidden
                  />
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
