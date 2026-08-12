"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/** Labels sémantiques PROCOPE (équivalents Motion). */
export type ProcopeReveal =
  | "section-fade-up"
  | "card-zoom"
  | "card-slide-up"
  | "text-fade";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Délai en secondes (stagger-delays PROCOPE : 0.1 → 0.9). */
  delay?: number;
  /**
   * `false` (défaut) : apparition ET disparition au scroll.
   * `true` : une seule entrée (once).
   */
  once?: boolean;
  /** Pattern PROCOPE — défaut section-fade-up. */
  variant?: ProcopeReveal;
} & Omit<HTMLMotionProps<"div">, "children">;

const MOTION: Record<
  ProcopeReveal,
  {
    initial: { opacity: number; y?: number; scale?: number };
    animate: { opacity: number; y?: number; scale?: number };
  }
> = {
  "section-fade-up": {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
  },
  "card-zoom": {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
  },
  "card-slide-up": {
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
  },
  "text-fade": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  once = false,
  variant = "section-fade-up",
  ...rest
}: RevealProps) {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hydration-safe : animer seulement après mount (évite mismatch SSR/client).
  const animate = mounted && !prefersReduced;
  const m = MOTION[variant];

  if (!animate) {
    return (
      <div className={className} data-procope={variant}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-procope={variant}
      initial={m.initial}
      whileInView={m.animate}
      // once: false → sorti du viewport = retour à initial (fade/slide out).
      viewport={{ once, margin: "-8% 0px", amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { STAGGER } from "@/lib/stagger";
