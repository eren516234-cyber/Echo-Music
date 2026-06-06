import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  FlatList, Image, Platform, Pressable,
  ScrollView, StyleSheet, Text, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePlayer } from "@/context/PlayerContext";
import { useLibrary } from "@/context/LibraryContext";
import { useTheme } from "@/context/ThemeContext";
import { SONGS, ALBUMS, ARTISTS, PLAYLISTS, formatDuration } from "@/constants/mockData";

const TABS = ["Playlists", "Songs", "Albums", "Artists"] as const;
type Tab = typeof TABS[number];

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const { playSong, currentSong } = usePlayer();
  const { isLiked, toggleLike, isDownloaded, toggleDownload } = useLibrary();
  const { accentColor } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("Playlists");

  return (
    <View style={[styles.container, { paddingTop: insets.top + (Platform.OS === "web" ? 27 : 0) }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Library</Text>
        <Pressable style={styles.addBtn}>
          <Feather name="plus" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingBottom: 16 }}
      >
        {TABS.map(tab => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => { setActiveTab(tab); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Content */}
      <FlatList
        key={activeTab}
        data={
          activeTab === "Playlists" ? PLAYLISTS :
          activeTab === "Songs"     ? SONGS :
          activeTab === "Albums"    ? ALBUMS :
          ARTISTS
        }
        keyExtractor={item => item.id}
        numColumns={activeTab === "Artists" ? 2 : 1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 160, gap: 4 }}
        renderItem={({ item }) => {
          if (activeTab === "Songs") {
            const song = item as typeof SONGS[0];
            const active = currentSong?.id === song.id;
            return (
              <Pressable
                style={[styles.row, active && styles.rowActive]}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); playSong(song, SONGS); }}
              >
                <Image source={{ uri: song.artwork }} style={styles.artSm} />
                <View style={styles.info}>
                  <Text style={[styles.rowTitle, active && { color: accentColor }]} numberOfLines={1}>{song.title}</Text>
                  <Text style={styles.rowSub}>{song.artist}</Text>
                </View>
                <Text style={styles.dur}>{formatDuration(song.duration)}</Text>
                <Pressable onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); toggleLike(song.id); }}>
                  <Feather name="heart" size={15} color={isLiked(song.id) ? accentColor : "#333"} />
                </Pressable>
              </Pressable>
            );
          }

          if (activeTab === "Albums") {
            const album = item as typeof ALBUMS[0];
            return (
              <Pressable style={styles.row}>
                <Image source={{ uri: album.artwork }} style={styles.artSm} />
                <View style={styles.info}>
                  <Text style={styles.rowTitle} numberOfLines={1}>{album.title}</Text>
                  <Text style={styles.rowSub}>{album.artist} · {album.year}</Text>
                </View>
                <Feather name="chevron-right" size={16} color="#333" />
              </Pressable>
            );
          }

          if (activeTab === "Artists") {
            const artist = item as typeof ARTISTS[0];
            return (
              <Pressable style={styles.artistCard}>
                <Image source={{ uri: artist.artwork }} style={styles.artistImg} />
                <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
                <Text style={styles.artistSub}>{artist.genre}</Text>
              </Pressable>
            );
          }

          const pl = item as typeof PLAYLISTS[0];
          return (
            <Pressable style={styles.row}>
              <Image source={{ uri: pl.artwork }} style={styles.artSm} />
              <View style={styles.info}>
                <Text style={styles.rowTitle} numberOfLines={1}>{pl.title}</Text>
                <Text style={styles.rowSub}>{pl.description} · {pl.songCount} songs</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#333" />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#fff", fontFamily: "Inter_700Bold" },
  addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#1a1a1a", alignItems: "center", justifyContent: "center" },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50, backgroundColor: "#161616" },
  tabActive: { backgroundColor: "#fff" },
  tabText: { fontSize: 13, color: "#666", fontFamily: "Inter_500Medium" },
  tabTextActive: { color: "#000" },
  row: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8, paddingHorizontal: 8, borderRadius: 10 },
  rowActive: { backgroundColor: "#141414" },
  artSm: { width: 50, height: 50, borderRadius: 8, backgroundColor: "#1a1a1a" },
  info: { flex: 1 },
  rowTitle: { fontSize: 15, fontWeight: "600", color: "#fff", fontFamily: "Inter_600SemiBold" },
  rowSub: { fontSize: 12, color: "#666", fontFamily: "Inter_400Regular", marginTop: 2 },
  dur: { fontSize: 12, color: "#444", fontFamily: "Inter_400Regular" },
  artistCard: { flex: 1, margin: 6, alignItems: "flex-start" },
  artistImg: { width: "100%", aspectRatio: 1, borderRadius: 10, backgroundColor: "#1a1a1a", marginBottom: 8 },
  artistName: { fontSize: 14, fontWeight: "600", color: "#fff", fontFamily: "Inter_600SemiBold" },
  artistSub: { fontSize: 12, color: "#666", fontFamily: "Inter_400Regular", marginTop: 2 },
});
