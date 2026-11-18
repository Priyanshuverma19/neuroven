-- ====================================================================
-- NEURAVAN - Supabase PostgreSQL Database Schema & Initial Seed
-- Premium Digital Media, Storytelling, Education & Podcast Platform for Israel
-- ====================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ---------------------------------------------------------------------
-- 1. SHOWS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS shows (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  title JSONB NOT NULL,
  tagline JSONB NOT NULL,
  description JSONB NOT NULL,
  host JSONB NOT NULL,
  cover_image TEXT NOT NULL,
  seasons JSONB NOT NULL DEFAULT '[]'::jsonb,
  category JSONB NOT NULL,
  spotify_url TEXT,
  apple_url TEXT,
  youtube_url TEXT,
  rss_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 2. EPISODES TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS episodes (
  id TEXT PRIMARY KEY,
  show_id TEXT REFERENCES shows(id) ON DELETE CASCADE,
  episode_number INT NOT NULL,
  season INT NOT NULL DEFAULT 1,
  title JSONB NOT NULL,
  subtitle JSONB NOT NULL,
  description JSONB NOT NULL,
  published_at TEXT NOT NULL,
  duration_sec INT NOT NULL,
  duration_formatted TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  category JSONB NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  spotify_episode_url TEXT,
  apple_episode_url TEXT,
  chapters JSONB NOT NULL DEFAULT '[]'::jsonb,
  transcript JSONB NOT NULL DEFAULT '[]'::jsonb,
  key_takeaways JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 3. VIDEOS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  youtube_id TEXT,
  embed_url TEXT NOT NULL,
  duration TEXT NOT NULL,
  published_at TEXT NOT NULL,
  category JSONB NOT NULL,
  cover_image TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  instructor JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 4. ARTICLES TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  title JSONB NOT NULL,
  subtitle JSONB NOT NULL,
  excerpt JSONB NOT NULL,
  content JSONB NOT NULL,
  author JSONB NOT NULL,
  published_at TEXT NOT NULL,
  reading_time_min INT NOT NULL,
  category JSONB NOT NULL,
  cover_image TEXT NOT NULL,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  quotes JSONB DEFAULT '[]'::jsonb,
  related_ids JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 5. COLLECTIONS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL,
  title JSONB NOT NULL,
  subtitle JSONB NOT NULL,
  description JSONB NOT NULL,
  cover_image TEXT NOT NULL,
  category JSONB NOT NULL,
  episode_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  video_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  article_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN DEFAULT false,
  color TEXT NOT NULL DEFAULT '#1D4ED8',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 6. NEWSLETTER SUBSCRIBERS TABLE
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  language TEXT DEFAULT 'en',
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ---------------------------------------------------------------------
-- Enable RLS
ALTER TABLE shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all content
CREATE POLICY "Public Read Shows" ON shows FOR SELECT USING (true);
CREATE POLICY "Public Read Episodes" ON episodes FOR SELECT USING (true);
CREATE POLICY "Public Read Videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public Read Articles" ON articles FOR SELECT USING (true);
CREATE POLICY "Public Read Collections" ON collections FOR SELECT USING (true);

-- Allow public read & insert for anon key on content (for CMS admin)
CREATE POLICY "Anon Full Access Shows" ON shows FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Episodes" ON episodes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Videos" ON videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anon Full Access Collections" ON collections FOR ALL USING (true) WITH CHECK (true);

-- Allow public insert on newsletter
CREATE POLICY "Public Insert Newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Newsletter" ON newsletter_subscribers FOR SELECT USING (true);
