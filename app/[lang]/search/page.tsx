"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import { useAudio } from "../../../context/AudioContext";
import {
  SearchIcon,
  PlayIcon,
  HeadphonesIcon,
  FilmIcon,
  BookOpenIcon,
  LayersIcon,
} from "../../../components/Icons";

function SearchResultsContent() {
  const { lang, dir, t } = useLanguage();
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? searchParams.get("q") || "" : "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedFormat, setSelectedFormat] = useState<"all" | "podcasts" | "videos" | "articles">("all");
  const { episodes, videos, articles, collections } = useCMS();
  const { playEpisode } = useAudio();
  const isHe = lang !== "en";

  useEffect(() => {
    if (searchParams) {
      setQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  const clean = query.trim().toLowerCase();

  const foundEpisodes = episodes.filter(
    (e) =>
      clean === "" ||
      e.title.he.toLowerCase().includes(clean) ||
      e.title.en.toLowerCase().includes(clean) ||
      e.subtitle.he.toLowerCase().includes(clean) ||
      e.subtitle.en.toLowerCase().includes(clean) ||
      e.tags.some((t) => t.toLowerCase().includes(clean))
  );

  const foundVideos = videos.filter(
    (v) =>
      clean === "" ||
      v.title.he.toLowerCase().includes(clean) ||
      v.title.en.toLowerCase().includes(clean) ||
      v.description.he.toLowerCase().includes(clean) ||
      v.description.en.toLowerCase().includes(clean) ||
      v.tags.some((t) => t.toLowerCase().includes(clean))
  );

  const foundArticles = articles.filter(
    (a) =>
      clean === "" ||
      a.title.he.toLowerCase().includes(clean) ||
      a.title.en.toLowerCase().includes(clean) ||
      a.excerpt.he.toLowerCase().includes(clean) ||
      a.excerpt.en.toLowerCase().includes(clean) ||
      a.tags.some((t) => t.toLowerCase().includes(clean))
  );

  const totalResults =
    (selectedFormat === "all" || selectedFormat === "podcasts" ? foundEpisodes.length : 0) +
    (selectedFormat === "all" || selectedFormat === "videos" ? foundVideos.length : 0) +
    (selectedFormat === "all" || selectedFormat === "articles" ? foundArticles.length : 0);

  return (
    <div className="py-12 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold font-serif-title text-[#111827]">
            {isHe ? "תוצאות חיפוש" : "Search Results"}
          </h1>

          {/* Search Box */}
          <div className="relative max-w-2xl">
            <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-4 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#E5E0D8] text-base focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] shadow-xs"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: "all", label: isHe ? "הכל" : "All" },
                { id: "podcasts", label: `${t.nav.podcasts} (${foundEpisodes.length})` },
                { id: "videos", label: `${t.nav.videos} (${foundVideos.length})` },
                { id: "articles", label: `${t.nav.articles} (${foundArticles.length})` },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormat(f.id as typeof selectedFormat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    selectedFormat === f.id
                      ? "bg-[#111827] text-white"
                      : "bg-white border border-[#E5E0D8] text-[#4B5563] hover:bg-[#F2EDE4]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#6B7280]">
              {totalResults} {t.search.resultsCount}
            </span>
          </div>
        </div>

        {/* Empty state */}
        {totalResults === 0 && (
          <div className="p-12 bg-white rounded-3xl border border-[#E5E0D8] text-center space-y-3">
            <h3 className="text-lg font-bold font-serif-title text-[#111827]">
              {isHe ? "לא נמצאו תוצאות" : "No Results Found"}
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mx-auto">
              {t.search.noResults}
            </p>
          </div>
        )}

        {/* Results Sections */}
        {/* Episodes */}
        {(selectedFormat === "all" || selectedFormat === "podcasts") && foundEpisodes.length > 0 && (
          <div className="space-y-3 pt-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] flex items-center gap-1.5">
              <HeadphonesIcon className="w-4 h-4" />
              <span>{t.nav.podcasts}</span>
            </span>

            <div className="space-y-3">
              {foundEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  className="p-4 sm:p-5 bg-white border border-[#E5E0D8] rounded-2xl flex items-center justify-between gap-4 hover:border-[#1D4ED8] transition-all"
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
                        className="text-sm sm:text-base font-bold text-[#111827] hover:text-[#1D4ED8] truncate block"
                      >
                        {ep.title[lang]}
                      </Link>
                      <p className="text-xs text-[#6B7280] truncate">
                        {ep.subtitle[lang]} • {ep.durationFormatted}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => playEpisode(ep)}
                    className="p-2.5 rounded-full bg-[#1D4ED8] text-white hover:bg-[#2563EB] shrink-0"
                  >
                    <PlayIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {(selectedFormat === "all" || selectedFormat === "videos") && foundVideos.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-[#E5E0D8]">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#C25E3E] flex items-center gap-1.5">
              <FilmIcon className="w-4 h-4" />
              <span>{t.nav.videos}</span>
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foundVideos.map((vid) => (
                <Link
                  key={vid.id}
                  href={`/${lang}/videos/${vid.id}`}
                  className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden p-4 space-y-2 block hover:border-[#C25E3E] transition-all"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={vid.coverImage}
                      alt={vid.title[lang]}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                      {vid.duration}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111827] line-clamp-1">
                    {vid.title[lang]}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-2">
                    {vid.description[lang]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles */}
        {(selectedFormat === "all" || selectedFormat === "articles") && foundArticles.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-[#E5E0D8]">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#2D5A46] flex items-center gap-1.5">
              <BookOpenIcon className="w-4 h-4" />
              <span>{t.nav.articles}</span>
            </span>

            <div className="space-y-3">
              {foundArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/${lang}/articles/${art.id}`}
                  className="p-5 bg-white border border-[#E5E0D8] rounded-2xl block hover:border-[#2D5A46] transition-all space-y-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A46]">
                    {art.category[lang]} • {art.readingTimeMin} {isHe ? "דקות קריאה" : "min read"}
                  </span>
                  <h4 className="text-base font-bold text-[#111827]">
                    {art.title[lang]}
                  </h4>
                  <p className="text-xs text-[#4B5563] line-clamp-2">
                    {art.excerpt[lang]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading search...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
