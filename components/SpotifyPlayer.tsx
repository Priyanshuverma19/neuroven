"use client";

import React, { useState } from "react";
import { Chapter, CURRENT_EPISODE } from "../data/podcastData";
import {
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward15Icon,
  SkipBackIcon,
  SkipForwardIcon,
  Volume2Icon,
  VolumeXIcon,
  HeartIcon,
  ListMusicIcon,
  SparklesIcon,
  Maximize2Icon,
  Minimize2Icon,
  SubtitlesIcon,
} from "./Icons";

interface SpotifyPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  chapters: Chapter[];
  currentChapter: Chapter;
  voiceHoverEnabled: boolean;
  onToggleVoiceHover: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  activeTranscriptText?: string;
  activeSpeaker?: string;
  onOpenSubtitles?: () => void;
  isSubtitlesOpen?: boolean;
}

export default function SpotifyPlayer({
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
  chapters,
  currentChapter,
  voiceHoverEnabled,
  onToggleVoiceHover,
  playbackSpeed,
  onChangeSpeed,
  volume,
  onChangeVolume,
  activeTranscriptText,
  activeSpeaker,
  onOpenSubtitles,
  isSubtitlesOpen,
}: SpotifyPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [isChaptersOpen, setIsChaptersOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetVal = parseFloat(e.target.value);
    onSeek(targetVal);
  };

  const handleRewind15 = () => {
    onSeek(Math.max(0, currentTime - 15));
  };

  const handleForward15 = () => {
    onSeek(Math.min(duration, currentTime + 15));
  };

  const handlePrevChapter = () => {
    const currentIndex = chapters.findIndex((c) => c.id === currentChapter.id);
    if (currentIndex > 0) {
      onSeek(chapters[currentIndex - 1].time);
    } else {
      onSeek(0);
    }
  };

  const handleNextChapter = () => {
    const currentIndex = chapters.findIndex((c) => c.id === currentChapter.id);
    if (currentIndex < chapters.length - 1) {
      onSeek(chapters[currentIndex + 1].time);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      onChangeVolume(prevVolume || 0.8);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      onChangeVolume(0);
    }
  };

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  const handleCycleSpeed = () => {
    const idx = speedOptions.indexOf(playbackSpeed);
    const nextIdx = (idx + 1) % speedOptions.length;
    onChangeSpeed(speedOptions[nextIdx]);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <>
      {/* Sticky Bottom Spotify-Style Player Dock */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#12151E] text-white border-t border-[#1E2333] shadow-[0_-4px_25px_rgba(0,0,0,0.5)] transition-all">
        {/* Scrubber preview progress line on top of player */}
        <div className="relative w-full h-1 bg-[#283046] cursor-pointer group">
          <div
            className="h-full bg-gradient-to-r from-[#0066FF] to-[#1ED760] transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: Episode Track Info & Art */}
          <div className="flex items-center gap-3.5 min-w-[200px] max-w-[30%]">
            <div className="relative w-12 h-12 rounded-lg bg-gradient-to-tr from-[#0F3A78] to-[#D45B38] flex-shrink-0 flex items-center justify-center overflow-hidden shadow-md">
              <span className="font-serif font-black text-white text-base">Ps 3</span>
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5">
                  <span className="w-1 bg-[#1ED760] rounded-full animate-soundwave-1" />
                  <span className="w-1 bg-[#1ED760] rounded-full animate-soundwave-2" />
                  <span className="w-1 bg-[#1ED760] rounded-full animate-soundwave-3" />
                </div>
              )}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-white truncate hover:underline cursor-pointer">
                  {CURRENT_EPISODE.title}
                </span>
                {voiceHoverEnabled && (
                  <span
                    className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#1ED760]/20 text-[#1ED760] border border-[#1ED760]/30"
                    title="VoiceHover synchronized with playback"
                  >
                    VH
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#A0AEC0] truncate">
                {currentChapter.title}
              </span>
            </div>

            <button
              onClick={() => setIsLiked(!isLiked)}
              className="text-[#718096] hover:text-[#D45B38] transition-colors ml-1 hidden sm:block"
              title={isLiked ? "Saved to your Library" : "Save to Library"}
            >
              <HeartIcon size={18} filled={isLiked} />
            </button>
          </div>

          {/* Center: Spotify-style Media Controls & Scrubber */}
          <div className="flex flex-col items-center flex-1 max-w-xl">
            {/* Control Buttons */}
            <div className="flex items-center gap-4 sm:gap-5 mb-1.5">
              {/* Previous Chapter */}
              <button
                onClick={handlePrevChapter}
                className="text-[#A0AEC0] hover:text-white transition-colors"
                title="Previous chapter"
              >
                <SkipBackIcon size={18} />
              </button>

              {/* Rewind 15s */}
              <button
                onClick={handleRewind15}
                className="text-[#A0AEC0] hover:text-white transition-colors flex items-center"
                title="Rewind 15 seconds"
              >
                <Rewind15Icon size={18} />
                <span className="text-[10px] font-mono ml-0.5">15</span>
              </button>

              {/* Big Play / Pause Button */}
              <button
                onClick={onTogglePlay}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#F2EDE4] text-[#12151E] flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} className="ml-0.5" />}
              </button>

              {/* Forward 15s */}
              <button
                onClick={handleForward15}
                className="text-[#A0AEC0] hover:text-white transition-colors flex items-center"
                title="Forward 15 seconds"
              >
                <span className="text-[10px] font-mono mr-0.5">15</span>
                <Forward15Icon size={18} />
              </button>

              {/* Next Chapter */}
              <button
                onClick={handleNextChapter}
                className="text-[#A0AEC0] hover:text-white transition-colors"
                title="Next chapter"
              >
                <SkipForwardIcon size={18} />
              </button>

              {/* Speed Button */}
              <button
                onClick={handleCycleSpeed}
                className="text-[11px] font-bold text-[#A0AEC0] hover:text-white border border-[#2D3748] rounded px-1.5 py-0.5 transition-colors"
                title="Change playback speed"
              >
                {playbackSpeed}x
              </button>
            </div>

            {/* Scrubber Bar & Timestamps */}
            <div className="w-full flex items-center gap-2.5 text-[11px] font-mono text-[#A0AEC0]">
              <span>{formatTime(currentTime)}</span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="1"
                  value={currentTime}
                  onChange={handleSeekChange}
                  className="w-full h-1 bg-[#283046] rounded-lg appearance-none cursor-pointer focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, #0066FF ${progressPercent}%, #283046 ${progressPercent}%)`,
                  }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Actions, Chapter Drawer, VoiceHover & Volume */}
          <div className="flex items-center gap-3 min-w-[200px] justify-end">
            {/* Chapters Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsChaptersOpen(!isChaptersOpen)}
                className={`p-2 rounded-full transition-colors ${
                  isChaptersOpen ? "text-[#0066FF] bg-white/10" : "text-[#A0AEC0] hover:text-white"
                }`}
                title="Chapters / Timestamps"
              >
                <ListMusicIcon size={18} />
              </button>

              {/* Chapters Popover */}
              {isChaptersOpen && (
                <div className="absolute right-0 bottom-12 w-80 bg-[#1E2333] border border-[#2D3748] rounded-xl shadow-2xl p-3 z-50 text-white">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2D3748]">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Episode Chapters
                    </span>
                    <button
                      onClick={() => setIsChaptersOpen(false)}
                      className="text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                    {chapters.map((ch) => {
                      const isCurrent = ch.id === currentChapter.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => {
                            onSeek(ch.time);
                            setIsChaptersOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                            isCurrent
                              ? "bg-[#0066FF] text-white font-bold"
                              : "hover:bg-[#283046] text-slate-300"
                          }`}
                        >
                          <span className="font-mono text-[10px] text-slate-400 mt-0.5">
                            {ch.timestamp}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="block truncate">{ch.title}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Spotify Live Subtitles / Lyrics Button */}
            {onOpenSubtitles && (
              <button
                onClick={onOpenSubtitles}
                className={`p-2 rounded-full transition-colors flex items-center gap-1 ${
                  isSubtitlesOpen
                    ? "text-[#1ED760] bg-[#1ED760]/20 ring-1 ring-[#1ED760]/40"
                    : "text-[#A0AEC0] hover:text-[#1ED760]"
                }`}
                title="Open Spotify Live Subtitles / Lyrics"
              >
                <SubtitlesIcon size={18} />
              </button>
            )}

            {/* VoiceHover Toggle Icon */}
            <button
              onClick={onToggleVoiceHover}
              className={`p-2 rounded-full transition-colors ${
                voiceHoverEnabled
                  ? "text-[#1ED760] bg-[#1ED760]/10"
                  : "text-[#A0AEC0] hover:text-white"
              }`}
              title={`VoiceHover is ${voiceHoverEnabled ? "Active" : "Disabled"}`}
            >
              <SparklesIcon size={18} />
            </button>

            {/* Volume Control */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handleToggleMute}
                className="text-[#A0AEC0] hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeXIcon size={18} /> : <Volume2Icon size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setIsMuted(false);
                  onChangeVolume(parseFloat(e.target.value));
                }}
                className="w-16 h-1 bg-[#283046] rounded-lg appearance-none cursor-pointer focus:outline-none"
              />
            </div>

            {/* Fullscreen Expand */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-2 text-[#A0AEC0] hover:text-white transition-colors"
              title="Expanded Player View"
            >
              <Maximize2Icon size={18} />
            </button>
          </div>
        </div>
      </footer>

      {/* Fullscreen Spotify Modal Player */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#12151E]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 text-white animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-[#0066FF] font-bold">
                {CURRENT_EPISODE.series}
              </span>
              <span className="text-xs text-slate-400">• Episode {CURRENT_EPISODE.episodeNumber}</span>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Minimize2Icon size={20} />
            </button>
          </div>

          {/* Center Area: Massive Artwork & Active VoiceHover Subtitle */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 my-auto max-w-5xl mx-auto w-full">
            <div className="w-64 sm:w-80 aspect-square rounded-2xl bg-gradient-to-tr from-[#0F3A78] via-[#1E293B] to-[#D45B38] p-6 shadow-2xl flex flex-col justify-between border border-white/20">
              <span className="text-xs uppercase tracking-widest text-white/70 font-mono">
                BibleProject Official
              </span>
              <div className="text-center">
                <span className="font-serif text-3xl font-bold text-white block mb-1">
                  Psalm 3
                </span>
                <span className="text-xs text-slate-300">A Deposed King&apos;s Desperate Plea</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Tim Mackie & Jon Collins</span>
                <span>52:18</span>
              </div>
            </div>

            {/* Subtitle / Active Transcript Callout */}
            <div className="flex-1 max-w-lg text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-pulse" />
                Live Subtitle • {activeSpeaker || "Tim Mackie"}
              </span>
              <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed italic">
                &ldquo;{activeTranscriptText || CURRENT_EPISODE.summary}&rdquo;
              </p>
              <div className="mt-4 text-xs text-slate-400">
                Chapter: <strong className="text-white">{currentChapter.title}</strong>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="max-w-3xl mx-auto w-full space-y-4">
            {/* Scrubber */}
            <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeekChange}
                className="w-full h-1.5 bg-[#283046] rounded-lg cursor-pointer"
              />
              <span>{formatTime(duration)}</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button onClick={handlePrevChapter} className="text-slate-400 hover:text-white">
                <SkipBackIcon size={24} />
              </button>
              <button onClick={handleRewind15} className="text-slate-400 hover:text-white">
                <Rewind15Icon size={24} />
              </button>
              <button
                onClick={onTogglePlay}
                className="w-14 h-14 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105"
              >
                {isPlaying ? <PauseIcon size={26} /> : <PlayIcon size={26} className="ml-1" />}
              </button>
              <button onClick={handleForward15} className="text-slate-400 hover:text-white">
                <Forward15Icon size={24} />
              </button>
              <button onClick={handleNextChapter} className="text-slate-400 hover:text-white">
                <SkipForwardIcon size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
