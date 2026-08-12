import { About } from "@/components/About";
import { BookingCta } from "@/components/BookingCta";
import { Collabs } from "@/components/Collabs";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Press } from "@/components/Press";
import { Services } from "@/components/Services";
import { SiteShell } from "@/components/SiteShell";
import { TikTokCarousel } from "@/components/TikTokCarousel";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <About mode="teaser" />
      <TikTokCarousel />
      <Services mode="teaser" />
      <Collabs mode="teaser" />
      <Press />
      <BookingCta />
    </SiteShell>
  );
}
