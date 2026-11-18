"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "../../../../../context/LanguageContext";
import { useCMS } from "../../../../../context/CMSContext";
import { useAudio } from "../../../../../context/AudioContext";
import { formatIsraeliDate, Language } from "../../../../../data/neuravanContent";
import {
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward30Icon,
  HeadphonesIcon,
  SparklesIcon,
  ClockIcon,
  ShareIcon,
  CalendarIcon,
  CheckIcon,
} from "../../../../../components/Icons";

export default function EpisodeDetailPage({
  params,
}: {
  params: Promise<{ lang: string; showId: string; episodeId: string }>;
}) {
  const { lang: rawLang, showId, episodeId } = use(params);
  const lang: Language = rawLang === "en" ? "en" : "he";
  const { episodes, shows } = useCMS();
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    playEpisode,
    togglePlay,
    seek,
    skipSeconds,
    activeTranscriptLine,
    activeChapter,
  } = useAudio();

  const isHe = lang !== "en";
  const [activeTab, setActiveTab] = useState<"transcript" | "chapters" | "takeaways">("transcript");
  const [copyNotification, setCopyNotification] = useState(false);

  const episode = episodes.find((e) => e.id === episodeId);
  const show = shows.find((s) => s.id === showId);

  if (!episode) {
    notFound();
  }

  const isThisEpisodeActive = currentEpisode.id === episode.id;

  const handlePlayToggle = () => {
    if (!isThisEpisodeActive) {
      playEpisode(episode);
    } else {
      togglePlay();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyNotification(true);
      setTimeout(() => setCopyNotification(false), 2500);
    }
  };

  const relatedEpisodes = episodes.filter((e) => e.id !== episode.id).slice(0, 3);

  return (
    <div className="py-10 space-y-12">
      {/* 1. Episode Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-6">
          <Link href={`/${lang}`} className="hover:text-[#111827]">
            {isHe ? "ראשי" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/podcasts`} className="hover:text-[#111827]">
            {isHe ? "פודקאסטים" : "Podcasts"}
          </Link>
          {show && (
            <>
              <span>/</span>
              <Link href={`/${lang}/podcasts/${show.id}`} className="hover:text-[#111827]">
                {show.title[lang]}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#111827] font-semibold truncate max-w-xs">
            {isHe ? `פרק ${episode.episodeNumber}` : `Episode ${episode.episodeNumber}`}
          </span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative aspect-square max-w-xs w-full rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D8]">
              <img
                src={episode.coverImage}
                alt={episode.title[lang]}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                {isHe ? `פרק ${episode.episodeNumber}` : `Episode ${episode.episodeNumber}`}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5 text-center lg:text-left rtl:lg:text-right">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-[#6B7280]">
              <span className="px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] font-bold text-[#1D4ED8] uppercase tracking-wider">
                {episode.category[lang]}
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{formatIsraeliDate(episode.publishedAt, lang)}</span>
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{episode.durationFormatted}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-title text-[#111827] leading-tight">
              {episode.title[lang]}
            </h1>

            <p className="text-sm sm:text-base font-semibold text-[#C25E3E]">
              {episode.subtitle[lang]}
            </p>

            <p className="text-sm text-[#4B5563] leading-relaxed max-w-2xl">
              {episode.description[lang]}
            </p>

            {/* Play Button & Controls */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={handlePlayToggle}
                className="px-6 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md active:scale-95"
              >
                {isThisEpisodeActive && isPlaying ? (
                  <PauseIcon className="w-4 h-4" />
                ) : (
                  <PlayIcon className="w-4 h-4 translate-x-0.5 rtl:-translate-x-0.5" />
                )}
                <span>
                  {isThisEpisodeActive && isPlaying
                    ? isHe
                      ? "השהה השמעה"
                      : "Pause Playback"
                    : isHe
                    ? `האזן עכשיו (${episode.durationFormatted})`
                    : `Listen Now (${episode.durationFormatted})`}
                </span>
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-3 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] hover:bg-[#F2EDE4] text-xs font-bold text-[#111827] flex items-center gap-1.5 transition-colors"
              >
                <ShareIcon className="w-4 h-4 text-[#6B7280]" />
                <span>{copyNotification ? (isHe ? "הועתק ללוח!" : "Copied!") : (isHe ? "שתפו פרק" : "Share")}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Study Center: Transcript, Chapters & Key Takeaways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 space-y-6">
          {/* Tabs */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab("transcript")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "transcript"
                    ? "bg-[#111827] text-white"
                    : "bg-[#F5F1EB] text-[#4B5563] hover:bg-[#EBE5DB]"
                }`}
              >
                {isHe ? "תמליל חי ושורשים שמייים" : "Live Transcript & Root Insights"}
              </button>
              <button
                onClick={() => setActiveTab("chapters")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "chapters"
                    ? "bg-[#111827] text-white"
                    : "bg-[#F5F1EB] text-[#4B5563] hover:bg-[#EBE5DB]"
                }`}
              >
                {isHe ? "פרקים וציר זמן" : "Chapters & Timestamps"}
              </button>
              <button
                onClick={() => setActiveTab("takeaways")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === "takeaways"
                    ? "bg-[#111827] text-white"
                    : "bg-[#F5F1EB] text-[#4B5563] hover:bg-[#EBE5DB]"
                }`}
              >
                {isHe ? "נקודות דיון מרכזיות" : "Key Discussion Points"}
              </button>
            </div>

            <span className="text-xs text-[#6B7280] hidden sm:block">
              {isHe ? "קשב אינטראקטיבי" : "Interactive Audio Sync"}
            </span>
          </div>

          {/* Tab 1: Synchronized Transcript with Hebrew Roots */}
          {activeTab === "transcript" && (
            <div className="space-y-4 max-w-4xl mx-auto">
              <p className="text-xs text-[#6B7280] italic">
                {isHe
                  ? "לחצו על כל פסקה בתמליל כדי לקפוץ ישירות לנקודת הזמן בפרק:"
                  : "Click any paragraph to seek directly to that exact moment in the audio:"}
              </p>

              {episode.transcript.map((line) => {
                const isActive = isThisEpisodeActive && activeTranscriptLine?.id === line.id;
                return (
                  <div
                    key={line.id}
                    onClick={() => {
                      if (!isThisEpisodeActive) playEpisode(episode, line.time);
                      else seek(line.time);
                    }}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                      isActive
                        ? "bg-[#EFF6FF] border-[#93C5FD] shadow-sm"
                        : "bg-[#FAF8F5] border-[#E5E0D8] hover:bg-white hover:border-[#1D4ED8]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-[#1D4ED8]">
                        {line.speaker[lang]}
                      </span>
                      <span className="text-xs font-mono text-[#6B7280]">
                        {line.timestamp}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-[#1F2937] leading-relaxed">
                      {line.text[lang]}
                    </p>

                    {/* Hebrew Root Concept Pill Box */}
                    {line.rootConcept && (
                      <div className="mt-3 p-3.5 bg-white border border-[#E5E0D8] rounded-xl space-y-1">
                        <div className="flex items-center gap-2">
                          <SparklesIcon className="w-4 h-4 text-[#C25E3E]" />
                          <span className="text-sm font-bold font-hebrew-serif text-[#C25E3E]">
                            {line.rootConcept.term} ({line.rootConcept.transliteration})
                          </span>
                          <span className="text-xs text-[#4B5563]">
                            — {line.rootConcept.meaning[lang]}
                          </span>
                        </div>
                        <p className="text-xs text-[#4B5563] leading-normal">
                          {line.rootConcept.insight[lang]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Chapters & Timestamps */}
          {activeTab === "chapters" && (
            <div className="space-y-3 max-w-3xl mx-auto">
              {episode.chapters.map((ch) => {
                const isChActive = isThisEpisodeActive && activeChapter?.id === ch.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => {
                      if (!isThisEpisodeActive) playEpisode(episode, ch.time);
                      else seek(ch.time);
                    }}
                    className={`p-4 rounded-2xl cursor-pointer border flex items-start justify-between gap-4 transition-all ${
                      isChActive
                        ? "bg-[#EFF6FF] border-[#93C5FD]"
                        : "bg-[#FAF8F5] border-[#E5E0D8] hover:bg-white"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-[#1D4ED8] block mb-1">
                        {ch.timestamp}
                      </span>
                      <h4 className="text-base font-bold text-[#111827]">
                        {ch.title[lang]}
                      </h4>
                      <p className="text-xs text-[#4B5563] mt-1">
                        {ch.description[lang]}
                      </p>
                    </div>

                    <button className="px-3 py-1 rounded-full bg-[#1D4ED8] text-white text-xs font-bold shrink-0">
                      {isHe ? "נגן מנקודה זו" : "Play Segment"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 3: Key Discussion Points */}
          {activeTab === "takeaways" && (
            <div className="max-w-3xl mx-auto p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-4">
              <h3 className="text-lg font-bold font-serif-title text-[#111827]">
                {isHe ? "עיקרי הדיון בפרק זה:" : "Core Discussion Takeaways:"}
              </h3>
              <ul className="space-y-3 text-sm text-[#374151]">
                {episode.keyTakeaways[lang]?.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 3. Related Episodes */}
      {relatedEpisodes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-4 border-t border-[#E5E0D8]">
          <h3 className="text-xl font-bold font-serif-title text-[#111827]">
            {isHe ? "פרקים נוספים שעשויים לעניין אותך" : "More Recommended Episodes"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedEpisodes.map((rel) => (
              <div
                key={rel.id}
                className="bg-white border border-[#E5E0D8] rounded-2xl p-4 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                    {rel.category[lang]} • {rel.durationFormatted}
                  </span>
                  <Link
                    href={`/${lang}/podcasts/${rel.showId}/${rel.id}`}
                    className="text-sm font-bold font-serif-title text-[#111827] hover:text-[#1D4ED8] block mt-1 line-clamp-2"
                  >
                    {rel.title[lang]}
                  </Link>
                </div>
                <button
                  onClick={() => playEpisode(rel)}
                  className="text-xs font-bold text-[#1D4ED8] hover:underline self-start"
                >
                  {isHe ? "האזינו עכשיו ←" : "Listen Now →"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
