# YVL Music

A beautiful mobile music app built with Expo React Native.

## Features
- 🏠 **Home** — Quick picks, genre chips, new songs
- 🔍 **Search** — Fuzzy search with browse grid
- 🌍 **Music Globe** — Draggable interactive globe with songs from 15 countries
- 📚 **Library** — Playlists, Songs, Albums, Artists tabs
- ⚙️ **Settings** — Rainbow Mode, custom accent colours, playback, AI
- 🎵 **Now Playing** — Spinning vinyl disc, full controls
- 🎛 **Mini Player** — Persistent player with progress bar

## Building the APK

1. Create an [Expo account](https://expo.dev) and get your `EXPO_TOKEN`
2. Add `EXPO_TOKEN` as a GitHub repository secret
3. Push to `main` or trigger the workflow manually in GitHub Actions
4. Download the APK from the workflow artifacts

## Local Development

```bash
pnpm install
pnpm --filter @workspace/mobile run dev
```

## Stack
- Expo Router 6 + React Native
- expo-haptics, expo-blur, @expo/vector-icons
- AsyncStorage for persistence
- Pure black/white theme with Rainbow Mode
