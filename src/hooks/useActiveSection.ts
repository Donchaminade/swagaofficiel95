"use client";

import { useCallback, useEffect, useState } from "react";
import { sectionIds as defaultSectionIds } from "@/lib/nav";

const FLASH_MS = 900;

/**
 * Scroll spy (Intersection Observer) + sync hash optionnel.
 * Clic nav : active immédiat + flash section.
 */
export function useActiveSection(sectionIds: readonly string[] = defaultSectionIds) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const flashSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("section-nav-flash");
    // Relance l’anim si reclic sur la même section.
    void el.offsetWidth;
    el.classList.add("section-nav-flash");
    window.setTimeout(() => el.classList.remove("section-nav-flash"), FLASH_MS);
  }, []);

  const activate = useCallback(
    (id: string, opts?: { flash?: boolean; syncHash?: boolean }) => {
      setActiveId(id);
      if (opts?.syncHash !== false && typeof window !== "undefined") {
        const next = `#${id}`;
        if (window.location.hash !== next) {
          window.history.replaceState(null, "", next);
        }
      }
      if (opts?.flash) flashSection(id);
    },
    [flashSection],
  );

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && sectionIds.includes(hash)) {
      setActiveId(hash);
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const id of sectionIds) {
          const r = ratios.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestId = id;
          }
        }

        if (bestId && bestRatio > 0) {
          setActiveId((prev) => {
            if (prev === bestId) return prev;
            const next = `#${bestId}`;
            if (window.location.hash !== next) {
              window.history.replaceState(null, "", next);
            }
            return bestId;
          });
        }
      },
      {
        // Bandeau central sous le header fixe — section « active » lisible.
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);

    const clearIfAtTop = () => {
      if (window.scrollY < 80) {
        setActiveId(null);
        if (window.location.hash && window.location.hash !== "#top") {
          window.history.replaceState(null, "", "#top");
        }
      }
    };
    clearIfAtTop();
    window.addEventListener("scroll", clearIfAtTop, { passive: true });

    const onHashChange = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (sectionIds.includes(id)) setActiveId(id);
      if (id === "top" || id === "") setActiveId(null);
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearIfAtTop);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [sectionIds]);

  return { activeId, activate, flashSection };
}
