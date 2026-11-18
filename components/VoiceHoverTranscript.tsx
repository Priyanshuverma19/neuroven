"use client";

import React, { useState } from "react";
import { TranscriptLine } from "../data/podcastData";
import { audioEngine } from "../utils/audioEngine";
import { PlayIcon, Volume2Icon, SparklesIcon, CheckIcon, BookOpenIcon, ClockIcon } from "./Icons";

interface VoiceHoverTranscriptProps {
  transcript: TranscriptLine[];
  currentTime: number;
  onSeek: (seconds: number) => void;
  voiceHoverEnabled: boolean;
  onToggleVoiceHover: () => void;
  searchFilter: string;
}

export default function VoiceHoverTranscript({
  transcript,
  currentTime,
  onSeek,
  voiceHoverEnabled,
  onToggleVoiceHover,
  searchFilter,
}: VoiceHoverTranscriptProps) {
  const [selectedSpeaker, setSelectedSpeaker] = useState<"All" | "Tim Mackie" | "Jon Collins">("All");
  const [hoveredLineId, setHoveredLineId] = useState<string | null>(null);
  const [speakingLineId, setSpeakingLineId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Find currently active transcript line based on playback time
  const currentLineIndex = transcript.findIndex((line, idx) => {
    const nextLine = transcript[idx + 1];
    if (!nextLine) return currentTime >= line.time;
    return currentTime >= line.time && currentTime < nextLine.time;
  });

  // Filter transcript
  const filteredTranscript = transcript.filter((line) => {
    const matchesSpeaker = selectedSpeaker === "All" || line.speaker === selectedSpeaker;
    const matchesSearch =
      !searchFilter ||
      line.text.toLowerCase().includes(searchFilter.toLowerCase()) ||
      line.speaker.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (line.hebrewTerm && line.hebrewTerm.term.includes(searchFilter)) ||
      (line.notes && line.notes.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesSpeaker && matchesSearch;
  });

  const handleAuditionVoice = (line: TranscriptLine) => {
    setSpeakingLineId(line.id);
    audioEngine.speakText(line.text, line.speaker, () => {
      setSpeakingLineId(null);
    });
  };

  const handleCopyQuote = (line: TranscriptLine) => {
    const quote = `"${line.text}" — ${line.speaker} [${line.timestamp}], BibleProject Psalm 3 Podcast`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(quote);
      setCopiedId(line.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleLineMouseEnter = (line: TranscriptLine) => {
    setHoveredLineId(line.id);
    // If VoiceHover is enabled and user hovers over, play a subtle feedback chime
    if (voiceHoverEnabled) {
      audioEngine.playChime(520);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm">
      {/* Transcript Header & VoiceHover Controller */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-bold font-serif-title text-[#121826]">
              Interactive Transcript
            </h2>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#F2EDE4] text-[#718096]">
              Verbatim Dialogue
            </span>
          </div>
          <p className="text-sm text-[#4A5568] mt-1">
            Follow along with Tim Mackie &amp; Jon Collins. Hover over any line to preview spoken dialogue.
          </p>
        </div>

        {/* VoiceHover Toggle & Speaker Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* VoiceHover Master Button */}
          <button
            onClick={onToggleVoiceHover}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              voiceHoverEnabled
                ? "bg-[#0066FF] text-white shadow-md ring-2 ring-blue-300"
                : "bg-[#F2EDE4] text-[#4A5568] hover:text-[#121826]"
            }`}
          >
            <SparklesIcon size={14} className={voiceHoverEnabled ? "text-yellow-300 animate-spin" : ""} />
            <span>VoiceHover {voiceHoverEnabled ? "Active" : "Enable"}</span>
          </button>

          {/* Speaker Tabs */}
          <div className="flex items-center bg-[#F2EDE4] rounded-full p-1 text-xs font-medium">
            <button
              onClick={() => setSelectedSpeaker("All")}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedSpeaker === "All" ? "bg-white text-[#121826] shadow-sm font-semibold" : "text-[#718096] hover:text-[#121826]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedSpeaker("Tim Mackie")}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedSpeaker === "Tim Mackie" ? "bg-[#D45B38] text-white shadow-sm font-semibold" : "text-[#718096] hover:text-[#121826]"
              }`}
            >
              Tim Mackie
            </button>
            <button
              onClick={() => setSelectedSpeaker("Jon Collins")}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedSpeaker === "Jon Collins" ? "bg-[#0066FF] text-white shadow-sm font-semibold" : "text-[#718096] hover:text-[#121826]"
              }`}
            >
              Jon Collins
            </button>
          </div>
        </div>
      </div>

      {/* Transcript Items */}
      <div className="mt-6 space-y-6">
        {filteredTranscript.length === 0 ? (
          <div className="text-center py-12 text-[#718096]">
            No dialogue matching your search. Try another keyword.
          </div>
        ) : (
          filteredTranscript.map((line) => {
            const isActive = transcript[currentLineIndex]?.id === line.id;
            const isHovered = hoveredLineId === line.id;
            const isSpeakingThis = speakingLineId === line.id;

            return (
              <div
                key={line.id}
                onMouseEnter={() => handleLineMouseEnter(line)}
                onMouseLeave={() => setHoveredLineId(null)}
                className={`relative group rounded-xl p-4 sm:p-5 transition-all duration-200 border ${
                  isActive
                    ? "bg-[#FAF8F5] border-[#0066FF] shadow-sm ring-1 ring-[#0066FF]/20"
                    : isHovered && voiceHoverEnabled
                    ? "bg-[#F7F5F0] border-blue-300 shadow-sm"
                    : "bg-white border-transparent hover:bg-[#FAF8F5] hover:border-[#E8E4DC]"
                }`}
              >
                {/* Active audio left bar indicator */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#0066FF] rounded-r-full" />
                )}

                {/* Speaker Header + Timestamp + VoiceHover Audition Pill */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    {/* Speaker Avatar Pill */}
                    <div
                      className="w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: line.avatarColor }}
                    >
                      {line.speaker === "Tim Mackie" ? "TM" : "JC"}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-[#121826] mr-2">
                        {line.speaker}
                      </span>
                      <span className="text-[11px] font-medium text-[#718096]">
                        {line.speakerTitle}
                      </span>
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="flex items-center gap-2">
                    {/* Timestamp button (click to jump player) */}
                    <button
                      onClick={() => onSeek(line.time)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-colors ${
                        isActive
                          ? "bg-[#0066FF] text-white"
                          : "bg-[#F2EDE4] text-[#4A5568] hover:bg-[#0066FF] hover:text-white"
                      }`}
                      title="Jump player to this timestamp"
                    >
                      <ClockIcon size={12} />
                      <span>{line.timestamp}</span>
                    </button>

                    {/* Audition / VoiceHover Play button */}
                    <button
                      onClick={() => handleAuditionVoice(line)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                        isSpeakingThis
                          ? "bg-[#1ED760] text-black animate-pulse"
                          : "bg-blue-50 text-[#0066FF] hover:bg-blue-100"
                      }`}
                      title="VoiceHover: Audition this line aloud"
                    >
                      <Volume2Icon size={13} />
                      <span className="hidden sm:inline">
                        {isSpeakingThis ? "Speaking..." : "VoiceHover"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Spoken Text */}
                <p className="text-base text-[#2D3748] leading-relaxed pl-10">
                  {line.text}
                </p>

                {/* Hebrew Word Pill (if present in this line) */}
                {line.hebrewTerm && (
                  <div className="mt-3.5 ml-10 p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E4DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-serif text-lg font-bold text-[#D45B38]">
                        {line.hebrewTerm.term}
                      </span>
                      <span className="text-xs font-bold text-[#121826]">
                        ({line.hebrewTerm.transliteration})
                      </span>
                      <span className="text-xs text-[#718096]">
                        — {line.hebrewTerm.meaning}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#4A5568] italic">
                      {line.hebrewTerm.insight}
                    </span>
                  </div>
                )}

                {/* Editorial Notes (if present) */}
                {line.notes && (
                  <div className="mt-2.5 ml-10 flex items-center gap-2 text-xs text-[#718096] italic bg-orange-50/60 border border-orange-100 px-3 py-1.5 rounded-md">
                    <BookOpenIcon size={13} className="text-[#D45B38] flex-shrink-0" />
                    <span>{line.notes}</span>
                  </div>
                )}

                {/* Hover Quick-Tool: Floating Bar when line is hovered */}
                {isHovered && (
                  <div className="mt-3 ml-10 pt-2 border-t border-[#E8E4DC]/60 flex items-center justify-between text-xs text-[#718096] animate-fadeIn">
                    <span className="flex items-center gap-1 text-[#0066FF] font-medium">
                      <SparklesIcon size={12} />
                      <span>Hovering over {line.speaker}&apos;s dialogue</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onSeek(line.time)}
                        className="text-[#121826] hover:text-[#0066FF] font-medium flex items-center gap-1"
                      >
                        <PlayIcon size={12} />
                        <span>Play from {line.timestamp}</span>
                      </button>
                      <button
                        onClick={() => handleCopyQuote(line)}
                        className="text-[#718096] hover:text-[#121826]"
                      >
                        {copiedId === line.id ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <CheckIcon size={12} /> Copied!
                          </span>
                        ) : (
                          "Copy quote"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
