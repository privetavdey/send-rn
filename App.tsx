import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import OnrampOfframp from './src/components/OnrampOfframp';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#090707"
        translucent={Platform.OS === 'android'}
      />
      <OnrampOfframp />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090707',
  },
});
