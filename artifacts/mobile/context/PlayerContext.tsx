import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { SONGS, Song } from "@/constants/mockData";

interface PlayerContextType {
  currentSong: Song | null;
  queue: Song[];
  isPlaying: boolean;
  progress: number;
  currentIndex: number;
  isShuffled: boolean;
  repeatMode: "off" | "all" | "one";
  liked: Set<string>;
  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (p: number) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  addToLiked: (id: string) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [queue, setQueue] = useState<Song[]>(SONGS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying && currentSong) {
      timerRef.current = setInterval(() => {
        setProgress(p => {
          const next = p + 1 / (currentSong.duration || 200);
          if (next >= 1) {
            if (repeatMode === "one") return 0;
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, currentSong, repeatMode]);

  const playSong = useCallback((song: Song, q?: Song[]) => {
    const newQ = q ?? SONGS;
    const idx = newQ.findIndex(s => s.id === song.id);
    setQueue(newQ);
    setCurrentSong(song);
    setCurrentIndex(idx >= 0 ? idx : 0);
    setIsPlaying(true);
    setProgress(0);
  }, []);

  const togglePlay = useCallback(() => {
    if (!currentSong && SONGS.length > 0) { playSong(SONGS[0]); return; }
    setIsPlaying(p => !p);
  }, [currentSong, playSong]);

  const next = useCallback(() => {
    if (!queue.length) return;
    const ni = isShuffled
      ? Math.floor(Math.random() * queue.length)
      : (currentIndex + 1) % queue.length;
    setCurrentIndex(ni); setCurrentSong(queue[ni]);
    setProgress(0); setIsPlaying(true);
  }, [queue, currentIndex, isShuffled]);

  const prev = useCallback(() => {
    if (!queue.length) return;
    if (progress > 0.05) { setProgress(0); return; }
    const pi = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentIndex(pi); setCurrentSong(queue[pi]);
    setProgress(0); setIsPlaying(true);
  }, [queue, currentIndex, progress]);

  const seek = useCallback((p: number) => setProgress(Math.min(1, Math.max(0, p))), []);

  const toggleShuffle = useCallback(() => setIsShuffled(s => !s), []);

  const cycleRepeat = useCallback(() =>
    setRepeatMode(m => m === "off" ? "all" : m === "all" ? "one" : "off"), []);

  const addToLiked = useCallback((id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  return (
    <PlayerContext.Provider value={{
      currentSong, queue, isPlaying, progress, currentIndex,
      isShuffled, repeatMode, liked,
      playSong, togglePlay, next, prev, seek,
      toggleShuffle, cycleRepeat, addToLiked,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
