"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex h-9 w-9 items-center justify-center text-bone transition-colors hover:text-bic ${className}`}
      aria-label={
        mounted
          ? isDark
            ? "Passer en mode clair"
            : "Passer en mode sombre"
          : "Changer le thème"
      }
      aria-pressed={mounted ? isDark : undefined}
    >
      <span className="relative flex h-5 w-5 items-center justify-center" aria-hidden>
        {!mounted ? (
          <Sun size={18} className="opacity-70" />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              className="absolute inset-0 flex items-center justify-center"
              initial={
                reduceMotion ? false : { opacity: 0, rotate: -40, scale: 0.6 }
              }
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, rotate: 40, scale: 0.6 }
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </button>
  );
}
