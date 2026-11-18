"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { FilmIcon, HeadphonesIcon, BookOpenIcon, LayersIcon } from "./Icons";

export default function ExploreCategories() {
  const { lang, dir, t } = useLanguage();

  const categories = [
    {
      title: t.explorePillars.podcasts,
      desc: t.explorePillars.podcastsDesc,
      icon: <HeadphonesIcon className="w-7 h-7 text-[#1D4ED8]" />,
      bg: "bg-[#EFF6FF]",
      border: "border-[#BFDBFE]",
      color: "text-[#1D4ED8]",
      badge: lang === "he" ? "3 תוכניות • 18 פרקים" : "3 Shows • 18 Episodes",
      href: `/${lang}/podcasts`,
      image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: t.explorePillars.videos,
      desc: t.explorePillars.videosDesc,
      icon: <FilmIcon className="w-7 h-7 text-[#C25E3E]" />,
      bg: "bg-[#FDF2E9]",
      border: "border-[#FED7AA]",
      color: "text-[#C25E3E]",
      badge: lang === "he" ? "סרטי אנימציה ודוקו" : "Animated Shorts & Docu",
      href: `/${lang}/videos`,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: t.explorePillars.articles,
      desc: t.explorePillars.articlesDesc,
      icon: <BookOpenIcon className="w-7 h-7 text-[#2D5A46]" />,
      bg: "bg-[#F0FDF4]",
      border: "border-[#BBF7D0]",
      color: "text-[#2D5A46]",
      badge: lang === "he" ? "מסות הגות ומדע" : "Essays, Mind & Culture",
      href: `/${lang}/articles`,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: t.explorePillars.resources,
      desc: t.explorePillars.resourcesDesc,
      icon: <LayersIcon className="w-7 h-7 text-[#D97706]" />,
      bg: "bg-[#FFFBEB]",
      border: "border-[#FDE68A]",
      color: "text-[#D97706]",
      badge: lang === "he" ? "פוסטרים ומדריכי לימוד" : "Study Guides & Charts",
      href: `/${lang}/resources`,
      image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="py-12 border-t border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold font-serif-title text-[#111827]">
            {t.explorePillars.title}
          </h2>
          <p className="text-sm text-[#4B5563]">
            {t.explorePillars.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className="group bg-white rounded-3xl p-6 border border-[#E5E0D8] hover:border-[#111827] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} ${c.border} border flex items-center justify-center transition-transform group-hover:scale-110`}>
                    {c.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    {c.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold font-serif-title text-[#111827] group-hover:text-[#1D4ED8] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs font-bold text-[#111827] group-hover:text-[#1D4ED8]">
                <span>{lang === "he" ? "התחילו לחקור" : "Explore Category"}</span>
                <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
