"use client";

import React from "react";
import { TranscriptLine } from "../data/podcastData";
import { SubtitlesIcon, Maximize2Icon } from "./Icons";

interface FloatingSubtitlePillProps {
  activeLine: TranscriptLine;
  isPlaying: boolean;
  onOpenSubtitles: () => void;
  onClosePill: () => void;
  isVisible: boolean;
}

export default function FloatingSubtitlePill({
  activeLine,
  isPlaying,
  onOpenSubtitles,
  onClosePill,
  isVisible,
}: FloatingSubtitlePillProps) {
  if (!isVisible) return null;

  return (
    <aside
      aria-label="Live Podcast Subtitles"
      className="fixed bottom-24 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:max-w-2xl z-40 bg-[#12151E]/90 hover:bg-[#12151E] backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-4 py-3 text-white transition-all duration-300 animate-slideUp cursor-pointer group"
      onClick={onOpenSubtitles}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Speaker Avatar & Live Subtitle Text */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white/20"
            style={{ backgroundColor: activeLine.avatarColor }}
          >
            {activeLine.speaker === "Tim Mackie" ? "TM" : "JC"}
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1ED760] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1ED760] animate-ping" />
                {activeLine.speaker}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {activeLine.timestamp}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-100 truncate mt-0.5">
              &ldquo;{activeLine.text}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Actions: Expand to Full Subtitles & Dismiss */}
        <div className="flex items-center gap-2 flex-shrink-0 pl-2 border-l border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenSubtitles();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#0066FF] hover:bg-[#0052CC] text-white transition-colors"
            title="Expand Spotify Lyrics View"
          >
            <SubtitlesIcon size={12} />
            <span className="hidden sm:inline">Spotify Subtitles</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClosePill();
            }}
            className="w-6 h-6 rounded-full text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center text-xs transition-colors"
            title="Dismiss subtitle pill"
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}
