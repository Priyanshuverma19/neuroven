"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import { LayersIcon, SparklesIcon, CheckIcon } from "../../../components/Icons";

export default function ResourcesPage() {
  const { lang, dir, t } = useLanguage();
  const { resources } = useCMS();
  const isHe = lang !== "en";
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const handleDownload = (resId: string) => {
    setDownloadSuccessId(resId);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div className="py-12 space-y-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E0] text-xs font-bold uppercase tracking-wider text-[#111827]">
            <SparklesIcon className="w-3.5 h-3.5 text-[#D97706]" />
            <span>{isHe ? "האקדמיה הפתוחה של נויראוואן" : "NEURAVAN Open Academy"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title text-[#111827]">
            {isHe ? "חומרי למידה, מדריכים ופוסטרים דיגיטליים" : "Study Guides, Charts & Educational Kits"}
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563]">
            {isHe
              ? "חומרים פדגוגיים ועיוניים להורדה חופשית עבור לומדים, קבוצות קריאה, חוגי בית ומחנכים"
              : "High-resolution downloadable PDF guides, panoramic timelines, and discussion kits for study circles and educators"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={res.coverImage}
                  alt={res.title[lang]}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-md">
                  {res.formatLabel[lang]}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider">
                    {res.level[lang]} • {res.pagesOrDuration[lang]}
                  </span>
                  <h3 className="text-xl font-bold font-serif-title text-[#111827]">
                    {res.title[lang]}
                  </h3>
                  <p className="text-xs font-semibold text-[#6B7280]">
                    {res.subtitle[lang]}
                  </p>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {res.description[lang]}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#F2EDE4]">
                  <div className="flex flex-wrap gap-1.5">
                    {res.topics[lang]?.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-md text-[10px] text-[#4B5563]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleDownload(res.id)}
                    className="w-full py-3 rounded-full bg-[#111827] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    {downloadSuccessId === res.id ? (
                      <>
                        <CheckIcon className="w-4 h-4 text-emerald-400" />
                        <span>{isHe ? "הקובץ נפתח בהצלחה!" : "Download Initiated!"}</span>
                      </>
                    ) : (
                      <span>{isHe ? "הורדת ערכת הלימוד (PDF חינם)" : "Download PDF Kit (Free)"}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
