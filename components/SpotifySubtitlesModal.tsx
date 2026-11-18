"use client";

import React, { useEffect, useRef, useState } from "react";
import { TranscriptLine, Chapter } from "../data/podcastData";
import { audioEngine } from "../utils/audioEngine";
import {
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward15Icon,
  Volume2Icon,
  SparklesIcon,
  SubtitlesIcon,
} from "./Icons";

interface SpotifySubtitlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  transcript: TranscriptLine[];
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  currentChapter: Chapter;
  voiceHoverEnabled: boolean;
  onToggleVoiceHover: () => void;
}

export default function SpotifySubtitlesModal({
  isOpen,
  onClose,
  transcript,
  currentTime,
  duration,
  isPlaying,
  onTogglePlay,
  onSeek,
  currentChapter,
  voiceHoverEnabled,
  onToggleVoiceHover,
}: SpotifySubtitlesModalProps) {
  const [autoScroll, setAutoScroll] = useState(true);
  const [speakingLineId, setSpeakingLineId] = useState<string | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Find currently active transcript line
  const activeLineIndex = transcript.findIndex((line, idx) => {
    const nextLine = transcript[idx + 1];
    if (!nextLine) return currentTime >= line.time;
    return currentTime >= line.time && currentTime < nextLine.time;
  });

  const activeLine = transcript[activeLineIndex] || transcript[0];

  // Auto-scroll to center the active subtitle line
  useEffect(() => {
    if (isOpen && autoScroll && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLineIndex, isOpen, autoScroll]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAuditionVoice = (e: React.MouseEvent, line: TranscriptLine) => {
    e.stopPropagation();
    setSpeakingLineId(line.id);
    audioEngine.speakText(line.text, line.speaker, () => {
      setSpeakingLineId(null);
    });
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#12151E] flex flex-col justify-between text-white overflow-hidden animate-fadeIn">
      {/* Dynamic Background Glow inspired by Spotify Lyrics */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F3A78]/30 via-[#12151E]/95 to-[#12151E] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#1ED760]">
            <SubtitlesIcon size={14} />
            <span>Spotify Live Subtitles</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            • {currentChapter.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Auto-scroll toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              autoScroll
                ? "bg-[#0066FF] text-white"
                : "bg-white/10 text-slate-400 hover:text-white"
            }`}
          >
            Auto-scroll {autoScroll ? "ON" : "OFF"}
          </button>

          {/* VoiceHover Toggle */}
          <button
            onClick={onToggleVoiceHover}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              voiceHoverEnabled
                ? "bg-[#1ED760]/20 text-[#1ED760] border border-[#1ED760]/40"
                : "bg-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <SparklesIcon size={13} />
            <span>VoiceHover {voiceHoverEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Close Subtitles Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors text-sm font-bold ml-2"
            title="Close Subtitles"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main Subtitles Scroll Area */}
      <main
        ref={scrollContainerRef}
        className="relative z-10 flex-1 overflow-y-auto px-6 sm:px-12 md:px-24 py-16 space-y-8 max-w-4xl mx-auto w-full select-none"
      >
        {transcript.map((line, idx) => {
          const isActive = idx === activeLineIndex;
          const isPast = idx < activeLineIndex;
          const isSpeakingThis = speakingLineId === line.id;

          return (
            <div
              key={line.id}
              ref={isActive ? activeLineRef : null}
              onClick={() => onSeek(line.time)}
              className={`group cursor-pointer transition-all duration-300 rounded-2xl p-4 sm:p-6 ${
                isActive
                  ? "bg-white/10 shadow-2xl ring-1 ring-white/20 scale-[1.02]"
                  : isPast
                  ? "opacity-50 hover:opacity-90"
                  : "opacity-35 hover:opacity-80"
              }`}
            >
              {/* Speaker & Timestamp Indicator */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: line.avatarColor }}
                  />
                  <span
                    className={`text-xs uppercase font-bold tracking-wider ${
                      isActive ? "text-[#1ED760]" : "text-slate-400"
                    }`}
                  >
                    {line.speaker}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {line.timestamp}
                  </span>
                </div>

                {/* Inline Voice Preview Button */}
                <button
                  onClick={(e) => handleAuditionVoice(e, line)}
                  className={`opacity-0 group-hover:opacity-100 px-2.5 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                    isSpeakingThis
                      ? "opacity-100 bg-[#1ED760] text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                  title="Audition line"
                >
                  <Volume2Icon size={12} />
                  <span>{isSpeakingThis ? "Speaking..." : "VoiceHover"}</span>
                </button>
              </div>

              {/* Subtitle Line Text */}
              <p
                className={`transition-colors font-medium leading-relaxed ${
                  isActive
                    ? "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-md"
                    : "text-lg sm:text-xl lg:text-2xl text-slate-300"
                }`}
              >
                {line.text}
              </p>

              {/* Hebrew Term highlight */}
              {line.hebrewTerm && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs">
                  <span className="font-serif text-sm font-bold text-[#D45B38]">
                    {line.hebrewTerm.term}
                  </span>
                  <span className="text-slate-300">({line.hebrewTerm.transliteration})</span>
                  <span className="text-slate-400">— {line.hebrewTerm.meaning}</span>
                </div>
              )}
            </div>
          );
        })}
      </main>

      {/* Bottom Subtitle Audio Controls */}
      <footer className="relative z-10 px-6 py-4 bg-[#12151E]/95 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto flex flex-col gap-2">
          {/* Progress Timeline */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={(e) => onSeek(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#283046] rounded-lg cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1ED760 ${progressPercent}%, #283046 ${progressPercent}%)`,
                }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Quick Playback Buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-pulse" />
              <span className="text-xs text-slate-300 font-medium truncate max-w-xs">
                {activeLine.speaker}: &ldquo;{activeLine.text.slice(0, 45)}...&rdquo;
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => onSeek(Math.max(0, currentTime - 15))}
                className="text-slate-400 hover:text-white transition-colors"
                title="Rewind 15s"
              >
                <Rewind15Icon size={18} />
              </button>

              <button
                onClick={onTogglePlay}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} className="ml-0.5" />}
              </button>

              <button
                onClick={() => onSeek(Math.min(duration, currentTime + 15))}
                className="text-slate-400 hover:text-white transition-colors"
                title="Forward 15s"
              >
                <Forward15Icon size={18} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
