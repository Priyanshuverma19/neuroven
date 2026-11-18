"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageContext";
import { useCMS } from "../../../../context/CMSContext";
import { useAudio } from "../../../../context/AudioContext";
import {
  PlayIcon,
  HeadphonesIcon,
  SparklesIcon,
  ClockIcon,
  ExternalLinkIcon,
} from "../../../../components/Icons";
import { Language } from "../../../../data/neuravanContent";

export default function PodcastShowPage({
  params,
}: {
  params: Promise<{ lang: string; showId: string }>;
}) {
  const { lang: rawLang, showId } = use(params);
  const lang: Language = rawLang === "en" ? "en" : "he";
  const { shows, episodes, collections } = useCMS();
  const { playEpisode } = useAudio();
  const isHe = lang !== "en";

  const show = shows.find((s) => s.id === showId || s.slug === showId);
  if (!show) {
    notFound();
  }

  const showEpisodes = episodes.filter((e) => e.showId === show.id);
  const relatedCollections = collections.filter((c) =>
    c.episodeIds.some((id) => showEpisodes.some((e) => e.id === id))
  );

  return (
    <div className="py-12 space-y-14">
      {/* Show Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative aspect-square max-w-xs w-full rounded-2xl overflow-hidden shadow-xl border border-[#E5E0D8]">
              <img
                src={show.coverImage}
                alt={show.title[lang]}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5 text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              <HeadphonesIcon className="w-3.5 h-3.5" />
              <span>{show.category[lang]}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title text-[#111827]">
              {show.title[lang]}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-[#C25E3E]">
              {show.tagline[lang]}
            </p>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl">
              {show.description[lang]}
            </p>

            {/* Host Details */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <img
                src={show.host.avatar}
                alt={show.host.name[lang]}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div className="text-left rtl:text-right">
                <span className="text-sm font-bold text-[#111827] block">
                  {show.host.name[lang]}
                </span>
                <span className="text-xs text-[#6B7280]">
                  {show.host.role[lang]}
                </span>
              </div>
            </div>

            {/* Streaming Links */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <a
                href={show.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#1ED760]/10 text-[#065F46] border border-[#1ED760]/30 hover:bg-[#1ED760]/20 text-xs font-bold transition-colors"
              >
                ● Spotify
              </a>
              <a
                href={show.appleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#8B5CF6]/10 text-[#5B21B6] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/20 text-xs font-bold transition-colors"
              >
                ● Apple Podcasts
              </a>
              <a
                href={show.rssUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#F59E0B]/10 text-[#B45309] border border-[#F59E0B]/30 hover:bg-[#F59E0B]/20 text-xs font-bold transition-colors"
              >
                ● RSS Feed
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes in this Show */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold font-serif-title text-[#111827]">
            {isHe ? `פרקים בתוכנית (${showEpisodes.length})` : `Show Episodes (${showEpisodes.length})`}
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
            {isHe
              ? "כל הפרקים זמינים להאזנה מיידית עם תמליל חי"
              : "All episodes available for immediate streaming with live synced transcript"}
          </p>
        </div>

        <div className="space-y-4">
          {showEpisodes.map((ep) => (
            <div
              key={ep.id}
              className="p-5 sm:p-6 bg-white border border-[#E5E0D8] rounded-3xl hover:border-[#1D4ED8] shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                <img
                  src={ep.coverImage}
                  alt={ep.title[lang]}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                />

                <div className="space-y-1 min-w-0">
                  <span className="text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider block">
                    {isHe ? `עונה ${ep.season} • פרק ${ep.episodeNumber}` : `Season ${ep.season} • Episode ${ep.episodeNumber}`}
                  </span>

                  <Link
                    href={`/${lang}/podcasts/${show.id}/${ep.id}`}
                    className="text-base sm:text-lg font-bold font-serif-title text-[#111827] hover:text-[#1D4ED8] transition-colors block"
                  >
                    {ep.title[lang]}
                  </Link>

                  <p className="text-xs text-[#4B5563] line-clamp-1">
                    {ep.subtitle[lang]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                <span className="text-xs font-mono text-[#6B7280]">
                  {ep.durationFormatted}
                </span>

                <button
                  onClick={() => playEpisode(ep)}
                  className="px-4 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95"
                >
                  <PlayIcon className="w-3.5 h-3.5 translate-x-0.5 rtl:-translate-x-0.5" />
                  <span>{isHe ? "האזינו" : "Listen"}</span>
                </button>

                <Link
                  href={`/${lang}/podcasts/${show.id}/${ep.id}`}
                  className="px-4 py-2.5 rounded-full bg-[#F5F1EB] hover:bg-[#EDE8E0] text-[#111827] text-xs font-bold transition-colors"
                >
                  {isHe ? "פרק מלא" : "Show Notes"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Collections */}
      {relatedCollections.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-4 border-t border-[#E5E0D8]">
          <h3 className="text-xl font-bold font-serif-title text-[#111827]">
            {isHe ? "אוספים הכוללים פרקים מתוכנית זו" : "Collections Featuring This Show"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedCollections.map((c) => (
              <Link
                key={c.id}
                href={`/${lang}/collections/${c.id}`}
                className="p-4 bg-white border border-[#E5E0D8] rounded-2xl hover:border-[#1D4ED8] transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#111827]">{c.title[lang]}</h4>
                  <p className="text-xs text-[#6B7280]">{c.subtitle[lang]}</p>
                </div>
                <span className="text-xs font-bold text-[#1D4ED8]">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
