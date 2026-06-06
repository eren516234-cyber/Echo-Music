import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export const ACCENT_COLORS = [
  "#ffffff", "#FF3B30", "#FF9500", "#FFD60A",
  "#30D158", "#007AFF", "#BF5AF2", "#FF2D55", "#5AC8FA",
];

interface ThemeCtx {
  accent: string;
  rainbowMode: boolean;
  perScreenColor: boolean;
  setAccent: (c: string) => void;
  toggleRainbow: () => void;
  togglePerScreen: () => void;
  resetBW: () => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState("#ffffff");
  const [rainbowMode, setRainbow] = useState(false);
  const [perScreenColor, setPerScreen] = useState(false);

  useEffect(() => {
    AsyncStorage.multiGet(["@yvl_accent", "@yvl_rainbow", "@yvl_perscreen"])
      .then(([[, a], [, r], [, ps]]) => {
        if (a) setAccentState(a);
        if (r) setRainbow(r === "true");
        if (ps) setPerScreen(ps === "true");
      }).catch(() => {});
  }, []);

  const setAccent = useCallback((c: string) => {
    setAccentState(c);
    AsyncStorage.setItem("@yvl_accent", c).catch(() => {});
  }, []);

  const toggleRainbow = useCallback(() => {
    setRainbow(v => {
      AsyncStorage.setItem("@yvl_rainbow", (!v).toString()).catch(() => {});
      return !v;
    });
  }, []);

  const togglePerScreen = useCallback(() => {
    setPerScreen(v => {
      AsyncStorage.setItem("@yvl_perscreen", (!v).toString()).catch(() => {});
      return !v;
    });
  }, []);

  const resetBW = useCallback(() => {
    setAccentState("#ffffff");
    setRainbow(false);
    setPerScreen(false);
    AsyncStorage.multiSet([["@yvl_accent", "#ffffff"], ["@yvl_rainbow", "false"], ["@yvl_perscreen", "false"]]).catch(() => {});
  }, []);

  return (
    <ThemeContext.Provider value={{ accent, rainbowMode, perScreenColor, setAccent, toggleRainbow, togglePerScreen, resetBW }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
