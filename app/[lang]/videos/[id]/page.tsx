"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageContext";
import { useCMS } from "../../../../context/CMSContext";
import { FilmIcon, PlayIcon, ShareIcon, CalendarIcon, ClockIcon } from "../../../../components/Icons";
import { formatIsraeliDate, Language } from "../../../../data/neuravanContent";

export default function VideoDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang: rawLang, id } = use(params);
  const lang: Language = rawLang === "en" ? "en" : "he";
  const { videos } = useCMS();
  const isHe = lang !== "en";

  const video = videos.find((v) => v.id === id || v.slug === id);
  if (!video) {
    notFound();
  }

  const relatedVideos = videos.filter((v) => v.id !== video.id).slice(0, 3);

  return (
    <div className="py-10 space-y-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link href={`/${lang}`} className="hover:text-[#111827]">
            {isHe ? "ראשי" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/videos`} className="hover:text-[#111827]">
            {isHe ? "סרטים ווידאו" : "Videos"}
          </Link>
          <span>/</span>
          <span className="text-[#111827] font-semibold truncate max-w-sm">
            {video.title[lang]}
          </span>
        </nav>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-[#E5E0D8]">
          <iframe
            src={`${video.embedUrl}?autoplay=1&rel=0`}
            title={video.title[lang]}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Title, Metadata & Action Bar */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
            <div className="flex items-center gap-3 text-xs text-[#6B7280]">
              <span className="px-3 py-1 rounded-full bg-[#FDF2E9] text-[#C25E3E] font-bold uppercase tracking-wider">
                {video.category[lang]}
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{video.duration}</span>
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{formatIsraeliDate(video.publishedAt, lang)}</span>
              </span>
            </div>

            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert(isHe ? "הקישור הועתק בהצלחה!" : "Link copied to clipboard!");
                }
              }}
              className="self-start sm:self-center px-4 py-2 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-xs font-bold text-[#111827] hover:bg-[#F2EDE4] flex items-center gap-2 transition-colors"
            >
              <ShareIcon className="w-4 h-4 text-[#6B7280]" />
              <span>{isHe ? "שתפו סרטון זה" : "Share Video"}</span>
            </button>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif-title text-[#111827]">
              {video.title[lang]}
            </h1>
            <p className="text-base text-[#4B5563] leading-relaxed">
              {video.description[lang]}
            </p>
          </div>

          {/* Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#FAF8F5] border border-[#E5E0D8] rounded-full text-xs font-semibold text-[#4B5563]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Videos */}
        {relatedVideos.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="text-xl font-bold font-serif-title text-[#111827]">
              {isHe ? "סרטונים נוספים לצפייה" : "More Related Videos"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVideos.map((rv) => (
                <Link
                  key={rv.id}
                  href={`/${lang}/videos/${rv.id}`}
                  className="group bg-white rounded-2xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-lg transition-all block"
                >
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img
                      src={rv.coverImage}
                      alt={rv.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white">
                      {rv.duration}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="text-sm font-bold font-serif-title text-[#111827] group-hover:text-[#C25E3E] transition-colors line-clamp-2">
                      {rv.title[lang]}
                    </h4>
                    <span className="text-[11px] text-[#6B7280]">
                      {rv.category[lang]}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
