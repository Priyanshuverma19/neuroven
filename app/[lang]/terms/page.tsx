"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";

export default function TermsPage() {
  const { lang, dir } = useLanguage();
  const isHe = lang === "he";

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#E5E0D8] shadow-xs space-y-8">
        <div className="space-y-2 border-b border-[#E5E0D8] pb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
            {isHe ? "תנאי שימוש והסכם משתמש" : "Terms of Service & Usage"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#111827]">
            {isHe ? "תנאי השימוש בפלטפורמת נויראוואן" : "NEURAVAN Platform Terms"}
          </h1>
          <p className="text-xs text-[#6B7280]">
            {isHe ? "עודכן לאחרונה: 15 בנובמבר 2026 • סמכות שיפוט בלעדית: בתי המשפט בתל אביב-יפו" : "Last updated: November 15, 2026 • Exclusive jurisdiction: Tel Aviv-Yafo courts"}
          </p>
        </div>

        <div className="space-y-6 text-sm text-[#374151] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827]">
              {isHe ? "1. קניין רוחני וזכויות יוצרים" : "1. Intellectual Property & Copyright"}
            </h2>
            <p>
              {isHe
                ? "כל התכנים בפלטפורמת נויראוואן — לרבות מאמרים, פרקי פודקאסט, תמלילים, יצירות גרפיות, אנימציות, סמלים מסחריים וקוד מקור — מוגנים בזכויות יוצרים של נויראוואן ויוצריה. אין להעתיק, לשכפל, להפיץ או לעשות שימוש מסחרי ללא אישור מראש ובכתב."
                : "All editorial essays, podcasts, audio recordings, transcripts, illustrations, visual documentaries, and software code on NEURAVAN are protected by international and Israeli copyright. Unauthorized reproduction, republication, or commercial distribution is prohibited."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827]">
              {isHe ? "2. שימוש הוגן וחינוכי" : "2. Educational & Non-Profit Use"}
            </h2>
            <p>
              {isHe
                ? "נויראוואן מעודדת שימוש בתכנים לצורכי לימוד, מחקר אקדמי, חוגי בית ובתי ספר, ובלבד שניתן קרדיט מלא וברור ליוצרים ולפלטפורמה וקישור למקור."
                : "We encourage non-commercial utilization for academic research, high school seminars, and study circles, provided clear attribution and back-links to NEURAVAN are preserved."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#111827]">
              {isHe ? "3. ברירת דין וסמכות שיפוט" : "3. Governing Law & Jurisdiction"}
            </h2>
            <p>
              {isHe
                ? "על תנאי שימוש אלה יחולו אך ורק דיני מדינת ישראל. כל מחלוקת תתברר בבתי המשפט המוסמכים במחוז תל אביב-יפו בלבד."
                : "These terms are governed exclusively by the laws of the State of Israel. Any dispute arising under these terms shall be submitted to the exclusive jurisdiction of the competent courts of Tel Aviv-Yafo."}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
