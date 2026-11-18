"use client";

import React from "react";
import HeroSection from "../../components/HeroSection";
import LatestContentRow from "../../components/LatestContentRow";
import ExploreCategories from "../../components/ExploreCategories";
import FeaturedCollections from "../../components/FeaturedCollections";
import HebrewWordStudy from "../../components/HebrewWordStudy";
import NewsletterSection from "../../components/NewsletterSection";
import { useLanguage } from "../../context/LanguageContext";

export default function HomePage() {
  const { lang, dir } = useLanguage();
  const isHe = lang === "he";

  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Latest Content Horizontal Row (BibleProject inspired presentation) */}
      <LatestContentRow />

      {/* 3. Four Core Pillars of NEURAVAN */}
      <ExploreCategories />

      {/* 4. Hebrew Word Study Cognitive Lab */}
      <HebrewWordStudy />

      {/* 5. Featured Curated Collections */}
      <FeaturedCollections />

      {/* 6. Editorial Mission Manifesto Section */}
      <section className="py-16 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDE8E0] text-xs font-bold uppercase tracking-wider text-[#111827]">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
            <span>{isHe ? "חזון נויראוואן לתרבות דיגיטלית" : "The NEURAVAN Cultural Vision"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif-title text-[#111827] leading-tight">
            {isHe
              ? "פלטפורמה עצמאית המחברת בין חוכמת העבר לסקרנות העתיד"
              : "An Independent Destination Bridging Ancient Wisdom with Future Curiosity"}
          </h2>

          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-3xl mx-auto">
            {isHe
              ? "נויראוואן נוסדה מתוך אמונה שהקהל הישראלי צמא לתוכן עמוק, מרחיב אופקים ולא-מתנצל. אנו יוצרים פודקאסטים, סרטי אנימציה ומאמרים ברמת הפקה בינלאומית — מתוך כבוד עמוק לשפה העברית, למורשת הים-תיכונית ולרוח המחקר החופשית."
              : "NEURAVAN was born from the conviction that audiences crave substantive, intellectually rigorous, and artfully produced storytelling. We craft podcasts, visual essays, and research publications with global production quality — rooted in the Hebrew language and Mediterranean cultural history."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left rtl:text-right">
            <div className="p-6 bg-white border border-[#E5E0D8] rounded-2xl space-y-2">
              <span className="text-xl font-bold font-serif-title text-[#1D4ED8] block">01</span>
              <h3 className="text-base font-bold text-[#111827]">
                {isHe ? "עומק עיוני ללא פשרות" : "Uncompromising Depth"}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {isHe
                  ? "כל פרק ומאמר מגובים במחקר אקדמי, ספריות כתבי יד ומקורות היסטוריים ראשוניים."
                  : "Every episode and essay is grounded in rigorous academic scholarship and primary historical archives."}
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5E0D8] rounded-2xl space-y-2">
              <span className="text-xl font-bold font-serif-title text-[#C25E3E] block">02</span>
              <h3 className="text-base font-bold text-[#111827]">
                {isHe ? "עיצוב וסיפור חזותי עילאי" : "Editorial Storytelling"}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {isHe
                  ? "אסתטיקה מוקפדת, טיפוגרפיה עברית מדויקת ואנימציות מקוריות ברמה הגבוהה ביותר."
                  : "Refined aesthetics, bespoke Hebrew typography, and world-class animated documentaries."}
              </p>
            </div>

            <div className="p-6 bg-white border border-[#E5E0D8] rounded-2xl space-y-2">
              <span className="text-xl font-bold font-serif-title text-[#2D5A46] block">03</span>
              <h3 className="text-base font-bold text-[#111827]">
                {isHe ? "חיבור חי לישראל ולמזרח" : "Living Levantine Connection"}
              </h3>
              <p className="text-xs text-[#6B7280]">
                {isHe
                  ? "תוכן שנולד כאן — בהרי יהודה, בסמטאות ירושלים, ברובעי תל אביב ובמרחבי הנגב."
                  : "Content forged in the Judean hills, Jerusalem alleys, Tel Aviv salons, and Negev deserts."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
