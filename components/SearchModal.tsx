"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { useAudio } from "../context/AudioContext";
import { SearchIcon, CloseIcon, PlayIcon, HeadphonesIcon, FilmIcon, BookOpenIcon, LayersIcon } from "./Icons";

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const { lang, dir, t } = useLanguage();
  const { episodes, videos, articles, collections, resources } = useCMS();
  const { playEpisode } = useAudio();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "podcasts" | "videos" | "articles" | "collections">("all");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const cleanQuery = query.trim().toLowerCase();

  // Search logic across all entities
  const filteredEpisodes = episodes.filter(
    (e) =>
      cleanQuery === "" ||
      e.title.he.toLowerCase().includes(cleanQuery) ||
      e.title.en.toLowerCase().includes(cleanQuery) ||
      e.subtitle.he.toLowerCase().includes(cleanQuery) ||
      e.subtitle.en.toLowerCase().includes(cleanQuery) ||
      e.tags.some((tag) => tag.toLowerCase().includes(cleanQuery))
  );

  const filteredVideos = videos.filter(
    (v) =>
      cleanQuery === "" ||
      v.title.he.toLowerCase().includes(cleanQuery) ||
      v.title.en.toLowerCase().includes(cleanQuery) ||
      v.description.he.toLowerCase().includes(cleanQuery) ||
      v.description.en.toLowerCase().includes(cleanQuery) ||
      v.tags.some((tag) => tag.toLowerCase().includes(cleanQuery))
  );

  const filteredArticles = articles.filter(
    (a) =>
      cleanQuery === "" ||
      a.title.he.toLowerCase().includes(cleanQuery) ||
      a.title.en.toLowerCase().includes(cleanQuery) ||
      a.excerpt.he.toLowerCase().includes(cleanQuery) ||
      a.excerpt.en.toLowerCase().includes(cleanQuery) ||
      a.tags.some((tag) => tag.toLowerCase().includes(cleanQuery))
  );

  const filteredCollections = collections.filter(
    (c) =>
      cleanQuery === "" ||
      c.title.he.toLowerCase().includes(cleanQuery) ||
      c.title.en.toLowerCase().includes(cleanQuery) ||
      c.description.he.toLowerCase().includes(cleanQuery) ||
      c.description.en.toLowerCase().includes(cleanQuery)
  );

  const totalResults =
    (selectedFilter === "all" || selectedFilter === "podcasts" ? filteredEpisodes.length : 0) +
    (selectedFilter === "all" || selectedFilter === "videos" ? filteredVideos.length : 0) +
    (selectedFilter === "all" || selectedFilter === "articles" ? filteredArticles.length : 0) +
    (selectedFilter === "all" || selectedFilter === "collections" ? filteredCollections.length : 0);

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/${lang}/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const sampleKeywords =
    lang === "he"
      ? ["שפה", "תודעה", "מדבר", "שבת", "ירושלים", "בינה מלאכותית"]
      : ["Hebrew", "Consciousness", "Desert", "Shabbat", "Jerusalem", "AI"];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn overflow-y-auto">
      <div className="bg-[#FAF8F5] text-[#111827] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E5E0D8] overflow-hidden flex flex-col my-auto max-h-[85vh]">
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="p-4 sm:p-6 border-b border-[#E5E0D8] bg-white flex items-center gap-3">
          <SearchIcon className="w-5 h-5 text-[#6B7280] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg text-[#111827] placeholder-[#9CA3AF] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-[#6B7280] hover:text-[#111827] rounded-full"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#F2EDE4] rounded-full transition-colors shrink-0"
            aria-label="Close search"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </form>

        {/* Filter Pills */}
        <div className="px-6 py-2.5 bg-[#F5F1EB] border-b border-[#E5E0D8] flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: lang === "he" ? "הכל" : "All" },
              { id: "podcasts", label: t.nav.podcasts },
              { id: "videos", label: t.nav.videos },
              { id: "articles", label: t.nav.articles },
              { id: "collections", label: t.nav.collections },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as typeof selectedFilter)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFilter === f.id
                    ? "bg-[#111827] text-white"
                    : "bg-white text-[#4B5563] hover:bg-[#EAE4D9]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#6B7280] shrink-0 font-medium">
            {totalResults} {t.search.resultsCount}
          </span>
        </div>

        {/* Search Results / Suggestions Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {cleanQuery === "" && (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                {t.search.suggestionsTitle}
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] hover:border-[#111827] text-xs font-semibold text-[#111827] transition-all"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && cleanQuery !== "" && (
            <div className="p-8 text-center space-y-3">
              <p className="text-sm text-[#4B5563]">
                {t.search.noResults}
              </p>
            </div>
          )}

          {/* Podcasts */}
          {(selectedFilter === "all" || selectedFilter === "podcasts") && filteredEpisodes.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] flex items-center gap-1.5">
                <HeadphonesIcon className="w-3.5 h-3.5" />
                <span>{t.nav.podcasts}</span>
              </span>
              <div className="space-y-2">
                {filteredEpisodes.map((ep) => (
                  <div
                    key={ep.id}
                    className="p-3 bg-white border border-[#E5E0D8] rounded-2xl flex items-center justify-between gap-4 hover:border-[#1D4ED8] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={ep.coverImage}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/${lang}/podcasts/${ep.showId}/${ep.id}`}
                          onClick={onClose}
                          className="text-xs sm:text-sm font-bold text-[#111827] hover:text-[#1D4ED8] truncate block"
                        >
                          {ep.title[lang]}
                        </Link>
                        <span className="text-[11px] text-[#6B7280] truncate block">
                          {ep.subtitle[lang]} • {ep.durationFormatted}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playEpisode(ep);
                        onClose();
                      }}
                      className="p-2 rounded-full bg-[#1D4ED8] text-white hover:bg-[#2563EB] shrink-0"
                      title={t.player.listenNow}
                    >
                      <PlayIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {(selectedFilter === "all" || selectedFilter === "videos") && filteredVideos.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#C25E3E] flex items-center gap-1.5">
                <FilmIcon className="w-3.5 h-3.5" />
                <span>{t.nav.videos}</span>
              </span>
              <div className="space-y-2">
                {filteredVideos.map((vid) => (
                  <Link
                    key={vid.id}
                    href={`/${lang}/videos/${vid.id}`}
                    onClick={onClose}
                    className="p-3 bg-white border border-[#E5E0D8] rounded-2xl flex items-center gap-3 hover:border-[#C25E3E] transition-all block"
                  >
                    <img
                      src={vid.coverImage}
                      alt=""
                      className="w-14 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm font-bold text-[#111827] truncate block">
                        {vid.title[lang]}
                      </span>
                      <span className="text-[11px] text-[#6B7280]">
                        {vid.category[lang]} • {vid.duration}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Articles */}
          {(selectedFilter === "all" || selectedFilter === "articles") && filteredArticles.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#2D5A46] flex items-center gap-1.5">
                <BookOpenIcon className="w-3.5 h-3.5" />
                <span>{t.nav.articles}</span>
              </span>
              <div className="space-y-2">
                {filteredArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/${lang}/articles/${art.id}`}
                    onClick={onClose}
                    className="p-3 bg-white border border-[#E5E0D8] rounded-2xl flex items-center gap-3 hover:border-[#2D5A46] transition-all block"
                  >
                    <img
                      src={art.coverImage}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs sm:text-sm font-bold text-[#111827] truncate block">
                        {art.title[lang]}
                      </span>
                      <span className="text-[11px] text-[#6B7280]">
                        {art.readingTimeMin} {lang === "he" ? "דקות קריאה" : "min read"} • {art.author.name[lang]}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {cleanQuery !== "" && (
          <div className="p-4 bg-[#F5F1EB] border-t border-[#E5E0D8] flex items-center justify-between text-xs">
            <span className="text-[#6B7280]">
              {lang === "he" ? "לחצו Enter כדי לראות את כל תוצאות החיפוש" : "Press Enter for complete results page"}
            </span>
            <button
              onClick={handleFullSearch}
              className="font-bold text-[#1D4ED8] hover:underline"
            >
              {lang === "he" ? "צפו בעמוד התוצאות המלא ←" : "Open Full Results Page →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
