"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "../../../../context/LanguageContext";
import { useCMS } from "../../../../context/CMSContext";
import { formatIsraeliDate, Language } from "../../../../data/neuravanContent";
import { BookOpenIcon, ClockIcon, CalendarIcon, ShareIcon } from "../../../../components/Icons";
import NewsletterSection from "../../../../components/NewsletterSection";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang: rawLang, id } = use(params);
  const lang: Language = rawLang === "en" ? "en" : "he";
  const { articles } = useCMS();
  const isHe = lang !== "en";

  const article = articles.find((a) => a.id === id || a.slug === id);
  if (!article) {
    notFound();
  }

  const relatedArticles = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert(isHe ? "הקישור למאמר הועתק בהצלחה!" : "Article link copied to clipboard!");
    }
  };

  return (
    <div className="py-10 space-y-14">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]">
          <Link href={`/${lang}`} className="hover:text-[#111827]">
            {isHe ? "ראשי" : "Home"}
          </Link>
          <span>/</span>
          <Link href={`/${lang}/articles`} className="hover:text-[#111827]">
            {isHe ? "מאמרים ומסות" : "Articles"}
          </Link>
          <span>/</span>
          <span className="text-[#111827] font-semibold truncate max-w-sm">
            {article.title[lang]}
          </span>
        </nav>

        {/* Title, Subtitle, Category */}
        <div className="space-y-4 text-center sm:text-left rtl:sm:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-xs font-bold uppercase tracking-wider text-[#2D5A46]">
            <span>{article.category[lang]}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title text-[#111827] leading-[1.18]">
            {article.title[lang]}
          </h1>

          <p className="text-lg sm:text-xl font-semibold text-[#C25E3E] leading-relaxed">
            {article.subtitle[lang]}
          </p>

          {/* Author Card & Date */}
          <div className="pt-4 pb-6 border-b border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name[lang]}
                className="w-12 h-12 rounded-full object-cover border border-[#E5E0D8]"
              />
              <div className="text-left rtl:text-right">
                <span className="text-sm font-bold text-[#111827] block">
                  {article.author.name[lang]}
                </span>
                <span className="text-xs text-[#6B7280]">
                  {article.author.role[lang]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{formatIsraeliDate(article.publishedAt, lang)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{article.readingTimeMin} {isHe ? "דקות קריאה" : "min read"}</span>
              </span>
              <button
                onClick={handleShare}
                className="p-2 hover:bg-[#F2EDE4] rounded-full text-[#111827] transition-colors"
                title="Share Article"
              >
                <ShareIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border border-[#E5E0D8]">
          <img
            src={article.coverImage}
            alt={article.title[lang]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Editorial Text Content */}
        <div className="prose prose-lg max-w-none space-y-6 pt-4 text-[#1F2937] leading-[1.8] text-base sm:text-lg">
          {article.content[lang]?.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Quote Callout Box */}
        <div className="p-8 bg-[#F5F1EB] rounded-3xl border-r-4 rtl:border-r-4 rtl:border-l-0 ltr:border-l-4 ltr:border-r-0 border-[#1D4ED8] my-8 space-y-2">
          <p className="text-lg sm:text-xl font-serif-title font-bold text-[#111827] italic">
            {isHe
              ? "״נויראוואן שואלת לא רק מה אנחנו יודעים, אלא כיצד אנו בוחרים לחיות עם הידע הזה במרחב הים-תיכוני.״"
              : "“NEURAVAN questions not merely what we know, but how we choose to embody that wisdom in human society.”"}
          </p>
          <span className="text-xs font-bold text-[#6B7280] block">
            — {article.author.name[lang]}
          </span>
        </div>

        {/* Tags */}
        <div className="pt-4 pb-6 border-t border-[#E5E0D8] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
            {isHe ? "נושאי המאמר:" : "Tags:"}
          </span>
          {article.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-white border border-[#E5E0D8] rounded-full text-xs font-semibold text-[#4B5563]"
            >
              #{t}
            </span>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6 border-t border-[#E5E0D8]">
          <h3 className="text-2xl font-bold font-serif-title text-[#111827]">
            {isHe ? "מאמרים נוספים לקריאה" : "Related Reading"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/${lang}/articles/${rel.id}`}
                className="group bg-white rounded-2xl border border-[#E5E0D8] p-5 shadow-xs hover:shadow-lg transition-all space-y-2 block"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A46]">
                  {rel.category[lang]} • {rel.readingTimeMin} {isHe ? "דק'" : "min"}
                </span>
                <h4 className="text-base font-bold font-serif-title text-[#111827] group-hover:text-[#2D5A46] transition-colors line-clamp-2">
                  {rel.title[lang]}
                </h4>
                <p className="text-xs text-[#6B7280] line-clamp-2">
                  {rel.excerpt[lang]}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Embedded Newsletter */}
      <NewsletterSection />
    </div>
  );
}
