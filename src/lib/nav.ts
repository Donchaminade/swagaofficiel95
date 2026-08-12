import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  Handshake,
  MessageCircle,
  Share2,
  Sparkles,
  UserRound,
} from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  shortLabel: string;
  /** Clé pour active state (pathname ou section id accueil). */
  sectionId: string;
  icon: LucideIcon;
  /** Micro-animation class applied on hover / active */
  motion: "bounce" | "pulse" | "spin" | "wiggle";
};

export const navLinks: NavLink[] = [
  {
    href: "/about",
    label: "À propos",
    shortLabel: "À propos",
    sectionId: "about",
    icon: UserRound,
    motion: "bounce",
  },
  {
    href: "/services",
    label: "Services",
    shortLabel: "Services",
    sectionId: "services",
    icon: Sparkles,
    motion: "pulse",
  },
  {
    href: "/collabs",
    label: "Collabs",
    shortLabel: "Collabs",
    sectionId: "collabs",
    icon: Handshake,
    motion: "wiggle",
  },
  {
    href: "/social",
    label: "Réseaux",
    shortLabel: "Réseaux",
    sectionId: "social",
    icon: Share2,
    motion: "spin",
  },
  {
    href: "/contact",
    label: "Contact",
    shortLabel: "Contact",
    sectionId: "contact",
    icon: MessageCircle,
    motion: "bounce",
  },
];

export const bookerLink: NavLink = {
  href: "/contact",
  label: "Booker",
  shortLabel: "Booker",
  sectionId: "contact",
  icon: CalendarCheck,
  motion: "pulse",
};

export const bottomNavLinks: NavLink[] = [
  navLinks[0],
  navLinks[1],
  navLinks[2],
  navLinks[3],
  bookerLink,
];

/** Sections encore présentes sur l’accueil (scroll spy optionnel). */
export const sectionIds = [
  "top",
  "about",
  "tiktok",
  "services",
  "collabs",
  "social",
  "contact",
] as const;

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
