"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";
import { site } from "@/lib/site";

const STORAGE_KEY = "swaga-install-dismissed";
const DISMISS_DAYS = 14;

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOs = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return iOS || iPadOs;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  const mq = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone =
    "standalone" in navigator &&
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
  return mq || iosStandalone;
}

function wasDismissed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function dismiss() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/**
 * Popup clair « Installer comme application ».
 * - Android/Chrome : beforeinstallprompt
 * - iOS Safari : instructions Partager → Sur l’écran d’accueil
 * - Ne harcèle pas (dismiss 14j en localStorage)
 */
export function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (isStandalone() || wasDismissed()) return;

    const iosDevice = isIos();
    setIos(iosDevice);

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBip);

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (iosDevice) {
      timer = setTimeout(() => setVisible(true), 2200);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const close = () => {
    dismiss();
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return;
    setInstalling(true);
    try {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      dismiss();
      setVisible(false);
    } finally {
      setInstalling(false);
    }
  };

  if (!visible) return null;
  if (!ios && !deferred) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] flex justify-center p-4 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-title"
    >
      <div className="relative w-full max-w-md border-2 border-bic bg-palette-bone p-5 text-palette-ink shadow-[0_12px_40px_rgba(30,111,255,0.35)] md:p-6">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 text-palette-ink/60 transition hover:text-palette-ink"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="mb-3 flex h-11 w-11 items-center justify-center bg-bic text-palette-bone">
          <Download size={22} />
        </div>

        <h2
          id="install-title"
          className="font-display text-xl font-bold tracking-tight text-palette-ink md:text-2xl"
        >
          Installer {site.shortName}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-palette-ink/75">
          Ajoute le portfolio sur ton écran d’accueil — accès rapide, comme une app.
        </p>

        {ios ? (
          <p className="mt-3 border border-bic/30 bg-bic/10 px-3 py-2 text-sm text-palette-ink">
            Sur iPhone / iPad : appuie sur{" "}
            <Share
              className="mx-0.5 inline-block align-text-bottom text-bic"
              size={16}
              aria-hidden
            />{" "}
            <strong>Partager</strong>, puis <strong>Sur l’écran d’accueil</strong>.
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-3">
          {!ios && deferred ? (
            <button
              type="button"
              onClick={install}
              disabled={installing}
              className="inline-flex items-center gap-2 bg-bic px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-palette-bone transition hover:brightness-110 disabled:opacity-60"
            >
              <Download size={14} />
              {installing ? "Installation…" : "Installer"}
            </button>
          ) : null}
          {ios ? (
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 bg-bic px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-palette-bone"
            >
              Compris
            </button>
          ) : null}
          <button
            type="button"
            onClick={close}
            className="border border-palette-ink/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-palette-ink/70 transition hover:border-palette-ink hover:text-palette-ink"
          >
            Plus tard
          </button>
        </div>
      </div>
    </div>
  );
}
