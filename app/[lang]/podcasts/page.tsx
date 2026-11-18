"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import { useAudio } from "../../../context/AudioContext";
import {
  HeadphonesIcon,
  PlayIcon,
  SparklesIcon,
  ClockIcon,
  ShareIcon,
} from "../../../components/Icons";

export default function PodcastLandingPage() {
  const { lang, dir, t } = useLanguage();
  const { shows, episodes } = useCMS();
  const { playEpisode, isPlaying, currentEpisode } = useAudio();

  const isHe = lang !== "en";
  const [selectedShowId, setSelectedShowId] = useState<string>("all");

  const featuredEpisode = episodes.find((e) => e.featured) || episodes[0];

  const filteredEpisodes = episodes.filter(
    (e) => selectedShowId === "all" || e.showId === selectedShowId
  );

  return (
    <div className="py-12 space-y-16">
      {/* 1. Podcast Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1D4ED8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left/Right Text Info */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left rtl:lg:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
                <HeadphonesIcon className="w-3.5 h-3.5" />
                <span>{isHe ? "ספריית הפודקאסטים של נויראוואן" : "NEURAVAN Podcast Network"}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title leading-tight">
                {isHe
                  ? "האזינו לשיחות העומק המובילות בישראל על תודעה, היסטוריה וטכנולוגיה"
                  : "Immerse in Israel's Foremost Deep-Dive Dialogues on Mind, History & Technology"}
              </h1>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {isHe
                  ? "הפקות אודיו מקוריות בעברית עשירה עם חוקרים מובילים, ניתוח שורשים שמייים ותמלילים חיים."
                  : "Original audio productions with leading scholars, Semitic root analysis, and live synchronized transcripts."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => playEpisode(featuredEpisode)}
                  className="px-6 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-lg active:scale-95"
                >
                  <PlayIcon className="w-4 h-4 translate-x-0.5 rtl:-translate-x-0.5" />
                  <span>{isHe ? `האזינו לפרק החדש (${featuredEpisode.durationFormatted})` : `Listen to Latest Episode (${featuredEpisode.durationFormatted})`}</span>
                </button>

                <div className="flex items-center gap-2 text-xs">
                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
                  >
                    Spotify
                  </a>
                  <a
                    href="https://apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
                  >
                    Apple Podcasts
                  </a>
                </div>
              </div>
            </div>

            {/* Featured Episode Cover Artwork Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative aspect-square max-w-xs sm:max-w-sm w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                <img
                  src={featuredEpisode.coverImage}
                  alt={featuredEpisode.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#93C5FD] mb-1">
                    {featuredEpisode.category[lang]} • {isHe ? `פרק ${featuredEpisode.episodeNumber}` : `Ep. ${featuredEpisode.episodeNumber}`}
                  </span>
                  <h3 className="text-lg font-bold font-serif-title text-white line-clamp-2">
                    {featuredEpisode.title[lang]}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-1">
                    {featuredEpisode.subtitle[lang]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Podcast Shows Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#111827]">
            {isHe ? "תוכניות הפודקאסט של נויראוואן" : "NEURAVAN Podcast Shows"}
          </h2>
          <p className="text-sm text-[#4B5563] mt-1">
            {isHe
              ? "בחרו תוכנית והאזינו לכל הפרקים והעונות"
              : "Select a show to browse all seasons and master episodes"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shows.map((show) => (
            <Link
              key={show.id}
              href={`/${lang}/podcasts/${show.id}`}
              className="group bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={show.coverImage}
                  alt={show.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                  {show.category[lang]}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-serif-title text-[#111827] group-hover:text-[#1D4ED8] transition-colors">
                    {show.title[lang]}
                  </h3>
                  <p className="text-xs font-semibold text-[#C25E3E]">
                    {show.tagline[lang]}
                  </p>
                  <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3">
                    {show.description[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs text-[#6B7280]">
                  <div className="flex items-center gap-2">
                    <img
                      src={show.host.avatar}
                      alt={show.host.name[lang]}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="font-medium text-[#111827]">{show.host.name[lang]}</span>
                  </div>
                  <span className="font-bold text-[#1D4ED8]">
                    {isHe ? "צפו בכל הפרקים ←" : "All Episodes →"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. All Episodes List with Filter by Show */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
          <div>
            <h2 className="text-2xl font-extrabold font-serif-title text-[#111827]">
              {isHe ? "כל הפרקים לפי סדר פרסום" : "All Episodes in Chronological Order"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
              {filteredEpisodes.length} {isHe ? "פרקים זמינים להאזנה מיידית" : "episodes ready for instant streaming"}
            </p>
          </div>

          {/* Show Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedShowId("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedShowId === "all"
                  ? "bg-[#111827] text-white"
                  : "bg-white border border-[#E5E0D8] text-[#4B5563] hover:bg-[#F2EDE4]"
              }`}
            >
              {isHe ? "כל התוכניות" : "All Shows"}
            </button>
            {shows.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedShowId(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedShowId === s.id
                    ? "bg-[#111827] text-white"
                    : "bg-white border border-[#E5E0D8] text-[#4B5563] hover:bg-[#F2EDE4]"
                }`}
              >
                {s.title[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Episode Cards Grid */}
        <div className="space-y-4">
          {filteredEpisodes.map((ep) => (
            <div
              key={ep.id}
              className="p-5 sm:p-6 bg-white border border-[#E5E0D8] rounded-3xl hover:border-[#1D4ED8] shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <img
                  src={ep.coverImage}
                  alt={ep.title[lang]}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
                />

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider">
                    <span>{ep.category[lang]}</span>
                    <span>•</span>
                    <span>{isHe ? `פרק ${ep.episodeNumber}` : `Episode ${ep.episodeNumber}`}</span>
                  </div>

                  <Link
                    href={`/${lang}/podcasts/${ep.showId}/${ep.id}`}
                    className="text-base sm:text-lg font-bold font-serif-title text-[#111827] hover:text-[#1D4ED8] transition-colors block"
                  >
                    {ep.title[lang]}
                  </Link>

                  <p className="text-xs text-[#4B5563] line-clamp-1">
                    {ep.subtitle[lang]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <span className="text-xs font-mono text-[#6B7280]">
                  {ep.durationFormatted}
                </span>

                <button
                  onClick={() => playEpisode(ep)}
                  className="px-4 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95"
                >
                  <PlayIcon className="w-3.5 h-3.5 translate-x-0.5 rtl:-translate-x-0.5" />
                  <span>{t.player.listenNow}</span>
                </button>

                <Link
                  href={`/${lang}/podcasts/${ep.showId}/${ep.id}`}
                  className="px-4 py-2.5 rounded-full bg-[#F5F1EB] hover:bg-[#EDE8E0] text-[#111827] text-xs font-bold transition-colors"
                >
                  {isHe ? "עמוד הפרק" : "Details"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
