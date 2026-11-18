"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";

export default function PrivacyPage() {
  const { lang, dir } = useLanguage();
  const isHe = lang === "he";

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E0D8] shadow-xs space-y-8">
        <div className="space-y-2 border-b border-[#E5E0D8] pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
            {isHe ? "מסמך משפטי רשמי" : "Official Legal Document"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#111827]">
            {isHe ? "מדיניות פרטיות והגנת מידע" : "Privacy Policy & Data Governance"}
          </h1>
          <p className="text-xs text-[#6B7280]">
            {isHe ? "עודכן לאחרונה: 15 בנובמבר 2026 • בהתאם לחוק הגנת הפרטיות התשמ\"א-1981" : "Last updated: November 15, 2026 • Israeli Privacy Protection Law 5741-1981 & GDPR Compliant"}
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#374151] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827]">
              {isHe ? "1. מבוא ומחויבות המערכת" : "1. Introduction & Governance"}
            </h2>
            <p>
              {isHe
                ? "נויראוואן (NEURAVAN) מכבדת את פרטיות המשתמשים ורואה בשמירה על סודיות ואבטחת המידע ערך יסוד. מדיניות זו מפרטת כיצד אנו אוספים, שומרים ומשתמשים במידע כאשר הנכם גולשים באתר, מאזינים לפודקאסטים, צופים בסרטונים או נרשמים לניוזלטר."
                : "NEURAVAN is dedicated to protecting user privacy and securing data integrity. This Privacy Policy details how we collect, store, and utilize information when you browse our platform, stream audio, view videos, or subscribe to our newsletter."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827]">
              {isHe ? "2. איסוף מידע ושימוש בו" : "2. Information Collection & Usage"}
            </h2>
            <p>
              {isHe
                ? "איננו מוכרים או מעבירים מידע אישי לצדדים שלישיים לצרכי פרסום. כתובות דוא\"ל הנמסרות בעת הרשמה לניוזלטר משמשות אך ורק למשלוח תכנים עיוניים ומסות מאת נויראוואן. ניתן להסיר את הרישום בכל עת בלחיצה על כפתור ההסרה בתחתית כל הודעה."
                : "We never monetize or disclose personal data to third-party advertisers. Email addresses submitted for our newsletter are used exclusively for dispatching curated essays, podcast releases, and intellectual commentaries. You may unsubscribe at any time."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827]">
              {isHe ? "3. קובצי Cookie ונגן שמע מקומי" : "3. Local Cache & Audio Playback State"}
            </h2>
            <p>
              {isHe
                ? "האתר עושה שימוש באחסון מקומי (LocalStorage) של הדפדפן כדי לשמור את התקדמות ההאזנה בפרקי הפודקאסט, העדפות השפה (עברית / אנגלית) ועוצמת השמע. מידע זה אינו נשלח לשרתים חיצוניים ונשאר בשליטתכם המלאה."
                : "Our platform uses browser LocalStorage solely to preserve audio playback timestamps, language preferences (Hebrew / English), volume levels, and player dock state. This data resides on your client device."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827]">
              {isHe ? "4. יצירת קשר בנושאי פרטיות" : "4. Privacy Inquiries"}
            </h2>
            <p>
              {isHe
                ? "לשאלות בנושאי פרטיות, מחיקת מידע או עיון במידע לפי סעיף 13 לחוק הגנת הפרטיות, ניתן לפנות לממונה הגנת המידע בכתובת: privacy@neuravan.co.il."
                : "For inquiries regarding data protection, rectification, or erasure, contact our Data Privacy Officer at: privacy@neuravan.co.il."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
