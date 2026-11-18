"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import { LayersIcon } from "../../../components/Icons";

export default function CollectionsLibraryPage() {
  const { lang, dir, t } = useLanguage();
  const { collections } = useCMS();
  const isHe = lang !== "en";

  return (
    <div className="py-12 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E0] text-xs font-bold uppercase tracking-wider text-[#111827]">
            <LayersIcon className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>{isHe ? "ספריית האוספים של נויראוואן" : "NEURAVAN Thematic Collections"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title text-[#111827]">
            {isHe ? "מסעות תוכן בינתחומיים" : "Interdisciplinary Learning Journeys"}
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563]">
            {isHe
              ? "אוספים מובנים המחברים בין פרקי פודקאסט, סרטי אנימציה ומאמרי מחקר במהלך הגותי שלם"
              : "Curated learning pathways synthesizing podcast dialogues, visual essays, and scholarly articles into complete explorations"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((col) => {
            const total = col.episodeIds.length + col.videoIds.length + col.articleIds.length;
            return (
              <div
                key={col.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                  <img
                    src={col.coverImage}
                    alt={col.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                    {col.category[lang]}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#C25E3E] uppercase tracking-wider">
                      {total} {t.featuredCollections.itemsCount} ({col.episodeIds.length} {isHe ? "פודקאסטים" : "podcasts"}, {col.videoIds.length} {isHe ? "סרטונים" : "videos"})
                    </span>
                    <h3 className="text-xl font-bold font-serif-title text-[#111827] group-hover:text-[#1D4ED8] transition-colors">
                      {col.title[lang]}
                    </h3>
                    <p className="text-xs font-semibold text-[#6B7280]">
                      {col.subtitle[lang]}
                    </p>
                    <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3">
                      {col.description[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between">
                    <Link
                      href={`/${lang}/collections/${col.id}`}
                      className="text-xs font-bold text-[#1D4ED8] group-hover:underline flex items-center gap-1.5"
                    >
                      <span>{t.featuredCollections.exploreCollection}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
