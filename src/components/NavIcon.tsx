import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  RiveView,
  useRive,
  useRiveFile,
  Fit,
  type RiveFileInput,
} from '@rive-app/react-native';

interface NavIconProps {
  source: RiveFileInput;
  isActive: boolean;
  onPress: () => void;
  size?: number;
}

export const NavIcon: React.FC<NavIconProps> = ({
  source,
  isActive,
  onPress,
  size = 24,
}) => {
  const { riveFile } = useRiveFile(source);
  const { riveViewRef, setHybridRef } = useRive();

  useEffect(() => {
    if (!riveViewRef) return;
    riveViewRef.setBooleanInputValue('On', isActive);
    riveViewRef.playIfNeeded();
  }, [isActive, riveViewRef]);

  if (!riveFile) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{ width: size, height: size }}
    >
      <RiveView
        hybridRef={setHybridRef}
        file={riveFile}
        stateMachineName="Main"
        autoPlay={true}
        fit={Fit.Contain}
        style={{ width: size, height: size }}
      />
    </TouchableOpacity>
  );
};
