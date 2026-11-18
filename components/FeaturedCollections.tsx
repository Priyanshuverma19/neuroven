"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useCMS } from "../context/CMSContext";
import { LayersIcon } from "./Icons";

export default function FeaturedCollections() {
  const { lang, dir, t } = useLanguage();
  const { collections } = useCMS();

  return (
    <section className="py-14 bg-[#F5F1EB] border-t border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-bold text-[#1D4ED8] mb-2 uppercase tracking-wider">
              <LayersIcon className="w-3.5 h-3.5" />
              <span>{lang === "he" ? "מסעות למידה מובנים" : "Curated Journeys"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#111827]">
              {t.featuredCollections.title}
            </h2>
            <p className="text-sm text-[#4B5563] mt-1">
              {t.featuredCollections.subtitle}
            </p>
          </div>

          <Link
            href={`/${lang}/collections`}
            className="text-xs font-bold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors"
          >
            {lang === "he" ? "לכל האוספים ←" : "View All Collections →"}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => {
            const totalItems = col.episodeIds.length + col.videoIds.length + col.articleIds.length;
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
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white">
                    {col.category[lang]}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#C25E3E] uppercase tracking-wider">
                      {totalItems} {t.featuredCollections.itemsCount}
                    </span>
                    <h3 className="text-lg font-bold font-serif-title text-[#111827] group-hover:text-[#1D4ED8] transition-colors">
                      {col.title[lang]}
                    </h3>
                    <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3">
                      {col.description[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between">
                    <span className="text-[11px] text-[#6B7280]">
                      {col.episodeIds.length} {lang === "he" ? "פרקים" : "eps"} • {col.videoIds.length} {lang === "he" ? "סרטונים" : "vids"}
                    </span>
                    <Link
                      href={`/${lang}/collections/${col.id}`}
                      className="text-xs font-bold text-[#1D4ED8] group-hover:underline flex items-center gap-1"
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
    </section>
  );
}
