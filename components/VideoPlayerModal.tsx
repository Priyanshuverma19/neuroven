"use client";

import React from "react";
import { VideoItem } from "../data/neuravanContent";
import { useLanguage } from "../context/LanguageContext";
import { CloseIcon, FilmIcon } from "./Icons";

export default function VideoPlayerModal({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  const { lang, dir } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-fadeIn">
      <div className="bg-[#111827] text-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilmIcon className="w-4 h-4 text-[#C25E3E]" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
              {video.category[lang]} • {video.duration}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Embed */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`${video.embedUrl}?autoplay=1&rel=0`}
            title={video.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Details */}
        <div className="p-6 space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-white">
            {video.title[lang]}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            {video.description[lang]}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-white/10 rounded-full text-[11px] font-semibold text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
