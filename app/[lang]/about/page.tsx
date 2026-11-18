"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { NeuravanLogo, SparklesIcon, CheckIcon } from "../../../components/Icons";

export default function AboutPage() {
  const { lang, dir, t } = useLanguage();
  const isHe = lang !== "en";

  return (
    <div className="py-12 space-y-16">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="flex justify-center">
          <NeuravanLogo className="w-16 h-16" size={64} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E0] text-xs font-bold uppercase tracking-wider text-[#111827]">
          <span>{isHe ? "אודות נויראוואן (NEURAVAN)" : "About NEURAVAN"}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black font-serif-title text-[#111827] leading-tight">
          {isHe
            ? "בית דיגיטלי למחשבה חופשית, עומק לשוני וסיפורים שמשנים תודעה"
            : "A Digital Sanctuary for Rigorous Inquiry, Linguistic Depth & Transformative Storytelling"}
        </h1>

        <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl mx-auto">
          {isHe
            ? "נויראוואן היא פלטפורמת מדיה, פודקאסטים וחינוך דיגיטלי פרימיום שהוקמה בישראל כדי לחבר בין שורשי העבר העברי והים-תיכוני לבין גבולות המדע והטכנולוגיה של העתיד."
            : "NEURAVAN is an independent digital media, podcast, and educational publication founded in Israel to illuminate the convergence of ancient Semitic wisdom, Mediterranean heritage, and cognitive science."}
        </p>
      </section>

      {/* Brand Identity & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E0D8] shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#111827]">
              {isHe ? "עקרונות היסוד שלנו" : "Our Foundational Pillars"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563]">
              {isHe
                ? "מדוע הקמנו את נויראוואן ומה מנחה את יצירת התוכן שלנו יום-יום"
                : "The guiding philosophy steering our editorial, audio, and visual productions"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-3 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8]">
              <span className="text-2xl font-bold font-serif-title text-[#1D4ED8]">01</span>
              <h3 className="text-lg font-bold text-[#111827]">
                {isHe ? "סקרנות רדיקלית" : "Radical Curiosity"}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {isHe
                  ? "איננו מקבלים תשובות שטחיות או קלישאות ניו-אייג'. אנו מחפשים את המקורות הראשוניים, את הדיאלקטיקה המורכבת ואת שאלות העומק שמאתגרות את המחשבה."
                  : "We reject superficial formulas and soundbites. We pursue primary manuscript evidence, nuanced dialectics, and questions that expand consciousness."}
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8]">
              <span className="text-2xl font-bold font-serif-title text-[#C25E3E]">02</span>
              <h3 className="text-lg font-bold text-[#111827]">
                {isHe ? "אהבת השפה העברית" : "Devotion to Hebrew"}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {isHe
                  ? "העברית איננה רק כלי תקשורת טכני; היא אוצר בלום של פילוסופיה קיומית המשוקעת בתוך שורשים תלת-עיצוריים ומבנה תחבירי ייחודי."
                  : "Hebrew is not an inert vernacular; it is an extraordinary storehouse of existential ontology sedimented in root matrices."}
              </p>
            </div>

            <div className="space-y-3 p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8]">
              <span className="text-2xl font-bold font-serif-title text-[#2D5A46]">03</span>
              <h3 className="text-lg font-bold text-[#111827]">
                {isHe ? "אסתטיקה ועיצוב בינלאומי" : "Editorial Craft"}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {isHe
                  ? "רעיונות גדולים ראויים לביצוע חזותי ושמעי מושלם: טיפוגרפיה מעודנת, סאונד קולנועי עשיר ואנימציה ברמה הגבוהה בעולם."
                  : "Great ideas deserve supreme aesthetic realization: meticulous typography, cinematic acoustic design, and world-class animation."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Editorial Fellows */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#111827]">
            {isHe ? "עמיתי המערכת והיוצרים" : "Editorial Fellowship & Voices"}
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563]">
            {isHe ? "החוקרים, המספרים והעורכים המובילים את תוכניות נויראוואן" : "The scholars, storytellers, and researchers behind NEURAVAN"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: { he: "ד\"ר יונתן אריאל", en: "Dr. Jonathan Ariel" },
              role: { he: "מנהל אקדמי & מנחה פודקאסט", en: "Academic Director & Host" },
              avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: { he: "יעל שפירא", en: "Yael Shapira" },
              role: { he: "עורכת ראשית & יוצרת תוכן רדיופוני", en: "Editor-in-Chief & Audio Lead" },
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: { he: "פרופ' דניאל בן-עמי", en: "Prof. Daniel Ben-Ami" },
              role: { he: "היסטוריון ראשי, עורך 'הסלון הירושלמי'", en: "Senior Historian & Salon Host" },
              avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
            },
            {
              name: { he: "עמית רותם & נעה כרמון", en: "Amit Rotem & Noa Carmon" },
              role: { he: "מובילי מדור בינה מלאכותית ואתיקה", en: "AI & Future Ethics Leads" },
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
            },
          ].map((member, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#E5E0D8] text-center space-y-3 shadow-xs">
              <img
                src={member.avatar}
                alt={member.name[lang]}
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-md"
              />
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  {member.name[lang]}
                </h3>
                <span className="text-xs text-[#6B7280]">
                  {member.role[lang]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
