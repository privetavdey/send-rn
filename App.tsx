import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import OnrampOfframp from './src/components/OnrampOfframp';
import type { RiveInputs } from './src/components/SendModal';

const initialRiveInputs: RiveInputs = {
  isDone: false,
  isShield: false,
  isSwap: false,
  isSend: false,
};

export default function App() {
  const [riveInputs, setRiveInputs] = useState<RiveInputs>(initialRiveInputs);

  const handleToggle = useCallback((key: keyof RiveInputs, value: boolean) => {
    setRiveInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090707"
        translucent={Platform.OS === 'android'}
      />
      <OnrampOfframp riveInputs={riveInputs} onToggle={handleToggle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090707',
  },
});
