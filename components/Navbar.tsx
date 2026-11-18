"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { useAudio } from "../context/AudioContext";
import {
  NeuravanLogo,
  SearchIcon,
  HeadphonesIcon,
  GlobeIcon,
  MenuIcon,
  CloseIcon,
  SparklesIcon,
} from "./Icons";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const { lang, dir, t, switchPathLanguage } = useLanguage();
  const { isPlaying } = useAudio();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/explore`, label: t.nav.explore },
    { href: `/${lang}/podcasts`, label: t.nav.podcasts },
    { href: `/${lang}/videos`, label: t.nav.videos },
    { href: `/${lang}/articles`, label: t.nav.articles },
    { href: `/${lang}/collections`, label: t.nav.collections },
    { href: `/${lang}/resources`, label: t.nav.resources },
    { href: `/${lang}/about`, label: t.nav.about },
  ];

  const isActiveLink = (href: string) => {
    if (href === `/${lang}`) {
      return pathname === `/${lang}` || pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#E5E0D8] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded-xl"
          >
            <div className="relative">
              <NeuravanLogo className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" size={40} />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D4ED8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1D4ED8]"></span>
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    active
                      ? "bg-[#111827] text-white shadow-sm"
                      : "text-[#4B5563] hover:text-[#111827] hover:bg-[#EFE9DF]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Search, Language Switcher, Subscribe CTA & Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#EFE9DF] rounded-full transition-colors flex items-center gap-1.5 text-xs font-medium"
              title={t.nav.search}
            >
              <SearchIcon className="w-4 h-4" />
              <span className="hidden xl:inline text-[#6B7280]">{t.nav.search}</span>
            </button>

            {/* Language Switcher Pill (עברית | English) */}
            <div className="flex items-center bg-[#EDE8E0] p-0.5 rounded-full border border-[#DED7CB] text-xs font-medium">
              <button
                onClick={() => switchPathLanguage("he")}
                className={`px-2.5 py-1 rounded-full transition-all text-xs font-bold ${
                  lang === "he"
                    ? "bg-white text-[#111827] shadow-xs"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                עברית
              </button>
              <button
                onClick={() => switchPathLanguage("en")}
                className={`px-2.5 py-1 rounded-full transition-all text-xs font-bold ${
                  lang === "en"
                    ? "bg-white text-[#111827] shadow-xs"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                English
              </button>
            </div>

            {/* Admin CMS Direct Shortcut */}
            <Link
              href={`/${lang}/admin`}
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#1D4ED8] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-full transition-colors border border-[#BFDBFE]"
            >
              <SparklesIcon className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>CMS</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#EFE9DF] rounded-full transition-colors"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E5E0D8] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E5E0D8]">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 text-sm font-semibold rounded-xl text-center transition-colors ${
                      active
                        ? "bg-[#111827] text-white"
                        : "text-[#4B5563] bg-[#F2EDE4] hover:bg-[#E8E1D5]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                href={`/${lang}/admin`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#1D4ED8] bg-[#EFF6FF] rounded-full"
              >
                <SparklesIcon className="w-4 h-4" />
                <span>{t.nav.admin}</span>
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#4B5563] bg-[#EFE9DF] rounded-full"
              >
                <SearchIcon className="w-4 h-4" />
                <span>{t.nav.search}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
