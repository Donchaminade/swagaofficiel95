import type { Metadata } from "next";
import { Collabs } from "@/components/Collabs";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/lib/site";

const hero = site.pageHeroes.collabs;

export const metadata: Metadata = {
  title: `Collabs | ${site.name}`,
  description:
    "Artistes et collabs — Axel Merryl, Santrinos, Sethlo, Anadaboy, TALAKAKA, Ralycia.",
};

export default function CollabsPage() {
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
        cta={{ href: "/contact", label: "Proposer une collab" }}
      />
      <Collabs mode="full" />
    </SiteShell>
  );
}
