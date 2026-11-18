"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import { BookOpenIcon, ClockIcon } from "../../../components/Icons";
import { formatIsraeliDate } from "../../../data/neuravanContent";

export default function ArticlesLibraryPage() {
  const { lang, dir, t } = useLanguage();
  const { articles } = useCMS();
  const isHe = lang !== "en";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = Array.from(new Set(articles.map((a) => a.category[lang])));

  const filteredArticles = articles.filter(
    (a) => selectedCategory === "all" || a.category[lang] === selectedCategory
  );

  const featuredArticle = articles.find((a) => a.featured) || articles[0];

  return (
    <div className="py-12 space-y-14">
      {/* 1. Featured Article Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-bold uppercase tracking-wider text-[#2D5A46]">
              <BookOpenIcon className="w-3.5 h-3.5 text-[#2D5A46]" />
              <span>{isHe ? "מסה נבחרת השבוע" : "Featured Essay of the Week"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-title text-[#111827] leading-tight">
              {featuredArticle.title[lang]}
            </h1>

            <p className="text-base sm:text-lg font-semibold text-[#C25E3E]">
              {featuredArticle.subtitle[lang]}
            </p>

            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed line-clamp-3">
              {featuredArticle.excerpt[lang]}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={featuredArticle.author.avatar}
                  alt={featuredArticle.author.name[lang]}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <span className="text-sm font-bold text-[#111827] block">
                    {featuredArticle.author.name[lang]}
                  </span>
                  <span className="text-xs text-[#6B7280]">
                    {featuredArticle.author.role[lang]} • {featuredArticle.readingTimeMin} {isHe ? "דק' קריאה" : "min read"}
                  </span>
                </div>
              </div>

              <Link
                href={`/${lang}/articles/${featuredArticle.id}`}
                className="px-5 py-2.5 rounded-full bg-[#111827] text-white hover:bg-[#2D5A46] text-xs font-bold transition-colors"
              >
                {isHe ? "קראו את המאמר המלא ←" : "Read Full Essay →"}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square lg:aspect-auto h-full overflow-hidden bg-gray-100">
            <img
              src={featuredArticle.coverImage}
              alt={featuredArticle.title[lang]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. All Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8]">
          <div>
            <h2 className="text-2xl font-extrabold font-serif-title text-[#111827]">
              {isHe ? "כל המאמרים והמסות" : "All Articles & Essays"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
              {filteredArticles.length} {isHe ? "מאמרי עומק בטיפוגרפיה מוקפדת" : "in-depth essays with pristine typography"}
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-[#111827] text-white"
                  : "bg-white border border-[#E5E0D8] text-[#4B5563] hover:bg-[#F2EDE4]"
              }`}
            >
              {isHe ? "כל הנושאים" : "All Categories"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
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
          {filteredArticles.map((art) => (
            <Link
              key={art.id}
              href={`/${lang}/articles/${art.id}`}
              className="group bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 space-y-4 block"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
                  <img
                    src={art.coverImage}
                    alt={art.title[lang]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white">
                    {art.category[lang]}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold font-serif-title text-[#111827] group-hover:text-[#2D5A46] transition-colors leading-snug line-clamp-2">
                    {art.title[lang]}
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed line-clamp-3">
                    {art.excerpt[lang]}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name[lang]}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{art.author.name[lang]}</span>
                </div>
                <span>{art.readingTimeMin} {isHe ? "דק' קריאה" : "min read"}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
