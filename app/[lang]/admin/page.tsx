"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useLanguage } from "../../../context/LanguageContext";
import { useCMS } from "../../../context/CMSContext";
import {
  SparklesIcon,
  HeadphonesIcon,
  FilmIcon,
  BookOpenIcon,
  LayersIcon,
  CheckIcon,
  CloseIcon,
} from "../../../components/Icons";
import { PodcastEpisode, VideoItem, ArticleItem, Language } from "../../../data/neuravanContent";

export default function AdminCMSPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = use(params);
  const lang: Language = rawLang === "en" ? "en" : "he";
  const {
    shows,
    episodes,
    videos,
    articles,
    collections,
    supabaseStatus,
    addEpisode,
    deleteEpisode,
    addVideo,
    deleteVideo,
    addArticle,
    deleteArticle,
    resetToDefaults,
    exportDatabaseJson,
    importDatabaseJson,
    syncAllToSupabase,
    pullFromSupabase,
  } = useCMS();

  const isHe = lang !== "en";
  const [activeTab, setActiveTab] = useState<"episodes" | "videos" | "articles" | "shows" | "database">("episodes");
  const [showAddEpisodeModal, setShowAddEpisodeModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [alertNotice, setAlertNotice] = useState<string | null>(null);
  const [isSyncingDb, setIsSyncingDb] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  // New Episode Form State
  const [newEp, setNewEp] = useState({
    titleHe: "",
    titleEn: "",
    subtitleHe: "",
    subtitleEn: "",
    showId: shows[0]?.id || "mind-and-language",
    episodeNumber: episodes.length + 1,
    season: 1,
    durationFormatted: "45:00",
    durationSec: 2700,
    audioUrl: "https://ia800301.us.archive.org/15/items/ambient_soundscape_archive/meditative_soundscape_01.mp3",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    categoryHe: "פילוסופיה ומדע",
    categoryEn: "Philosophy & Science",
    descriptionHe: "",
    descriptionEn: "",
    featured: false,
  });

  // New Video Form State
  const [newVid, setNewVid] = useState({
    titleHe: "",
    titleEn: "",
    descriptionHe: "",
    descriptionEn: "",
    embedUrl: "https://www.youtube.com/embed/V_B8e8uO_K8",
    duration: "15:00",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    categoryHe: "אנימציה ומחשבה",
    categoryEn: "Animation & Ideas",
    featured: false,
  });

  // New Article Form State
  const [newArt, setNewArt] = useState({
    titleHe: "",
    titleEn: "",
    subtitleHe: "",
    subtitleEn: "",
    authorNameHe: "ד\"ר שירה כהנא",
    authorNameEn: "Dr. Shira Kahana",
    authorRoleHe: "חוקרת תרבות",
    authorRoleEn: "Cultural Scholar",
    readingTimeMin: 7,
    categoryHe: "הגות וספרות",
    categoryEn: "Thought & Literature",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
    excerptHe: "",
    excerptEn: "",
    bodyHe: "",
    bodyEn: "",
  });

  const showAlert = (msg: string) => {
    setAlertNotice(msg);
    setTimeout(() => setAlertNotice(null), 3000);
  };

  const handleCreateEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    const episode: PodcastEpisode = {
      id: `ep-${Date.now()}`,
      showId: newEp.showId,
      episodeNumber: Number(newEp.episodeNumber),
      season: Number(newEp.season),
      title: { he: newEp.titleHe, en: newEp.titleEn || newEp.titleHe },
      subtitle: { he: newEp.subtitleHe, en: newEp.subtitleEn || newEp.subtitleHe },
      description: { he: newEp.descriptionHe, en: newEp.descriptionEn || newEp.descriptionHe },
      publishedAt: new Date().toISOString().split("T")[0],
      durationSec: Number(newEp.durationSec),
      durationFormatted: newEp.durationFormatted,
      audioUrl: newEp.audioUrl,
      coverImage: newEp.coverImage,
      category: { he: newEp.categoryHe, en: newEp.categoryEn },
      tags: ["NEURAVAN", "Podcast", "Israel"],
      featured: newEp.featured,
      chapters: [
        {
          id: "ch-1",
          time: 0,
          timestamp: "00:00",
          title: { he: "מבוא לפרק", en: "Chapter 1: Intro" },
          description: { he: "דברי פתיחה", en: "Opening reflections" },
        },
      ],
      transcript: [
        {
          id: "tr-1",
          time: 0,
          timestamp: "00:00",
          speaker: { he: "מנחה נויראוואן", en: "NEURAVAN Host" },
          text: {
            he: newEp.descriptionHe || "שלום וברוכים הבאים לפרק החדש של נויראוואן.",
            en: newEp.descriptionEn || "Welcome to this new episode of NEURAVAN.",
          },
        },
      ],
      keyTakeaways: {
        he: ["פרק חדש שהופק במערכת נויראוואן."],
        en: ["Newly published episode on NEURAVAN CMS."],
      },
    };

    addEpisode(episode);
    setShowAddEpisodeModal(false);
    showAlert(isHe ? "פרק הפודקאסט פורסם בהצלחה!" : "Podcast episode published successfully!");
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const video: VideoItem = {
      id: `vid-${Date.now()}`,
      slug: `vid-${Date.now()}`,
      title: { he: newVid.titleHe, en: newVid.titleEn || newVid.titleHe },
      description: { he: newVid.descriptionHe, en: newVid.descriptionEn || newVid.descriptionHe },
      youtubeId: "V_B8e8uO_K8",
      embedUrl: newVid.embedUrl,
      duration: newVid.duration,
      publishedAt: new Date().toISOString().split("T")[0],
      category: { he: newVid.categoryHe, en: newVid.categoryEn },
      coverImage: newVid.coverImage,
      featured: newVid.featured,
      tags: ["Video", "NEURAVAN", "Documentary"],
    };

    addVideo(video);
    setShowAddVideoModal(false);
    showAlert(isHe ? "סרטון הווידאו נוסף בהצלחה!" : "Video published successfully!");
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const article: ArticleItem = {
      id: `art-${Date.now()}`,
      slug: `art-${Date.now()}`,
      title: { he: newArt.titleHe, en: newArt.titleEn || newArt.titleHe },
      subtitle: { he: newArt.subtitleHe, en: newArt.subtitleEn || newArt.subtitleHe },
      excerpt: { he: newArt.excerptHe, en: newArt.excerptEn || newArt.excerptHe },
      content: {
        he: [newArt.bodyHe || newArt.excerptHe],
        en: [newArt.bodyEn || newArt.excerptEn || newArt.excerptHe],
      },
      author: {
        name: { he: newArt.authorNameHe, en: newArt.authorNameEn },
        role: { he: newArt.authorRoleHe, en: newArt.authorRoleEn },
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      },
      publishedAt: new Date().toISOString().split("T")[0],
      readingTimeMin: Number(newArt.readingTimeMin),
      category: { he: newArt.categoryHe, en: newArt.categoryEn },
      coverImage: newArt.coverImage,
      tags: ["Philosophy", "NEURAVAN", "Essay"],
      featured: false,
    };

    addArticle(article);
    setShowAddArticleModal(false);
    showAlert(isHe ? "המאמר פורסם בהצלחה באתר!" : "Article published successfully!");
  };

  return (
    <div className="py-10 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Notification Toast */}
        {alertNotice && (
          <div className="p-4 bg-[#10B981] text-white rounded-2xl shadow-xl flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2 text-sm font-bold">
              <CheckIcon className="w-5 h-5" />
              <span>{alertNotice}</span>
            </div>
            <button onClick={() => setAlertNotice(null)} className="p-1">
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E5E0D8] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>NEURAVAN Content Management System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-[#111827]">
              {isHe ? "מרכז הניהול וההוצאה לאור" : "Publishing & Content Management Portal"}
            </h1>
            <p className="text-xs sm:text-sm text-[#4B5563]">
              {isHe
                ? "ניהול מלא של תוכניות פודקאסט, פרקים, סרטי וידאו, מאמרים ואוספים בעברית ובאנגלית"
                : "Comprehensive authoring for podcast episodes, videos, longform articles, and bilingual translations"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddEpisodeModal(true)}
              className="px-4 py-2.5 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>+</span>
              <span>{isHe ? "הוסף פרק פודקאסט" : "New Episode"}</span>
            </button>
            <button
              onClick={() => setShowAddVideoModal(true)}
              className="px-4 py-2.5 rounded-full bg-[#C25E3E] hover:bg-[#D45B38] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>+</span>
              <span>{isHe ? "הוסף וידאו" : "New Video"}</span>
            </button>
            <button
              onClick={() => setShowAddArticleModal(true)}
              className="px-4 py-2.5 rounded-full bg-[#2D5A46] hover:bg-[#1E3F30] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>+</span>
              <span>{isHe ? "פרסם מאמר" : "New Article"}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
              {isHe ? "פרקי פודקאסט" : "Episodes"}
            </span>
            <span className="text-2xl font-black text-[#1D4ED8]">{episodes.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
              {isHe ? "סרטי וידאו" : "Videos"}
            </span>
            <span className="text-2xl font-black text-[#C25E3E]">{videos.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
              {isHe ? "מאמרים" : "Articles"}
            </span>
            <span className="text-2xl font-black text-[#2D5A46]">{articles.length}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] space-y-1">
            <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider block">
              {isHe ? "אוספים בינתחומיים" : "Collections"}
            </span>
            <span className="text-2xl font-black text-[#D97706]">{collections.length}</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-[#E5E0D8] pb-3 overflow-x-auto">
          {[
            { id: "episodes", label: isHe ? "ניהול פודקאסטים" : "Episodes" },
            { id: "videos", label: isHe ? "ניהול וידאו" : "Videos" },
            { id: "articles", label: isHe ? "ניהול מאמרים" : "Articles" },
            {
              id: "database",
              label: isHe ? "מסד נתונים וענן Supabase" : "Supabase Cloud & Database",
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? "bg-[#111827] text-white"
                  : "bg-white border border-[#E5E0D8] text-[#4B5563] hover:bg-[#F2EDE4]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Episodes Management Table */}
        {activeTab === "episodes" && (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs space-y-4 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
              <h3 className="text-lg font-bold font-serif-title text-[#111827]">
                {isHe ? "רשימת פרקי הפודקאסט במערכת" : "Published Podcast Episodes"}
              </h3>
              <button
                onClick={() => setShowAddEpisodeModal(true)}
                className="text-xs font-bold text-[#1D4ED8] hover:underline"
              >
                + {isHe ? "הוסף פרק נוסף" : "Add Another"}
              </button>
            </div>

            <div className="divide-y divide-[#F2EDE4] space-y-2">
              {episodes.map((ep) => (
                <div key={ep.id} className="pt-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={ep.coverImage} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-[#1D4ED8]">
                        {isHe ? `פרק ${ep.episodeNumber}` : `Ep. ${ep.episodeNumber}`} • {ep.category[lang]}
                      </span>
                      <h4 className="text-sm font-bold text-[#111827] truncate">
                        {ep.title[lang]}
                      </h4>
                      <p className="text-xs text-[#6B7280] truncate">{ep.subtitle[lang]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/${lang}/podcasts/${ep.showId}/${ep.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-xs font-bold text-[#111827] hover:bg-[#F2EDE4]"
                    >
                      {isHe ? "צפה" : "View"}
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(isHe ? "למחוק פרק זה?" : "Delete episode?")) {
                          deleteEpisode(ep.id);
                          showAlert(isHe ? "הפרק נמחק." : "Episode deleted.");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#DC2626] hover:bg-[#FEF2F2]"
                    >
                      {isHe ? "מחק" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Videos Management */}
        {activeTab === "videos" && (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs space-y-4 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
              <h3 className="text-lg font-bold font-serif-title text-[#111827]">
                {isHe ? "רשימת סרטוני הווידאו במערכת" : "Published Video Shorts & Documentaries"}
              </h3>
              <button
                onClick={() => setShowAddVideoModal(true)}
                className="text-xs font-bold text-[#C25E3E] hover:underline"
              >
                + {isHe ? "הוסף סרטון" : "Add Video"}
              </button>
            </div>

            <div className="divide-y divide-[#F2EDE4] space-y-2">
              {videos.map((vid) => (
                <div key={vid.id} className="pt-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={vid.coverImage} alt="" className="w-16 h-10 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#111827] truncate">
                        {vid.title[lang]}
                      </h4>
                      <p className="text-xs text-[#6B7280] truncate">{vid.duration} • {vid.category[lang]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/${lang}/videos/${vid.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-xs font-bold text-[#111827] hover:bg-[#F2EDE4]"
                    >
                      {isHe ? "צפה" : "View"}
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(isHe ? "למחוק סרטון זה?" : "Delete video?")) {
                          deleteVideo(vid.id);
                          showAlert(isHe ? "הסרטון נמחק." : "Video deleted.");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#DC2626] hover:bg-[#FEF2F2]"
                    >
                      {isHe ? "מחק" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Articles Management */}
        {activeTab === "articles" && (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xs space-y-4 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
              <h3 className="text-lg font-bold font-serif-title text-[#111827]">
                {isHe ? "רשימת המאמרים והמסות במערכת" : "Published Articles & Essays"}
              </h3>
              <button
                onClick={() => setShowAddArticleModal(true)}
                className="text-xs font-bold text-[#2D5A46] hover:underline"
              >
                + {isHe ? "פרסם מאמר" : "Add Article"}
              </button>
            </div>

            <div className="divide-y divide-[#F2EDE4] space-y-2">
              {articles.map((art) => (
                <div key={art.id} className="pt-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-[#2D5A46]">
                      {art.category[lang]} • {art.readingTimeMin} {isHe ? "דק'" : "min"}
                    </span>
                    <h4 className="text-sm font-bold text-[#111827] truncate">
                      {art.title[lang]}
                    </h4>
                    <p className="text-xs text-[#6B7280]">{art.author.name[lang]}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/${lang}/articles/${art.id}`}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E5E0D8] text-xs font-bold text-[#111827] hover:bg-[#F2EDE4]"
                    >
                      {isHe ? "קרא" : "Read"}
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm(isHe ? "למחוק מאמר זה?" : "Delete article?")) {
                          deleteArticle(art.id);
                          showAlert(isHe ? "המאמר נמחק." : "Article deleted.");
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#DC2626] hover:bg-[#FEF2F2]"
                    >
                      {isHe ? "מחק" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Database, Supabase Cloud & Backup */}
        {activeTab === "database" && (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-bold text-[#1D4ED8] uppercase tracking-wider mb-2">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Supabase PostgreSQL Cloud Integration</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-[#111827]">
                {isHe ? "סנכרון ענן Supabase ומסד נתונים דינמי" : "Supabase Cloud Database & CMS Synchronization"}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
                {isHe
                  ? "חיבור חי בין נויראוואן לשרת Supabase PostgreSQL לעדכון תוכן דינמי, אחסון מנויים ופרקים"
                  : "Live dynamic connection between NEURAVAN and Supabase PostgreSQL for content publishing, real-time sync, and subscriber management."}
              </p>
            </div>

            {/* Supabase Status Dashboard Card */}
            <div className="p-6 rounded-2xl bg-[#0F172A] text-white border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-3.5 h-3.5 rounded-full ${
                      supabaseStatus.isOnline
                        ? "bg-[#10B981] animate-pulse shadow-sm shadow-[#10B981]"
                        : "bg-[#F59E0B]"
                    }`}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {supabaseStatus.isOnline
                        ? isHe
                          ? "חיבור פעיל למסד הנתונים Supabase"
                          : "Connected to Supabase PostgreSQL"
                        : isHe
                          ? "מצב עבודה מקומי (Local Cache Active)"
                          : "Local Fallback Mode Active"}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      https://bpcookraynpvgthodsda.supabase.co
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={isSyncingDb}
                    onClick={async () => {
                      setIsSyncingDb(true);
                      const res = await syncAllToSupabase();
                      setIsSyncingDb(false);
                      showAlert(res.message);
                    }}
                    className="px-4 py-2 rounded-full bg-[#1D4ED8] hover:bg-[#2563EB] disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{isSyncingDb ? "⏳" : "⬆️"}</span>
                    <span>
                      {isSyncingDb
                        ? isHe ? "מסנכרן כעת..." : "Syncing..."
                        : isHe ? "העלה וסנכרן את כל התוכן ל-Supabase" : "Push All to Supabase"}
                    </span>
                  </button>

                  <button
                    disabled={isSyncingDb}
                    onClick={async () => {
                      setIsSyncingDb(true);
                      const res = await pullFromSupabase();
                      setIsSyncingDb(false);
                      showAlert(res.message);
                    }}
                    className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700"
                  >
                    <span>🔄 {isHe ? "משוך מהענן" : "Pull from Cloud"}</span>
                  </button>
                </div>
              </div>

              {/* Status details & metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Project URL</span>
                  <span className="text-slate-200 font-mono text-[11px] truncate block">bpcookraynpvgthodsda</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Auth Key</span>
                  <span className="text-slate-200 font-mono text-[11px] truncate block">sb_publishable_j7gt...</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Synced</span>
                  <span className="text-slate-200 text-[11px] block">
                    {supabaseStatus.lastSyncedAt
                      ? new Date(supabaseStatus.lastSyncedAt).toLocaleTimeString("he-IL")
                      : isHe ? "טרם סונכרן בסשן זה" : "Not synced this session"}
                  </span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">SQL Migration</span>
                  <button
                    onClick={() => setShowSqlModal(true)}
                    className="text-[#60A5FA] hover:underline text-[11px] font-bold block"
                  >
                    {isHe ? "הצג/העתק DDL Schema" : "View SQL Schema"}
                  </button>
                </div>
              </div>

              {supabaseStatus.error && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                  <p className="font-bold mb-1">
                    {isHe ? "הערת חיבור למסד הנתונים:" : "Database notice:"}
                  </p>
                  <p className="font-mono text-[11px]">{supabaseStatus.error}</p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    {isHe
                      ? "האתר ממשיך לפעול במלואו באמצעות זיכרון מקומי (LocalStorage) עד להפעלת טבלאות ה-SQL ב-Supabase."
                      : "The website continues functioning seamlessly using LocalStorage and curated memory until SQL tables are initialized in your Supabase dashboard."}
                  </p>
                </div>
              )}
            </div>

            {/* SQL Migration Modal / Box */}
            {showSqlModal && (
              <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#111827]">
                    {isHe ? "סקריפט יצירת טבלאות עבור Supabase SQL Editor" : "Supabase PostgreSQL Schema (SQL)"}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const sql = `-- Supabase SQL Schema for NEURAVAN
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS shows (id TEXT PRIMARY KEY, slug TEXT NOT NULL, title JSONB NOT NULL, tagline JSONB NOT NULL, description JSONB NOT NULL, host JSONB NOT NULL, cover_image TEXT NOT NULL, seasons JSONB DEFAULT '[]'::jsonb, category JSONB NOT NULL, spotify_url TEXT, apple_url TEXT, youtube_url TEXT, rss_url TEXT, featured BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS episodes (id TEXT PRIMARY KEY, show_id TEXT, episode_number INT NOT NULL, season INT DEFAULT 1, title JSONB NOT NULL, subtitle JSONB NOT NULL, description JSONB NOT NULL, published_at TEXT NOT NULL, duration_sec INT NOT NULL, duration_formatted TEXT NOT NULL, audio_url TEXT NOT NULL, cover_image TEXT NOT NULL, category JSONB NOT NULL, tags JSONB DEFAULT '[]'::jsonb, featured BOOLEAN DEFAULT false, spotify_episode_url TEXT, apple_episode_url TEXT, chapters JSONB DEFAULT '[]'::jsonb, transcript JSONB DEFAULT '[]'::jsonb, key_takeaways JSONB DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS videos (id TEXT PRIMARY KEY, slug TEXT NOT NULL, title JSONB NOT NULL, description JSONB NOT NULL, youtube_id TEXT, embed_url TEXT NOT NULL, duration TEXT NOT NULL, published_at TEXT NOT NULL, category JSONB NOT NULL, cover_image TEXT NOT NULL, featured BOOLEAN DEFAULT false, tags JSONB DEFAULT '[]'::jsonb, instructor JSONB, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS articles (id TEXT PRIMARY KEY, slug TEXT NOT NULL, title JSONB NOT NULL, subtitle JSONB NOT NULL, excerpt JSONB NOT NULL, content JSONB NOT NULL, author JSONB NOT NULL, published_at TEXT NOT NULL, reading_time_min INT NOT NULL, category JSONB NOT NULL, cover_image TEXT NOT NULL, tags JSONB DEFAULT '[]'::jsonb, featured BOOLEAN DEFAULT false, quotes JSONB DEFAULT '[]'::jsonb, related_ids JSONB DEFAULT '[]'::jsonb, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS collections (id TEXT PRIMARY KEY, slug TEXT NOT NULL, title JSONB NOT NULL, subtitle JSONB NOT NULL, description JSONB NOT NULL, cover_image TEXT NOT NULL, category JSONB NOT NULL, episode_ids JSONB DEFAULT '[]'::jsonb, video_ids JSONB DEFAULT '[]'::jsonb, article_ids JSONB DEFAULT '[]'::jsonb, featured BOOLEAN DEFAULT false, color TEXT DEFAULT '#1D4ED8', created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS newsletter_subscribers (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), email TEXT UNIQUE NOT NULL, language TEXT DEFAULT 'en', subscribed_at TIMESTAMPTZ DEFAULT NOW());
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Shows" ON shows FOR SELECT USING (true);
CREATE POLICY "Public Read Episodes" ON episodes FOR SELECT USING (true);
CREATE POLICY "Public Read Videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public Read Articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public Read Collections" ON collections FOR SELECT USING (true);
CREATE POLICY "Anon Full Shows" ON shows FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Episodes" ON episodes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Videos" ON videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Collections" ON collections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Insert Newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Newsletter" ON newsletter_subscribers FOR SELECT USING (true);`;
                        navigator.clipboard.writeText(sql);
                        setCopiedSql(true);
                        setTimeout(() => setCopiedSql(false), 2500);
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#111827] text-white text-xs font-bold"
                    >
                      {copiedSql ? (isHe ? "הועתק בהצלחה!" : "Copied!") : (isHe ? "העתק סקריפט SQL" : "Copy SQL Script")}
                    </button>
                    <button
                      onClick={() => setShowSqlModal(false)}
                      className="px-3 py-1.5 rounded-full bg-[#E5E0D8] text-xs font-bold text-[#111827]"
                    >
                      {isHe ? "סגור" : "Close"}
                    </button>
                  </div>
                </div>
                <p className="text-xs text-[#6B7280]">
                  {isHe
                    ? "הדביקו והריצו סקריפט זה בתוך Supabase Dashboard -> SQL Editor כדי ליצור את כל הטבלאות עם הרשאות RLS מלאות."
                    : "Copy and run this script in your Supabase Dashboard -> SQL Editor to initialize all 6 tables with proper RLS policies."}
                </p>
                <div className="p-3 bg-[#111827] text-gray-300 font-mono text-[11px] rounded-xl max-h-48 overflow-y-auto">
                  <pre>CREATE TABLE shows (...);&#10;CREATE TABLE episodes (...);&#10;CREATE TABLE videos (...);&#10;CREATE TABLE articles (...);&#10;CREATE TABLE collections (...);&#10;CREATE TABLE newsletter_subscribers (...);</pre>
                </div>
              </div>
            )}

            {/* Local JSON Backup & Reset Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#E5E0D8]">
              <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-3">
                <h4 className="text-sm font-bold text-[#111827]">
                  {isHe ? "ייצוא נתוני המערכת (JSON)" : "Export Database JSON"}
                </h4>
                <p className="text-xs text-[#6B7280]">
                  {isHe
                    ? "הורדת קובץ גיבוי מלא המכיל את כל הפודקאסטים, המאמרים והסרטונים."
                    : "Download complete JSON snapshot of all shows, episodes, videos and articles."}
                </p>
                <button
                  onClick={() => {
                    const json = exportDatabaseJson();
                    const blob = new Blob([json], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `neuravan-cms-export-${new Date().toISOString().split("T")[0]}.json`;
                    a.click();
                    showAlert(isHe ? "הקובץ יוצא בהצלחה!" : "Export completed!");
                  }}
                  className="px-4 py-2 rounded-full bg-[#111827] text-white text-xs font-bold hover:bg-black transition-all"
                >
                  {isHe ? "הורד קובץ JSON" : "Download JSON"}
                </button>
              </div>

              <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E5E0D8] space-y-3">
                <h4 className="text-sm font-bold text-[#DC2626]">
                  {isHe ? "איפוס לברירת מחדל" : "Reset to Curated Defaults"}
                </h4>
                <p className="text-xs text-[#6B7280]">
                  {isHe
                    ? "שחזור כל התכנים, הפרקים והסרטונים לגרסת המקור של נויראוואן."
                    : "Restore all episodes, videos, and articles to original curated seed dataset."}
                </p>
                <button
                  onClick={() => {
                    if (confirm(isHe ? "האם לאפס את כל הנתונים לברירת המחדל?" : "Reset all data to defaults?")) {
                      resetToDefaults();
                      showAlert(isHe ? "המערכת אופסה לנתוני ברירת המחדל!" : "System restored to defaults!");
                    }
                  }}
                  className="px-4 py-2 rounded-full bg-[#DC2626] text-white text-xs font-bold hover:bg-[#B91C1C] transition-all"
                >
                  {isHe ? "איפוס נתונים" : "Reset Database"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD EPISODE */}
      {showAddEpisodeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-2xl my-auto space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
              <h3 className="text-xl font-bold font-serif-title text-[#111827]">
                {isHe ? "הוספת פרק פודקאסט חדש" : "Publish New Podcast Episode"}
              </h3>
              <button onClick={() => setShowAddEpisodeModal(false)} className="p-1">
                <CloseIcon className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <form onSubmit={handleCreateEpisode} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#111827] block mb-1">כותרת בעברית *</label>
                  <input
                    type="text"
                    required
                    value={newEp.titleHe}
                    onChange={(e) => setNewEp({ ...newEp, titleHe: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111827] block mb-1">Title in English</label>
                  <input
                    type="text"
                    value={newEp.titleEn}
                    onChange={(e) => setNewEp({ ...newEp, titleEn: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#111827] block mb-1">כותרת משנה בעברית</label>
                  <input
                    type="text"
                    value={newEp.subtitleHe}
                    onChange={(e) => setNewEp({ ...newEp, subtitleHe: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111827] block mb-1">Subtitle in English</label>
                  <input
                    type="text"
                    value={newEp.subtitleEn}
                    onChange={(e) => setNewEp({ ...newEp, subtitleEn: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-[#111827] block mb-1">תוכנית</label>
                  <select
                    value={newEp.showId}
                    onChange={(e) => setNewEp({ ...newEp, showId: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  >
                    {shows.map((s) => (
                      <option key={s.id} value={s.id}>{s.title[lang]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-[#111827] block mb-1">מספר פרק</label>
                  <input
                    type="number"
                    value={newEp.episodeNumber}
                    onChange={(e) => setNewEp({ ...newEp, episodeNumber: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111827] block mb-1">משך זמן (למשל 42:00)</label>
                  <input
                    type="text"
                    value={newEp.durationFormatted}
                    onChange={(e) => setNewEp({ ...newEp, durationFormatted: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#111827] block mb-1">כתובת שמע (MP3 Audio Stream URL) *</label>
                <input
                  type="url"
                  required
                  value={newEp.audioUrl}
                  onChange={(e) => setNewEp({ ...newEp, audioUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>

              <div>
                <label className="font-bold text-[#111827] block mb-1">תמונת עטיפה (Image URL)</label>
                <input
                  type="url"
                  value={newEp.coverImage}
                  onChange={(e) => setNewEp({ ...newEp, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>

              <div>
                <label className="font-bold text-[#111827] block mb-1">תיאור הפרק בעברית</label>
                <textarea
                  rows={3}
                  value={newEp.descriptionHe}
                  onChange={(e) => setNewEp({ ...newEp, descriptionHe: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-xs">
                  <input
                    type="checkbox"
                    checked={newEp.featured}
                    onChange={(e) => setNewEp({ ...newEp, featured: e.target.checked })}
                    className="rounded text-[#1D4ED8]"
                  />
                  <span>סמן כפרק נבחר בעמוד הבית</span>
                </label>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider"
                >
                  פרסם פרק עכשיו
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD VIDEO */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
              <h3 className="text-xl font-bold font-serif-title text-[#111827]">
                {isHe ? "הוספת סרטון וידאו חדש" : "Publish New Video Short"}
              </h3>
              <button onClick={() => setShowAddVideoModal(false)} className="p-1">
                <CloseIcon className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <form onSubmit={handleCreateVideo} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-[#111827] block mb-1">כותרת בעברית *</label>
                <input
                  type="text"
                  required
                  value={newVid.titleHe}
                  onChange={(e) => setNewVid({ ...newVid, titleHe: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>
              <div>
                <label className="font-bold text-[#111827] block mb-1">קישור הטמעה (YouTube Embed URL) *</label>
                <input
                  type="url"
                  required
                  value={newVid.embedUrl}
                  onChange={(e) => setNewVid({ ...newVid, embedUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#111827] block mb-1">משך (למשל 14:20)</label>
                  <input
                    type="text"
                    value={newVid.duration}
                    onChange={(e) => setNewVid({ ...newVid, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#111827] block mb-1">קטגוריה</label>
                  <input
                    type="text"
                    value={newVid.categoryHe}
                    onChange={(e) => setNewVid({ ...newVid, categoryHe: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#C25E3E] text-white text-xs font-bold uppercase tracking-wider"
                >
                  הוסף סרטון
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ARTICLE */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
              <h3 className="text-xl font-bold font-serif-title text-[#111827]">
                {isHe ? "פרסום מאמר עומק חדש" : "Publish New Editorial Essay"}
              </h3>
              <button onClick={() => setShowAddArticleModal(false)} className="p-1">
                <CloseIcon className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="font-bold text-[#111827] block mb-1">כותרת המאמר *</label>
                <input
                  type="text"
                  required
                  value={newArt.titleHe}
                  onChange={(e) => setNewArt({ ...newArt, titleHe: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>
              <div>
                <label className="font-bold text-[#111827] block mb-1">תקציר המאמר *</label>
                <textarea
                  rows={2}
                  required
                  value={newArt.excerptHe}
                  onChange={(e) => setNewArt({ ...newArt, excerptHe: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>
              <div>
                <label className="font-bold text-[#111827] block mb-1">גוף המאמר (תוכן מלא)</label>
                <textarea
                  rows={4}
                  value={newArt.bodyHe}
                  onChange={(e) => setNewArt({ ...newArt, bodyHe: e.target.value })}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-[#E5E0D8]"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#2D5A46] text-white text-xs font-bold uppercase tracking-wider"
                >
                  פרסם מאמר עכשיו
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
