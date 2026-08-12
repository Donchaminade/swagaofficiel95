"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

type BackLinkProps = {
  href: string;
  label?: string;
  /** Libellé accessible (défaut : « Retour » + destination). */
  ariaLabel?: string;
  className?: string;
};

/**
 * Lien retour : flèche + texte. Préfère l’historique même origine, sinon `href`.
 */
export function BackLink({
  href,
  label = "Retour",
  ariaLabel,
  className = "",
}: BackLinkProps) {
  const router = useRouter();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const sameOrigin =
      typeof document !== "undefined" &&
      document.referrer.startsWith(window.location.origin);
    if (sameOrigin) {
      router.back();
      return;
    }
    router.push(href);
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className={`group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-bic transition hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bic ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 transition group-hover:-translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="square"
      >
        <path d="M15 6 9 12l6 6" />
        <path d="M9 12h12" />
      </svg>
      <span>{label}</span>
    </Link>
  );
}
