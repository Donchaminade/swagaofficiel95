"use client";

import { useEffect, useState } from "react";
import { sectionIds } from "@/lib/nav";

/**
 * Scroll spy léger — active la section la plus visible.
 * Hydration-safe : démarre sur "top", ne lit window qu'après mount.
 */
export function useActiveSection(defaultId = "top") {
  const [activeId, setActiveId] = useState(defaultId);

  useEffect(() => {
    const ids = [...sectionIds];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId = defaultId;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) setActiveId(bestId);
        else if (window.scrollY < 80) setActiveId(defaultId);
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [defaultId]);

  return activeId;
}
