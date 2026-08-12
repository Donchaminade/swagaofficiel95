"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, STAGGER } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Social() {
  const entries = Object.entries(site.social) as [
    keyof typeof site.social,
    (typeof site.social)[keyof typeof site.social],
  ][];

  return (
    <section
      id="social"
      className="relative overflow-hidden bg-ink px-5 py-24 md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(18deg, transparent, transparent 14px, #1E6FFF 14px, #1E6FFF 15px)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-1/4 h-80 w-80 rounded-full bg-bic/12 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-14">
          <Reveal variant="section-fade-up" delay={STAGGER.section}>
            <p className="text-xs uppercase tracking-[0.3em] text-bic">Réseaux</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-bone md:text-6xl">
              Suis le mouvement
            </h2>
            <p className="mt-4 max-w-md text-sm text-concrete md:text-base">
              Quatre canaux, une même énergie street — stats, previews et liens
              directs.
            </p>
          </Reveal>

          <Reveal variant="card-zoom" delay={STAGGER.col[1]}>
            <div className="relative mx-auto aspect-square w-40 overflow-hidden border border-hairline sm:w-48 lg:w-56">
              <Image
                src={site.sectionArt.social}
                alt=""
                fill
                className="object-cover"
                sizes="224px"
              />
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {entries.map(([key, item], i) => {
            const external = item.url.startsWith("http");
            const inner = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline">
                  <Image
                    src={item.preview}
                    alt={`Preview ${item.label}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-palette-ink via-palette-ink/20 to-transparent"
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-bic">
                    {item.label}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
                  <p className="font-display text-2xl tracking-tight text-bone md:text-3xl">
                    {item.handle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-concrete">
                    {item.blurb}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-4">
                    {item.stats.map((stat) => (
                      <li key={`${key}-${stat.label}`}>
                        <p className="font-display text-xl text-bic md:text-2xl">
                          {stat.value}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-concrete">
                          {stat.label}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-bone transition group-hover:text-bic">
                    {item.cta}
                    <span
                      aria-hidden
                      className="font-display text-lg transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </>
            );

            return (
              <li key={key} className="h-full">
                <Reveal
                  variant="card-slide-up"
                  delay={STAGGER.feature[i] ?? 0.1 + i * 0.15}
                  className="h-full"
                >
                  {external ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col overflow-hidden border border-hairline bg-asphalt transition hover:border-bic"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={item.url}
                      className="group flex h-full flex-col overflow-hidden border border-hairline bg-asphalt transition hover:border-bic"
                    >
                      {inner}
                    </Link>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
