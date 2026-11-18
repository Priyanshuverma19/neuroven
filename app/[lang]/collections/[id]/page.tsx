"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageContext";
import { useCMS } from "../../../../context/CMSContext";
import { useAudio } from "../../../../context/AudioContext";
import {
  LayersIcon,
  PlayIcon,
  HeadphonesIcon,
  FilmIcon,
  BookOpenIcon,
  ClockIcon,
} from "../../../../components/Icons";
import { Language } from "../../../../data/neuravanContent";

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang: rawLang, id } = use(params);
  const lang: Language = rawLang === "en" ? "en" : "he";
  const { collections, episodes, videos, articles } = useCMS();
  const { playEpisode } = useAudio();
  const isHe = lang !== "en";

  const collection = collections.find((c) => c.id === id || c.slug === id);
  if (!collection) {
    notFound();
  }

  const collectionEpisodes = episodes.filter((e) => collection.episodeIds.includes(e.id));
  const collectionVideos = videos.filter((v) => collection.videoIds.includes(v.id));
  const collectionArticles = articles.filter((a) => collection.articleIds.includes(a.id));

  return (
    <div className="py-10 space-y-14">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
          <Link href={`/${lang}`} className="hover:text-[#111827]">
            {isHe ? "ראשי" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/collections`} className="hover:text-[#111827]">
            {isHe ? "אוספים" : "Collections"}
          </Link>
          <span>/</span>
          <span className="text-[#111827] font-semibold truncate max-w-sm">
            {collection.title[lang]}
          </span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D8]">
              <img
                src={collection.coverImage}
                alt={collection.title[lang]}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                {collection.category[lang]}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              <LayersIcon className="w-3.5 h-3.5" />
              <span>{isHe ? "מסע למידה בינתחומי" : "Thematic Curated Pathway"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title text-[#111827]">
              {collection.title[lang]}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-[#C25E3E]">
              {collection.subtitle[lang]}
            </p>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {collection.description[lang]}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <HeadphonesIcon className="w-4 h-4 text-[#1D4ED8]" />
                <span>{collectionEpisodes.length} {isHe ? "פרקי פודקאסט" : "Podcast Episodes"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FilmIcon className="w-4 h-4 text-[#C25E3E]" />
                <span>{collectionVideos.length} {isHe ? "סרטי וידאו" : "Video Films"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpenIcon className="w-4 h-4 text-[#2D5A46]" />
                <span>{collectionArticles.length} {isHe ? "מאמרי מחקר" : "Research Essays"}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Part 1: Podcast Episodes in Collection */}
      {collectionEpisodes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#1D4ED8]">
            <HeadphonesIcon className="w-4 h-4" />
            <span>{isHe ? "פרקי הפודקאסט במסע זה" : "Podcast Episodes in This Journey"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collectionEpisodes.map((ep) => (
              <div
                key={ep.id}
                className="p-5 bg-white border border-[#E5E0D8] rounded-2xl flex items-center justify-between gap-4 hover:border-[#1D4ED8] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={ep.coverImage}
                    alt={ep.title[lang]}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/${lang}/podcasts/${ep.showId}/${ep.id}`}
                      className="text-sm font-bold text-[#111827] hover:text-[#1D4ED8] truncate block"
                    >
                      {ep.title[lang]}
                    </Link>
                    <span className="text-xs text-[#6B7280] block truncate">
                      {ep.subtitle[lang]} • {ep.durationFormatted}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => playEpisode(ep)}
                  className="p-2.5 rounded-full bg-[#1D4ED8] text-white hover:bg-[#2563EB] shrink-0"
                  title="Play"
                >
                  <PlayIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Part 2: Videos in Collection */}
      {collectionVideos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-4 border-t border-[#E5E0D8]">
          <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#C25E3E]">
            <FilmIcon className="w-4 h-4" />
            <span>{isHe ? "סרטים תיעודיים ואנימציה במסע זה" : "Films & Animations in This Journey"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collectionVideos.map((vid) => (
              <Link
                key={vid.id}
                href={`/${lang}/videos/${vid.id}`}
                className="group bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden p-4 flex gap-4 hover:border-[#C25E3E] transition-all block"
              >
                <div className="relative aspect-video w-36 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <img
                    src={vid.coverImage}
                    alt={vid.title[lang]}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 rtl:right-auto rtl:left-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/80 text-white">
                    {vid.duration}
                  </span>
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <h4 className="text-sm font-bold text-[#111827] group-hover:text-[#C25E3E] transition-colors line-clamp-2">
                    {vid.title[lang]}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-2">
                    {vid.description[lang]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Part 3: Articles in Collection */}
      {collectionArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-4 border-t border-[#E5E0D8]">
          <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#2D5A46]">
            <BookOpenIcon className="w-4 h-4" />
            <span>{isHe ? "מאמרי קריאה ומחקר במסע זה" : "Essays in This Journey"}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collectionArticles.map((art) => (
              <Link
                key={art.id}
                href={`/${lang}/articles/${art.id}`}
                className="p-5 bg-white border border-[#E5E0D8] rounded-2xl hover:border-[#2D5A46] transition-all space-y-2 block"
              >
                <span className="text-[10px] font-bold text-[#2D5A46] uppercase tracking-wider">
                  {art.readingTimeMin} {isHe ? "דקות קריאה" : "min read"} • {art.author.name[lang]}
                </span>
                <h4 className="text-base font-bold text-[#111827]">
                  {art.title[lang]}
                </h4>
                <p className="text-xs text-[#6B7280] line-clamp-2">
                  {art.excerpt[lang]}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
