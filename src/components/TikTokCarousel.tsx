"use client";

import { Reveal, STAGGER } from "@/components/Reveal";
import {
  site,
  tiktokEmbedSrc,
  TIKTOK_PLAYER_QUERY,
  type TikTokEmbed,
} from "@/lib/site";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

/** TikTok overload-protect → plafonner les iframes vivantes (recycle). */
const MAX_ACTIVE_EMBEDS = 5;
/** Délai entre chaque mount iframe (vagues). */
const STAGGER_MS = 500;
/** Précharger largement avant d’entrer dans le viewport. */
const IO_ROOT_MARGIN = "80% 100%";

type Card = {
  key: string;
  title: string;
  href: string;
  embed: string | null;
  /** Preview préféré (oEmbed si dispo). */
  poster: string;
  /** Poster local garanti si CDN oEmbed casse. */
  fallbackPoster: string;
};

type SlotListener = () => void;

const activeSlots = new Set<string>();
const wantsSlots = new Set<string>();
const pendingQueue: string[] = [];
const slotListeners = new Set<SlotListener>();
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let lastMountAt = 0;

function notifySlots() {
  slotListeners.forEach((l) => l());
}

function removeFromQueue(id: string) {
  const idx = pendingQueue.indexOf(id);
  if (idx >= 0) pendingQueue.splice(idx, 1);
}

function enqueue(id: string) {
  if (activeSlots.has(id) || pendingQueue.includes(id)) return;
  pendingQueue.push(id);
  scheduleFlush();
}

function scheduleFlush() {
  if (flushTimer != null) return;
  const wait = Math.max(0, STAGGER_MS - (Date.now() - lastMountAt));
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushOne();
  }, wait);
}

function flushOne() {
  while (pendingQueue.length > 0 && activeSlots.size < MAX_ACTIVE_EMBEDS) {
    const id = pendingQueue.shift()!;
    if (!wantsSlots.has(id) || activeSlots.has(id)) continue;
    activeSlots.add(id);
    lastMountAt = Date.now();
    notifySlots();
    if (pendingQueue.length > 0 && activeSlots.size < MAX_ACTIVE_EMBEDS) {
      scheduleFlush();
    }
    return;
  }
}

function requestEmbed(id: string) {
  wantsSlots.add(id);
  if (activeSlots.has(id)) return;
  enqueue(id);
}

function releaseEmbed(id: string) {
  wantsSlots.delete(id);
  removeFromQueue(id);
  if (!activeSlots.delete(id)) return;
  notifySlots();
  scheduleFlush();
}

function subscribeSlots(listener: SlotListener) {
  slotListeners.add(listener);
  return () => {
    slotListeners.delete(listener);
  };
}

function postPlayer(
  win: Window | null | undefined,
  type: "play" | "mute" | "pause",
) {
  win?.postMessage(
    { "x-tiktok-player": true, type, value: undefined },
    "https://www.tiktok.com",
  );
}

function PlayBadge() {
  return (
    <span
      className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center gap-2 bg-ink/35"
      aria-hidden
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/40 bg-ink/55 text-bone shadow-lg backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current" aria-hidden>
          <path d="M8 5.14v13.72L19 12 8 5.14z" />
        </svg>
      </span>
      <span className="text-[10px] uppercase tracking-[0.18em] text-bone/80">
        Live soon
      </span>
    </span>
  );
}

