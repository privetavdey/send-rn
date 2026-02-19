# Provable Rive Test — React Native

A React Native (Expo) port of the Provable wallet UI with Rive-animated navigation icons.

## Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- For iOS: Xcode 15+ and CocoaPods
- For Android: Android Studio with SDK 34+

> **Important:** This app uses native modules (`rive-react-native`, `react-native-svg`, `expo-blur`), so it **cannot run in Expo Go**. You must use a **development build**.

## Setup

```bash
# Install dependencies
npm install

# Generate native projects (iOS + Android)
npx expo prebuild

# Install iOS CocoaPods
cd ios && pod install && cd ..
```

## Running the App

### Option A: Development Build (Recommended)

This is the best way to test Rive animations on real devices.

```bash
# iOS (requires Mac + Xcode)
npx expo run:ios

# Android (requires Android Studio / emulator)
npx expo run:android
```

### Option B: EAS Build (for team testing)

If you need to share builds with your team:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure (one time)
eas build:configure

# Build for iOS simulator
eas build --platform ios --profile development

# Build for Android emulator
eas build --platform android --profile development
```

Then install the resulting `.app` / `.apk` on your device/simulator and run:

```bash
npx expo start --dev-client
```

## Project Structure

```
ProvableRiveTestRN/
├── App.tsx                          # Entry point
├── app.json                         # Expo config
├── metro.config.js                  # Metro bundler (adds .riv support)
├── src/
│   ├── assets/
│   │   ├── icons/                   # SVG icons as React Native components
│   │   │   └── index.tsx
│   │   ├── images/                  # PNG assets (profile, logos)
│   │   │   ├── pondo-logo.png
│   │   │   ├── profile-image.png
│   │   │   └── vusdc-logo.png
│   │   └── rive/                    # Rive animation files
│   │       ├── home_icon.riv
│   │       ├── history_icon.riv
│   │       └── settings_icon.riv
│   ├── components/
│   │   ├── NavIcon.tsx              # Rive-powered nav icon with workarounds
│   │   └── OnrampOfframp.tsx        # Main wallet screen
│   └── constants/
│       └── styles.ts                # Design tokens (colors, spacing, radii)
```

## Rive Animation Setup

Each `.riv` file follows the same structure:

| Property | Value |
|----------|-------|
| **State Machine** | `Main` |
| **Boolean Input** | `On` |
| **Artboard** | Default |

The `NavIcon` component includes workarounds for known `rive-react-native` issues:

1. **Flash prevention** — Icons start at `opacity: 0` until the state machine input is confirmed set
2. **Input race condition** — A small platform-specific delay (`50ms` iOS, `80ms` Android) is applied between `setInputState` calls to avoid the sequential call bug ([#265](https://github.com/rive-app/rive-react-native/issues/265))
3. **Cross-platform callbacks** — Both `onPause` (iOS) and `onStop` (Android) are handled for animation completion detection

## Known Issues & Workarounds

| Issue | Platform | Workaround |
|-------|----------|------------|
| Autoplay flash (icons briefly show "on" state) | Both | Opacity gate in `NavIcon` |
| `pause()` then `play()` doesn't restart | iOS | Avoid pause/play cycles; use state machine inputs |
| Sequential `setInputState` drops calls | Both | setTimeout delay between calls |
| `onPause` vs `onStop` for animation end | iOS vs Android | Handle both callbacks |

## Migrating to the New Runtime

When ready, consider migrating to `@rive-app/react-native` (Nitro-based):
- [Migration Guide](https://rive.app/docs/runtimes/react-native/migration-guide)
- [New Runtime Repo](https://github.com/rive-app/rive-nitro-react-native)

The new runtime uses `useRiveFile` hook + `RiveView` component instead of the legacy `<Rive />` ref-based API.
