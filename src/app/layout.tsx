import type { Metadata, Viewport } from "next";
import { Archivo, Syne } from "next/font/google";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { SplashScreen } from "@/components/SplashScreen";
import { ThemeProvider } from "@/components/ThemeProvider";
import { themeInitScript } from "@/lib/theme-script";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swagaofficiel95.vercel.app"),
  title: "SwAgA-Officiel95 | Danse · Contenu · Pubs",
  description:
    "Portfolio de SwAgA-Officiel95 — danseur & créateur de contenu à Lomé. Collabs artistes, pubs marques, contenus TikTok.",
  applicationName: "SwAgA-Officiel95",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SwAgA",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "SwAgA-Officiel95 | Danse · Contenu · Pubs",
    description:
      "Danseur & créateur de contenu à Lomé — collabs artistes, pubs marques, énergie street TikTok.",
    url: "https://swagaofficiel95.vercel.app",
    siteName: "SwAgA-Officiel95",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SwAgA-Officiel95",
      },
    ],
    locale: "fr_TG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SwAgA-Officiel95 | Danse · Contenu · Pubs",
    description:
      "Danseur & créateur à Lomé — collabs, pubs marques, contenus street.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
    { media: "(prefers-color-scheme: light)", color: "#f2efe8" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${archivo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-ink text-bone">
        <ThemeProvider>
          <SplashScreen />
          {children}
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
