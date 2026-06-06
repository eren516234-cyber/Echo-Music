import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  FlatList, Platform, Pressable, ScrollView,
  StyleSheet, Text, TextInput, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePlayer } from "@/context/PlayerContext";
import { useTheme } from "@/context/ThemeContext";
import { SONGS, BROWSE_CATS, RECENT_SEARCHES, fmt } from "@/constants/data";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { playSong } = usePlayer();
  const { accent } = useTheme();
  const [query, setQuery] = useState("");
  const [recents, setRecents] = useState(RECENT_SEARCHES);
  const [focused, setFocused] = useState(false);

  const results = query.length > 0
    ? SONGS.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const removeRecent = (term: string) => setRecents(r => r.filter(x => x !== term));

  return (
    <View style={[styles.container, { paddingTop: insets.top + (Platform.OS === "web" ? 27 : 0) }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 20 }}
      >
        <Text style={styles.heading}>Search</Text>

        {/* Search Bar */}
        <View style={[styles.searchBar, focused && { borderColor: "#333" }]}>
          <Feather name="search" size={18} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Songs, artists, albums..."
            placeholderTextColor="#555"
            value={query}
            onChangeText={setQuery}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Feather name="x" size={18} color="#555" />
            </Pressable>
          )}
        </View>

        {/* Search Results */}
        {results.length > 0 && (
          <View style={styles.section}>
            {results.map(song => (
              <Pressable
                key={song.id}
                style={styles.resultRow}
                onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); playSong(song, SONGS); }}
              >
                <View style={styles.resultArt}>
                  <Feather name="music" size={16} color="#555" />
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle} numberOfLines={1}>{song.title}</Text>
                  <Text style={styles.resultSub} numberOfLines={1}>{song.artist}</Text>
                </View>
                <Text style={styles.resultDur}>{fmt(song.duration)}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Recents */}
        {query.length === 0 && recents.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>RECENT</Text>
            <View style={styles.recentRow}>
              {recents.map(r => (
                <View key={r} style={styles.recentPill}>
                  <Feather name="rotate-ccw" size={12} color="#555" style={{ marginRight: 6 }} />
                  <Text style={styles.recentText}>{r}</Text>
                  <Pressable onPress={() => removeRecent(r)} style={{ marginLeft: 8 }}>
                    <Feather name="x" size={12} color="#555" />
                  </Pressable>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Browse */}
        {query.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.heading2}>Browse</Text>
            <View style={styles.grid}>
              {BROWSE_CATS.map(cat => (
                <Pressable
                  key={cat.id}
                  style={[styles.catCard, { backgroundColor: cat.color + "22" }]}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                >
                  <View style={[styles.catDot, { backgroundColor: cat.color }]} />
                  <Text style={styles.catName}>{cat.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  heading: { fontSize: 34, fontWeight: "800", color: "#fff", fontFamily: "Inter_700Bold", marginBottom: 18, marginTop: 8 },
  heading2: { fontSize: 24, fontWeight: "700", color: "#fff", fontFamily: "Inter_700Bold", marginBottom: 14 },
  searchBar: {
    flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "#141414", borderRadius: 12, paddingHorizontal: 14,
    paddingVertical: 12, marginBottom: 24, borderWidth: 1, borderColor: "#1e1e1e",
  },
  input: { flex: 1, color: "#fff", fontSize: 15, fontFamily: "Inter_400Regular" },
  section: { marginBottom: 28 },
  sectionLabel: { fontSize: 11, fontWeight: "600", color: "#555", fontFamily: "Inter_600SemiBold", letterSpacing: 1.2, marginBottom: 12 },
  recentRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  recentPill: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: "#141414", borderRadius: 50,
    paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#222",
  },
  recentText: { color: "#ccc", fontSize: 13, fontFamily: "Inter_400Regular" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  catCard: {
    width: "48%", height: 70, borderRadius: 12, justifyContent: "flex-end",
    padding: 12, borderWidth: 1, borderColor: "#222", overflow: "hidden",
  },
  catDot: { position: "absolute", top: -10, right: -10, width: 60, height: 60, borderRadius: 30, opacity: 0.5 },
  catName: { fontSize: 16, fontWeight: "700", color: "#fff", fontFamily: "Inter_700Bold" },
  resultRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, gap: 12 },
  resultArt: { width: 44, height: 44, borderRadius: 8, backgroundColor: "#1a1a1a", alignItems: "center", justifyContent: "center" },
  resultInfo: { flex: 1 },
  resultTitle: { fontSize: 15, color: "#fff", fontFamily: "Inter_600SemiBold" },
  resultSub: { fontSize: 12, color: "#666", fontFamily: "Inter_400Regular", marginTop: 2 },
  resultDur: { fontSize: 12, color: "#444", fontFamily: "Inter_400Regular" },
});
