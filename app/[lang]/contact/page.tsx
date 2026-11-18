"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { CheckIcon, SparklesIcon } from "../../../components/Icons";

export default function ContactPage() {
  const { lang, dir, t } = useLanguage();
  const isHe = lang !== "en";

  const [form, setForm] = useState({ name: "", email: "", topic: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 space-y-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8E0] text-xs font-bold uppercase tracking-wider text-[#111827]">
            <span>{isHe ? "צרו קשר עם מערכת נויראוואן" : "Connect with NEURAVAN"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title text-[#111827]">
            {isHe ? "נשמח לשמוע מכם" : "We Welcome Your Inquiry"}
          </h1>
          <p className="text-sm sm:text-base text-[#4B5563]">
            {isHe
              ? "פניות עיתונאיות, הצעות לנושאי פודקאסט, שיתופי פעולה אקדמיים ומכתבי קוראים ומאזינים"
              : "Editorial correspondence, podcast episode pitches, academic partnerships & media inquiries"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Office Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] space-y-6">
            <h2 className="text-xl font-bold font-serif-title text-[#111827]">
              {isHe ? "פרטי המערכת בישראל" : "Editorial Bureau in Israel"}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#4B5563]">
              <div>
                <span className="font-bold text-[#111827] block mb-0.5">
                  {isHe ? "כתובת המערכת והאולפנים:" : "Studio & Bureau Address:"}
                </span>
                <p>{isHe ? "שדרות רוטשילד 45, תל אביב-יפו, 6520701, ישראל" : "45 Rothschild Blvd, Tel Aviv-Yafo, 6520701, Israel"}</p>
              </div>

              <div>
                <span className="font-bold text-[#111827] block mb-0.5">
                  {isHe ? "אזור זמן ושעות פעילות:" : "Timezone & Bureau Hours:"}
                </span>
                <p>Asia/Jerusalem (GMT+2 / GMT+3) • {isHe ? "ימים א'-ה' 09:00 - 18:00" : "Sun - Thu 09:00 - 18:00"}</p>
              </div>

              <div>
                <span className="font-bold text-[#111827] block mb-0.5">
                  {isHe ? "דוא\"ל ישיר:" : "Direct Contacts:"}
                </span>
                <p>editorial@neuravan.co.il • press@neuravan.co.il</p>
              </div>

              <div>
                <span className="font-bold text-[#111827] block mb-0.5">
                  {isHe ? "טלפון משרד:" : "Telephone:"}
                </span>
                <p>+972 3-568-4200</p>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] text-xs text-[#6B7280]">
              <span className="font-bold text-[#111827] block mb-1">
                {isHe ? "הצעות לנושאי פודקאסט ואירוח:" : "Podcast Guest Pitches:"}
              </span>
              <p>
                {isHe
                  ? "חוקרים, הוגים ויוצרים המעוניינים להציע נושא לפרק מוזמנים לצרף תקציר קצר וקישור למאמר/ספר."
                  : "Researchers and scholars proposing discussion topics are invited to include an abstract and publication link."}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-xs">
            {submitted ? (
              <div className="p-8 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#10B981]/15 text-[#10B981] mx-auto flex items-center justify-center">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif-title text-[#111827]">
                  {isHe ? "הפנייה התקבלה בהצלחה!" : "Message Received!"}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563]">
                  {isHe
                    ? "תודה על פנייתך. צוות המערכת יעיין בהודעה וישיב בהקדם האפשרי."
                    : "Thank you for reaching out. Our editorial team will review your message and reply promptly."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#111827] block mb-1">
                    {isHe ? "שם מלא *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111827] block mb-1">
                    {isHe ? "דואר אלקטרוני *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111827] block mb-1">
                    {isHe ? "נושא הפנייה *" : "Subject *"}
                  </label>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  >
                    <option value="general">{isHe ? "פנייה כללית" : "General Inquiry"}</option>
                    <option value="podcast">{isHe ? "הצעה לפרק פודקאסט" : "Podcast Topic Pitch"}</option>
                    <option value="press">{isHe ? "עיתונות ותקשורת" : "Press & Media"}</option>
                    <option value="academic">{isHe ? "שיתוף פעולה אקדמי" : "Academic Partnership"}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#111827] block mb-1">
                    {isHe ? "תוכן ההודעה *" : "Message *"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#111827] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  {isHe ? "שליחת ההודעה למערכת" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
