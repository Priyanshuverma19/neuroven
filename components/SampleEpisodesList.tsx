"use client";

import React from "react";
import { SampleEpisode } from "../data/podcastData";
import { PlayIcon, PauseIcon, ClockIcon, HeadphonesIcon } from "./Icons";

interface SampleEpisodesListProps {
  samples: SampleEpisode[];
  currentSampleId: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectSample: (sample: SampleEpisode) => void;
}

export default function SampleEpisodesList({
  samples,
  currentSampleId,
  isPlaying,
  onTogglePlay,
  onSelectSample,
}: SampleEpisodesListProps) {
  return (
    <div className="bg-white rounded-3xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0066FF] text-white">
              3 Sample Episodes
            </span>
            <span className="text-xs text-[#718096]">Click any sample to play</span>
          </div>
          <h3 className="text-2xl font-bold font-serif-title text-[#121826] mt-2">
            Select a Sample Podcast
          </h3>
          <p className="text-xs sm:text-sm text-[#4A5568] mt-1">
            Pick from 3 curated samples from the Psalms series with live synchronized subtitles and VoiceHover audio.
          </p>
        </div>
      </div>

      {/* Grid of the 3 Samples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {samples.map((sample) => {
          const isSelected = sample.id === currentSampleId;

          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? "bg-[#FAF8F5] border-[#0066FF] shadow-md ring-2 ring-[#0066FF]/20"
                  : "bg-white border-[#E8E4DC] hover:border-[#0066FF] hover:bg-[#FAF8F5]"
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#0066FF] text-white"
                        : "bg-[#F2EDE4] text-[#718096] group-hover:bg-[#0066FF] group-hover:text-white"
                    }`}
                  >
                    Sample {sample.sampleNumber}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#718096]">
                    Ep. {sample.episodeNumber}
                  </span>
                </div>

                {/* Hebrew Crest Tile */}
                <div
                  className={`w-full h-24 rounded-xl mb-4 bg-gradient-to-tr ${sample.gradient} flex items-center justify-center p-3 text-white shadow-inner relative overflow-hidden`}
                >
                  <span className="font-serif text-2xl font-bold tracking-wide">
                    {sample.hebrewKey}
                  </span>

                  {/* Play Button Icon on Hover or Active */}
                  <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                      isSelected && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1ED760] text-black flex items-center justify-center shadow-lg">
                      {isSelected && isPlaying ? (
                        <PauseIcon size={16} />
                      ) : (
                        <PlayIcon size={16} className="ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                <h4
                  className={`text-base font-bold font-serif-title leading-snug transition-colors ${
                    isSelected ? "text-[#0066FF]" : "text-[#121826] group-hover:text-[#0066FF]"
                  }`}
                >
                  {sample.title}
                </h4>

                <p className="text-xs text-[#718096] mt-2 line-clamp-2 leading-relaxed">
                  {sample.summary}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="mt-5 pt-3 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#718096]">
                <span className="font-medium">{sample.date}</span>
                <span className="font-mono flex items-center gap-1 text-[#121826] font-semibold">
                  <ClockIcon size={13} className="text-[#718096]" />
                  {sample.durationFormatted}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
