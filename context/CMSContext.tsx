"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  PodcastShow,
  PodcastEpisode,
  VideoItem,
  ArticleItem,
  CollectionItem,
  LearningResource,
  INITIAL_SHOWS,
  INITIAL_EPISODES,
  INITIAL_VIDEOS,
  INITIAL_ARTICLES,
  INITIAL_COLLECTIONS,
  INITIAL_RESOURCES,
} from "../data/neuravanContent";
import { supabase, checkSupabaseHealth, SUPABASE_URL } from "../utils/supabase";

export interface SupabaseSyncStatus {
  isConfigured: boolean;
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  error: string | null;
}

interface CMSContextType {
  shows: PodcastShow[];
  episodes: PodcastEpisode[];
  videos: VideoItem[];
  articles: ArticleItem[];
  collections: CollectionItem[];
  resources: LearningResource[];
  supabaseStatus: SupabaseSyncStatus;
  addEpisode: (episode: PodcastEpisode) => Promise<void>;
  updateEpisode: (episode: PodcastEpisode) => Promise<void>;
  deleteEpisode: (id: string) => Promise<void>;
  addShow: (show: PodcastShow) => Promise<void>;
  updateShow: (show: PodcastShow) => Promise<void>;
  addVideo: (video: VideoItem) => Promise<void>;
  updateVideo: (video: VideoItem) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  addArticle: (article: ArticleItem) => Promise<void>;
  updateArticle: (article: ArticleItem) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  addCollection: (col: CollectionItem) => Promise<void>;
  updateCollection: (col: CollectionItem) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  resetToDefaults: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (json: string) => boolean;
  syncAllToSupabase: () => Promise<{ success: boolean; message: string; counts?: Record<string, number> }>;
  pullFromSupabase: () => Promise<{ success: boolean; message: string }>;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY = "neuravan_cms_state_v1";

// -------------------------------------------------------------
// POSTGREST SCHEMA MAPPERS (Database Snake_case <-> App CamelCase)
// -------------------------------------------------------------
function toDbShow(s: PodcastShow) {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    host: s.host,
    cover_image: s.coverImage,
    seasons: s.seasons,
    category: s.category,
    spotify_url: s.spotifyUrl,
    apple_url: s.appleUrl,
    youtube_url: s.youtubeUrl,
    rss_url: s.rssUrl,
    featured: s.featured ?? false,
    updated_at: new Date().toISOString(),
  };
}

function fromDbShow(row: any): PodcastShow {
  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title,
    tagline: row.tagline || { he: "", en: "" },
    description: row.description,
    host: row.host,
    coverImage: row.cover_image || row.coverImage,
    seasons: row.seasons || [1],
    category: row.category,
    spotifyUrl: row.spotify_url || row.spotifyUrl || "",
    appleUrl: row.apple_url || row.appleUrl || "",
    youtubeUrl: row.youtube_url || row.youtubeUrl || "",
    rssUrl: row.rss_url || row.rssUrl || "",
    featured: row.featured,
  };
}

function toDbEpisode(e: PodcastEpisode) {
  return {
    id: e.id,
    show_id: e.showId,
    episode_number: e.episodeNumber,
    season: e.season,
    title: e.title,
    subtitle: e.subtitle,
    description: e.description,
    published_at: e.publishedAt,
    duration_sec: e.durationSec,
    duration_formatted: e.durationFormatted,
    audio_url: e.audioUrl,
    cover_image: e.coverImage,
    category: e.category,
    tags: e.tags,
    featured: e.featured ?? false,
    spotify_episode_url: e.spotifyEpisodeUrl || null,
    apple_episode_url: e.appleEpisodeUrl || null,
    chapters: e.chapters || [],
    transcript: e.transcript || [],
    key_takeaways: e.keyTakeaways || { he: [], en: [] },
    updated_at: new Date().toISOString(),
  };
}

