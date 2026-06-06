import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import MiniPlayer from "@/components/MiniPlayer";

function TabIcon({
  name, label, focused,
}: {
  name: React.ComponentProps<typeof Feather>["name"];
  label: string;
  focused: boolean;
}) {
  const { accent } = useTheme();
  const color = focused ? accent : "#444";
  return (
    <View style={{ alignItems: "center", gap: 3, paddingTop: 6 }}>
      <Feather name={name} size={22} color={color} />
      <Text style={{
        fontSize: 10,
        color,
        fontFamily: focused ? "Inter_600SemiBold" : "Inter_400Regular",
        letterSpacing: 0.2,
      }}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: isIOS ? "transparent" : "#0a0a0a",
            borderTopWidth: 0,
            height: isWeb ? 84 : 70,
            paddingBottom: isWeb ? 20 : 8,
            position: "absolute",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarBackground: () =>
            isIOS ? (
              <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />
            ) : (
              <View style={[
                StyleSheet.absoluteFill,
                { backgroundColor: "#0a0a0a", borderTopWidth: 0.5, borderTopColor: "#1e1e1e" },
              ]} />
            ),
        }}
      >
        <Tabs.Screen name="index"   options={{ tabBarIcon: ({ focused }) => <TabIcon name="home"     label="Home"    focused={focused} /> }} />
        <Tabs.Screen name="search"  options={{ tabBarIcon: ({ focused }) => <TabIcon name="search"   label="Search"  focused={focused} /> }} />
        <Tabs.Screen name="globe"   options={{ tabBarIcon: ({ focused }) => <TabIcon name="globe"    label="Globe"   focused={focused} /> }} />
        <Tabs.Screen name="library" options={{ tabBarIcon: ({ focused }) => <TabIcon name="music"    label="Library" focused={focused} /> }} />
        <Tabs.Screen name="settings" options={{ tabBarIcon: ({ focused }) => <TabIcon name="settings" label="Settings" focused={focused} /> }} />
      </Tabs>
      <MiniPlayer />
    </>
  );
}
