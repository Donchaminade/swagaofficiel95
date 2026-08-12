"use client";

import { useEffect, useState, type CSSProperties } from "react";

export type PassPlatform = "tiktok" | "tiktok-likes" | "instagram" | "facebook";

type PassLine = {
  value: string;
  label: string;
  platform: PassPlatform;
};

type PassBadgeProps = {
  eyebrow: string;
  lines: readonly PassLine[];
  /** Décalage de phase pour désynchroniser les balancements. */
  swingDelay?: string;
  className?: string;
  compact?: boolean;
};

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      aria-hidden
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14 8.5V6.8c0-.9.6-1.1 1-1.1h2V3h-2.8C11.6 3 11 5.1 11 6.6v1.9H9v2.7h2V21h3v-9.8h2.4l.4-2.7H14z" />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function PlatformIcon({
  platform,
  className,
}: {
  platform: PassPlatform;
  className?: string;
}) {
  switch (platform) {
    case "tiktok":
      return <IconTikTok className={className} />;
    case "tiktok-likes":
      return (
        <span className="inline-flex shrink-0 items-center gap-0.5" aria-hidden>
          <IconTikTok className={className} />
          <IconHeart className="h-3 w-3 text-bic" />
        </span>
      );
    case "instagram":
      return <IconInstagram className={className} />;
    case "facebook":
      return <IconFacebook className={className} />;
  }
}

/**
 * Badge « pass / laminé » accroché.
 * Swing : classe CSS après mount (hydration-safe) ;
 * prefers-reduced-motion géré uniquement en CSS.
 */
export function PassBadge({
  eyebrow,
  lines,
  swingDelay = "0s",
  className = "",
  compact = false,
}: PassBadgeProps) {
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
  }, []);

  const iconSize = compact ? "h-4 w-4" : "h-5 w-5";

  const swingStyle = live
    ? ({
        "--pass-swing-delay": swingDelay,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className={`pass-badge-hang ${live ? "pass-badge-swing" : ""} ${className}`}
      style={swingStyle}
    >
      {/* Point d’accroche — origin du swing */}
      <span
        className="pass-badge-clip mx-auto mb-1 block h-2.5 w-2.5 rounded-full border-2 border-bic bg-palette-ink shadow-[0_0_0_2px_rgba(30,111,255,0.35)]"
        aria-hidden
      />
      <span
        className="mx-auto mb-1.5 block h-3 w-px bg-gradient-to-b from-bic to-bic/20"
        aria-hidden
      />

      <div
        className={`relative border border-bic/80 bg-palette-bone text-palette-ink shadow-[4px_6px_0_rgba(30,111,255,0.35)] ${
          compact ? "min-w-[6.5rem] px-2.5 py-2" : "min-w-[8.5rem] px-3 py-2.5 md:min-w-[9.5rem]"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-bic"
          aria-hidden
        />

        <div className="mt-1.5 flex items-center gap-1.5">
          {lines.length === 1 ? (
            <span className="inline-flex shrink-0 text-bic" aria-hidden>
              <PlatformIcon platform={lines[0].platform} className={iconSize} />
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 text-bic" aria-hidden>
              {lines.map((line) => (
                <PlatformIcon
                  key={line.platform}
                  platform={line.platform}
                  className={iconSize}
                />
              ))}
            </span>
          )}
          <p
            className={`font-semibold uppercase tracking-[0.16em] text-bic ${
              compact ? "text-[8px]" : "text-[9px]"
            }`}
          >
            {eyebrow}
          </p>
        </div>

        <div className={lines.length > 1 ? "mt-1.5 space-y-1.5" : "mt-1"}>
          {lines.map((line) => (
            <div key={`${line.value}-${line.label}`} className="flex items-start gap-1.5">
              {lines.length > 1 && (
                <span className="mt-0.5 inline-flex shrink-0 text-bic" aria-hidden>
                  <PlatformIcon platform={line.platform} className="h-3.5 w-3.5" />
                </span>
              )}
              <div>
                <p
                  className={`font-display leading-none tracking-tight text-palette-ink ${
                    compact ? "text-lg" : "text-2xl md:text-3xl"
                  }`}
                >
                  {line.value}
                </p>
                <p
                  className={`mt-0.5 uppercase tracking-[0.14em] text-palette-ink/55 ${
                    compact ? "text-[8px]" : "text-[10px]"
                  }`}
                >
                  {line.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
