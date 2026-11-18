"use client";

import React from "react";
import { RELATED_EPISODES, RelatedEpisode } from "../data/podcastData";
import { PlayIcon, PauseIcon, ClockIcon, HeadphonesIcon } from "./Icons";

interface SeriesPlaylistProps {
  currentEpisodeId: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectEpisode: (episode: RelatedEpisode) => void;
}

export default function SeriesPlaylist({
  currentEpisodeId,
  isPlaying,
  onTogglePlay,
  onSelectEpisode,
}: SeriesPlaylistProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E4DC]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#0066FF] border border-blue-200">
              Complete Series
            </span>
            <span className="text-xs text-[#718096]">6 Episodes • 5+ Hours of Deep Dives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-[#121826] mt-2">
            Psalms 3–8 Series Playlist
          </h2>
          <p className="text-sm text-[#4A5568] mt-1">
            Listen sequentially through King David&apos;s prayers of distress, midnight trust, morning cries, and cosmic wonder.
          </p>
        </div>
      </div>

      {/* Spotify Table Style List */}
      <div className="mt-6 divide-y divide-[#E8E4DC]">
        {RELATED_EPISODES.map((ep) => {
          const isSelected = ep.id === currentEpisodeId;

          return (
            <div
              key={ep.id}
              onClick={() => onSelectEpisode(ep)}
              className={`group flex items-center justify-between py-4 px-3 sm:px-4 rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#FAF8F5] border border-blue-200 shadow-sm"
                  : "hover:bg-[#FAF8F5]"
              }`}
            >
              {/* Left: Number / Play Icon & Title */}
              <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isSelected) {
                      onTogglePlay();
                    } else {
                      onSelectEpisode(ep);
                    }
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected && isPlaying
                      ? "bg-[#0066FF] text-white"
                      : "bg-[#F2EDE4] text-[#121826] group-hover:bg-[#0066FF] group-hover:text-white"
                  }`}
                >
                  {isSelected && isPlaying ? (
                    <PauseIcon size={14} />
                  ) : (
                    <PlayIcon size={14} className="ml-0.5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-[#718096]">
                      Episode {ep.episodeNumber}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2 py-0.5 rounded-full">
                        <HeadphonesIcon size={11} />
                        Now Playing
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-sm sm:text-base font-bold truncate ${
                      isSelected ? "text-[#0066FF]" : "text-[#121826] group-hover:text-[#0066FF]"
                    }`}
                  >
                    {ep.title}
                  </h4>
                  <p className="text-xs text-[#718096] truncate mt-0.5">
                    {ep.description}
                  </p>
                </div>
              </div>

              {/* Right: Date & Duration */}
              <div className="flex items-center gap-4 sm:gap-8 flex-shrink-0 text-xs text-[#718096]">
                <span className="hidden md:inline font-medium">{ep.date}</span>
                <span className="font-mono flex items-center gap-1 text-[#121826] font-semibold">
                  <ClockIcon size={13} className="text-[#718096]" />
                  {ep.duration}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
