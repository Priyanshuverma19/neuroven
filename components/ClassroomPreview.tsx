"use client";

import React from "react";
import { GraduationCapIcon, ClockIcon, BookOpenIcon, SparklesIcon } from "./Icons";

const COURSES = [
  {
    id: "course-1",
    title: "Introduction to Hebrew Poetry & The Psalms",
    instructor: "Dr. Tim Mackie",
    lectures: 16,
    hours: "8 Hours",
    level: "Graduate-Level",
    badge: "Direct Companion",
    description: "Explore the literary architecture of the 150 psalms, Hebrew metaphor theory, and messianic prayer design.",
    color: "#0066FF",
    bgGradient: "from-blue-900 via-slate-900 to-slate-950",
  },
  {
    id: "course-2",
    title: "Heaven & Earth: The Cosmic Temple",
    instructor: "Dr. Tim Mackie",
    lectures: 22,
    hours: "12 Hours",
    level: "Intermediate",
    badge: "Most Popular",
    description: "Trace the overlapping spaces where God's presence meets humanity from Eden to the New Jerusalem.",
    color: "#D45B38",
    bgGradient: "from-orange-950 via-slate-900 to-slate-950",
  },
  {
    id: "course-3",
    title: "The Book of Jonah & The Scandal of Mercy",
    instructor: "Dr. Tim Mackie",
    lectures: 10,
    hours: "5.5 Hours",
    level: "Foundational",
    badge: "New Release",
    description: "Unpack Jewish narrative satire, prophetic resistance, and the relentless mercy of God toward enemies.",
    color: "#2D5A46",
    bgGradient: "from-emerald-950 via-slate-900 to-slate-950",
  },
];

export default function ClassroomPreview() {
  return (
    <section className="bg-white rounded-3xl border border-[#E8E4DC] p-8 sm:p-12 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E8E4DC]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D5A46] mb-1">
            <GraduationCapIcon size={16} />
            <span>BibleProject Classroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#121826] tracking-tight">
            Free University-Level Courses
          </h2>
        </div>
        <p className="text-sm text-[#718096] max-w-md">
          Go deeper into the biblical languages and historical context with in-depth lectures, reading assignments, and interactive quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {COURSES.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border border-[#E8E4DC] overflow-hidden bg-[#FAF8F5] hover:border-[#0066FF] hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            {/* Header banner */}
            <div className={`p-6 bg-gradient-to-tr ${course.bgGradient} text-white flex flex-col justify-between h-40`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  {course.level}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1ED760] bg-black/40 px-2 py-0.5 rounded">
                  {course.badge}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-300 block mb-0.5">Taught by {course.instructor}</span>
                <h3 className="text-lg font-bold font-serif-title leading-snug text-white group-hover:text-blue-300 transition-colors">
                  {course.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed mb-6">
                {course.description}
              </p>

              <div className="pt-4 border-t border-[#E8E4DC] flex items-center justify-between text-xs text-[#718096]">
                <span className="flex items-center gap-1 font-semibold">
                  <BookOpenIcon size={13} />
                  {course.lectures} Lectures
                </span>
                <span className="flex items-center gap-1 font-mono font-semibold">
                  <ClockIcon size={13} />
                  {course.hours}
                </span>
              </div>
            </div>

            {/* Enroll CTA */}
            <div className="px-6 pb-6">
              <button
                onClick={() => alert(`Enrolling in "${course.title}". 100% Free!`)}
                className="w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white group-hover:bg-[#0066FF] text-[#121826] group-hover:text-white border border-[#E8E4DC] group-hover:border-[#0066FF] shadow-sm transition-all"
              >
                Enroll Free
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
