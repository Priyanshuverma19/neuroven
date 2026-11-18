"use client";

import React from "react";
import { CURRENT_EPISODE } from "../data/podcastData";
import { PlayIcon, PauseIcon, SparklesIcon, MicIcon, Share2Icon, DownloadIcon, BookOpenIcon, SubtitlesIcon } from "./Icons";

interface HeroEpisodeProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  voiceHoverEnabled: boolean;
  onToggleVoiceHover: () => void;
  onOpenTranscript: () => void;
  onJumpToScripture: () => void;
  onOpenSubtitles?: () => void;
}

export default function HeroEpisode({
  isPlaying,
  onTogglePlay,
  voiceHoverEnabled,
  onToggleVoiceHover,
  onOpenTranscript,
  onJumpToScripture,
  onOpenSubtitles,
}: HeroEpisodeProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-[#E8E4DC] bg-gradient-to-b from-[#FAF8F5] via-[#F5F2EB] to-[#FAF8F5]">
      {/* Subtle decorative ancient geometric pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#121826_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#718096] uppercase tracking-wider mb-6">
          <span className="hover:text-[#0066FF] cursor-pointer">BibleProject</span>
          <span>/</span>
          <span className="hover:text-[#0066FF] cursor-pointer">Podcasts</span>
          <span>/</span>
          <span className="text-[#D45B38] font-bold">Psalms 3–8 Series</span>
          <span>/</span>
          <span className="text-[#121826]">Episode 1</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Spotify-style Album Artwork / BibleProject Art Tile */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#121826] transition-transform duration-300 group-hover:scale-[1.01]">
              {/* Illustrated Visual Card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#121826] via-[#1E293B] to-[#2D3748] flex flex-col justify-between p-7 text-white select-none">
                {/* Artwork Top Badges */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 text-[#E8E4DC]">
                    BibleProject Official
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#D45B38] bg-[#D45B38]/20 px-2.5 py-0.5 rounded-full border border-[#D45B38]/40">
                    Ep. 384
                  </span>
                </div>

                {/* Central Illustrated Motif (The Shield & Mount of Olives) */}
                <div className="relative flex flex-col items-center justify-center my-auto py-4">
                  {/* Glowing shield aura */}
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#0066FF]/30 to-[#D45B38]/20 blur-xl absolute" />
                  
                  {/* Stylized Ancient Shield & Mountain SVG */}
                  <svg viewBox="0 0 120 120" className="w-28 h-28 relative z-10 drop-shadow-md">
                    {/* Golden Crest & Shield */}
                    <path
                      d="M60 15L95 30V65C95 88 60 105 60 105C60 105 25 88 25 65V30L60 15Z"
                      fill="url(#shieldGrad)"
                      stroke="#FAF8F5"
                      strokeWidth="2.5"
                    />
                    {/* Olive Branch & Rising Sun */}
                    <circle cx="60" cy="50" r="14" fill="#D9822B" opacity="0.9" />
                    <path d="M45 75C52 65 68 65 75 75" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M48 68L60 56L72 68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <defs>
                      <linearGradient id="shieldGrad" x1="25" y1="15" x2="95" y2="105" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0066FF" />
                        <stop offset="0.6" stopColor="#0F3A78" />
                        <stop offset="1" stopColor="#D45B38" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="mt-3 text-center">
                    <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                      מִזְמוֹר לְדָוִד
                    </span>
                    <span className="text-[11px] uppercase tracking-widest text-slate-300 font-medium">
                      Psalm 3 • A Song of David
                    </span>
                  </div>
                </div>

                {/* Artwork Bottom Footnote */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1ED760]" />
                    <span className="font-medium tracking-wide">Spotify & Podcast Stream</span>
                  </div>
                  <span className="font-mono text-slate-400">52:18</span>
                </div>
              </div>

              {/* Hover Quick-Play Overlay */}
              <button
                onClick={onTogglePlay}
                aria-label={isPlaying ? "Pause podcast" : "Play podcast"}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                  {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} className="ml-1" />}
                </div>
              </button>
            </div>
          </div>

          {/* Right: Editorial Information & Actions */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0066FF] text-white shadow-sm">
                Series: Psalms 3–8
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F2EDE4] text-[#718096] border border-[#E8E4DC]">
                Episode 1 of 6
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-[#D45B38] bg-orange-50 border border-orange-200">
                Nov 9, 2026
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121826] font-serif-title tracking-tight leading-[1.15] mb-4">
              Psalm 3: A Deposed King&apos;s Desperate Plea
            </h1>

            {/* Subtitle / Narrative */}
            <p className="text-base sm:text-lg text-[#4A5568] leading-relaxed mb-6 font-normal">
              {CURRENT_EPISODE.summary}
            </p>

            {/* Hosts Strip */}
            <div className="flex items-center gap-6 py-4 mb-6 border-y border-[#E8E4DC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0066FF] text-white font-bold flex items-center justify-center text-sm shadow">
                  TM
                </div>
                <div>
                  <span className="text-sm font-bold text-[#121826] block">Tim Mackie</span>
                  <span className="text-xs text-[#718096]">Theologian & Scholar</span>
                </div>
              </div>
              <div className="h-7 w-px bg-[#E8E4DC]" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D45B38] text-white font-bold flex items-center justify-center text-sm shadow">
                  JC
                </div>
                <div>
                  <span className="text-sm font-bold text-[#121826] block">Jon Collins</span>
                  <span className="text-xs text-[#718096]">Creative Host</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons (Spotify Style) */}
            <div className="flex flex-wrap items-center gap-3.5">
              {/* Play / Pause Primary CTA */}
              <button
                onClick={onTogglePlay}
                className="flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {isPlaying ? (
                  <>
                    <PauseIcon size={18} />
                    <span>Pause Audio</span>
                  </>
                ) : (
                  <>
                    <PlayIcon size={18} />
                    <span>Listen Now • 52:18</span>
                  </>
                )}
              </button>

              {/* VoiceHover Toggle Switch */}
              <button
                onClick={onToggleVoiceHover}
                className={`flex items-center gap-2.5 px-5 py-3.5 rounded-full text-sm font-semibold border transition-all ${
                  voiceHoverEnabled
                    ? "bg-[#121826] text-white border-[#121826] shadow-md"
                    : "bg-white text-[#121826] border-[#E8E4DC] hover:border-[#0066FF] hover:bg-[#F2EDE4]"
                }`}
                title="Hover your cursor over transcript lines to hear speakers speak or audition timestamps"
              >
                <SparklesIcon className={voiceHoverEnabled ? "text-[#1ED760] animate-pulse" : "text-[#0066FF]"} size={16} />
                <span>VoiceHover {voiceHoverEnabled ? "ON" : "OFF"}</span>
                {voiceHoverEnabled && (
                  <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-ping" />
                )}
              </button>

              {/* Spotify Live Subtitles Button */}
              {onOpenSubtitles && (
                <button
                  onClick={onOpenSubtitles}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#12151E] hover:bg-[#1E2333] text-white border border-white/10 text-sm font-semibold shadow-md transition-all hover:scale-[1.02]"
                  title="Open Spotify-style live synchronized lyrics & subtitles"
                >
                  <SubtitlesIcon className="text-[#1ED760]" size={16} />
                  <span>Spotify Subtitles</span>
                </button>
              )}

              {/* View Transcript Quick Button */}
              <button
                onClick={onOpenTranscript}
                className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-white text-[#4A5568] hover:text-[#121826] border border-[#E8E4DC] hover:bg-[#FAF8F5] text-sm font-medium transition-colors"
              >
                <MicIcon size={16} />
                <span>Read Transcript</span>
              </button>

              {/* Scripture Links */}
              <button
                onClick={onJumpToScripture}
                className="flex items-center gap-2 px-4 py-3.5 rounded-full bg-white text-[#4A5568] hover:text-[#121826] border border-[#E8E4DC] hover:bg-[#FAF8F5] text-sm font-medium transition-colors"
                title="View 2 Samuel 15 and Psalm 3 notes"
              >
                <BookOpenIcon size={16} />
                <span>Scripture (Ps 3 & 2 Sam)</span>
              </button>

              {/* Download / Share */}
              <button
                onClick={() => alert("Episode MP3 ready! In a full environment, this downloads the 320kbps audio file.")}
                className="p-3.5 rounded-full bg-white text-[#4A5568] hover:text-[#121826] border border-[#E8E4DC] hover:bg-[#FAF8F5] transition-colors"
                title="Download Episode Audio"
              >
                <DownloadIcon size={18} />
              </button>

              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Episode link copied to clipboard!");
                  }
                }}
                className="p-3.5 rounded-full bg-white text-[#4A5568] hover:text-[#121826] border border-[#E8E4DC] hover:bg-[#FAF8F5] transition-colors"
                title="Share Episode"
              >
                <Share2Icon size={18} />
              </button>
            </div>

            {/* VoiceHover helper pill */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#718096]">
              <span className="font-semibold text-[#0066FF]">💡 Pro Tip:</span>
              <span>Enable <strong>VoiceHover</strong> to hover over any paragraph in the transcript below to audition Jon or Tim&apos;s spoken lines and hear Hebrew pronunciations.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
