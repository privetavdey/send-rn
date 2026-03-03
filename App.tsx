import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import OnrampOfframp from './src/components/OnrampOfframp';
import { ThemeContext } from './src/constants/ThemeContext';
import { DARK_COLORS, LIGHT_COLORS } from './src/constants/styles';
import type { RiveInputs } from './src/components/SendModal';

const initialRiveInputs: RiveInputs = {
  isDone: false,
  isShield: false,
  isSwap: false,
  isSend: false,
  isDark: true,
};

export default function App() {
  const [riveInputs, setRiveInputs] = useState<RiveInputs>(initialRiveInputs);
  const colors = riveInputs.isDark ? DARK_COLORS : LIGHT_COLORS;

  const handleToggle = useCallback((key: keyof RiveInputs, value: boolean) => {
    setRiveInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <ThemeContext.Provider value={colors}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
        <StatusBar
          barStyle={riveInputs.isDark ? 'light-content' : 'dark-content'}
          backgroundColor={colors.BACKGROUND}
          translucent={Platform.OS === 'android'}
        />
        <OnrampOfframp riveInputs={riveInputs} onToggle={handleToggle} />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
