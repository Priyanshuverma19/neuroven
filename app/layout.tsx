import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { AudioProvider } from "../context/AudioContext";
import { CMSProvider } from "../context/CMSContext";
import GlobalPlayer from "../components/GlobalPlayer";

export const metadata: Metadata = {
  title: "NEURAVAN | נויראוואן — Digital Media, Storytelling & Podcast Platform for Israel",
  description:
    "NEURAVAN is an established digital media, storytelling, and podcast platform. A journey into ideas, philosophy, cognitive science, and living Levantine culture.",
  keywords: [
    "NEURAVAN",
    "נויראוואן",
    "Podcasts in Israel",
    "Hebrew Philosophy",
    "Cognitive Science",
    "Hebrew Language",
    "Archaeology",
    "Jerusalem",
    "Storytelling Platform",
  ],
  authors: [{ name: "NEURAVAN Publishing House", url: "https://neuravan.com" }],
  openGraph: {
    title: "NEURAVAN | נויראוואן — Ideas, Storytelling & Podcast Platform",
    description: "A journey into ideas, storytelling, and human consciousness. Podcasts, videos, and articles.",
    locale: "en_US",
    type: "website",
    url: "https://neuravan.com",
  },
  alternates: {
    languages: {
      "en-US": "https://neuravan.com/en",
      "he-IL": "https://neuravan.com/he",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" data-scroll-behavior="smooth" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800&family=David+Libre:wght@400;500;700&family=Frank+Ruhl+Libre:wght@400;500;700;800;900&family=Heebo:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FAF8F5] text-[#111827]">
        <CMSProvider>
          <AudioProvider>
            <LanguageProvider initialLang="en">
              {children}
              <GlobalPlayer />
            </LanguageProvider>
          </AudioProvider>
        </CMSProvider>
      </body>
    </html>
  );
}
