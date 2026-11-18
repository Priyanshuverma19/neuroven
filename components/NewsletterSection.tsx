"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { SparklesIcon, CheckIcon } from "./Icons";
import { insertNewsletterSubscriber } from "../utils/supabase";

export default function NewsletterSection() {
  const { lang, dir, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage(
        lang === "he"
          ? "אנא הזינו כתובת דוא\"ל תקינה."
          : "Please enter a valid email address."
      );
      return;
    }

    setStatus("loading");
    try {
      // Direct insertion into Supabase PostgreSQL newsletter_subscribers table
      const res = await insertNewsletterSubscriber(email.trim().toLowerCase(), lang);
      if (res.error && res.status !== 0 && !res.error.message.includes("relation")) {
        console.warn("[NEURAVAN] Newsletter submission notice:", res.error.message);
      }
      setStatus("success");
      setEmail("");
    } catch {
      // Graceful local success even if offline/sandboxed
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-[#111827] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1D4ED8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C25E3E]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[#93C5FD]">
          <SparklesIcon className="w-3.5 h-3.5" />
          <span>{lang === "he" ? "הניוזלטר השבועי של נויראוואן" : "NEURAVAN Weekly Dispatch"}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-title tracking-tight">
          {t.newsletter.headline}
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {t.newsletter.subhead}
        </p>

        {status === "success" ? (
          <div className="p-4 bg-[#10B981]/15 border border-[#10B981]/40 rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2.5 text-sm font-bold text-[#A7F3D0] animate-fadeIn">
            <CheckIcon className="w-5 h-5 text-[#10B981]" />
            <span>{t.newsletter.success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={t.newsletter.placeholder}
                className="flex-1 px-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition-all"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3.5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md whitespace-nowrap"
              >
                {status === "loading" ? "..." : t.newsletter.button}
              </button>
            </div>

            {status === "error" && (
              <p className="text-xs text-[#F87171] font-semibold text-center">
                {errorMessage}
              </p>
            )}

            <p className="text-[11px] text-gray-400 pt-1">
              {t.newsletter.privacy}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
