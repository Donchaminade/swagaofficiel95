import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { Social } from "@/components/Social";
import { site } from "@/lib/site";

const hero = site.pageHeroes.social;

export const metadata: Metadata = {
  title: `Réseaux | ${site.name}`,
  description:
    "Suis SwAgA sur TikTok (919,2k), Instagram, Facebook et Snap via contact.",
};

export default function SocialPage() {
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
          href: site.social.tiktok.url,
          label: "TikTok",
          external: true,
        }}
      />
      <Social />
    </SiteShell>
  );
}
