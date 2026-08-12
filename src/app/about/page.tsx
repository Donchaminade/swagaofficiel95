import type { Metadata } from "next";
import { About } from "@/components/About";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { site } from "@/lib/site";

const hero = site.pageHeroes.about;

export const metadata: Metadata = {
  title: `À propos | ${site.name}`,
  description: site.achievement.long,
};

export default function AboutPage() {
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
        cta={{ href: "/contact", label: "Booker" }}
      />
      <About mode="full" />
    </SiteShell>
  );
}
