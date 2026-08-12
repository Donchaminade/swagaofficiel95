"use client";

import type { LucideIcon } from "lucide-react";
import type { NavLink } from "@/lib/nav";

const motionClass: Record<NavLink["motion"], string> = {
  bounce: "group-hover:animate-nav-bounce group-aria-[current=page]:animate-nav-bounce",
  pulse: "group-hover:animate-nav-pulse group-aria-[current=page]:animate-nav-pulse",
  spin: "group-hover:animate-nav-spin group-aria-[current=page]:animate-nav-spin",
  wiggle: "group-hover:animate-nav-wiggle group-aria-[current=page]:animate-nav-wiggle",
};

type NavIconProps = {
  icon: LucideIcon;
  motion: NavLink["motion"];
  size?: number;
  className?: string;
};

export function NavIcon({ icon: Icon, motion, size = 16, className = "" }: NavIconProps) {
  return (
    <span
      className={`inline-flex shrink-0 text-current ${motionClass[motion]} ${className}`}
      aria-hidden
    >
      <Icon size={size} strokeWidth={2.1} />
    </span>
  );
}
