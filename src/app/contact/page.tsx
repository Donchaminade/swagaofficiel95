import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { site, waLink } from "@/lib/site";

const hero = site.pageHeroes.contact;

export const metadata: Metadata = {
  title: `Contact | ${site.name}`,
  description: "Booke SwAgA — WhatsApp, email, DM Instagram.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        image={{
          src: hero.src,
          alt: hero.alt,
          objectPosition: hero.objectPosition,
        }}
        cta={{
          href: waLink(site.whatsapp[0].phone, "Salut SwAgA, je veux collaborer !"),
          label: "WhatsApp",
          external: true,
        }}
      />
      <Contact />
    </SiteShell>
  );
}
