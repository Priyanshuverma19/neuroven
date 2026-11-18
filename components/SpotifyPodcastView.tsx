"use client";

import React, { useEffect, useRef, useState } from "react";
import { SampleEpisode, TranscriptLine } from "../data/podcastData";
import { audioEngine } from "../utils/audioEngine";
import {
  PlayIcon,
  PauseIcon,
  Rewind15Icon,
  Forward15Icon,
  Volume2Icon,
  VolumeXIcon,
  SparklesIcon,
  HeartIcon,
  Share2Icon,
  SubtitlesIcon,
} from "./Icons";

interface SpotifyPodcastViewProps {
  episode: SampleEpisode;
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  voiceHoverEnabled: boolean;
  onToggleVoiceHover: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
}

export default function SpotifyPodcastView({
  episode,
  isPlaying,
  onTogglePlay,
  currentTime,
  duration,
  onSeek,
  voiceHoverEnabled,
  onToggleVoiceHover,
  playbackSpeed,
  onChangeSpeed,
  volume,
  onChangeVolume,
}: SpotifyPodcastViewProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [speakingLineId, setSpeakingLineId] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  // Find currently active transcript line
  const activeLineIndex = episode.transcript.findIndex((line, idx) => {
    const nextLine = episode.transcript[idx + 1];
    const lineEnd = line.endTime ?? (nextLine ? nextLine.time : duration);
    return currentTime >= line.time && currentTime < lineEnd;
  });

  const resolvedActiveIndex = activeLineIndex === -1 ? 0 : activeLineIndex;
  const activeLine = episode.transcript[resolvedActiveIndex] || episode.transcript[0];

  // Auto-scroll the subtitle feed to keep active line centered like Spotify
  useEffect(() => {
    if (autoScroll && activeLineRef.current && isPlaying) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [resolvedActiveIndex, isPlaying, autoScroll]);

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

  const speedOptions = [1, 1.25, 1.5, 2];
  const handleCycleSpeed = () => {
    const idx = speedOptions.indexOf(playbackSpeed);
    const nextIdx = (idx + 1) % speedOptions.length;
    onChangeSpeed(speedOptions[nextIdx]);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-[#121212] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden transition-all">
      {/* Spotify Ambient Gradient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#0066FF]/20 via-[#1ED760]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Spotify Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1ED760] animate-pulse" />
          <span className="text-xs uppercase font-bold tracking-widest text-[#1ED760]">
            Spotify Live Podcast Mode
          </span>
          <span className="text-xs font-mono text-slate-400">
            • 5:30 Sample • Active Word Highlight
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-scroll button */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              autoScroll
                ? "bg-[#0066FF] text-white"
                : "bg-white/10 text-slate-400 hover:text-white"
            }`}
            title="Auto-scroll to active sentence"
          >
            Auto-follow {autoScroll ? "ON" : "OFF"}
          </button>

          {/* VoiceHover Quick Switch */}
          <button
            onClick={onToggleVoiceHover}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              voiceHoverEnabled
                ? "bg-[#1ED760]/20 text-[#1ED760] border border-[#1ED760]/40 shadow-sm"
                : "bg-white/10 text-slate-400 hover:text-white"
            }`}
            title="Hover on any sentence to hear voiceover preview"
          >
            <SparklesIcon size={13} className={voiceHoverEnabled ? "animate-spin" : ""} />
            <span>VoiceHover {voiceHoverEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Album Artwork & Info | Right Scrolling Subtitles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-start">
        {/* Left Column: Artwork + Episode Info */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Big Spotify Album Artwork Card */}
          <div className="relative group w-full aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-tr from-[#0F3A78] via-[#1E293B] to-[#D45B38] p-7 flex flex-col justify-between border border-white/15">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md text-slate-200 border border-white/10">
                BibleProject Official
              </span>
              <span className="text-xs font-mono font-bold text-[#1ED760] bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
                5 Min Sample
              </span>
            </div>

            {/* Artwork Center Icon */}
            <div className="text-center my-auto">
              <span className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-white block mb-1">
                {episode.hebrewTitle}
              </span>
              <span className="text-xs tracking-widest uppercase text-slate-300 font-semibold">
                {episode.scripture}
              </span>

              {/* Soundwave Animation while playing */}
              {isPlaying && (
                <div className="flex items-center justify-center gap-1 mt-4 h-6">
                  <span className="w-1 bg-[#1ED760] rounded-full animate-soundwave-1" />
                  <span className="w-1 bg-[#1ED760] rounded-full animate-soundwave-2" />
                  <span className="w-1 bg-[#1ED760] rounded-full animate-soundwave-3" />
                  <span className="w-1 bg-[#1ED760] rounded-full animate-soundwave-4" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-white/10">
              <span>Tim Mackie &amp; Jon Collins</span>
              <span className="font-mono text-[#1ED760] font-bold">{episode.durationFormatted}</span>
            </div>

            {/* Click to Play Overlay */}
            <button
              onClick={onTogglePlay}
              className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
            >
              <div className="w-16 h-16 rounded-full bg-[#1ED760] text-black flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} className="ml-1" />}
              </div>
            </button>
          </div>

          {/* Episode Title & Metadata */}
          <div className="mt-5">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-white tracking-tight leading-snug">
              {episode.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              {episode.subtitle}
            </p>

            {/* Actions Bar */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2.5 rounded-full border transition-colors ${
                  isLiked
                    ? "text-[#D45B38] border-[#D45B38] bg-[#D45B38]/10"
                    : "text-slate-400 border-white/10 hover:text-white hover:bg-white/10"
                }`}
                title="Save episode"
              >
                <HeartIcon size={18} filled={isLiked} />
              </button>

              <button
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Episode link copied!");
                  }
                }}
                className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Share episode"
              >
                <Share2Icon size={18} />
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
                <SubtitlesIcon size={13} className="text-[#1ED760]" />
                <span>Karaoke Word Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Scrolling Spotify Subtitles with Word Highlighting */}
        <div className="lg:col-span-7 flex flex-col h-[520px] bg-black/40 rounded-2xl p-4 sm:p-6 border border-white/5">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1ED760]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Spotify Synchronized Lyrics &amp; Subtitles
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Word-by-word active highlight</span>
          </div>

          {/* Subtitles Scroll Area */}
          <div
            ref={lyricsContainerRef}
            className="flex-1 overflow-y-auto space-y-6 pr-2 select-none scroll-smooth"
          >
            {episode.transcript.map((line, idx) => {
              const isActive = idx === resolvedActiveIndex;
              const isPast = idx < resolvedActiveIndex;
              const isSpeakingThis = speakingLineId === line.id;

              // Calculate next line time for duration window
              const nextLine = episode.transcript[idx + 1];
              const lineStartTime = line.time;
              const lineEndTime = line.endTime ?? (nextLine ? nextLine.time : lineStartTime + 15);
              const lineDuration = Math.max(1, lineEndTime - lineStartTime);

              // Split text into individual words for real-time word-by-word karaoke highlight!
              const words = line.text.split(" ");
              const wordCount = words.length;

              return (
                <div
                  key={line.id}
                  ref={isActive ? activeLineRef : null}
                  onClick={() => onSeek(line.time)}
                  className={`group cursor-pointer transition-all duration-300 rounded-2xl p-4 ${
                    isActive
                      ? "bg-white/10 shadow-2xl ring-1 ring-white/20 scale-[1.01]"
                      : isPast
                      ? "opacity-40 hover:opacity-85 text-zinc-400"
                      : "opacity-25 hover:opacity-75 text-zinc-500"
                  }`}
                >
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
                      <span className="text-[10px] font-mono text-slate-500">
                        {line.timestamp}
                      </span>
                    </div>

                    {/* Inline VoiceHover Audition */}
                    <button
                      onClick={(e) => handleAuditionVoice(e, line)}
                      className={`opacity-0 group-hover:opacity-100 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all flex items-center gap-1 ${
                        isSpeakingThis
                          ? "opacity-100 bg-[#1ED760] text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                      title="Audition spoken line"
                    >
                      <Volume2Icon size={11} />
                      <span>{isSpeakingThis ? "Speaking..." : "VoiceHover"}</span>
                    </button>
                  </div>

                  {/* Word-By-Word Highlight Engine */}
                  <p className="leading-relaxed text-lg sm:text-2xl font-medium tracking-tight">
                    {words.map((word, wIdx) => {
                      if (!isActive) {
                        return (
                          <span key={wIdx} className="mr-1.5 inline-block">
                            {word}
                          </span>
                        );
                      }

                      // Active Line: determine word state based on currentTime
                      const wordDuration = lineDuration / wordCount;
                      const wordStart = lineStartTime + wIdx * wordDuration;
                      const wordEnd = wordStart + wordDuration;

                      const isCurrentWord = currentTime >= wordStart && currentTime < wordEnd;
                      const isSpokenWord = currentTime >= wordEnd;

                      return (
                        <span
                          key={wIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSeek(wordStart);
                          }}
                          className={`mr-1.5 inline-block transition-all duration-150 cursor-pointer ${
                            isCurrentWord
                              ? "text-white font-black scale-105 bg-[#1ED760]/25 text-[#1ED760] px-1 py-0.5 rounded shadow-[0_0_15px_rgba(30,215,96,0.6)] drop-shadow-md"
                              : isSpokenWord
                              ? "text-white font-bold opacity-100"
                              : "text-white/40 font-medium"
                          }`}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </p>

                  {/* Inline Hebrew Word Pill */}
                  {line.hebrewTerm && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-xs">
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
          </div>
        </div>
      </div>

      {/* Spotify Bottom Audio Controller Bar */}
      <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
        {/* Scrubber */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-4">
          <span className="font-bold text-[#1ED760]">{formatTime(currentTime)}</span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={(e) => onSeek(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#283046] rounded-lg cursor-pointer"
              style={{
                background: `linear-gradient(to right, #1ED760 ${progressPercent}%, #283046 ${progressPercent}%)`,
              }}
            />
          </div>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Active Subtitle Preview Banner */}
          <div className="flex items-center gap-2.5 min-w-0 max-w-sm">
            <span className="w-2 h-2 rounded-full bg-[#1ED760] animate-pulse flex-shrink-0" />
            <span className="text-xs text-slate-300 truncate font-medium">
              {activeLine.speaker}: &ldquo;{activeLine.text}&rdquo;
            </span>
          </div>

          {/* Center Playback Buttons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => onSeek(Math.max(0, currentTime - 15))}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-0.5"
              title="Rewind 15s"
            >
              <Rewind15Icon size={20} />
              <span className="text-[10px] font-mono">15</span>
            </button>

            <button
              onClick={onTogglePlay}
              className="w-12 h-12 rounded-full bg-[#1ED760] hover:bg-[#1fdf64] text-black flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} className="ml-0.5" />}
            </button>

            <button
              onClick={() => onSeek(Math.min(duration, currentTime + 15))}
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-0.5"
              title="Forward 15s"
            >
              <span className="text-[10px] font-mono">15</span>
              <Forward15Icon size={20} />
            </button>

            <button
              onClick={handleCycleSpeed}
              className="text-xs font-bold text-slate-400 hover:text-white border border-white/20 rounded px-2 py-0.5 transition-colors"
              title="Change speed"
            >
              {playbackSpeed}x
            </button>
          </div>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className="text-slate-400 hover:text-white transition-colors"
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
              className="w-20 h-1 bg-[#283046] rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
