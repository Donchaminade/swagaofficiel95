import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ServiceFrames } from "@/components/ServiceFrames";
import { SiteShell } from "@/components/SiteShell";
import { STAGGER } from "@/lib/stagger";
import { getServiceBySlug, site, waLink } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: `Service | ${site.name}` };
  return {
    title: `${service.title} | ${site.name}`,
    description: service.copy,
  };
}

function DetailBlock({
  eyebrow,
  title,
  items,
  delayBase = 0.15,
}: {
  eyebrow: string;
  title: string;
  items: readonly string[];
  delayBase?: number;
}) {
  return (
    <div className="mt-12">
      <Reveal variant="section-fade-up" delay={delayBase}>
        <p className="text-xs uppercase tracking-[0.3em] text-bic">{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl tracking-tight text-bone md:text-3xl">
          {title}
        </h3>
      </Reveal>
      <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
          <li key={item} className="list-none">
            <Reveal
              variant="card-slide-up"
              delay={delayBase + 0.05 + i * 0.08}
              className="border-l-2 border-bic/50 pl-4 text-bone"
            >
              <p className="text-base leading-relaxed text-concrete md:text-lg">
                {item}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const wa = waLink(
    site.whatsapp[0].phone,
    `Salut SwAgA, je veux booker : ${service.title}`
  );

  return (
    <SiteShell>
      <PageHero
        eyebrow={`Service ${service.accent}`}
        title={service.title}
        subtitle={service.copy}
        image={{
          src: service.heroImage,
          alt: service.title,
          objectPosition: "center 25%",
        }}
        cta={{ href: wa, label: "Booker WhatsApp", external: true }}
      />

      <section className="bg-ink px-5 pb-20 pt-8 md:px-8 md:pb-28 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <BackLink
            href="/services"
            ariaLabel="Retour aux services"
            className="mb-10 md:mb-12"
          />
        </div>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal variant="section-fade-up" delay={STAGGER.section}>
              <p className="text-xs uppercase tracking-[0.3em] text-bic">
                Pitch
              </p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-bone md:text-5xl">
                Ce que tu obtiens
              </h2>
              <p className="mt-6 text-base leading-relaxed text-concrete md:text-lg">
                {service.description}
              </p>
            </Reveal>

            <DetailBlock
              eyebrow="Pour qui"
              title="Cibles"
              items={service.forWho}
              delayBase={0.12}
            />
            <DetailBlock
              eyebrow="Livrables"
              title="Ce que tu reçois"
              items={service.deliverables}
              delayBase={0.18}
            />
            <DetailBlock
              eyebrow="Process"
              title="Comment ça se passe"
              items={service.process}
              delayBase={0.24}
            />

            <ul className="mt-12 space-y-4">
              {service.benefits.map((b, i) => (
                <li key={b} className="list-none">
                  <Reveal
                    variant="card-slide-up"
                    delay={STAGGER.feature[i] ?? 0.1 + i * 0.1}
                    className="border-l-2 border-bic/50 pl-4 text-bone"
                  >
                    <span className="text-xs uppercase tracking-[0.18em] text-concrete">
                      Bénéfice
                    </span>
                    <p className="mt-1 font-display text-xl md:text-2xl">{b}</p>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal
              variant="text-fade"
              delay={0.4}
              className="mt-12 flex flex-wrap gap-4"
            >
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-bic bg-bic px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-bone transition hover:bg-transparent hover:text-bic"
              >
                Booker WhatsApp
              </a>
              <Link
                href="/services"
                className="border border-hairline px-6 py-3 text-sm uppercase tracking-[0.18em] text-bone transition hover:border-bic hover:text-bic"
              >
                Tous les services
              </Link>
            </Reveal>
          </div>

          <Reveal variant="card-zoom" delay={STAGGER.col[1]}>
            <ServiceFrames frames={service.frames} alt={service.title} />
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
