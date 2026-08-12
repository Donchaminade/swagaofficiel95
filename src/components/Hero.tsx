"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AchievementStrip } from "@/components/AchievementStrip";
import { PassBadge } from "@/components/PassBadge";
import { site, waLink } from "@/lib/site";

/** Diaporama fond — 5 frames distinctes, rotation toujours active (~4s). */
const HERO_FRAMES = site.heroSlides;
const SLIDE_MS = 4000;
const FADE_MS = 1200;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  /* Parallax scroll seulement si soft OK — le diaporama tourne TOUJOURS */
  const softMotion = mounted && prefersReduced !== true;

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Intervalle image : TOUJOURS actif, ignore reduced-motion (demande user) */
  useEffect(() => {
    if (HERO_FRAMES.length < 2) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_FRAMES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const badgeLeft = site.passBadges.find((b) => b.position === "top-left");
  const badgeRight = site.passBadges.find((b) => b.position === "top-right");
  const badgeTitle = site.passBadges.find((b) => b.position === "title");

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-palette-ink"
      data-procope="hero-load"
      aria-roledescription="carousel"
      aria-label="Photos SwAgA"
    >
      {/* Background diaporama — object-contain (ratio préservé, fond ink) */}
      <motion.div
        className="absolute inset-0 bg-palette-ink"
        initial={false}
        style={softMotion ? { y, opacity: scrollOpacity } : undefined}
        aria-hidden
      >
        {HERO_FRAMES.map((frame, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={frame.src}
              className={`hero-slide absolute inset-0${isActive ? " is-active" : ""}`}
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                transition: `opacity ${FADE_MS}ms ease-in-out`,
              }}
              aria-hidden={!isActive}
            >
              <div className="absolute inset-0">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  priority={i < 2}
                  className="object-contain object-center brightness-[0.92] contrast-[1.04] saturate-[0.98]"
                  sizes="100vw"
                />
              </div>
            </div>
          );
        })}

        {/* Overlays légers — morphing d’image bien visible */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-palette-ink/40 via-palette-ink/12 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-palette-ink/70 via-transparent to-palette-ink/10" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(30,111,255,0.06),transparent_50%)]" />
      </motion.div>

      {/* Badge 1 — haut gauche */}
      {badgeLeft && (
        <div className="pointer-events-none absolute left-3 top-20 z-30 sm:left-5 md:left-8 md:top-24">
          <PassBadge
            eyebrow={badgeLeft.eyebrow}
            lines={badgeLeft.lines}
            swingDelay="0s"
          />
        </div>
      )}

      {/* Badge 2 — haut droite */}
      {badgeRight && (
        <div className="pointer-events-none absolute right-3 top-20 z-30 sm:right-5 md:right-8 md:top-28">
          <PassBadge
            eyebrow={badgeRight.eyebrow}
            lines={badgeRight.lines}
            swingDelay="0.7s"
          />
        </div>
      )}

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-32 md:px-8 md:pb-28">
        <motion.p
          key={softMotion ? "tagline-in" : "tagline-ssr"}
          className="mb-4 max-w-md text-sm uppercase tracking-[0.28em] text-palette-concrete"
          data-procope="hero-load"
          initial={softMotion ? { opacity: 0, y: -28 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          key={softMotion ? "ach-in" : "ach-ssr"}
          className="mb-5"
          data-procope="hero-load"
          initial={softMotion ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <AchievementStrip variant="hero" />
        </motion.div>

        <motion.h1
          key={softMotion ? "title-in" : "title-ssr"}
          className="font-display text-[clamp(3.5rem,14vw,9.5rem)] leading-[0.85] tracking-[-0.04em] text-palette-bone"
          data-procope="hero-load"
          initial={softMotion ? { opacity: 0, scale: 0.82 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex flex-wrap items-start gap-x-2 gap-y-3 sm:gap-x-3">
            <span className="relative inline-block pb-4 sm:pb-5">
              {site.shortName}
              <span className="text-bic">95</span>
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-[0.88em] font-sans text-[10px] font-medium uppercase leading-none tracking-[0.28em] text-palette-concrete sm:text-xs"
              >
                officiel
              </span>
            </span>
            {badgeTitle && (
              <span className="mt-2 inline-block align-top sm:mt-3 md:mt-4">
                <PassBadge
                  eyebrow={badgeTitle.eyebrow}
                  lines={badgeTitle.lines}
                  swingDelay="1.2s"
                  compact
                />
              </span>
            )}
          </span>
        </motion.h1>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <motion.a
            key={softMotion ? "cta-l" : "cta-l-ssr"}
            href={waLink(
              site.whatsapp[0].phone,
              "Salut SwAgA, je veux collaborer / booker !"
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-bic bg-bic px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-palette-bone transition hover:bg-transparent hover:text-bic"
            data-procope="hero-load"
            initial={softMotion ? { opacity: 0, x: -36 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            Booker WhatsApp
          </motion.a>
          <motion.div
            key={softMotion ? "cta-r" : "cta-r-ssr"}
            data-procope="hero-load"
            initial={softMotion ? { opacity: 0, x: 36 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/about"
              className="inline-block border border-palette-bone/40 px-6 py-3 text-sm uppercase tracking-[0.18em] text-palette-bone transition hover:border-bic hover:text-bic"
            >
              Qui est SwAgA
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dots — sync avec l’image active */}
      <div
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5"
        role="tablist"
        aria-label="Diapositives hero"
      >
        {HERO_FRAMES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Photo ${i + 1} sur ${HERO_FRAMES.length}`}
            className={`hero-slide-dot h-2.5 w-2.5 rounded-full border border-palette-bone/50 transition-[background-color,transform] duration-500 ${
              i === activeIndex
                ? "scale-125 border-bic bg-bic"
                : "bg-palette-bone/30 hover:bg-palette-bone/55"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-6 right-5 z-20 hidden text-right text-[10px] uppercase tracking-[0.3em] text-palette-concrete md:block">
        Scroll
        <span className="mt-2 block h-10 w-px bg-gradient-to-b from-bic to-transparent md:ml-auto" />
      </div>
    </section>
  );
}
