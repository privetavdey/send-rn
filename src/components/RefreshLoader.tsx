import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  RiveView,
  useRive,
  useRiveFile,
  Fit,
} from '@rive-app/react-native';
import Slider from '@react-native-community/slider';

const loaderRiv = require('../assets/rive/loader.riv');
const pullIndicatorRiv = require('../assets/rive/provable-loader-lines.riv');

interface RefreshLoaderProps {
  style?: StyleProp<ViewStyle>;
  onFinished?: () => void;
  duration?: number;
}

export const RefreshLoader: React.FC<RefreshLoaderProps> = ({
  style,
}) => {
  const { riveFile } = useRiveFile(loaderRiv);
  const { setHybridRef } = useRive();

  const { riveFile: pullFile } = useRiveFile(pullIndicatorRiv);
  const { riveViewRef: pullRef, setHybridRef: setPullRef } = useRive();
  const [progress, setProgress] = useState(0);

  const handleProgressChange = (value: number) => {
    const rounded = Math.round(value);
    setProgress(rounded);
    pullRef?.setNumberInputValue('Progress', rounded);
    pullRef?.playIfNeeded();
  };

  const handleStartLoop = () => {
    pullRef?.triggerInput('StartLoop');
    pullRef?.playIfNeeded();
  };

  const handleEndLoop = () => {
    pullRef?.triggerInput('EndLoop');
    pullRef?.setNumberInputValue('Progress', 0);
    pullRef?.playIfNeeded();
    setProgress(0);
  };

  if (!riveFile) return null;

  return (
    <View style={styles.outer}>
      <View style={[styles.container, style]}>
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          stateMachineName="State Machine 1"
          autoPlay={true}
          fit={Fit.Cover}
          style={StyleSheet.absoluteFill}
        />
        {pullFile && (
          <View style={styles.pullWrapper}>
            <RiveView
              hybridRef={setPullRef}
              file={pullFile}
              stateMachineName="State Machine 1"
              autoPlay={true}
              fit={Fit.Contain}
              style={styles.pullIndicator}
            />
          </View>
        )}
      </View>

      {/* Debug Controls */}
      <View style={styles.controls}>
        <Text style={styles.label}>Progress: {progress}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={progress}
          onValueChange={handleProgressChange}
          minimumTrackTintColor="#13bc80"
          maximumTrackTintColor="rgba(255,255,255,0.2)"
          thumbTintColor="#ffffff"
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleStartLoop}>
            <Text style={styles.buttonText}>StartLoop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleEndLoop}>
            <Text style={styles.buttonText}>EndLoop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    gap: 12,
  },
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  pullWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pullIndicator: {
    width: 40,
    height: 40,
  },
  controls: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  label: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
