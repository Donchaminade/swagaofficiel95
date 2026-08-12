"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, STAGGER } from "@/components/Reveal";
import { site, waLink } from "@/lib/site";

const FAQ = [
  {
    q: "Comment booker ?",
    a: "WhatsApp en priorité — dis le type de projet (event, clip, pub, coaching), la date et la ville.",
  },
  {
    q: "Délai de réponse ?",
    a: "En général sous 24–48 h. Pour les urgences, marque « URGENT » dans le message.",
  },
  {
    q: "Où es-tu basé ?",
    a: "Lomé — déplacements possibles selon le projet (scène, tournage, campagne).",
  },
  {
    q: "Tarifs ?",
    a: "Selon format et durée. Envoie le brief : on calibre ensemble.",
  },
] as const;

const BOOK_WA =
  site.whatsapp.find((w) => w.phone === "22896666200") ?? site.whatsapp[0];

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function BookingCta() {
  const waHref = waLink(
    BOOK_WA.phone,
    "Salut SwAgA — je veux booker un projet (event / clip / pub / coaching).",
  );

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-asphalt px-5 py-24 md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-bic/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-16">
          <div>
            <Reveal variant="section-fade-up" delay={STAGGER.section}>
              <p className="text-xs uppercase tracking-[0.3em] text-bic">
                FAQ booking
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight text-bone md:text-6xl">
                Avant de DM
              </h2>
              <p className="mt-4 max-w-md text-sm text-concrete md:text-base">
                Les réponses courtes — le reste se règle sur WhatsApp.
              </p>
            </Reveal>

            <ul className="mt-10 space-y-0 border-t border-hairline">
              {FAQ.map((item, i) => (
                <Reveal
                  key={item.q}
                  variant="text-fade"
                  delay={STAGGER.feature[i] ?? 0.2}
                >
                  <li className="border-b border-hairline py-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-bic">
                      {item.q}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-bone md:text-base">
                      {item.a}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal variant="card-zoom" delay={STAGGER.col[1]}>
            <div className="relative overflow-hidden border border-hairline bg-ink">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={site.sectionArt.contact}
                  alt=""
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              </div>

              <div className="relative px-6 py-8 md:px-8 md:py-10">
                <p className="text-xs uppercase tracking-[0.3em] text-bic">
                  Next step
                </p>
                <h3 className="mt-3 font-display text-3xl tracking-tight text-bone md:text-4xl">
                  Booke le move
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-concrete">
                  Un message, un brief — on calibre event, clip ou campagne.
                </p>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 border border-bic bg-bic px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-bone hover:border-bone"
                >
                  <IconWhatsApp className="size-5" />
                  WhatsApp · Booker
                </a>

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em]">
                  <Link
                    href="/contact"
                    className="text-bic transition hover:text-bone"
                  >
                    Page contact →
                  </Link>
                  <Link
                    href="/social"
                    className="text-concrete transition hover:text-bic"
                  >
                    Réseaux →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
