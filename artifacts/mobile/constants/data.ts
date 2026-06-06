export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year: number;
  songCount: number;
}

export interface Artist {
  id: string;
  name: string;
  artwork: string;
  followers: string;
  genre: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  artwork: string;
  songCount: number;
}

export interface GlobalSong {
  id: string;
  title: string;
  artist: string;
  country: string;
  artwork: string;
  x: number;
  y: number;
  color: string;
}

const p = (n: number, w = 300) => `https://picsum.photos/seed/${n}/${w}/${w}`;

export const SONGS: Song[] = [
  { id: "s1",  title: "Blinding Lights",   artist: "The Weeknd",    album: "After Hours",       duration: 200, artwork: p(101) },
  { id: "s2",  title: "Less Than Zero",    artist: "The Weeknd",    album: "Dawn FM",           duration: 131, artwork: p(102) },
  { id: "s3",  title: "Was Ich Liebe",     artist: "Rammstein",     album: "Rammstein",         duration: 260, artwork: p(103) },
  { id: "s4",  title: "Save Your Tears",   artist: "The Weeknd",    album: "After Hours",       duration: 197, artwork: p(104) },
  { id: "s5",  title: "Hornay",            artist: "AY YOLA",       album: "Vol.2",             duration: 192, artwork: p(105) },
  { id: "s6",  title: "meant to be",       artist: "bbnoS",         album: "Bag or Die",        duration: 166, artwork: p(106) },
  { id: "s7",  title: "Go Ghost",          artist: "Jackson Wang",  album: "MAGIC MAN",         duration: 184, artwork: p(107) },
  { id: "s8",  title: "Levitating",        artist: "Dua Lipa",      album: "Future Nostalgia",  duration: 203, artwork: p(108) },
  { id: "s9",  title: "MONTERO",           artist: "Lil Nas X",     album: "MONTERO",           duration: 137, artwork: p(109) },
  { id: "s10", title: "Peaches",           artist: "Justin Bieber", album: "Justice",           duration: 198, artwork: p(110) },
  { id: "s11", title: "Stay",              artist: "The Kid LAROI", album: "Stay",              duration: 141, artwork: p(111) },
  { id: "s12", title: "Bad Habits",        artist: "Ed Sheeran",    album: "=",                 duration: 231, artwork: p(112) },
  { id: "s13", title: "360",               artist: "Charli xcx",    album: "BRAT",              duration: 151, artwork: p(113) },
  { id: "s14", title: "Happier Than Ever", artist: "Billie Eilish", album: "Happier Than Ever", duration: 295, artwork: p(114) },
  { id: "s15", title: "Industry Baby",     artist: "Lil Nas X",     album: "MONTERO",           duration: 212, artwork: p(115) },
];

export const ALBUMS: Album[] = [
  { id: "a1",  title: "After Hours",       artist: "The Weeknd",    artwork: p(201), year: 2020, songCount: 14 },
  { id: "a2",  title: "BRAT",              artist: "Charli xcx",    artwork: p(202), year: 2024, songCount: 15 },
  { id: "a3",  title: "Future Nostalgia",  artist: "Dua Lipa",      artwork: p(203), year: 2020, songCount: 11 },
  { id: "a4",  title: "MONTERO",           artist: "Lil Nas X",     artwork: p(204), year: 2021, songCount: 15 },
  { id: "a5",  title: "Dawn FM",           artist: "The Weeknd",    artwork: p(205), year: 2022, songCount: 16 },
  { id: "a6",  title: "Justice",           artist: "Justin Bieber", artwork: p(206), year: 2021, songCount: 16 },
  { id: "a7",  title: "=",                 artist: "Ed Sheeran",    artwork: p(207), year: 2021, songCount: 14 },
  { id: "a8",  title: "Rammstein",         artist: "Rammstein",     artwork: p(208), year: 2019, songCount: 11 },
  { id: "a9",  title: "MAGIC MAN",         artist: "Jackson Wang",  artwork: p(209), year: 2022, songCount: 12 },
  { id: "a10", title: "Happier Than Ever", artist: "Billie Eilish", artwork: p(210), year: 2021, songCount: 16 },
];

export const ARTISTS: Artist[] = [
  { id: "ar1", name: "The Weeknd",    artwork: p(301, 400), followers: "49.2M", genre: "R&B"         },
  { id: "ar2", name: "Charli xcx",    artwork: p(302, 400), followers: "18.7M", genre: "Pop"         },
  { id: "ar3", name: "Dua Lipa",      artwork: p(303, 400), followers: "41.3M", genre: "Pop"         },
  { id: "ar4", name: "Billie Eilish", artwork: p(304, 400), followers: "52.1M", genre: "Alternative" },
  { id: "ar5", name: "Rammstein",     artwork: p(305, 400), followers: "12.8M", genre: "Metal"       },
  { id: "ar6", name: "Jackson Wang",  artwork: p(306, 400), followers: "9.4M",  genre: "Pop"         },
  { id: "ar7", name: "Lil Nas X",     artwork: p(307, 400), followers: "21.5M", genre: "Hip-Hop"     },
  { id: "ar8", name: "Ed Sheeran",    artwork: p(308, 400), followers: "63.7M", genre: "Pop"         },
];

