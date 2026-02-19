# Provable Rive Test — React Native

A React Native (Expo) port of the Provable wallet UI with Rive-animated navigation icons.

## Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- For iOS: Xcode 15+ and CocoaPods
- For Android: Android Studio with SDK 34+

> **Important:** This app uses native modules (`@rive-app/react-native`, `react-native-svg`, `expo-blur`), so it **cannot run in Expo Go**. You must use a **development build**.

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
│   │   ├── NavIcon.tsx              # Rive-powered nav icon
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

The `NavIcon` component uses `@rive-app/react-native` (Nitro-based runtime) with:

- `useRiveFile()` to load each `.riv` file via `require()`
- `useRive()` to get a ref for imperative control
- `setBooleanInputValue('On', isActive)` to toggle the icon state
- `playIfNeeded()` to ensure the state machine updates after input changes
