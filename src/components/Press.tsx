"use client";

import { Reveal, STAGGER } from "@/components/Reveal";

const QUOTES = [
  {
    text: "Énergie brute sur scène — le public a suivi chaque move. SwAgA apporte le street qu’on cherche pour un show live.",
    source: "Direction artistique",
    context: "Événement Lomé",
  },
  {
    text: "Contenu qui claque dès le premier cut. Timing, vibe, audience TikTok : on a senti le boost dès la campagne.",
    source: "Brand manager",
    context: "Campagne digitale",
  },
  {
    text: "2e à Africa Fox, et ça se voit dans le travail — précision, présence, et un feeling Lomé authentique.",
    source: "Artiste collaborateur",
    context: "Clip & scène",
  },
] as const;

export function Press() {
  return (
    <section
      id="press"
      className="relative overflow-hidden bg-ink px-5 py-24 md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-bic/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(8deg, transparent, transparent 14px, #1E6FFF 14px, #1E6FFF 15px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal variant="section-fade-up" delay={STAGGER.section}>
          <p className="text-xs uppercase tracking-[0.3em] text-bic">
            Press · Feedback
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl tracking-tight text-bone md:text-6xl">
            Ce qu&apos;ils disent du vibe
          </h2>
          <p className="mt-4 max-w-md text-sm text-concrete md:text-base">
            Marques, events, artistes — le feeling street qui passe à l&apos;écran
            et sur scène.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.source}
              variant="card-slide-up"
              delay={STAGGER.col[i] ?? 0.3}
            >
              <li className="flex h-full flex-col border border-hairline border-l-bic bg-asphalt px-5 py-6 md:px-6">
                <span
                  className="font-display text-4xl leading-none text-bic/50"
                  aria-hidden
                >
                  “
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-bone md:text-base">
                  {q.text}
                </p>
                <div className="mt-6 border-t border-hairline pt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-bic">
                    {q.source}
                  </p>
                  <p className="mt-1 text-xs text-concrete">{q.context}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
