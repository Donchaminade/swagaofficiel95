"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: { src: string; alt: string; objectPosition?: string };
  cta?: { href: string; label: string; external?: boolean };
};

/**
 * Hero full-bleed pages internes — feeling PROCOPE hero-load
 * (zoomIn titre, slideInDown eyebrow, fadeIn CTA).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  cta,
}: PageHeroProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const play = mounted && !prefersReduced;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[52svh] overflow-hidden bg-palette-ink md:min-h-[58svh]"
      data-procope="hero-load"
    >
      <div className="absolute inset-0 bg-palette-ink" aria-hidden>
        {image.src?.trim() ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            className="object-contain object-center brightness-[0.55] contrast-110 saturate-[0.9]"
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-palette-ink via-palette-ink/65 to-palette-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-palette-ink via-transparent to-palette-ink/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(30,111,255,0.16),transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-32 md:min-h-[58svh] md:px-8 md:pb-16">
        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-bic"
          initial={play ? { opacity: 0, y: -22 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-3 max-w-3xl font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.9] tracking-[-0.03em] text-palette-bone"
          initial={play ? { opacity: 0, scale: 0.86 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-4 max-w-xl text-base text-palette-concrete md:text-lg"
            initial={play ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
        {cta && (
          <motion.div
            className="mt-8"
            initial={play ? { opacity: 0, x: -28 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {cta.external ? (
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-bic bg-bic px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-palette-bone transition hover:bg-transparent hover:text-bic"
              >
                {cta.label}
              </a>
            ) : (
              <Link
                href={cta.href}
                className="inline-block border border-bic bg-bic px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-palette-bone transition hover:bg-transparent hover:text-bic"
              >
                {cta.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
