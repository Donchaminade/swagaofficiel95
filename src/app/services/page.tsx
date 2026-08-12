import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/Services";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/lib/site";

const hero = site.pageHeroes.services;

export const metadata: Metadata = {
  title: `Services | ${site.name}`,
  description:
    "Danse, contenu, pubs, coaching, DA clips, events, UGC et challenges TikTok — offres SwAgA.",
};

export default function ServicesPage() {
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
        cta={{ href: "/contact", label: "Booker WhatsApp" }}
      />
      <Services mode="full" />
    </SiteShell>
  );
}
