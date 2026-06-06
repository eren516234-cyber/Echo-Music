import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList, Image, Platform, Pressable,
  ScrollView, StyleSheet, Text, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePlayer } from "@/context/PlayerContext";
import { useLibrary } from "@/context/LibraryContext";
import { useTheme } from "@/context/ThemeContext";
import { SONGS, ALBUMS, GENRES, formatDuration, Song, Album } from "@/constants/mockData";

function SongRow({ song }: { song: Song }) {
  const { playSong, currentSong, isPlaying, togglePlay } = usePlayer();
  const { isLiked, toggleLike } = useLibrary();
  const { accentColor } = useTheme();
  const isActive = currentSong?.id === song.id;

  return (
    <Pressable
      style={[styles.songRow, isActive && styles.songRowActive]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        isActive ? togglePlay() : playSong(song, SONGS);
      }}
    >
      <View style={styles.artWrap}>
        <Image source={{ uri: song.artwork }} style={styles.songArt} />
        {isActive && (
          <View style={[styles.overlay, { backgroundColor: accentColor + "cc" }]}>
            <Feather name={isPlaying ? "pause" : "play"} size={13} color="#000" />
          </View>
        )}
      </View>
      <View style={styles.songInfo}>
        <Text style={[styles.songTitle, isActive && { color: accentColor }]} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
      </View>
      <Text style={styles.dur}>{formatDuration(song.duration)}</Text>
      <Pressable
        style={styles.likeBtn}
        onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); toggleLike(song.id); }}
      >
        <Feather name="heart" size={15} color={isLiked(song.id) ? accentColor : "#333"} />
      </Pressable>
    </Pressable>
  );
}

function AlbumCard({ album }: { album: Album }) {
  return (
    <Pressable style={styles.albumCard}>
      <Image source={{ uri: album.artwork }} style={styles.albumArt} />
      <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
      <Text style={styles.albumArtist} numberOfLines={1}>{album.artist}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { accentColor } = useTheme();
  const [activeGenre, setActiveGenre] = useState("For you");

  return (
    <View style={[styles.container, { paddingTop: insets.top + (Platform.OS === "web" ? 27 : 0) }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 20 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>YVL</Text>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconBtn} onPress={() => router.push("/now-playing")}>
              <View style={styles.disc} />
            </Pressable>
            <View style={styles.avatar}>
              <Text style={styles.avatarLetter}>E</Text>
            </View>
          </View>
        </View>

        {/* Genre Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 8, marginBottom: 28 }}
        >
          {GENRES.map(g => {
            const active = activeGenre === g.name;
            return (
              <Pressable
                key={g.id}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => { setActiveGenre(g.name); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {g.name}
                  {g.count > 0 && (
                    <Text style={active ? styles.chipCountActive : styles.chipCount}>{" "}{g.count}</Text>
                  )}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Quick Picks */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Quick picks</Text>
            <Pressable><Text style={[styles.seeAll, { color: accentColor }]}>See all</Text></Pressable>
          </View>
          {SONGS.slice(0, 6).map(s => <SongRow key={s.id} song={s} />)}
        </View>

        {/* New Songs */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>New songs</Text>
            <Pressable><Text style={[styles.seeAll, { color: accentColor }]}>See all</Text></Pressable>
          </View>
          <FlatList
            horizontal
            data={ALBUMS}
            keyExtractor={a => a.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14, paddingRight: 4 }}
            renderItem={({ item }) => <AlbumCard album={item} />}
            scrollEnabled
          />
        </View>

        {/* Keep Listening */}
        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <Text style={styles.sectionTitle}>Keep listening</Text>
            <Pressable><Text style={[styles.seeAll, { color: accentColor }]}>See all</Text></Pressable>
          </View>
          {SONGS.slice(6, 12).map(s => <SongRow key={s.id} song={s} />)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 22, paddingTop: 8 },
  logo: { fontSize: 34, fontWeight: "800", color: "#fff", fontFamily: "Inter_700Bold", letterSpacing: -1.5 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#1a1a1a", alignItems: "center", justifyContent: "center" },
  disc: { width: 16, height: 16, borderRadius: 8, borderWidth: 3, borderColor: "#fff" },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  avatarLetter: { fontSize: 15, fontWeight: "700", color: "#000", fontFamily: "Inter_700Bold" },
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 50, backgroundColor: "#1a1a1a" },
  chipActive: { backgroundColor: "#fff" },
  chipText: { fontSize: 13, color: "#777", fontFamily: "Inter_500Medium" },
  chipTextActive: { color: "#000" },
  chipCount: { fontSize: 11, color: "#444" },
  chipCountActive: { fontSize: 11, color: "#555" },
  section: { marginBottom: 36 },
  sectionHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#fff", fontFamily: "Inter_700Bold" },
  seeAll: { fontSize: 13, fontFamily: "Inter_500Medium" },
  songRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 8, gap: 12, marginBottom: 2, borderRadius: 12 },
  songRowActive: { backgroundColor: "#141414" },
  artWrap: { position: "relative" },
  songArt: { width: 50, height: 50, borderRadius: 8, backgroundColor: "#1a1a1a" },
  overlay: { position: "absolute", inset: 0, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  songInfo: { flex: 1, gap: 3 },
  songTitle: { fontSize: 15, fontWeight: "600", color: "#fff", fontFamily: "Inter_600SemiBold" },
  songArtist: { fontSize: 12, color: "#666", fontFamily: "Inter_400Regular" },
  dur: { fontSize: 12, color: "#444", fontFamily: "Inter_400Regular" },
  likeBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
  albumCard: { width: 140 },
  albumArt: { width: 140, height: 140, borderRadius: 10, backgroundColor: "#1a1a1a", marginBottom: 8 },
  albumTitle: { fontSize: 13, fontWeight: "600", color: "#fff", fontFamily: "Inter_600SemiBold" },
  albumArtist: { fontSize: 11, color: "#555", fontFamily: "Inter_400Regular" },
});
