import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export const ACCENT_COLORS = [
  { name: "White",  value: "#ffffff" },
  { name: "Red",    value: "#FF3B30" },
  { name: "Orange", value: "#FF9500" },
  { name: "Yellow", value: "#FFD60A" },
  { name: "Green",  value: "#30D158" },
  { name: "Blue",   value: "#007AFF" },
  { name: "Purple", value: "#BF5AF2" },
  { name: "Pink",   value: "#FF2D55" },
  { name: "Cyan",   value: "#5AC8FA" },
];

interface ThemeContextType {
  accentColor: string;
  rainbowMode: boolean;
  perScreenColor: boolean;
  setAccentColor: (color: string) => void;
  toggleRainbowMode: () => void;
  togglePerScreenColor: () => void;
  resetToBlackWhite: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const ACCENT_KEY    = "@echo_accent";
const RAINBOW_KEY   = "@echo_rainbow";
const PER_SCREEN_KEY = "@echo_perscreen";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColorState] = useState("#ffffff");
  const [rainbowMode, setRainbowMode] = useState(false);
  const [perScreenColor, setPerScreenColor] = useState(false);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem(ACCENT_KEY),
      AsyncStorage.getItem(RAINBOW_KEY),
      AsyncStorage.getItem(PER_SCREEN_KEY),
    ]).then(([acc, rain, per]) => {
      if (acc) setAccentColorState(acc);
      if (rain) setRainbowMode(rain === "true");
      if (per) setPerScreenColor(per === "true");
    }).catch(() => {});
  }, []);

  const setAccentColor = useCallback((color: string) => {
    setAccentColorState(color);
    AsyncStorage.setItem(ACCENT_KEY, color).catch(() => {});
  }, []);

  const toggleRainbowMode = useCallback(() => {
    setRainbowMode(prev => {
      const next = !prev;
      AsyncStorage.setItem(RAINBOW_KEY, next.toString()).catch(() => {});
      return next;
    });
  }, []);

  const togglePerScreenColor = useCallback(() => {
    setPerScreenColor(prev => {
      const next = !prev;
      AsyncStorage.setItem(PER_SCREEN_KEY, next.toString()).catch(() => {});
      return next;
    });
  }, []);

  const resetToBlackWhite = useCallback(() => {
    setAccentColorState("#ffffff");
    setRainbowMode(false);
    setPerScreenColor(false);
    AsyncStorage.multiSet([
      [ACCENT_KEY, "#ffffff"],
      [RAINBOW_KEY, "false"],
      [PER_SCREEN_KEY, "false"],
    ]).catch(() => {});
  }, []);

  return (
    <ThemeContext.Provider value={{
      accentColor, rainbowMode, perScreenColor,
      setAccentColor, toggleRainbowMode, togglePerScreenColor, resetToBlackWhite,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
