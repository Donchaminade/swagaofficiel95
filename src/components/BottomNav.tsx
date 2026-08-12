"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNavLinks, isNavActive } from "@/lib/nav";
import { NavIcon } from "@/components/NavIcon";

/**
 * Bottom nav style app — visible en mobile portrait uniquement.
 * Desktop : cachée (header top classique).
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-ink/95 backdrop-blur-md md:hidden max-md:landscape:hidden pb-[env(safe-area-inset-bottom)]"
      aria-label="Navigation bas"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-1 pt-1.5 pb-1.5">
        {bottomNavLinks.map((l) => {
          const isActive = isNavActive(pathname, l.href);
          return (
            <li key={`${l.sectionId}-${l.shortLabel}`} className="flex-1">
              <Link
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`group flex flex-col items-center gap-0.5 px-1 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] transition-colors ${
                  isActive ? "text-bic" : "text-concrete hover:text-bic"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-bic/15 text-bic" : "text-current"
                  }`}
                >
                  <NavIcon icon={l.icon} motion={l.motion} size={18} />
                </span>
                <span className="truncate max-w-[4.5rem] text-center">{l.shortLabel}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