function fromDbEpisode(row: any): PodcastEpisode {
  return {
    id: row.id,
    showId: row.show_id || row.showId,
    episodeNumber: row.episode_number ?? row.episodeNumber ?? 1,
    season: row.season || 1,
    title: row.title,
    subtitle: row.subtitle || { he: "", en: "" },
    description: row.description,
    publishedAt: row.published_at || row.publishedAt,
    durationSec: row.duration_sec ?? row.durationSec ?? 0,
    durationFormatted: row.duration_formatted || row.durationFormatted || "0:00",
    audioUrl: row.audio_url || row.audioUrl,
    coverImage: row.cover_image || row.coverImage,
    category: row.category,
    tags: row.tags || [],
    featured: row.featured,
    spotifyEpisodeUrl: row.spotify_episode_url || row.spotifyEpisodeUrl,
    appleEpisodeUrl: row.apple_episode_url || row.appleEpisodeUrl,
    chapters: row.chapters || [],
    transcript: row.transcript || [],
    keyTakeaways: row.key_takeaways || row.keyTakeaways || { he: [], en: [] },
  };
}

function toDbVideo(v: VideoItem) {
  return {
    id: v.id,
    slug: v.slug,
    title: v.title,
    description: v.description,
    youtube_id: v.youtubeId,
    embed_url: v.embedUrl,
    duration: v.duration,
    published_at: v.publishedAt,
    category: v.category,
    cover_image: v.coverImage,
    featured: v.featured ?? false,
    tags: v.tags,
    instructor: v.instructor,
    updated_at: new Date().toISOString(),
  };
}

function fromDbVideo(row: any): VideoItem {
  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title,
    description: row.description,
    youtubeId: row.youtube_id || row.youtubeId || "",
    embedUrl: row.embed_url || row.embedUrl,
    duration: row.duration,
    publishedAt: row.published_at || row.publishedAt,
    category: row.category,
    coverImage: row.cover_image || row.coverImage,
    featured: row.featured,
    tags: row.tags || [],
    instructor: row.instructor,
  };
}

function toDbArticle(a: ArticleItem) {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    subtitle: a.subtitle,
    excerpt: a.excerpt,
    content: a.content,
    author: a.author,
    published_at: a.publishedAt,
    reading_time_min: a.readingTimeMin,
    category: a.category,
    cover_image: a.coverImage,
    tags: a.tags,
    featured: a.featured ?? false,
    quotes: a.quotes || [],
    related_ids: a.relatedIds || [],
    updated_at: new Date().toISOString(),
  };
}

function fromDbArticle(row: any): ArticleItem {
  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    publishedAt: row.published_at || row.publishedAt,
    readingTimeMin: row.reading_time_min ?? row.readingTimeMin ?? 5,
    category: row.category,
    coverImage: row.cover_image || row.coverImage,
    tags: row.tags || [],
    featured: row.featured,
    quotes: row.quotes || [],
    relatedIds: row.related_ids || row.relatedIds || [],
  };
}

function toDbCollection(c: CollectionItem) {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    subtitle: c.subtitle,
    description: c.description,
    cover_image: c.coverImage,
    category: c.category,
    episode_ids: c.episodeIds,
    video_ids: c.videoIds,
    article_ids: c.articleIds,
    featured: c.featured ?? false,
    color: c.color,
    updated_at: new Date().toISOString(),
  };
}