export const PLAYLISTS: Playlist[] = [
  { id: "p1", title: "Liked Songs",   description: "Songs you loved",       artwork: p(401), songCount: 87 },
  { id: "p2", title: "Night Drive",   description: "Late night essentials",  artwork: p(402), songCount: 42 },
  { id: "p3", title: "Workout",       description: "High energy",            artwork: p(403), songCount: 31 },
  { id: "p4", title: "Chill Vibes",   description: "Relax and unwind",       artwork: p(404), songCount: 54 },
  { id: "p5", title: "Focus Mode",    description: "Deep work sessions",     artwork: p(405), songCount: 38 },
  { id: "p6", title: "Top Hits 2024", description: "Best of the year",       artwork: p(406), songCount: 50 },
];

export const GLOBAL_SONGS: GlobalSong[] = [
  { id: "g1",  title: "Blinding Lights",   artist: "The Weeknd",    country: "Canada",    artwork: p(101), x: 0.18, y: 0.32, color: "#FF3B30" },
  { id: "g2",  title: "Bad Guy",           artist: "Billie Eilish", country: "USA",       artwork: p(114), x: 0.14, y: 0.38, color: "#30D158" },
  { id: "g3",  title: "Was Ich Liebe",     artist: "Rammstein",     country: "Germany",   artwork: p(103), x: 0.50, y: 0.28, color: "#FF9F0A" },
  { id: "g4",  title: "360",               artist: "Charli xcx",    country: "UK",        artwork: p(113), x: 0.47, y: 0.30, color: "#BF5AF2" },
  { id: "g5",  title: "Go Ghost",          artist: "Jackson Wang",  country: "China",     artwork: p(107), x: 0.76, y: 0.36, color: "#FF2D55" },
  { id: "g6",  title: "Levitating",        artist: "Dua Lipa",      country: "Kosovo",    artwork: p(108), x: 0.52, y: 0.33, color: "#5AC8FA" },
  { id: "g7",  title: "Industry Baby",     artist: "Lil Nas X",     country: "USA",       artwork: p(115), x: 0.16, y: 0.42, color: "#FFD60A" },
  { id: "g8",  title: "Bad Habits",        artist: "Ed Sheeran",    country: "UK",        artwork: p(112), x: 0.48, y: 0.26, color: "#64D2FF" },
  { id: "g9",  title: "Hornay",            artist: "AY YOLA",       country: "Nigeria",   artwork: p(105), x: 0.51, y: 0.55, color: "#FF6961" },
  { id: "g10", title: "meant to be",       artist: "bbnoS",         country: "Canada",    artwork: p(106), x: 0.20, y: 0.35, color: "#6AC4DC" },
  { id: "g11", title: "Stay",              artist: "The Kid LAROI", country: "Australia", artwork: p(111), x: 0.80, y: 0.65, color: "#FFB340" },
  { id: "g12", title: "MONTERO",           artist: "Lil Nas X",     country: "USA",       artwork: p(109), x: 0.13, y: 0.44, color: "#30B0C7" },
  { id: "g13", title: "Peaches",           artist: "Justin Bieber", country: "Canada",    artwork: p(110), x: 0.22, y: 0.30, color: "#FF8C00" },
  { id: "g14", title: "Save Your Tears",   artist: "The Weeknd",    country: "Canada",    artwork: p(104), x: 0.19, y: 0.28, color: "#FF375F" },
  { id: "g15", title: "Happier Than Ever", artist: "Billie Eilish", country: "USA",       artwork: p(114), x: 0.15, y: 0.48, color: "#5E5CE6" },
];

export const GENRES = [
  { id: "g0", name: "For you",    count: 219 },
  { id: "g1", name: "Rock",       count: 240 },
  { id: "g2", name: "Hip-hop",    count: 589 },
  { id: "g3", name: "K-Pop",      count: 719 },
  { id: "g4", name: "R&B",        count: 341 },
  { id: "g5", name: "Electronic", count: 428 },
];

export const BROWSE_CATS = [
  { id: "b1",  name: "Pop",       color: "#FF2D55" },
  { id: "b2",  name: "Hip-Hop",   color: "#FF9500" },
  { id: "b3",  name: "Rock",      color: "#FF3B30" },
  { id: "b4",  name: "R&B",       color: "#BF5AF2" },
  { id: "b5",  name: "K-Pop",     color: "#5AC8FA" },
  { id: "b6",  name: "Electronic",color: "#30D158" },
  { id: "b7",  name: "Jazz",      color: "#FFD60A" },
  { id: "b8",  name: "Lo-Fi",     color: "#64D2FF" },
  { id: "b9",  name: "Metal",     color: "#636366" },
  { id: "b10", name: "Indie",     color: "#FF6B35" },
  { id: "b11", name: "Classical", color: "#8E8E93" },
  { id: "b12", name: "Latin",     color: "#FF375F" },
];

export const RECENT_SEARCHES = ["The Weeknd", "Rammstein", "AY YOLA", "bbnoS", "Rema"];

export const fmt = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};
