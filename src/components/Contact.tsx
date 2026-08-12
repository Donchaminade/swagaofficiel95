"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { Reveal, STAGGER } from "@/components/Reveal";
import { site, waLink } from "@/lib/site";

/** WhatsApp booking formulaire = numéro 96… */
const FORM_WA =
  site.whatsapp.find((w) => w.phone === "22896666200") ?? site.whatsapp[1];

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function Contact() {
  const [sentHint, setSentHint] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const text = `Booking SwAgA\nNom: ${name}\nEmail: ${email}\n\n${message}`;
    window.open(waLink(FORM_WA.phone, text), "_blank", "noopener,noreferrer");
    setSentHint(true);
  }

  return (
    <section id="contact" className="bg-asphalt px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2">
        <Reveal variant="section-fade-up" delay={STAGGER.section}>
          <div className="relative mb-8 aspect-[4/3] max-w-sm overflow-hidden border border-hairline">
            <Image
              src={site.sectionArt.contact}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 28rem"
            />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-bic">Contact</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-bone md:text-6xl">
            Booke-moi
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-concrete">
            Marques, artistes, events — dis-moi le projet. WhatsApp, mail, DM IG
            ou le formulaire : tout marche.
          </p>

          <div className="mt-10 space-y-4">
            {site.whatsapp.map((w, i) => (
              <Reveal key={w.phone} variant="text-fade" delay={STAGGER.text[i] ?? 0.4}>
                <a
                  href={waLink(w.phone, "Salut SwAgA, je veux collaborer !")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={w.label}
                  className="flex items-center justify-between border border-hairline px-5 py-4 text-bone transition hover:border-bic hover:text-bic"
                >
                  <IconWhatsApp className="h-5 w-5 shrink-0 text-concrete" />
                  <span className="font-display text-xl">{w.display}</span>
                </a>
              </Reveal>
            ))}

            <Reveal variant="text-fade" delay={STAGGER.text[2]}>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="flex items-center justify-between border border-hairline px-5 py-4 text-bone transition hover:border-bic hover:text-bic"
              >
                <Mail className="h-5 w-5 shrink-0 text-concrete" aria-hidden />
                <span className="font-display text-lg md:text-xl">{site.email}</span>
              </a>
            </Reveal>

            <Reveal variant="text-fade" delay={0.9}>
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DM Instagram"
                className="flex items-center justify-between border border-hairline px-5 py-4 text-bone transition hover:border-bic hover:text-bic"
              >
                <IconInstagram className="h-5 w-5 shrink-0 text-concrete" />
                <span className="font-display text-xl">{site.social.instagram.handle}</span>
              </a>
            </Reveal>
          </div>
        </Reveal>

        <Reveal variant="card-slide-up" delay={STAGGER.form[1]}>
          <form
            onSubmit={onSubmit}
            className="border border-hairline bg-ink/70 p-6 md:p-8"
          >
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-concrete">
                Nom
              </span>
              <input
                name="name"
                required
                className="mt-2 w-full border-b border-hairline bg-transparent py-3 text-bone outline-none transition focus:border-bic"
                placeholder="Ton nom / marque"
              />
            </label>
            <label className="mt-6 block">
              <span className="text-xs uppercase tracking-[0.2em] text-concrete">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full border-b border-hairline bg-transparent py-3 text-bone outline-none transition focus:border-bic"
                placeholder="toi@email.com"
              />
            </label>
            <label className="mt-6 block">
              <span className="text-xs uppercase tracking-[0.2em] text-concrete">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full resize-y border-b border-hairline bg-transparent py-3 text-bone outline-none transition focus:border-bic"
                placeholder="Type de collab, dates, budget approximatif…"
              />
            </label>
            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-2 border border-bic bg-bic py-4 text-sm font-semibold uppercase tracking-[0.2em] text-palette-bone transition hover:bg-transparent hover:text-bic"
            >
              <IconWhatsApp className="h-4 w-4 shrink-0" />
              Envoyer sur WhatsApp
            </button>
            {sentHint && (
              <p className="mt-4 text-sm text-concrete">
                WhatsApp s&apos;ouvre avec ton message prérempli (
                {FORM_WA.display}).
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
