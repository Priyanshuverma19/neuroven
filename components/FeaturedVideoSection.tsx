"use client";

import React, { useState } from "react";
import { PlayIcon, PauseIcon, SparklesIcon, DownloadIcon } from "./Icons";

export default function FeaturedVideoSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="bg-gradient-to-br from-[#121826] via-[#1A2234] to-[#121826] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: Video Preview Thumbnail */}
        <div className="lg:col-span-6">
          <div
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="relative group w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-white/15 cursor-pointer"
          >
            {/* Visual Artistic Graphic */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F3A78] via-[#1E293B] to-[#D45B38] flex flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-black/40 text-slate-200 border border-white/10">
                  Featured Animation
                </span>
                <span className="text-xs font-mono font-bold text-white bg-black/50 px-2 py-0.5 rounded">
                  05:42
                </span>
              </div>

              {/* Central Art */}
              <div className="text-center my-auto">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white block mb-1">
                  How to Read Biblical Poetry
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-300">
                  The Metaphors of the Psalms
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>The Literary Styles Series</span>
                <span className="text-[#1ED760] font-semibold">4.8M Views</span>
              </div>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 flex items-center justify-center transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                {isVideoPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} className="ml-1" />}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Context & Key Insights */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0066FF] mb-2">
            <SparklesIcon size={14} />
            <span>Companion Film to Psalms 3–8</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-white tracking-tight leading-snug mb-4">
            The Visual Language of Hebrew Poetry
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Hebrew poems don&apos;t rhyme sounds — they rhyme ideas. Learn how ancient Israelites used vivid
            metaphors like shields, raging floods, horn lifters, and olive trees to pray in crisis.
          </p>

          {/* 3 Key Takeaways */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <span className="w-5 h-5 rounded-full bg-[#0066FF] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
                1
              </span>
              <span>
                <strong>Parallelism:</strong> Hebrew lines build on, contrast with, or escalate the line before them.
              </span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <span className="w-5 h-5 rounded-full bg-[#D45B38] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
                2
              </span>
              <span>
                <strong>Dense Imagery:</strong> Stripping prose down to bare physical symbols (e.g. <em>Magen</em> as body armor).
              </span>
            </div>
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <span className="w-5 h-5 rounded-full bg-[#2D5A46] flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
                3
              </span>
              <span>
                <strong>The Prayers of Jesus:</strong> Why Jesus prayed the Psalms more than any other book in scripture.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => alert("Playing animated short film: How to Read the Psalms!")}
              className="px-6 py-3 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Watch Video (5 Min)
            </button>
            <button
              onClick={() => alert("Downloading High-Res Poster & Scripture Scroll PDF!")}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider transition-colors flex items-center gap-2"
            >
              <DownloadIcon size={14} />
              <span>Download Visual Poster</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
