"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SparklesIcon, Volume2Icon, CheckIcon } from "./Icons";
import { audioEngine } from "../utils/audioEngine";

export default function HebrewWordStudy() {
  const { lang, dir } = useLanguage();

  const words = [
    {
      root: "ק-ד-ם",
      vocalized: "קֶדֶם / קָדִימָה",
      transliteration: "Kedem / Kadima",
      toneHz: 440,
      meanings: {
        he: "עבר קדום, מזרח (כיוון הזריחה), והתקדמות לעבר העתיד.",
        en: "Primordial past, East (dawn facing), and forward progress.",
      },
      insight: {
        he: "בתפיסה השמית, האדם עומד כשפניו אל הזריחה במזרח: העבר ידוע ונמצא לפני עיניו, בעוד העתיד מגיע מאחוריו. זוהי תפיסה לא-לינארית המאחדת גיאוגרפיה ותודעה.",
        en: "In ancient Semitic cosmology, one stands facing the solar dawn in the East: the past is known and lies before the eyes, while the unknown future approaches from behind.",
      },
      occurrences: {
        he: "בראשית ב' ח', תהילים ע\"ד י\"ב, ישעיהו מ\"ו י'",
        en: "Genesis 2:8, Psalm 74:12, Isaiah 46:10",
      },
    },
    {
      root: "נ-פ-שׁ",
      vocalized: "נֶפֶשׁ / לִנְפּוֹשׁ",
      transliteration: "Nefesh / Linposh",
      toneHz: 523.25,
      meanings: {
        he: "גרון, נשימה, רעב, חיוניות קיומית והתרגעות.",
        en: "Throat, breath, appetite, biological vitality, and respite.",
      },
      insight: {
        he: "המילה 'נפש' בעברית אינה ישות מופשטת נפרדת מהגוף כמו בפילוסופיה האפלטונית. היא הגרון הנושם והרעב — האדם כולו הוא 'נפש חיה'. מכאן גם הפועל 'נופש'.",
        en: "Unlike Platonic dualism where soul is detached from body, Hebrew 'Nefesh' is visceral: the breathing throat and longing organism. Man doesn't possess a soul; man is a living soul.",
      },
      occurrences: {
        he: "שמות ל\"א י\"ז ('שבת וינפש'), תהילים מ\"ב ג'",
        en: "Exodus 31:17 ('ceased and refreshed'), Psalm 42:2",
      },
    },
    {
      root: "ש-מ-ע",
      vocalized: "שְׁמַע / הַקְשָׁבָה",
      transliteration: "Shema / Hakshava",
      toneHz: 587.33,
      meanings: {
        he: "שמיעה פיזית, קשב עמוק, הבנה פנימית וציות מוסרי.",
        en: "Auditory hearing, deep listening, inner comprehension, and moral obedience.",
      },
      insight: {
        he: "בעברית אין מילה נפרדת ל'לציית' (To Obey). לשמוע באמת פירושו לפעול על פי הנשמע. זוהי אפיסטמולוגיה קולית לעומת האפיסטמולוגיה הראייתית של יוון.",
        en: "Hebrew possesses no distinct word for 'to obey'. To truly hear is inherently to respond. This contrasts Greek visual contemplation with Semitic acoustic attentiveness.",
      },
      occurrences: {
        he: "דברים ו' ד', שמואל א' ג' ט'",
        en: "Deuteronomy 6:4, 1 Samuel 3:9",
      },
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = words[selectedIndex];

  const playPronunciation = (hz: number) => {
    audioEngine.playChime(hz);
  };

  return (
    <section className="py-14 bg-white border-t border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2E9] border border-[#FED7AA] text-[11px] font-bold text-[#C25E3E] mb-2 uppercase tracking-wider">
              <SparklesIcon className="w-3.5 h-3.5 text-[#C25E3E]" />
              <span>{lang === "he" ? "מעבדת שורשים עבריים" : "Hebrew Root Lab"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#111827]">
              {lang === "he" ? "הארכיטקטורה הקוגניטיבית של השפה העברית" : "The Cognitive Architecture of Hebrew"}
            </h2>
            <p className="text-sm text-[#4B5563] mt-1">
              {lang === "he"
                ? "כיצד כל שורש עברי מחבר בין חוויה גופנית לבין מושג פילוסופי מופשט"
                : "How every Hebrew root connects visceral somatic experience with abstract philosophical inquiry"}
            </p>
          </div>
        </div>

        {/* Word Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {words.map((w, idx) => (
            <button
              key={w.root}
              onClick={() => {
                setSelectedIndex(idx);
                playPronunciation(w.toneHz);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedIndex === idx
                  ? "bg-[#111827] text-white shadow-md"
                  : "bg-[#F5F1EB] text-[#4B5563] hover:bg-[#EBE5DB]"
              }`}
            >
              <span className="font-hebrew-serif text-base">{w.vocalized}</span>
              <span className="text-[11px] text-gray-400">({w.transliteration})</span>
            </button>
          ))}
        </div>

        {/* Word Insight Card */}
        <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xs">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C25E3E]">
                {lang === "he" ? "שורש שמי תלת-עיצורי" : "Tri-Consonantal Root"}
              </span>
              <button
                onClick={() => playPronunciation(current.toneHz)}
                className="px-3 py-1.5 rounded-full bg-white border border-[#E5E0D8] hover:bg-[#F2EDE4] transition-colors flex items-center gap-1.5 text-xs font-bold text-[#111827]"
                title="Play harmonic chime"
              >
                <Volume2Icon className="w-4 h-4 text-[#1D4ED8]" />
                <span>{lang === "he" ? "השמעת צליל" : "Acoustic Tone"}</span>
              </button>
            </div>

            <h3 className="text-4xl sm:text-5xl font-black font-hebrew-serif text-[#111827]">
              {current.vocalized}
            </h3>

            <div className="p-4 bg-white rounded-2xl border border-[#E5E0D8]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-1">
                {lang === "he" ? "משמעות יסוד" : "Core Semantics"}
              </span>
              <p className="text-sm font-semibold text-[#111827]">
                {current.meanings[lang]}
              </p>
            </div>

            <div className="text-xs text-[#6B7280]">
              <span className="font-bold">{lang === "he" ? "מופעים מרכזיים: " : "Key Passages: "}</span>
              <span>{current.occurrences[lang]}</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E5E0D8] space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
              <SparklesIcon className="w-4 h-4" />
              <span>{lang === "he" ? "תובנה פילוסופית וקוגניטיבית" : "Philosophical & Cognitive Insight"}</span>
            </div>

            <p className="text-sm sm:text-base text-[#374151] leading-relaxed">
              {current.insight[lang]}
            </p>

            <div className="pt-3 border-t border-[#F2EDE4] flex items-center justify-between text-xs text-[#4B5563]">
              <span className="italic">
                {lang === "he"
                  ? "מתוך סדרת הפודקאסט 'תודעה, שפה ומשמעות'"
                  : "From the podcast series 'Mind, Language & Meaning'"}
              </span>
              <span className="font-bold text-[#1D4ED8]">
                {lang === "he" ? "פרק 42" : "Episode 42"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
