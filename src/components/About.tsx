"use client";

import Image from "next/image";
import Link from "next/link";
import { AchievementStrip } from "@/components/AchievementStrip";
import { Reveal, STAGGER } from "@/components/Reveal";
import { site } from "@/lib/site";

type AboutProps = {
  /** Sur l’accueil : teaser + lien. Sur /about : contenu complet. */
  mode?: "teaser" | "full";
};

export function About({ mode = "teaser" }: AboutProps) {
  return (
    <section id="about" className="bg-ink px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
        <Reveal variant="card-zoom" delay={STAGGER.col[0]}>
          <div className="relative aspect-[4/5] overflow-hidden border border-hairline bg-palette-ink">
            <Image
              src="/images/swaga-real.png"
              alt={`Portrait de ${site.name}`}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-palette-ink/95 via-palette-ink/55 to-transparent px-5 pb-5 pt-28">
              <p className="font-display text-2xl text-palette-bone [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
                {site.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-bic [text-shadow:0_1px_10px_rgba(0,0,0,0.75)]">
                Lomé · Street · TikTok
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal variant="section-fade-up" delay={STAGGER.section}>
            <p className="text-xs uppercase tracking-[0.3em] text-bic">À propos</p>
            <h2 className="mt-3 font-display text-4xl leading-none tracking-tight text-bone md:text-6xl">
              Le vibe, la danse, le contenu
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-concrete md:text-lg">
              {site.shortName}, c&apos;est l&apos;énergie street sur les réseaux :
              freestyle, clips avec les artistes, pubs marques et contenus qui
              claquent. Disponible pour collabs, events et campagnes.
            </p>
            {mode === "full" && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-concrete md:text-lg">
                Basé à Lomé, je croise danse live et formats courts pour faire
                briller artistes et marques auprès d&apos;une audience TikTok
                engagée — sans perdre le feeling street.
              </p>
            )}
          </Reveal>

          <ul className="mt-8 space-y-3 text-sm uppercase tracking-[0.18em] text-bone">
            {[
              "Danse & chorés artistes",
              "Création de contenus",
              "Influence & pubs entreprises",
            ].map((item, i) => (
              <Reveal
                key={item}
                variant="text-fade"
                delay={STAGGER.text[i] ?? 0.8}
                className="flex gap-3"
              >
                <span className="text-bic">/</span> {item}
              </Reveal>
            ))}
          </ul>

          <div className="mt-10">
            <AchievementStrip variant="section" />
          </div>

          {mode === "teaser" && (
            <Reveal variant="text-fade" delay={0.5} className="mt-8">
              <Link
                href="/about"
                className="inline-block text-sm uppercase tracking-[0.2em] text-bic transition hover:text-bone"
              >
                Voir la page À propos →
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