function TikTokCard({
  card,
  instanceId,
}: {
  card: Card;
  instanceId: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  const syncPlaying = useCallback(() => {
    const next = activeSlots.has(instanceId);
    setPlaying(next);
    if (!next) setPlayerReady(false);
  }, [instanceId]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestEmbed(instanceId);
          syncPlaying();
        } else {
          releaseEmbed(instanceId);
          setPlaying(false);
        }
      },
      {
        root: null,
        rootMargin: IO_ROOT_MARGIN,
        threshold: [0, 0.01, 0.15],
      },
    );

    io.observe(el);
    const unsub = subscribeSlots(syncPlaying);

    return () => {
      io.disconnect();
      unsub();
      releaseEmbed(instanceId);
    };
  }, [instanceId, syncPlaying]);

  /* Fallback : si le navigateur bloque autoplay, forcer play/mute via postMessage. */
  useEffect(() => {
    if (!playing) return;

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.tiktok.com") return;
      const data = event.data;
      if (!data || data["x-tiktok-player"] !== true) return;
      const iframeWin = iframeRef.current?.contentWindow;
      if (!iframeWin || event.source !== iframeWin) return;

      if (data.type === "onPlayerReady") {
        postPlayer(iframeWin, "mute");
        postPlayer(iframeWin, "play");
        setPlayerReady(true);
      }
      if (
        data.type === "onPlayerError" &&
        (data.value?.errorCode === 3002 || data.value === 3002)
      ) {
        postPlayer(iframeWin, "mute");
        postPlayer(iframeWin, "play");
      }
      if (data.type === "onStateChange" && data.value === 2) {
        postPlayer(iframeWin, "mute");
        postPlayer(iframeWin, "play");
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [playing]);

  const embedSrc = card.embed
    ? `${card.embed}?${TIKTOK_PLAYER_QUERY}`
    : null;
  const previewSrc = thumbFailed ? card.fallbackPoster : card.poster;

  return (
    <article
      ref={ref}
      className="relative w-[220px] shrink-0 overflow-hidden border border-hairline bg-asphalt sm:w-[260px]"
    >
      <div className="tiktok-embed-clip relative aspect-[9/16] w-full overflow-hidden bg-ink">
        {/* Preview toujours présent (oEmbed / poster) — jamais de boîte noire vide */}
        {/* eslint-disable-next-line @next/next/no-img-element -- CDN TikTok signé, hosts variables */}
        <img
          src={previewSrc}
          alt=""
          className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-300 ${
            playing && playerReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          loading="eager"
          decoding="async"
          onError={() => {
            if (!thumbFailed && card.poster !== card.fallbackPoster) {
              setThumbFailed(true);
            }
          }}
        />
        {!playing && <PlayBadge />}

        {playing && embedSrc ? (
          <iframe
            ref={iframeRef}
            src={embedSrc}
            title={card.title}
            className="pointer-events-none absolute z-0 border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
          />
        ) : null}

        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label={`${card.title} — ouvrir sur TikTok`}
        />
      </div>
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block truncate border-t border-hairline px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-concrete transition hover:text-bic"
      >
        Voir sur TikTok →
      </a>
    </article>
  );
}

/**
 * Carousel TikTok — marquee infinie droite → gauche.
 * Thumbnails oEmbed pour les 8 clips ; jusqu’à 5 players autoplay muted (IO + file échelonnée).
 */
export function TikTokCarousel() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [oembedThumbs, setOembedThumbs] = useState<Record<string, string>>({});
  const uid = useId();
  const embeds = site.tiktokEmbeds as readonly TikTokEmbed[];
  const hasLinks = embeds.length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Fetch batch oEmbed (cache serveur) → vrais posters pour les 8 URLs. */
  useEffect(() => {
    let cancelled = false;
    fetch("/api/tiktok-thumbnails")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { thumbnails?: Record<string, string> } | null) => {
        if (cancelled || !data?.thumbnails) return;
        setOembedThumbs(data.thumbnails);
      })
      .catch(() => {
        /* posters locaux restent en fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const reduceMotion = mounted && prefersReduced === true;

  const cards: Card[] = embeds.map((e, i) => {
    const fallbackPoster = e.poster ?? "/images/social/tiktok.png";
    return {
      key: e.url,
      title: e.title ?? `TikTok ${i + 1}`,
      href: e.short || e.url,
      embed: tiktokEmbedSrc(e.url),
      poster: oembedThumbs[e.url] ?? fallbackPoster,
      fallbackPoster,
    };
  });

  const loop = hasLinks ? [...cards, ...cards] : [];

  return (
    <section id="tiktok" className="overflow-hidden bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal variant="section-fade-up" delay={STAGGER.section}>
          <p className="text-xs uppercase tracking-[0.3em] text-bic">TikTok</p>
          <h2 className="mt-3 font-display text-4xl leading-none tracking-tight text-bone md:text-6xl">
            Le feed en mouvement
          </h2>
          <p className="mt-4 max-w-xl text-base text-concrete">
            Sélection de clips — défilement auto, son coupé.
          </p>
        </Reveal>
      </div>

      <Reveal
        variant="card-slide-up"
        delay={STAGGER.col[0]}
        className="relative mt-10"
      >
        <div
          className={`tiktok-marquee-wrap no-scrollbar relative ${
            reduceMotion
              ? "tiktok-marquee-scroll overflow-x-auto"
              : "overflow-hidden"
          }`}
        >
          <div
            className={`tiktok-marquee-track flex w-max gap-4 ${
              hasLinks ? "tiktok-marquee-run" : ""
            }`}
          >
            {loop.map((card, i) => (
              <TikTokCard
                key={`${uid}-${card.key}-${i}`}
                card={card}
                instanceId={`${uid}-${i}-${card.key}`}
              />
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-ink to-transparent md:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-ink to-transparent md:w-16"
            aria-hidden
          />
        </div>
      </Reveal>
    </section>
  );
}
