"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useAudio } from "../context/AudioContext";
import { useCMS } from "../context/CMSContext";
import { PlayIcon } from "./Icons";

export default function LatestContentRow() {
  const { lang, dir, t } = useLanguage();
  const { playEpisode } = useAudio();
  const { episodes, videos, articles, collections, resources } = useCMS();

  // Curate horizontal cards representing all formats
  const ep = episodes[0];
  const vid = videos[0];
  const art = articles[0];
  const res = resources[0];
  const col = collections[0];

  const cards = [
    {
      id: "card-video",
      type: "video",
      badge: t.latest.badgeVideo,
      badgeColor: "bg-black/75 text-white",
      title: vid.title[lang],
      subtitle: vid.category[lang],
      meta: vid.duration,
      image: vid.coverImage,
      href: `/${lang}/videos/${vid.id}`,
      action: null,
    },
    {
      id: "card-article",
      type: "article",
      badge: t.latest.badgeArticle,
      badgeColor: "bg-[#FED7AA] text-[#9A3412]",
      title: art.title[lang],
      subtitle: art.category[lang],
      meta: `${art.readingTimeMin} ${lang === "he" ? "דקות קריאה" : "min read"}`,
      image: art.coverImage,
      href: `/${lang}/articles/${art.id}`,
      action: null,
    },
    {
      id: "card-podcast",
      type: "podcast",
      badge: t.latest.badgePodcast,
      badgeColor: "bg-[#DBEAFE] text-[#1E40AF]",
      title: ep.title[lang],
      subtitle: ep.subtitle[lang],
      meta: `${ep.durationFormatted} • ${lang === "he" ? `פרק ${ep.episodeNumber}` : `Ep. ${ep.episodeNumber}`}`,
      image: ep.coverImage,
      href: `/${lang}/podcasts/${ep.showId}/${ep.id}`,
      action: () => playEpisode(ep),
    },
    {
      id: "card-resource",
      type: "resource",
      badge: t.latest.badgeResource,
      badgeColor: "bg-[#FCE7F3] text-[#9D174D]",
      title: res.title[lang],
      subtitle: res.subtitle[lang],
      meta: res.formatLabel[lang],
      image: res.coverImage,
      href: `/${lang}/resources`,
      action: null,
    },
    {
      id: "card-collection",
      type: "collection",
      badge: t.latest.badgeCollection,
      badgeColor: "bg-[#D1FAE5] text-[#065F46]",
      title: col.title[lang],
      subtitle: col.subtitle[lang],
      meta: `${col.episodeIds.length + col.videoIds.length + col.articleIds.length} ${t.featuredCollections.itemsCount}`,
      image: col.coverImage,
      href: `/${lang}/collections/${col.id}`,
      action: null,
    },
  ];

  return (
    <section id="latest-content" className="py-12 border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#111827]">
              {t.latest.title}
            </h2>
            <p className="text-sm text-[#4B5563] mt-1">
              {t.latest.subtitle}
            </p>
          </div>

          <Link
            href={`/${lang}/explore`}
            className="text-xs font-bold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
          >
            {t.latest.viewAll}
          </Link>
        </div>

        {/* Horizontal responsive card grid matching BibleProject card presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {cards.map((c) => (
            <div
              key={c.id}
              className="group bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Top Badge */}
                <span
                  className={`absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${c.badgeColor}`}
                >
                  {c.badge}
                </span>

                {/* Instant Play Action for Podcast */}
                {c.action && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      c.action();
                    }}
                    className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 w-10 h-10 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 shadow-lg transition-all"
                    title={t.player.listenNow}
                  >
                    <PlayIcon className="w-4 h-4 translate-x-0.5 rtl:-translate-x-0.5" />
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <Link
                    href={c.href}
                    className="text-sm font-bold font-serif-title text-[#111827] group-hover:text-[#1D4ED8] line-clamp-2 transition-colors block"
                  >
                    {c.title}
                  </Link>
                  <p className="text-xs text-[#6B7280] line-clamp-1">
                    {c.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2EDE4] flex items-center justify-between text-[11px] text-[#4B5563] font-medium">
                  <span>{c.meta}</span>
                  <Link
                    href={c.href}
                    className="text-[#1D4ED8] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform"
                  >
                    →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
