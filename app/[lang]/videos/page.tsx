"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import { FilmIcon, PlayIcon, SearchIcon } from "../../../components/Icons";
import VideoPlayerModal from "../../../components/VideoPlayerModal";
import { VideoItem } from "../../../data/neuravanContent";

export default function VideoLibraryPage() {
  const { lang, dir, t } = useLanguage();
  const { videos } = useCMS();
  const isHe = lang !== "en";

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeVideoModal, setActiveVideoModal] = useState<VideoItem | null>(null);

  const categories = Array.from(new Set(videos.map((v) => v.category[lang])));

  const filteredVideos = videos.filter(
    (v) => activeCategory === "all" || v.category[lang] === activeCategory
  );

  const featuredVideo = videos.find((v) => v.featured) || videos[0];

  return (
    <div className="py-12 space-y-14">
      {/* 1. Video Hero Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#FED7AA]">
              <FilmIcon className="w-3.5 h-3.5 text-[#C25E3E]" />
              <span>{isHe ? "סרט הדגל השבועי" : "Featured Film of the Week"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title leading-tight">
              {featuredVideo.title[lang]}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              {featuredVideo.description[lang]}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => setActiveVideoModal(featuredVideo)}
                className="px-6 py-3.5 rounded-full bg-[#C25E3E] hover:bg-[#D45B38] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-lg active:scale-95"
              >
                <PlayIcon className="w-4 h-4 translate-x-0.5 rtl:-translate-x-0.5" />
                <span>{isHe ? `צפו בסרט (${featuredVideo.duration})` : `Watch Film (${featuredVideo.duration})`}</span>
              </button>

              <Link
                href={`/${lang}/videos/${featuredVideo.id}`}
                className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 transition-colors"
              >
                {isHe ? "פרטים ותמליל" : "Notes & Analysis"}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-video lg:aspect-square overflow-hidden bg-black flex items-center justify-center group cursor-pointer" onClick={() => setActiveVideoModal(featuredVideo)}>
            <img
              src={featuredVideo.coverImage}
              alt={featuredVideo.title[lang]}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white text-[#111827] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#C25E3E] group-hover:text-white transition-all">
                <PlayIcon className="w-6 h-6 translate-x-0.5 rtl:-translate-x-0.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Video Grid with Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
          <div>
            <h2 className="text-2xl font-extrabold font-serif-title text-[#111827]">
              {isHe ? "כל הסרטים והסרטונים" : "All Films & Visual Essays"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
              {filteredVideos.length} {isHe ? "סרטים תיעודיים ואנימציות" : "documentaries & animations"}
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === "all"
                  ? "bg-[#111827] text-white"
                  : "bg-white border border-[#E5E0D8] text-[#4B5563] hover:bg-[#F2EDE4]"
              }`}
            >
              {isHe ? "כל הקטגוריות" : "All Categories"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#111827] text-white"
                    : "bg-white border border-[#E5E0D8] text-[#4B5563] hover:bg-[#F2EDE4]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              className="group bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div
                className="relative aspect-video overflow-hidden bg-gray-100 cursor-pointer"
                onClick={() => setActiveVideoModal(vid)}
              >
                <img
                  src={vid.coverImage}
                  alt={vid.title[lang]}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-[#111827] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-5 h-5 translate-x-0.5 rtl:-translate-x-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-black/80 text-white">
                  {vid.duration}
                </span>
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white">
                  {vid.category[lang]}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <Link
                    href={`/${lang}/videos/${vid.id}`}
                    className="text-base font-bold font-serif-title text-[#111827] group-hover:text-[#C25E3E] transition-colors block line-clamp-2"
                  >
                    {vid.title[lang]}
                  </Link>
                  <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-2">
                    {vid.description[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActiveVideoModal(vid)}
                    className="font-bold text-[#C25E3E] hover:underline"
                  >
                    {isHe ? "צפו עכשיו ←" : "Watch Now →"}
                  </button>
                  <Link
                    href={`/${lang}/videos/${vid.id}`}
                    className="text-[#6B7280] hover:text-[#111827]"
                  >
                    {isHe ? "פרטים נוספים" : "Details"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {activeVideoModal && (
        <VideoPlayerModal
          video={activeVideoModal}
          onClose={() => setActiveVideoModal(null)}
        />
      )}
    </div>
  );
}
