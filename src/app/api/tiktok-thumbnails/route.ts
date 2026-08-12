import { site } from "@/lib/site";
import { NextResponse } from "next/server";

export const revalidate = 86400;

type OEmbed = {
  thumbnail_url?: string;
};

async function fetchThumbnail(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as OEmbed;
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

/** Batch oEmbed → thumbnail_url pour les 8 clips du carousel. */
export async function GET() {
  const pairs = await Promise.all(
    site.tiktokEmbeds.map(async (embed) => {
      const thumb = await fetchThumbnail(embed.url);
      return [embed.url, thumb] as const;
    }),
  );

  const thumbnails: Record<string, string> = {};
  for (const [url, thumb] of pairs) {
    if (thumb) thumbnails[url] = thumb;
  }

  return NextResponse.json(
    { thumbnails },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
