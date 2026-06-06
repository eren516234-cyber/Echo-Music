import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform, Pressable, ScrollView,
  StyleSheet, Switch, Text, View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ACCENT_COLORS, useTheme } from "@/context/ThemeContext";

function Row({ label, sub, right }: { label: string; sub?: string; right?: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowInfo}>
        <Text style={styles.rowLabel}>{label}</Text>
        {sub && <Text style={styles.rowSub}>{sub}</Text>}
      </View>
      {right}
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { accent, rainbowMode, perScreenColor, setAccent, toggleRainbow, togglePerScreen, resetBW } = useTheme();

  const [audioQuality, setAudioQuality] = useState("High · 320kbps");
  const [crossfade, setCrossfade] = useState(true);
  const [normalize, setNormalize] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [translation, setTranslation] = useState(false);
  const [country, setCountry] = useState("India");

  return (
    <View style={[styles.container, { paddingTop: insets.top + (Platform.OS === "web" ? 27 : 0) }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 20 }}
      >
        <Text style={styles.heading}>Settings</Text>

        {/* THEME */}
        <SectionTitle>THEME</SectionTitle>
        <View style={styles.card}>
          <Row
            label="🌈 Rainbow Mode"
            sub="Change the whole app's colour"
            right={
              <Switch
                value={rainbowMode}
                onValueChange={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); toggleRainbow(); }}
                trackColor={{ false: "#222", true: "#fff" }}
                thumbColor={rainbowMode ? "#000" : "#555"}
              />
            }
          />

          <View style={styles.divider} />

          <View style={styles.colorSection}>
            <Text style={styles.rowLabel}>🎨 Custom Colour</Text>
            <View style={styles.colorRow}>
              {ACCENT_COLORS.map(c => (
                <Pressable
                  key={c}
                  style={[styles.colorDot, { backgroundColor: c }, accent === c && styles.colorDotActive]}
                  onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setAccent(c); }}
                />
              ))}
            </View>
          </View>

          <View style={styles.divider} />

          <Row
            label="🖼 Per-Screen Colour"
            sub="Each screen has its own colour"
            right={
              <Switch
                value={perScreenColor}
                onValueChange={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); togglePerScreen(); }}
                trackColor={{ false: "#222", true: "#fff" }}
                thumbColor={perScreenColor ? "#000" : "#555"}
              />
            }
          />

          <View style={styles.divider} />

          <Pressable
            style={styles.resetBtn}
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); resetBW(); }}
          >
            <Text style={styles.resetText}>Reset to Black & White</Text>
          </Pressable>
        </View>

        {/* PLAYBACK */}
        <SectionTitle>PLAYBACK</SectionTitle>
        <View style={styles.card}>
          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Audio Quality</Text>
              <Text style={styles.rowSub}>{audioQuality}</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#444" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Equalizer</Text>
              <Text style={styles.rowSub}>Custom bands</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#444" />
          </Pressable>

          <View style={styles.divider} />

          <Row
            label="Crossfade"
            sub="3 seconds"
            right={
              <Switch
                value={crossfade}
                onValueChange={v => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setCrossfade(v); }}
                trackColor={{ false: "#222", true: "#fff" }}
                thumbColor={crossfade ? "#000" : "#555"}
              />
            }
          />

          <View style={styles.divider} />

          <Row
            label="Normalize Volume"
            right={
              <Switch
                value={normalize}
                onValueChange={v => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setNormalize(v); }}
                trackColor={{ false: "#222", true: "#fff" }}
                thumbColor={normalize ? "#000" : "#555"}
              />
            }
          />
        </View>

        {/* CONTENT */}
        <SectionTitle>CONTENT</SectionTitle>
        <View style={styles.card}>
          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Spotify Import</Text>
              <Text style={styles.rowSub}>Transfer playlists</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#444" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Import / Export</Text>
              <Text style={styles.rowSub}>Backups</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#444" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Country</Text>
              <Text style={styles.rowSub}>{country}</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#444" />
          </Pressable>
        </View>

        {/* AI */}
        <SectionTitle>AI</SectionTitle>
        <View style={styles.card}>
          <Row
            label="AI Suggestions"
            sub="Mistral / OpenRouter"
            right={
              <Switch
                value={aiSuggestions}
                onValueChange={v => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setAiSuggestions(v); }}
                trackColor={{ false: "#222", true: "#fff" }}
                thumbColor={aiSuggestions ? "#000" : "#555"}
              />
            }
          />

          <View style={styles.divider} />

          <Row
            label="Translation"
            sub="DeepL"
            right={
              <Switch
                value={translation}
                onValueChange={v => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setTranslation(v); }}
                trackColor={{ false: "#222", true: "#fff" }}
                thumbColor={translation ? "#000" : "#555"}
              />
            }
          />
        </View>

        {/* ABOUT */}
        <SectionTitle>ABOUT</SectionTitle>
        <View style={styles.card}>
          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Version</Text>
              <Text style={styles.rowSub}>YVL Music 1.0.0</Text>
            </View>
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>GitHub</Text>
              <Text style={styles.rowSub}>eren516234-cyber/echo-music</Text>
            </View>
            <Feather name="external-link" size={15} color="#444" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.rowPressable} onPress={() => {}}>
            <View style={styles.rowInfo}>
              <Text style={styles.rowLabel}>Check for Updates</Text>
            </View>
            <Feather name="chevron-right" size={16} color="#444" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  heading: { fontSize: 28, fontWeight: "800", color: "#fff", fontFamily: "Inter_700Bold", marginTop: 8, marginBottom: 20 },
  sectionTitle: { fontSize: 11, fontWeight: "600", color: "#555", fontFamily: "Inter_600SemiBold", letterSpacing: 1.2, marginBottom: 10, marginTop: 20 },
  card: { backgroundColor: "#111", borderRadius: 14, overflow: "hidden", borderWidth: 1, borderColor: "#1e1e1e" },
  divider: { height: 1, backgroundColor: "#1a1a1a" },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  rowPressable: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  rowInfo: { flex: 1 },
  rowLabel: { fontSize: 15, color: "#fff", fontFamily: "Inter_500Medium" },
  rowSub: { fontSize: 12, color: "#666", fontFamily: "Inter_400Regular", marginTop: 2 },
  colorSection: { paddingHorizontal: 16, paddingVertical: 14 },
  colorRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 12 },
  colorDot: { width: 34, height: 34, borderRadius: 17 },
  colorDotActive: { borderWidth: 3, borderColor: "#fff", transform: [{ scale: 1.15 }] },
  resetBtn: { paddingHorizontal: 16, paddingVertical: 14, alignItems: "center" },
  resetText: { fontSize: 14, color: "#666", fontFamily: "Inter_500Medium" },
});
