"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { PodcastEpisode, Chapter, TranscriptLine, INITIAL_EPISODES } from "../data/neuravanContent";
import { audioEngine } from "../utils/audioEngine";

interface AudioContextType {
  currentEpisode: PodcastEpisode;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  isPlayerModalOpen: boolean;
  activeChapter?: Chapter;
  activeTranscriptLine?: TranscriptLine;
  playEpisode: (episode: PodcastEpisode, startTime?: number) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  skipSeconds: (delta: number) => void;
  setSpeed: (speed: number) => void;
  setVol: (volume: number) => void;
  toggleMute: () => void;
  setIsPlayerModalOpen: (open: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(INITIAL_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(INITIAL_EPISODES[0].durationSec || 420);
  const [playbackSpeed, setPlaybackSpeedState] = useState<number>(1);
  const [volume, setVolumeState] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState<boolean>(false);
  const [useSynthesisFallback, setUseSynthesisFallback] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  // Initialize HTML5 Audio object once in browser
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (!useSynthesisFallback && audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setIsLoading(false);
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      // Gracefully switch to synthesized ambient soundbed fallback
      setUseSynthesisFallback(true);
      setIsLoading(false);
      if (isPlaying) {
        audioEngine.startPodcastSoundbed(volume);
      }
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);

    // Initial source setup
    audio.src = INITIAL_EPISODES[0].audioUrl;
    audio.volume = 0.85;

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audioEngine.stopPodcastSoundbed();
    };
  }, []);

  // Update audio source when episode changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(currentEpisode.durationSec || 420);

    // Only set src if it changed
    const targetSrc = currentEpisode.audioUrl;
    const currentSrc = audio.getAttribute("src");
    if (currentSrc !== targetSrc) {
      audio.src = targetSrc;
      audio.load();
    }

    audio.playbackRate = playbackSpeed;
    audio.volume = isMuted ? 0 : volume;

    if (isPlaying && !useSynthesisFallback) {
      playPromiseRef.current = audio.play();
      if (playPromiseRef.current !== undefined) {
        playPromiseRef.current.catch(() => {
          // Autoplay policy or interrupt: switch cleanly to synthesized audio
          setUseSynthesisFallback(true);
          audioEngine.startPodcastSoundbed(volume);
        });
      }
    }
  }, [currentEpisode]);

  // Synthesis fallback timer when active
  useEffect(() => {
    if (useSynthesisFallback) {
      if (isPlaying) {
        audioEngine.startPodcastSoundbed(isMuted ? 0 : volume);
        synthTimerRef.current = setInterval(() => {
          setCurrentTime((prev) => {
            if (prev >= duration) {
              setIsPlaying(false);
              audioEngine.stopPodcastSoundbed();
              return 0;
            }
            return prev + playbackSpeed;
          });
        }, 1000);
      } else {
        audioEngine.stopPodcastSoundbed();
        if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      }
    } else {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    }

    return () => {
      if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    };
  }, [isPlaying, useSynthesisFallback, playbackSpeed, duration, volume, isMuted]);

  // Play a specific episode
  const playEpisode = (episode: PodcastEpisode, startTime: number = 0) => {
    audioEngine.playChime(587.33);
    const audio = audioRef.current;

    if (currentEpisode.id !== episode.id) {
      setCurrentEpisode(episode);
      setCurrentTime(startTime);
      setIsPlaying(true);
      if (audio) {
        audio.src = episode.audioUrl;
        audio.currentTime = startTime;
        audio.playbackRate = playbackSpeed;
        audio.volume = isMuted ? 0 : volume;
        playPromiseRef.current = audio.play();
        if (playPromiseRef.current !== undefined) {
          playPromiseRef.current.catch(() => {
            setUseSynthesisFallback(true);
            audioEngine.startPodcastSoundbed(volume);
          });
        }
      }
    } else {
      // Same episode, just seek and play
      if (startTime > 0) seek(startTime);
      if (!isPlaying) {
        setIsPlaying(true);
        if (audio && !useSynthesisFallback) {
          playPromiseRef.current = audio.play();
          if (playPromiseRef.current !== undefined) {
            playPromiseRef.current.catch(() => {
              setUseSynthesisFallback(true);
              audioEngine.startPodcastSoundbed(volume);
            });
          }
        } else {
          audioEngine.startPodcastSoundbed(volume);
        }
      }
    }
  };

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    const audio = audioRef.current;

    if (nextState) {
      audioEngine.playChime(523.25); // C5 harmonic chime
      if (audio && !useSynthesisFallback) {
        playPromiseRef.current = audio.play();
        if (playPromiseRef.current !== undefined) {
          playPromiseRef.current.catch(() => {
            setUseSynthesisFallback(true);
            audioEngine.startPodcastSoundbed(volume);
          });
        }
      } else {
        audioEngine.startPodcastSoundbed(volume);
      }
    } else {
      if (audio) {
        if (playPromiseRef.current) {
          playPromiseRef.current.then(() => audio.pause()).catch(() => {});
        } else {
          audio.pause();
        }
      }
      audioEngine.stopPodcastSoundbed();
    }
  };

  const seek = (newSecs: number) => {
    const clamped = Math.max(0, Math.min(newSecs, duration));
    setCurrentTime(clamped);
    if (audioRef.current && !useSynthesisFallback) {
      audioRef.current.currentTime = clamped;
    }
    audioEngine.playChime(440);
  };

  const skipSeconds = (delta: number) => {
    seek(currentTime + delta);
  };

  const setSpeed = (spd: number) => {
    setPlaybackSpeedState(spd);
    if (audioRef.current) {
      audioRef.current.playbackRate = spd;
    }
  };

  const setVol = (vol: number) => {
    setVolumeState(vol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    audioEngine.setVolume(vol);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    audioEngine.setVolume(nextMuted ? 0 : volume);
  };

  // Find active chapter based on currentTime
  const activeChapter = currentEpisode.chapters
    ? [...currentEpisode.chapters].reverse().find((ch) => currentTime >= ch.time) ||
      currentEpisode.chapters[0]
    : undefined;

  // Find active transcript line based on currentTime
  const activeTranscriptLine = currentEpisode.transcript
    ? [...currentEpisode.transcript].reverse().find((line) => currentTime >= line.time) ||
      currentEpisode.transcript[0]
    : undefined;

  return (
    <AudioContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        currentTime,
        duration,
        playbackSpeed,
        volume,
        isMuted,
        isLoading,
        isPlayerModalOpen,
        activeChapter,
        activeTranscriptLine,
        playEpisode,
        togglePlay,
        seek,
        skipSeconds,
        setSpeed,
        setVol,
        toggleMute,
        setIsPlayerModalOpen,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
