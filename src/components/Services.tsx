"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, STAGGER } from "@/components/Reveal";
import { site } from "@/lib/site";

type ServicesProps = {
  mode?: "teaser" | "full";
};

export function Services({ mode = "teaser" }: ServicesProps) {
  const list =
    mode === "teaser" ? site.services.slice(0, 6) : site.services;

  return (
    <section id="services" className="relative bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal variant="section-fade-up" delay={STAGGER.section}>
          <p className="text-xs uppercase tracking-[0.3em] text-bic">Services</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl leading-none tracking-tight text-bone md:text-6xl">
            Ce que j&apos;apporte sur le bitume
          </h2>
          {mode === "full" && (
            <p className="mt-5 max-w-xl text-base text-concrete">
              Huit offres claires — choisis un service pour le détail, les
              livrables, le process et le booking WhatsApp.
            </p>
          )}
        </Reveal>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-0 lg:gap-y-12">
          {list.map((s, i) => (
            <Reveal
              key={s.slug}
              variant="card-zoom"
              delay={0.2 + (i % 3) * 0.15}
              className="group border-t border-hairline pt-8 lg:border-t-0 lg:border-l lg:px-8 lg:pt-4 [&:nth-child(3n+1)]:lg:border-l-0 [&:nth-child(3n+1)]:lg:pl-0"
            >
              <Link href={`/services/${s.slug}`} className="block">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden border border-hairline bg-asphalt">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <span className="font-display text-5xl text-bic/40 transition group-hover:text-bic">
                  {s.accent}
                </span>
                <h3 className="mt-4 font-display text-2xl tracking-tight text-bone md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-sm text-base leading-relaxed text-concrete">
                  {s.copy}
                </p>
                <span className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-bic transition group-hover:text-bone">
                  Voir le détail →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        {mode === "teaser" && (
          <Reveal variant="text-fade" delay={0.4} className="mt-12 text-center">
            <Link
              href="/services"
              className="text-sm uppercase tracking-[0.2em] text-bic transition hover:text-bone"
            >
              Tous les services →
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
