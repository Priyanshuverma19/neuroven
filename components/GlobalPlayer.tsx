"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAudio } from "../context/AudioContext";
import { useLanguage } from "../context/LanguageContext";
import {
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward30Icon,
  Volume2Icon,
  VolumeXIcon,
  Maximize2Icon,
  Minimize2Icon,
  CloseIcon,
  SubtitlesIcon,
  ExternalLinkIcon,
  ShareIcon,
  SparklesIcon,
} from "./Icons";

export default function GlobalPlayer() {
  const {
    currentEpisode,
    isPlaying,
    currentTime,
    duration,
    playbackSpeed,
    volume,
    isMuted,
    isLoading,
    isPlayerModalOpen,
    activeChapter,
    activeTranscriptLine,
    togglePlay,
    seek,
    skipSeconds,
    setSpeed,
    setVol,
    toggleMute,
    setIsPlayerModalOpen,
  } = useAudio();

  const { lang, dir, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"chapters" | "transcript" | "notes">("transcript");
  const [copySuccess, setCopySuccess] = useState(false);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. PERSISTENT MINI PLAYER DOCKED AT BOTTOM                    */}
      {/* ------------------------------------------------------------- */}
      <aside
        aria-label="Persistent Audio Player"
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#111827]/96 text-white backdrop-blur-xl border-t border-white/10 shadow-2xl transition-all"
      >
        {/* Top interactive progress bar */}
        <div className="relative w-full h-1.5 bg-white/10 group cursor-pointer">
          <div
            className="h-full bg-gradient-to-r from-[#1D4ED8] via-[#3B82F6] to-[#C25E3E] transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={1}
            value={currentTime}
            onChange={(e) => seek(parseFloat(e.target.value))}
            aria-label="Seek audio"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-6">
          {/* Episode Info & Artwork */}
          <div className="flex items-center gap-3 min-w-0 max-w-[280px] sm:max-w-xs md:max-w-sm">
            <button
              onClick={() => setIsPlayerModalOpen(true)}
              className="relative shrink-0 rounded-lg overflow-hidden group focus:outline-none"
              title={t.player.openFull}
            >
              <img
                src={currentEpisode.coverImage}
                alt={currentEpisode.title[lang]}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                  <span className="w-1 bg-white animate-soundwave-1 rounded-full" />
                  <span className="w-1 bg-[#3B82F6] animate-soundwave-2 rounded-full" />
                  <span className="w-1 bg-[#C25E3E] animate-soundwave-3 rounded-full" />
                </div>
              )}
            </button>

            <div className="min-w-0 flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#93C5FD] truncate">
                {currentEpisode.category[lang]} • {lang === "he" ? `פרק ${currentEpisode.episodeNumber}` : `Ep. ${currentEpisode.episodeNumber}`}
              </span>
              <button
                onClick={() => setIsPlayerModalOpen(true)}
                className="text-left rtl:text-right text-xs sm:text-sm font-bold text-white hover:text-[#93C5FD] truncate transition-colors"
              >
                {currentEpisode.title[lang]}
              </button>
              {activeChapter && (
                <span className="text-[11px] text-gray-400 truncate hidden sm:block">
                  {activeChapter.title[lang]}
                </span>
              )}
            </div>
          </div>

          {/* Center Playback Controls */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Skip Back 15s */}
              <button
                onClick={() => skipSeconds(-15)}
                className="p-1.5 text-gray-300 hover:text-white transition-colors"
                title={t.player.rewind15}
                aria-label={t.player.rewind15}
              >
                <Rewind15Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Play / Pause Primary Button */}
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-[#111827] hover:bg-[#FAF8F5] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg"
                title={isPlaying ? t.player.pause : t.player.play}
                aria-label={isPlaying ? t.player.pause : t.player.play}
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-[#111827] border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <PauseIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 translate-x-0.5 rtl:-translate-x-0.5" />
                )}
              </button>

              {/* Skip Forward 30s */}
              <button
                onClick={() => skipSeconds(30)}
                className="p-1.5 text-gray-300 hover:text-white transition-colors"
                title={t.player.forward30}
                aria-label={t.player.forward30}
              >
                <Forward30Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Time Indicator */}
            <div className="text-[11px] font-mono text-gray-400 hidden sm:flex items-center gap-1.5">
              <span>{formatTime(currentTime)}</span>
              <span>/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Utility Controls: Speed, Volume, Modal Expand */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speed Selector */}
            <div className="relative group hidden md:block">
              <button
                className="px-2 py-1 text-xs font-mono font-bold text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                title={t.player.speed}
              >
                {playbackSpeed}x
              </button>
              <div className="absolute bottom-full mb-2 right-0 hidden group-hover:flex flex-col bg-[#1F2937] border border-white/10 rounded-lg p-1 shadow-xl">
                {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setSpeed(spd)}
                    className={`px-3 py-1 text-xs font-mono rounded text-left rtl:text-right hover:bg-white/10 ${
                      playbackSpeed === spd ? "text-[#3B82F6] font-bold" : "text-gray-300"
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Toggle & Slider */}
            <div className="hidden lg:flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="p-1.5 text-gray-300 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeXIcon className="w-5 h-5" /> : <Volume2Icon className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => setVol(parseFloat(e.target.value))}
                aria-label="Volume slider"
                className="w-16 h-1 accent-[#3B82F6] cursor-pointer"
              />
            </div>

            {/* Expand Drawer Button */}
            <button
              onClick={() => setIsPlayerModalOpen(true)}
              className="p-2 text-gray-300 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-colors"
              title={t.player.openFull}
            >
              <Maximize2Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* 2. FULL EXPANDED EXPERIENCE MODAL / DRAWER                   */}
      {/* ------------------------------------------------------------- */}
      {isPlayerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end lg:justify-center lg:items-center p-0 lg:p-6 animate-fadeIn">
          <div className="w-full lg:max-w-5xl max-h-[92vh] bg-[#FAF8F5] text-[#111827] rounded-t-3xl lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#E5E0D8]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E5E0D8] bg-[#F5F1EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                  NEURAVAN Podcast Player • {currentEpisode.category[lang]}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#EAE4D9] rounded-full transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <ShareIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{copySuccess ? (lang === "he" ? "הקישור הועתק!" : "Copied!") : (lang === "he" ? "שתפו" : "Share")}</span>
                </button>
                <button
                  onClick={() => setIsPlayerModalOpen(false)}
                  className="p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#EAE4D9] rounded-full transition-colors"
                  title={t.player.closeFull}
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Artwork, Titles, Stream links, Controls */}
              <div className="lg:col-span-5 space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left rtl:lg:text-right">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-square max-w-sm w-full">
                  <img
                    src={currentEpisode.coverImage}
                    alt={currentEpisode.title[lang]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] font-bold text-white uppercase tracking-wider">
                    {lang === "he" ? `פרק ${currentEpisode.episodeNumber}` : `Episode ${currentEpisode.episodeNumber}`}
                  </div>
                </div>

                <div className="space-y-1 w-full">
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-[#111827] leading-snug">
                    {currentEpisode.title[lang]}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {currentEpisode.subtitle[lang]}
                  </p>
                </div>

                {/* Stream On Badges */}
                <div className="w-full pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
                    {t.player.streamOn}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://open.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold bg-[#1ED760]/10 text-[#0F766E] border border-[#1ED760]/30 rounded-full hover:bg-[#1ED760]/20 transition-colors flex items-center gap-1.5"
                    >
                      <span>● Spotify</span>
                    </a>
                    <a
                      href="https://apple.com/apple-podcasts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold bg-[#8B5CF6]/10 text-[#6D28D9] border border-[#8B5CF6]/30 rounded-full hover:bg-[#8B5CF6]/20 transition-colors flex items-center gap-1.5"
                    >
                      <span>● Apple Podcasts</span>
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-semibold bg-[#EF4444]/10 text-[#B91C1C] border border-[#EF4444]/30 rounded-full hover:bg-[#EF4444]/20 transition-colors flex items-center gap-1.5"
                    >
                      <span>● YouTube</span>
                    </a>
                  </div>
                </div>

                {/* Link to Full Episode Page */}
                <Link
                  href={`/${lang}/podcasts/${currentEpisode.showId}/${currentEpisode.id}`}
                  onClick={() => setIsPlayerModalOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#1D4ED8] bg-[#EFF6FF] border border-[#BFDBFE] hover:bg-[#DBEAFE] rounded-xl transition-colors"
                >
                  <span>{lang === "he" ? "עבור לעמוד הפרק המלא" : "Go to Full Episode Page"}</span>
                  <ExternalLinkIcon className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right Column: Interactive Tabs (Chapters, Live Transcript, Show Notes) */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                {/* Tabs Switcher */}
                <div className="flex items-center gap-1 p-1 bg-[#EDE8E0] rounded-xl border border-[#DED7CB] self-start">
                  <button
                    onClick={() => setActiveTab("transcript")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === "transcript"
                        ? "bg-white text-[#111827] shadow-xs"
                        : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                  >
                    {t.player.transcript}
                  </button>
                  <button
                    onClick={() => setActiveTab("chapters")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === "chapters"
                        ? "bg-white text-[#111827] shadow-xs"
                        : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                  >
                    {t.player.chapters}
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeTab === "notes"
                        ? "bg-white text-[#111827] shadow-xs"
                        : "text-[#6B7280] hover:text-[#111827]"
                    }`}
                  >
                    {t.player.showNotes}
                  </button>
                </div>

                {/* Tab Content: Live Synchronized Transcript with Hebrew Word Insights */}
                {activeTab === "transcript" && (
                  <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2 rtl:pr-0 rtl:pl-2">
                    <p className="text-xs text-[#6B7280] italic">
                      {lang === "he"
                        ? "תמליל חי מסונכרן עם השמע • לחצו על כל משפט כדי לקפוץ אליו"
                        : "Live transcript synchronized with audio • Click any statement to seek directly"}
                    </p>

                    {currentEpisode.transcript.map((line) => {
                      const isActive = activeTranscriptLine?.id === line.id;
                      return (
                        <div
                          key={line.id}
                          onClick={() => seek(line.time)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border ${
                            isActive
                              ? "bg-[#EFF6FF] border-[#93C5FD] shadow-xs"
                              : "bg-white border-[#E5E0D8] hover:bg-[#F9F7F3]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-extrabold text-[#1D4ED8]">
                              {line.speaker[lang]}
                            </span>
                            <span className="text-[11px] font-mono text-[#6B7280]">
                              {line.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-[#1F2937] leading-relaxed">
                            {line.text[lang]}
                          </p>

                          {/* Hebrew Root Insight Pill if present */}
                          {line.rootConcept && (
                            <div className="mt-3 p-3 bg-[#FAF8F5] border border-[#E5E0D8] rounded-lg space-y-1">
                              <div className="flex items-center gap-2">
                                <SparklesIcon className="w-4 h-4 text-[#C25E3E]" />
                                <span className="text-sm font-bold font-hebrew-serif text-[#C25E3E]">
                                  {line.rootConcept.term} ({line.rootConcept.transliteration})
                                </span>
                                <span className="text-xs font-medium text-[#4B5563]">
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

                {/* Tab Content: Chapters */}
                {activeTab === "chapters" && (
                  <div className="space-y-3 overflow-y-auto max-h-[380px] pr-2 rtl:pr-0 rtl:pl-2">
                    {currentEpisode.chapters.map((ch) => {
                      const isActive = activeChapter?.id === ch.id;
                      return (
                        <div
                          key={ch.id}
                          onClick={() => seek(ch.time)}
                          className={`p-3.5 rounded-xl cursor-pointer transition-all border flex items-start justify-between gap-4 ${
                            isActive
                              ? "bg-[#EFF6FF] border-[#93C5FD]"
                              : "bg-white border-[#E5E0D8] hover:bg-[#F9F7F3]"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-mono font-bold text-[#1D4ED8] block mb-0.5">
                              {ch.timestamp}
                            </span>
                            <h4 className="text-sm font-bold text-[#111827]">
                              {ch.title[lang]}
                            </h4>
                            <p className="text-xs text-[#4B5563] mt-1">
                              {ch.description[lang]}
                            </p>
                          </div>
                          {isActive && (
                            <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold bg-[#1D4ED8] text-white rounded-full">
                              {t.player.nowPlaying}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tab Content: Show Notes & Key Takeaways */}
                {activeTab === "notes" && (
                  <div className="space-y-4 overflow-y-auto max-h-[380px] pr-2 rtl:pr-0 rtl:pl-2">
                    <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#111827]">
                        {lang === "he" ? "תקציר הפרק" : "Episode Synopsis"}
                      </h4>
                      <p className="text-sm text-[#374151] leading-relaxed">
                        {currentEpisode.description[lang]}
                      </p>
                    </div>

                    <div className="p-4 bg-white border border-[#E5E0D8] rounded-xl space-y-3">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#111827]">
                        {lang === "he" ? "נקודות דיון מרכזיות" : "Key Discussion Points"}
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#374151]">
                        {currentEpisode.keyTakeaways[lang]?.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#1D4ED8] font-bold">✓</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
