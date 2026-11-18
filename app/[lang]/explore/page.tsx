"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import { useAudio } from "../../../context/AudioContext";
import {
  SearchIcon,
  HeadphonesIcon,
  FilmIcon,
  BookOpenIcon,
  LayersIcon,
  PlayIcon,
  ClockIcon,
} from "../../../components/Icons";

export default function ExplorePage() {
  const { lang, dir, t } = useLanguage();
  const { episodes, videos, articles, collections, resources } = useCMS();
  const { playEpisode } = useAudio();

  const [activeFormat, setActiveFormat] = useState<"all" | "podcasts" | "videos" | "articles" | "collections">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const isHe = lang !== "en";
  const cleanSearch = searchTerm.trim().toLowerCase();

  const allTags = Array.from(
    new Set([
      ...episodes.flatMap((e) => e.tags),
      ...videos.flatMap((v) => v.tags),
      ...articles.flatMap((a) => a.tags),
    ])
  );

  const filteredEpisodes = episodes.filter(
    (e) =>
      (selectedTag === "all" || e.tags.includes(selectedTag)) &&
      (cleanSearch === "" ||
        e.title.he.toLowerCase().includes(cleanSearch) ||
        e.title.en.toLowerCase().includes(cleanSearch) ||
        e.subtitle.he.toLowerCase().includes(cleanSearch) ||
        e.subtitle.en.toLowerCase().includes(cleanSearch))
  );

  const filteredVideos = videos.filter(
    (v) =>
      (selectedTag === "all" || v.tags.includes(selectedTag)) &&
      (cleanSearch === "" ||
        v.title.he.toLowerCase().includes(cleanSearch) ||
        v.title.en.toLowerCase().includes(cleanSearch) ||
        v.description.he.toLowerCase().includes(cleanSearch) ||
        v.description.en.toLowerCase().includes(cleanSearch))
  );

  const filteredArticles = articles.filter(
    (a) =>
      (selectedTag === "all" || a.tags.includes(selectedTag)) &&
      (cleanSearch === "" ||
        a.title.he.toLowerCase().includes(cleanSearch) ||
        a.title.en.toLowerCase().includes(cleanSearch) ||
        a.excerpt.he.toLowerCase().includes(cleanSearch) ||
        a.excerpt.en.toLowerCase().includes(cleanSearch))
  );

  const filteredCollections = collections.filter(
    (c) =>
      cleanSearch === "" ||
      c.title.he.toLowerCase().includes(cleanSearch) ||
      c.title.en.toLowerCase().includes(cleanSearch) ||
      c.description.he.toLowerCase().includes(cleanSearch) ||
      c.description.en.toLowerCase().includes(cleanSearch)
  );

  return (
    <div className="py-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E0] text-xs font-bold uppercase tracking-wider text-[#111827]">
            <span>{isHe ? "מרכז התוכן של נויראוואן" : "NEURAVAN Exploration Hub"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title text-[#111827]">
            {isHe ? "גלו את כל התכנים, הסיפורים והפרקים" : "Explore All Content, Stories & Episodes"}
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563]">
            {isHe
              ? "חיפוש רב-ממדי בפודקאסטים, סרטונים, מאמרים ואוספי למידה עיוניים"
              : "Cross-disciplinary discovery across audio shows, video shorts, longform essays, and thematic journeys"}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E5E0D8] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isHe ? "סננו לפי מילות מפתח (למשל: תודעה, ירושלים, שבת, AI)..." : "Filter by keywords (e.g., Hebrew, Consciousness, Desert, AI)..."}
                className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2.5 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>

            {/* Format Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: "all", label: isHe ? "כל הפורמטים" : "All Formats" },
                { id: "podcasts", label: t.nav.podcasts },
                { id: "videos", label: t.nav.videos },
                { id: "articles", label: t.nav.articles },
                { id: "collections", label: t.nav.collections },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setActiveFormat(fmt.id as typeof activeFormat)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    activeFormat === fmt.id
                      ? "bg-[#111827] text-white shadow-xs"
                      : "bg-[#F5F1EB] text-[#4B5563] hover:bg-[#EBE5DB]"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags cloud */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-[#F2EDE4]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] shrink-0">
              {isHe ? "נושאים:" : "Topics:"}
            </span>
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                selectedTag === "all" ? "bg-[#1D4ED8] text-white" : "bg-gray-100 text-[#4B5563] hover:bg-gray-200"
              }`}
            >
              {isHe ? "הכל" : "All"}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedTag === tag ? "bg-[#1D4ED8] text-white" : "bg-gray-100 text-[#4B5563] hover:bg-gray-200"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grids */}
        {/* Podcasts Grid */}
        {(activeFormat === "all" || activeFormat === "podcasts") && filteredEpisodes.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#1D4ED8] font-bold text-sm uppercase tracking-wider">
                <HeadphonesIcon className="w-4 h-4" />
                <span>{t.nav.podcasts} ({filteredEpisodes.length})</span>
              </div>
              <Link href={`/${lang}/podcasts`} className="text-xs font-bold text-[#1D4ED8] hover:underline">
                {isHe ? "לספריית הפודקאסטים המלאה ←" : "Podcast Library →"}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEpisodes.map((ep) => (
                <div
                  key={ep.id}
                  className="group bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={ep.coverImage}
                      alt={ep.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white">
                      {ep.category[lang]}
                    </span>
                    <button
                      onClick={() => playEpisode(ep)}
                      className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 w-10 h-10 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    >
                      <PlayIcon className="w-4 h-4 translate-x-0.5 rtl:-translate-x-0.5" />
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <Link
                        href={`/${lang}/podcasts/${ep.showId}/${ep.id}`}
                        className="text-base font-bold font-serif-title text-[#111827] group-hover:text-[#1D4ED8] transition-colors block line-clamp-2"
                      >
                        {ep.title[lang]}
                      </Link>
                      <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                        {ep.subtitle[lang]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F2EDE4] flex items-center justify-between text-xs text-[#4B5563]">
                      <span>{ep.durationFormatted}</span>
                      <span className="font-bold text-[#1D4ED8]">
                        {isHe ? `פרק ${ep.episodeNumber}` : `Ep. ${ep.episodeNumber}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Grid */}
        {(activeFormat === "all" || activeFormat === "videos") && filteredVideos.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#C25E3E] font-bold text-sm uppercase tracking-wider">
                <FilmIcon className="w-4 h-4" />
                <span>{t.nav.videos} ({filteredVideos.length})</span>
              </div>
              <Link href={`/${lang}/videos`} className="text-xs font-bold text-[#C25E3E] hover:underline">
                {isHe ? "לספריית הווידאו המלאה ←" : "Video Library →"}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((vid) => (
                <Link
                  key={vid.id}
                  href={`/${lang}/videos/${vid.id}`}
                  className="group bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between block"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={vid.coverImage}
                      alt={vid.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#111827] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <PlayIcon className="w-5 h-5 translate-x-0.5 rtl:-translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-white">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <h3 className="text-base font-bold font-serif-title text-[#111827] group-hover:text-[#C25E3E] transition-colors line-clamp-2">
                      {vid.title[lang]}
                    </h3>
                    <p className="text-xs text-[#6B7280] line-clamp-2 leading-relaxed">
                      {vid.description[lang]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {(activeFormat === "all" || activeFormat === "articles") && filteredArticles.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#2D5A46] font-bold text-sm uppercase tracking-wider">
                <BookOpenIcon className="w-4 h-4" />
                <span>{t.nav.articles} ({filteredArticles.length})</span>
              </div>
              <Link href={`/${lang}/articles`} className="text-xs font-bold text-[#2D5A46] hover:underline">
                {isHe ? "לספריית המאמרים המלאה ←" : "Articles Library →"}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/${lang}/articles/${art.id}`}
                  className="group bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between p-6 space-y-4 block"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D5A46]">
                      {art.category[lang]} • {art.readingTimeMin} {isHe ? "דק' קריאה" : "min read"}
                    </span>
                    <h3 className="text-lg font-bold font-serif-title text-[#111827] group-hover:text-[#2D5A46] transition-colors">
                      {art.title[lang]}
                    </h3>
                    <p className="text-xs text-[#4B5563] line-clamp-3 leading-relaxed">
                      {art.excerpt[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs text-[#6B7280]">
                    <span>{art.author.name[lang]}</span>
                    <span className="text-[#2D5A46] font-bold">
                      {isHe ? "קראו את המאמר ←" : "Read Essay →"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
