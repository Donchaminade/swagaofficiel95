import { About } from "@/components/About";
import { Collabs } from "@/components/Collabs";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { SiteShell } from "@/components/SiteShell";
import { Social } from "@/components/Social";
import { TikTokCarousel } from "@/components/TikTokCarousel";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <About mode="teaser" />
      <TikTokCarousel />
      <Services mode="teaser" />
      <Collabs />
      <Social />
      <Contact />
    </SiteShell>
  );
}
