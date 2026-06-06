import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { usePlayer } from "@/context/PlayerContext";
import { useTheme } from "@/context/ThemeContext";

export default function MiniPlayer() {
  const { currentSong, isPlaying, togglePlay, next, progress } = usePlayer();
  const { accentColor } = useTheme();

  if (!currentSong) return null;

  return (
    <Pressable style={styles.wrap} onPress={() => router.push("/now-playing")}>
      <View style={styles.bar}>
        <View style={[styles.barFill, { width: `${progress * 100}%` as any, backgroundColor: accentColor }]} />
      </View>
      <View style={styles.row}>
        <Image source={{ uri: currentSong.artwork }} style={styles.art} />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{currentSong.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentSong.artist}</Text>
        </View>
        <Pressable style={styles.btn} onPress={e => {
          e.stopPropagation();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          togglePlay();
        }}>
          <Feather name={isPlaying ? "pause" : "play"} size={22} color="#fff" />
        </Pressable>
        <Pressable style={styles.btn} onPress={e => {
          e.stopPropagation();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          next();
        }}>
          <Feather name="skip-forward" size={22} color="#fff" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: Platform.OS === "web" ? 84 : 76,
    left: 10, right: 10,
    backgroundColor: "#181818",
    borderRadius: 14, overflow: "hidden",
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6, shadowRadius: 16, elevation: 12,
  },
  bar: { height: 2, backgroundColor: "#2a2a2a" },
  barFill: { height: 2 },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingVertical: 10, gap: 10 },
  art: { width: 42, height: 42, borderRadius: 8, backgroundColor: "#222" },
  info: { flex: 1, gap: 2 },
  title: { color: "#fff", fontSize: 14, fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  artist: { color: "#555", fontSize: 12, fontFamily: "Inter_400Regular" },
  btn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
});