function fromDbCollection(row: any): CollectionItem {
  return {
    id: row.id,
    slug: row.slug || row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    coverImage: row.cover_image || row.coverImage,
    category: row.category,
    episodeIds: row.episode_ids || row.episodeIds || [],
    videoIds: row.video_ids || row.videoIds || [],
    articleIds: row.article_ids || row.articleIds || [],
    featured: row.featured,
    color: row.color || "#1D4ED8",
  };
}

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [shows, setShows] = useState<PodcastShow[]>(INITIAL_SHOWS);
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(INITIAL_EPISODES);
  const [videos, setVideos] = useState<VideoItem[]>(INITIAL_VIDEOS);
  const [articles, setArticles] = useState<ArticleItem[]>(INITIAL_ARTICLES);
  const [collections, setCollections] = useState<CollectionItem[]>(INITIAL_COLLECTIONS);
  const [resources, setResources] = useState<LearningResource[]>(INITIAL_RESOURCES);

  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseSyncStatus>({
    isConfigured: Boolean(SUPABASE_URL),
    isOnline: false,
    isSyncing: false,
    lastSyncedAt: null,
    error: null,
  });

  // Save state to LocalStorage
  const saveToLocalStorage = useCallback(
    (
      nextShows = shows,
      nextEpisodes = episodes,
      nextVideos = videos,
      nextArticles = articles,
      nextCollections = collections,
      nextResources = resources
    ) => {
      if (typeof window === "undefined") return;
      try {
        const payload = {
          shows: nextShows,
          episodes: nextEpisodes,
          videos: nextVideos,
          articles: nextArticles,
          collections: nextCollections,
          resources: nextResources,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn("[NEURAVAN CMS] Failed to persist state to LocalStorage:", e);
      }
    },
    [shows, episodes, videos, articles, collections, resources]
  );

  // Pull dynamic content from Supabase
  const pullFromSupabase = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    setSupabaseStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      // Parallel requests for all content collections
      const [showRes, epRes, vidRes, artRes, colRes] = await Promise.all([
        supabase.from("shows").select("*").order("created_at", { ascending: true }),
        supabase.from("episodes").select("*").order("episode_number", { ascending: false }),
        supabase.from("videos").select("*").order("created_at", { ascending: false }),
        supabase.from("articles").select("*").order("created_at", { ascending: false }),
        supabase.from("collections").select("*").order("created_at", { ascending: true }),
      ]);

      let loadedCount = 0;

      if (showRes.data && Array.isArray(showRes.data) && showRes.data.length > 0) {
        const parsedShows = showRes.data.map(fromDbShow);
        setShows(parsedShows);
        loadedCount += parsedShows.length;
      }

      if (epRes.data && Array.isArray(epRes.data) && epRes.data.length > 0) {
        const parsedEpisodes = epRes.data.map(fromDbEpisode);
        setEpisodes(parsedEpisodes);
        loadedCount += parsedEpisodes.length;
      }

      if (vidRes.data && Array.isArray(vidRes.data) && vidRes.data.length > 0) {
        const parsedVideos = vidRes.data.map(fromDbVideo);
        setVideos(parsedVideos);
        loadedCount += parsedVideos.length;
      }

      if (artRes.data && Array.isArray(artRes.data) && artRes.data.length > 0) {
        const parsedArticles = artRes.data.map(fromDbArticle);
        setArticles(parsedArticles);
        loadedCount += parsedArticles.length;
      }

      if (colRes.data && Array.isArray(colRes.data) && colRes.data.length > 0) {
        const parsedCols = colRes.data.map(fromDbCollection);
        setCollections(parsedCols);
        loadedCount += parsedCols.length;
      }

      const isLive = loadedCount > 0;
      setSupabaseStatus({
        isConfigured: true,
        isOnline: true,
        isSyncing: false,
        lastSyncedAt: new Date().toISOString(),
        error: null,
      });

      return {
        success: true,
        message: isLive
          ? `Successfully loaded ${loadedCount} dynamic items from Supabase cloud database.`
          : "Connected to Supabase. Tables are ready for initial content synchronization.",
      };
    } catch (err: any) {
      const errMsg = err?.message || "Failed to fetch from Supabase";
      console.warn("[NEURAVAN CMS] Supabase pull notice:", errMsg);
      setSupabaseStatus((prev) => ({
        ...prev,
        isOnline: false,
        isSyncing: false,
        error: errMsg,
      }));
      return { success: false, message: errMsg };
    }
  }, []);

  // Sync entire local dataset to Supabase
  const syncAllToSupabase = useCallback(async () => {
    setSupabaseStatus((prev) => ({ ...prev, isSyncing: true, error: null }));

    try {
      const dbShows = shows.map(toDbShow);
      const dbEpisodes = episodes.map(toDbEpisode);
      const dbVideos = videos.map(toDbVideo);
      const dbArticles = articles.map(toDbArticle);
      const dbCollections = collections.map(toDbCollection);

      // Perform upserts in sequence or parallel
      const [resShows, resEps, resVids, resArts, resCols] = await Promise.all([
        supabase.from("shows").upsert(dbShows),
        supabase.from("episodes").upsert(dbEpisodes),
        supabase.from("videos").upsert(dbVideos),
        supabase.from("articles").upsert(dbArticles),
        supabase.from("collections").upsert(dbCollections),
      ]);

      const errors = [
        resShows.error ? `Shows: ${resShows.error.message}` : null,
        resEps.error ? `Episodes: ${resEps.error.message}` : null,
        resVids.error ? `Videos: ${resVids.error.message}` : null,
        resArts.error ? `Articles: ${resArts.error.message}` : null,
        resCols.error ? `Collections: ${resCols.error.message}` : null,
      ].filter(Boolean);

      if (errors.length > 0) {
        const errMessage = errors.join("; ");
        setSupabaseStatus((prev) => ({
          ...prev,
          isSyncing: false,
          error: errMessage,
        }));
        return {
          success: false,
          message: `Some tables could not be synced. Ensure tables are created via SQL editor: ${errMessage}`,
        };
      }

      setSupabaseStatus({
        isConfigured: true,
        isOnline: true,
        isSyncing: false,
        lastSyncedAt: new Date().toISOString(),
        error: null,
      });

      return {
        success: true,
        message: "All content collections successfully synchronized to Supabase PostgreSQL database!",
        counts: {
          shows: shows.length,
          episodes: episodes.length,
          videos: videos.length,
          articles: articles.length,
          collections: collections.length,
        },
      };
    } catch (err: any) {
      const msg = err?.message || "Sync failed";
      setSupabaseStatus((prev) => ({
        ...prev,
        isSyncing: false,
        error: msg,
      }));
      return { success: false, message: msg };
    }
  }, [shows, episodes, videos, articles, collections]);

  // Initial mount: load local storage first, then test Supabase and pull if available
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Read LocalStorage for instant render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.shows?.length) setShows(parsed.shows);
        if (parsed.episodes?.length) setEpisodes(parsed.episodes);
        if (parsed.videos?.length) setVideos(parsed.videos);
        if (parsed.articles?.length) setArticles(parsed.articles);
        if (parsed.collections?.length) setCollections(parsed.collections);
        if (parsed.resources?.length) setResources(parsed.resources);
      }
    } catch (e) {
      console.warn("[NEURAVAN CMS] LocalStorage parse notice:", e);
    }

    // 2. Health check and dynamic pull from Supabase
    checkSupabaseHealth().then((health) => {
      setSupabaseStatus((prev) => ({
        ...prev,
        isOnline: health.ok,
        error: health.ok ? null : health.message,
      }));
      if (health.ok) {
        pullFromSupabase();
      }
    });
  }, [pullFromSupabase]);

  // CRUD handlers with optimistic state update + LocalStorage + Supabase background sync
  const addEpisode = async (ep: PodcastEpisode) => {
    const next = [ep, ...episodes];
    setEpisodes(next);
    saveToLocalStorage(shows, next, videos, articles, collections, resources);
    try {
      await supabase.from("episodes").insert(toDbEpisode(ep));
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase episode background insert notice:", e);
    }
  };

  const updateEpisode = async (ep: PodcastEpisode) => {
    const next = episodes.map((e) => (e.id === ep.id ? ep : e));
    setEpisodes(next);
    saveToLocalStorage(shows, next, videos, articles, collections, resources);
    try {
      await supabase.from("episodes").update(toDbEpisode(ep)).eq("id", ep.id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase episode background update notice:", e);
    }
  };

  const deleteEpisode = async (id: string) => {
    const next = episodes.filter((e) => e.id !== id);
    setEpisodes(next);
    saveToLocalStorage(shows, next, videos, articles, collections, resources);
    try {
      await supabase.from("episodes").delete().eq("id", id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase episode background delete notice:", e);
    }
  };

  const addShow = async (show: PodcastShow) => {
    const next = [show, ...shows];
    setShows(next);
    saveToLocalStorage(next, episodes, videos, articles, collections, resources);
    try {
      await supabase.from("shows").insert(toDbShow(show));
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase show background insert notice:", e);
    }
  };

  const updateShow = async (show: PodcastShow) => {
    const next = shows.map((s) => (s.id === show.id ? show : s));
    setShows(next);
    saveToLocalStorage(next, episodes, videos, articles, collections, resources);
    try {
      await supabase.from("shows").update(toDbShow(show)).eq("id", show.id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase show background update notice:", e);
    }
  };

  const addVideo = async (vid: VideoItem) => {
    const next = [vid, ...videos];
    setVideos(next);
    saveToLocalStorage(shows, episodes, next, articles, collections, resources);
    try {
      await supabase.from("videos").insert(toDbVideo(vid));
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase video background insert notice:", e);
    }
  };

  const updateVideo = async (vid: VideoItem) => {
    const next = videos.map((v) => (v.id === vid.id ? vid : v));
    setVideos(next);
    saveToLocalStorage(shows, episodes, next, articles, collections, resources);
    try {
      await supabase.from("videos").update(toDbVideo(vid)).eq("id", vid.id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase video background update notice:", e);
    }
  };

  const deleteVideo = async (id: string) => {
    const next = videos.filter((v) => v.id !== id);
    setVideos(next);
    saveToLocalStorage(shows, episodes, next, articles, collections, resources);
    try {
      await supabase.from("videos").delete().eq("id", id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase video background delete notice:", e);
    }
  };

  const addArticle = async (art: ArticleItem) => {
    const next = [art, ...articles];
    setArticles(next);
    saveToLocalStorage(shows, episodes, videos, next, collections, resources);
    try {
      await supabase.from("articles").insert(toDbArticle(art));
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase article background insert notice:", e);
    }
  };

  const updateArticle = async (art: ArticleItem) => {
    const next = articles.map((a) => (a.id === art.id ? art : a));
    setArticles(next);
    saveToLocalStorage(shows, episodes, videos, next, collections, resources);
    try {
      await supabase.from("articles").update(toDbArticle(art)).eq("id", art.id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase article background update notice:", e);
    }
  };

  const deleteArticle = async (id: string) => {
    const next = articles.filter((a) => a.id !== id);
    setArticles(next);
    saveToLocalStorage(shows, episodes, videos, next, collections, resources);
    try {
      await supabase.from("articles").delete().eq("id", id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase article background delete notice:", e);
    }
  };

  const addCollection = async (col: CollectionItem) => {
    const next = [col, ...collections];
    setCollections(next);
    saveToLocalStorage(shows, episodes, videos, articles, next, resources);
    try {
      await supabase.from("collections").insert(toDbCollection(col));
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase collection background insert notice:", e);
    }
  };

  const updateCollection = async (col: CollectionItem) => {
    const next = collections.map((c) => (c.id === col.id ? col : c));
    setCollections(next);
    saveToLocalStorage(shows, episodes, videos, articles, next, resources);
    try {
      await supabase.from("collections").update(toDbCollection(col)).eq("id", col.id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase collection background update notice:", e);
    }
  };

  const deleteCollection = async (id: string) => {
    const next = collections.filter((c) => c.id !== id);
    setCollections(next);
    saveToLocalStorage(shows, episodes, videos, articles, next, resources);
    try {
      await supabase.from("collections").delete().eq("id", id);
    } catch (e) {
      console.warn("[NEURAVAN CMS] Supabase collection background delete notice:", e);
    }
  };

  const resetToDefaults = () => {
    setShows(INITIAL_SHOWS);
    setEpisodes(INITIAL_EPISODES);
    setVideos(INITIAL_VIDEOS);
    setArticles(INITIAL_ARTICLES);
    setCollections(INITIAL_COLLECTIONS);
    setResources(INITIAL_RESOURCES);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportDatabaseJson = () => {
    return JSON.stringify(
      {
        shows,
        episodes,
        videos,
        articles,
        collections,
        resources,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importDatabaseJson = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.shows) setShows(data.shows);
      if (data.episodes) setEpisodes(data.episodes);
      if (data.videos) setVideos(data.videos);
      if (data.articles) setArticles(data.articles);
      if (data.collections) setCollections(data.collections);
      if (data.resources) setResources(data.resources);
      saveToLocalStorage(
        data.shows || shows,
        data.episodes || episodes,
        data.videos || videos,
        data.articles || articles,
        data.collections || collections,
        data.resources || resources
      );
      return true;
    } catch {
      return false;
    }
  };

  return (
    <CMSContext.Provider
      value={{
        shows,
        episodes,
        videos,
        articles,
        collections,
        resources,
        supabaseStatus,
        addEpisode,
        updateEpisode,
        deleteEpisode,
        addShow,
        updateShow,
        addVideo,
        updateVideo,
        deleteVideo,
        addArticle,
        updateArticle,
        deleteArticle,
        addCollection,
        updateCollection,
        deleteCollection,
        resetToDefaults,
        exportDatabaseJson,
        importDatabaseJson,
        syncAllToSupabase,
        pullFromSupabase,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
