"use client";

import React from "react";
import { Chapter, CURRENT_EPISODE } from "../data/podcastData";
import { PlayIcon, BookOpenIcon, ClockIcon, SparklesIcon, DownloadIcon } from "./Icons";

interface ShowNotesProps {
  chapters: Chapter[];
  currentTime: number;
  onSeek: (seconds: number) => void;
  onJumpToTranscript: () => void;
}

export default function ShowNotes({
  chapters,
  currentTime,
  onSeek,
  onJumpToTranscript,
}: ShowNotesProps) {
  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#0066FF] border border-blue-200">
            Episode Guide
          </span>
          <span className="text-xs text-[#718096]">52 Minutes • 6 Chapters</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-[#121826] mb-4">
          A Deposed King&apos;s Desperate Plea: Notes &amp; Commentary
        </h2>

        <div className="prose prose-slate max-w-none text-base text-[#4A5568] leading-relaxed space-y-4">
          <p>
            When King David fled Jerusalem barefoot and weeping from his rebellious son Absalom, he
            composed a raw, vulnerable poem. In this inaugural episode of our <strong>Psalms 3–8</strong> series,
            Tim Mackie and Jon Collins examine the very first psalm in the Bible that includes a historical
            superscription: <em>&ldquo;A psalm of David, when he fled from his son Absalom.&rdquo;</em>
          </p>

          <p>
            Rather than treating this title as secondary trivia, Tim demonstrates how ancient Hebrew
            anthologists designed headings as <strong>&ldquo;glowing hyperlinks&rdquo;</strong> to earlier narratives.
            By connecting this prayer directly to <strong>2 Samuel 15–18</strong>, the psalm grounds cosmic theology
            in messy human betrayal, showing how a compromised leader surrenders his shame, fear, and desire
            for vengeance into the hands of Yahweh.
          </p>
        </div>

        {/* Timed Chapter Grid */}
        <div className="mt-8 pt-6 border-t border-[#E8E4DC]">
          <h3 className="text-lg font-bold font-serif-title text-[#121826] mb-4 flex items-center justify-between">
            <span>Episode Chapters &amp; Timestamps</span>
            <span className="text-xs font-sans font-normal text-[#718096]">
              Click any timestamp to play
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {chapters.map((ch, idx) => {
              const isCurrent =
                currentTime >= ch.time &&
                (!chapters[idx + 1] || currentTime < chapters[idx + 1].time);

              return (
                <div
                  key={ch.id}
                  onClick={() => onSeek(ch.time)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isCurrent
                      ? "bg-blue-50/70 border-[#0066FF] shadow-sm"
                      : "bg-[#FAF8F5] border-[#E8E4DC] hover:border-[#0066FF] hover:bg-white"
                  }`}
                >
                  <button
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                      isCurrent
                        ? "bg-[#0066FF] text-white"
                        : "bg-white text-[#4A5568] border border-[#E8E4DC]"
                    }`}
                  >
                    <PlayIcon size={14} className="ml-0.5" />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-[#0066FF]">
                        {ch.timestamp}
                      </span>
                      <span className="text-[11px] font-semibold text-[#718096]">
                        Chapter {idx + 1}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#121826] leading-snug">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-[#718096] mt-1 line-clamp-2">
                      {ch.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Thematic Exploration & Scripture Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Core Biblical Hyperlinks */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D45B38] mb-3">
              <BookOpenIcon size={16} />
              <span>Biblical Text &amp; Cross-References</span>
            </div>
            <h3 className="text-xl font-bold font-serif-title text-[#121826] mb-3">
              The Historical Narrative: 2 Samuel 15
            </h3>
            <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
              Psalm 3 cannot be separated from the agonizing events of Absalom&apos;s rebellion. Notice the parallel
              details between the narrative and the poem:
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-[#2D3748]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D45B38] mt-2 flex-shrink-0" />
                <span>
                  <strong>The Weeping Ascent:</strong> David walks up the Mount of Olives barefoot, with his head covered (2 Sam 15:30), contrasting with Psalm 3:3 where God is the <em>&ldquo;lifter of my head.&rdquo;</em>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D45B38] mt-2 flex-shrink-0" />
                <span>
                  <strong>The Mockers&apos; Taunt:</strong> Shimei curses David, throwing stones and saying God has judged him (2 Sam 16:7), mirrored in Psalm 3:2: <em>&ldquo;Many say of my soul, there is no salvation for him in God.&rdquo;</em>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D45B38] mt-2 flex-shrink-0" />
                <span>
                  <strong>The Foreshadowing of Jesus:</strong> Centuries later, Jesus crosses the Kidron Valley and ascends the Mount of Olives to Gethsemane (Luke 22:39), betrayed by a close companion just as David was by Ahithophel.
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
            <span className="text-xs font-medium text-[#718096]">
              Key Scripture: Psalm 3:1–8
            </span>
            <button
              onClick={onJumpToTranscript}
              className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
            >
              <span>Explore in Transcript</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Key Theological Insights */}
        <div className="bg-white rounded-2xl border border-[#E8E4DC] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D5A46] mb-3">
              <SparklesIcon size={16} />
              <span>Literary Structure &amp; Theology</span>
            </div>
            <h3 className="text-xl font-bold font-serif-title text-[#121826] mb-3">
              The Chiasm of Psalm 3
            </h3>
            <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
              Tim Mackie points out that Psalm 3 is organized around a concentric Hebrew poetic structure:
            </p>

            <div className="space-y-2.5 text-xs text-[#2D3748] bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E4DC]">
              <div className="pl-2 border-l-2 border-red-300">
                <strong>A (vv. 1–2):</strong> The Multitude of Foes (&ldquo;Many rise up... no rescue&rdquo;)
              </div>
              <div className="pl-4 border-l-2 border-blue-400">
                <strong>B (vv. 3–4):</strong> Trust in Yahweh as Shield &amp; Lifter of the Head
              </div>
              <div className="pl-6 border-l-2 border-green-500 font-bold text-[#2D5A46] bg-green-50/50 py-1 rounded">
                <strong>C (v. 5):</strong> The Climax: Rest and Sleep (&ldquo;I lay down and slept&rdquo;)
              </div>
              <div className="pl-4 border-l-2 border-blue-400">
                <strong>B&apos; (vv. 6–7):</strong> Fearlessness &amp; Surrender of Justice to Yahweh
              </div>
              <div className="pl-2 border-l-2 border-red-300">
                <strong>A&apos; (v. 8):</strong> The True Reality (&ldquo;Salvation belongs to Yahweh&rdquo;)
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
            <span className="text-xs text-[#718096]">
              Study Guide PDF available
            </span>
            <button
              onClick={() => alert("Downloading Study Guide & Translation Notes PDF...")}
              className="flex items-center gap-1.5 text-xs font-bold text-[#121826] hover:text-[#0066FF]"
            >
              <DownloadIcon size={14} />
              <span>Download Study Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
