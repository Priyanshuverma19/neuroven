import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://neuravan.com";
  const languages = ["he", "en"];
  const staticRoutes = [
    "",
    "/explore",
    "/podcasts",
    "/podcasts/mind-and-language",
    "/podcasts/jerusalem-salon",
    "/podcasts/future-horizon",
    "/podcasts/mind-and-language/ep-42-hebrew-cognition",
    "/podcasts/mind-and-language/ep-43-desert-solitude",
    "/podcasts/jerusalem-salon/ep-18-judean-strata",
    "/podcasts/future-horizon/ep-29-ai-and-soul",
    "/videos",
    "/videos/vid-song-of-songs",
    "/videos/vid-free-will-revolution",
    "/articles",
    "/articles/art-athens-and-jerusalem",
    "/articles/art-neurobiology-of-sabbath",
    "/articles/art-metaphors-golden-age",
    "/collections",
    "/collections/col-consciousness-and-heritage",
    "/collections/col-jerusalem-strata",
    "/resources",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of languages) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : route.startsWith("/podcasts") ? 0.9 : 0.8,
        alternates: {
          languages: {
            "he-IL": `${baseUrl}/he${route}`,
            "en-US": `${baseUrl}/en${route}`,
          },
        },
      });
    }
  }

  return entries;
}
