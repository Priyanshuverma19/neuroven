"use client";

import React from "react";
import { BibleProjectLogo, HeartIcon, SparklesIcon, CheckIcon } from "./Icons";

export default function MissionSection() {
  return (
    <section className="bg-white rounded-3xl border border-[#E8E4DC] p-8 sm:p-12 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Our Story & Heart */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D45B38]">
            <HeartIcon size={16} />
            <span>Nonprofit &amp; 100% Crowdfunded</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#121826] tracking-tight leading-snug">
            Experiencing the Bible as a Unified Story That Leads to Jesus
          </h2>

          <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
            BibleProject was founded in 2014 by longtime friends <strong>Tim Mackie</strong> (theologian and scholar)
            and <strong>Jon Collins</strong> (creative director and visual storyteller). From the beginning, our goal has been
            to make the literary and theological richness of the Bible approachable and captivating to anyone, anywhere, completely free.
          </p>

          <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
            We don’t sell courses, charge subscriptions, or run ads. Because of over 100,000 recurring patrons, every video, podcast, classroom syllabus, and poster is available to all humans without paywalls.
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#121826]">
              <CheckIcon size={14} className="text-[#0066FF]" />
              <span>No Subscriptions</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#121826]">
              <CheckIcon size={14} className="text-[#0066FF]" />
              <span>No Advertisements</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#121826]">
              <CheckIcon size={14} className="text-[#0066FF]" />
              <span>Free Worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Column: Key Stats Display */}
        <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E8E4DC] space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#718096] pb-3 border-b border-[#E8E4DC]">
            Global Kingdom Reach
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#0066FF] block">
                200M+
              </span>
              <span className="text-xs text-[#718096] font-medium">Worldwide Video Views</span>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#D45B38] block">
                50+
              </span>
              <span className="text-xs text-[#718096] font-medium">Global Languages</span>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#2D5A46] block">
                100k+
              </span>
              <span className="text-xs text-[#718096] font-medium">Monthly Crowdfunders</span>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#121826] block">
                100%
              </span>
              <span className="text-xs text-[#718096] font-medium">Free Forever</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E4DC]">
            <button
              onClick={() => alert("Thank you for your generous heart to keep theological education free!")}
              className="w-full py-3 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Join the Movement • Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
