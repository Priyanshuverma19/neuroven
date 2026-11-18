"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { NeuravanLogo } from "./Icons";

export default function Footer() {
  const { lang, dir, t, switchPathLanguage } = useLanguage();

  return (
    <footer className="border-t border-[#E5E0D8] bg-white pt-14 pb-32 text-sm text-[#4B5563]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#E5E0D8]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${lang}`} className="flex items-center gap-3">
              <NeuravanLogo className="w-10 h-10" size={40} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-[#111827] font-serif-title">
                    NEURAVAN
                  </span>
                  <span className="text-sm font-bold text-[#C25E3E] font-hebrew-serif">
                    נויראוואן
                  </span>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-[#6B7280]">
                  {t.brandSubtitle}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-sm">
              {t.footer.aboutBrand}
            </p>

            <div className="text-xs text-[#6B7280] space-y-1 pt-1">
              <p>{t.footer.location}</p>
              <p>
                {lang === "he"
                  ? "תמיכה ופניות: contact@neuravan.co.il | טלפון: 03-568-4200"
                  : "Support & Inquiries: contact@neuravan.co.il | Tel: +972 3-568-4200"}
              </p>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-[#111827] uppercase text-xs tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${lang}/explore`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.explore}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/podcasts`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.podcasts}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/videos`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.videos}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/articles`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.articles}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/collections`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.collections}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/resources`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.resources}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Stream Everywhere */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-[#111827] uppercase text-xs tracking-wider">
              {t.footer.platforms}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1ED760]" />
                <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1D4ED8]">
                  Spotify Podcasts
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1D4ED8]">
                  Apple Podcasts
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1D4ED8]">
                  YouTube Channel
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <a href={`/${lang}/api/rss`} className="hover:text-[#1D4ED8]">
                  RSS Feed
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
                <Link href={`/${lang}/admin`} className="hover:text-[#1D4ED8] font-bold">
                  {t.nav.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-[#111827] uppercase text-xs tracking-wider">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${lang}/privacy`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-[#1D4ED8] transition-colors">
                  {t.footer.accessibility}
                </Link>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#111827]">{lang === "he" ? "שפה:" : "Language:"}</span>
                  <button
                    onClick={() => switchPathLanguage("he")}
                    className={`text-xs ${lang === "he" ? "font-bold text-[#1D4ED8] underline" : "text-[#6B7280]"}`}
                  >
                    עברית
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => switchPathLanguage("en")}
                    className={`text-xs ${lang === "en" ? "font-bold text-[#1D4ED8] underline" : "text-[#6B7280]"}`}
                  >
                    English
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B7280] gap-4">
          <p>{t.footer.copyright}</p>
          <p className="flex items-center gap-2">
            <span>{lang === "he" ? "שער למחשבה ישראלית וים-תיכונית" : "A Gateway to Israeli & Mediterranean Thought"}</span>
            <span>•</span>
            <span>₪ ILS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
