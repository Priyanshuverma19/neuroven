"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useAudio } from "../context/AudioContext";
import { useCMS } from "../context/CMSContext";
import { PlayIcon, HeadphonesIcon, FilmIcon, SparklesIcon } from "./Icons";

export default function HeroSection() {
  const { lang, dir, t } = useLanguage();
  const { playEpisode, isPlaying, currentEpisode } = useAudio();
  const { episodes, videos } = useCMS();

  const featuredEpisode = episodes.find((e) => e.featured) || episodes[0];
  const featuredVideo = videos.find((v) => v.featured) || videos[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Decorative organic background line art */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
          <path
            d="M-100 120 C 300 240, 500 40, 900 180 C 1200 280, 1400 120, 1600 220"
            stroke="#93C5FD"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            d="M-50 480 C 400 360, 700 520, 1100 420 C 1300 360, 1500 490, 1650 440"
            stroke="#FDBA74"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column: Editorial Manifesto & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left rtl:lg:text-right">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE8E0] border border-[#DED7CB] text-xs font-bold text-[#111827]">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] font-serif-title leading-[1.12]">
              {t.hero.title}
            </h1>

            {/* Editorial Description */}
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.hero.description}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                href={`/${lang}/explore`}
                className="px-6 py-3.5 rounded-full bg-[#111827] text-white hover:bg-[#1D4ED8] hover:shadow-lg active:scale-95 transition-all duration-200 text-sm font-bold flex items-center gap-2"
              >
                <span>{t.hero.ctaPrimary}</span>
                <span className="text-sm">✦</span>
              </Link>

              <button
                onClick={() => playEpisode(featuredEpisode)}
                className="px-6 py-3.5 rounded-full bg-white text-[#111827] border border-[#D5CEC2] hover:bg-[#FAF8F5] hover:border-[#111827] active:scale-95 transition-all duration-200 text-sm font-bold flex items-center gap-2.5 shadow-xs"
              >
                <div className="w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center">
                  <PlayIcon className="w-3.5 h-3.5 translate-x-0.2 rtl:-translate-x-0.2" />
                </div>
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>

            {/* Israeli Localization Highlights */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#6B7280]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#1D4ED8] font-bold">●</span>
                <span>{lang === "he" ? "עברית שפת מקור" : "Native Hebrew Content"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#C25E3E] font-bold">●</span>
                <span>{lang === "he" ? "אזור זמן ירושלים" : "Jerusalem Timezone"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#2D5A46] font-bold">●</span>
                <span>{lang === "he" ? "100% נגיש וחופשי" : "100% Open Access"}</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Layered Editorial Composition inspired by BibleProject */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Organic backdrop shape */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] flex items-center justify-center">
              <div className="absolute w-[85%] h-[90%] rounded-[48px] bg-gradient-to-tr from-[#DBEAFE] via-[#E0E7FF] to-[#FED7AA] opacity-70 transform rotate-1 transition-transform hover:rotate-0 duration-500" />

              {/* 1. Main Central Card: Featured Animated Video Short Film */}
              <div className="relative z-20 w-[84%] bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E5E0D8] group hover:shadow-2xl transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={featuredVideo.coverImage}
                    alt={featuredVideo.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
                    <span className="self-start px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#111827]">
                      {t.latest.badgeVideo} • {featuredVideo.duration}
                    </span>

                    <div className="flex items-center justify-between text-white">
                      <div className="min-w-0 pr-3 rtl:pr-0 rtl:pl-3">
                        <h3 className="text-base sm:text-lg font-bold font-serif-title truncate">
                          {featuredVideo.title[lang]}
                        </h3>
                        <p className="text-xs text-gray-200 truncate">
                          {featuredVideo.category[lang]}
                        </p>
                      </div>

                      <Link
                        href={`/${lang}/videos/${featuredVideo.id}`}
                        className="w-10 h-10 rounded-full bg-white text-[#111827] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1D4ED8] group-hover:text-white transition-all shrink-0"
                      >
                        <PlayIcon className="w-4 h-4 translate-x-0.5 rtl:-translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Floating Card A (Top Right): Ancient Wisdom & Hebrew Root Study */}
              <div className="absolute -top-4 right-2 rtl:right-auto rtl:-left-4 z-30 bg-[#FAF8F5] border border-[#E5E0D8] rounded-2xl p-3 shadow-lg max-w-[210px] sm:max-w-[230px] hidden sm:block animate-pulse-slow">
                <div className="flex items-center gap-2 mb-1">
                  <SparklesIcon className="w-4 h-4 text-[#C25E3E]" />
                  <span className="text-[11px] font-bold text-[#C25E3E] uppercase tracking-wider">
                    {lang === "he" ? "תובנת השבוע" : "Weekly Concept"}
                  </span>
                </div>
                <div className="text-sm font-bold font-hebrew-serif text-[#111827]">
                  {lang === "he" ? "שורש ק-ד-ם (קדם / קדימה)" : "Root Q-D-M (Kedem)"}
                </div>
                <p className="text-[11px] text-[#4B5563] mt-0.5 leading-snug">
                  {lang === "he"
                    ? "עבר, מזרח ועתיד ארוגים באותה מילה."
                    : "Past, East, and forward merged in one root."}
                </p>
              </div>

              {/* 3. Floating Card B (Bottom Left): Active Podcast Player Preview */}
              <div className="absolute -bottom-6 left-0 rtl:left-auto rtl:-right-2 z-30 bg-[#111827] text-white rounded-2xl p-3 sm:p-4 shadow-xl max-w-[250px] sm:max-w-[270px] border border-white/10 flex items-center gap-3">
                <button
                  onClick={() => playEpisode(featuredEpisode)}
                  className="w-10 h-10 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <span className="flex items-center gap-0.5">
                      <span className="w-1 h-3 bg-white animate-soundwave-1 rounded-full" />
                      <span className="w-1 h-4 bg-white animate-soundwave-2 rounded-full" />
                      <span className="w-1 h-2 bg-white animate-soundwave-3 rounded-full" />
                    </span>
                  ) : (
                    <PlayIcon className="w-4 h-4 translate-x-0.5 rtl:-translate-x-0.5" />
                  )}
                </button>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#93C5FD] block truncate">
                    {t.hero.featuredBadge}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">
                    {featuredEpisode.title[lang]}
                  </h4>
                  <span className="text-[10px] text-gray-400">
                    {featuredEpisode.durationFormatted} {t.hero.listenTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Latest Scroll Indicator */}
        <div className="mt-12 lg:mt-16 text-center">
          <a
            href="#latest-content"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4B5563] hover:text-[#111827] transition-colors"
          >
            <span>{lang === "he" ? "התכנים החדשים ביותר" : "Explore the Latest"}</span>
            <span className="text-sm">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
