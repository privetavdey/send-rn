import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  RiveView,
  useRive,
  useRiveFile,
  Fit,
  Alignment,
} from '@rive-app/react-native';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/styles';

const transactionRiv = require('../assets/rive/transaction.riv');

const STATE_MACHINE_NAME = 'Main';
const STAGGER_BASE = 200;
const STAGGER_STEP = 80;
const SHEET_HEIGHT = 580;
const RIVE_HEIGHT = 320;

export interface RiveInputs {
  isDone: boolean;
  isShield: boolean;
  isSwap: boolean;
  isSend: boolean;
}

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  riveInputs: RiveInputs;
}

const HEADLINES: Record<
  string,
  { pending: string; done: string; pendingSub: string; doneSub: string }
> = {
  send: {
    pending: 'Sending...',
    done: 'Sent',
    pendingSub: 'Should take a moment,\nyou can close this now',
    doneSub: 'It might take a few minutes to arrive,\nyou can close this now',
  },
  swap: {
    pending: 'Swapping...',
    done: 'Swapped',
    pendingSub: 'Should take a moment,\nyou can close this now',
    doneSub: 'It might take a few minutes to arrive,\nyou can close this now',
  },
  shield: {
    pending: 'Shielding...',
    done: 'Shielded',
    pendingSub: 'Should take a moment,\nyou can close this now',
    doneSub: 'Your assets are now fully protected,\nyou can close this now',
  },
};

export const SendModal: React.FC<SendModalProps> = ({
  isOpen,
  onClose,
  riveInputs,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [localDone, setLocalDone] = useState(false);

  const { riveFile } = useRiveFile(transactionRiv);
  const { riveViewRef, setHybridRef } = useRive();

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const stagger1Opacity = useRef(new Animated.Value(0)).current;
  const stagger1TranslateY = useRef(new Animated.Value(12)).current;
  const stagger2Opacity = useRef(new Animated.Value(0)).current;
  const stagger2TranslateY = useRef(new Animated.Value(12)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    if (!riveViewRef) return;
    riveViewRef.setBooleanInputValue('Done', localDone);
    riveViewRef.setBooleanInputValue('isShield', riveInputs.isShield);
    riveViewRef.setBooleanInputValue('isSwap', riveInputs.isSwap);
    riveViewRef.setBooleanInputValue('isSend', riveInputs.isSend);
    riveViewRef.playIfNeeded();
  }, [riveViewRef, localDone, riveInputs.isShield, riveInputs.isSwap, riveInputs.isSend]);

  useEffect(() => {
    if (isOpen) {
      setLocalDone(false);
      setIsVisible(true);
      backdropOpacity.setValue(0);
      sheetTranslateY.setValue(SHEET_HEIGHT);
      stagger1Opacity.setValue(0);
      stagger1TranslateY.setValue(12);
      stagger2Opacity.setValue(0);
      stagger2TranslateY.setValue(12);
      buttonOpacity.setValue(0);
      buttonTranslateY.setValue(12);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          Animated.parallel([
            Animated.timing(backdropOpacity, {
              toValue: 1, duration: 300, useNativeDriver: true,
            }),
            Animated.timing(sheetTranslateY, {
              toValue: 0, duration: 300, useNativeDriver: true,
            }),
          ]).start();

          setTimeout(() => {
            Animated.parallel([
              Animated.timing(stagger1Opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
              Animated.timing(stagger1TranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
            ]).start();
          }, STAGGER_BASE + 1 * STAGGER_STEP);

          setTimeout(() => {
            Animated.parallel([
              Animated.timing(stagger2Opacity, { toValue: 0.5, duration: 400, useNativeDriver: true }),
              Animated.timing(stagger2TranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
            ]).start();
          }, STAGGER_BASE + 2 * STAGGER_STEP);

          setTimeout(() => {
            Animated.parallel([
              Animated.timing(buttonOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
              Animated.timing(buttonTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
            ]).start();
          }, STAGGER_BASE + 3 * STAGGER_STEP);
        });
      });
    } else if (isVisible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(sheetTranslateY, { toValue: SHEET_HEIGHT, duration: 300, useNativeDriver: true }),
      ]).start(() => setIsVisible(false));
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(backdropOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(sheetTranslateY, { toValue: SHEET_HEIGHT, duration: 300, useNativeDriver: true }),
    ]).start(() => {
      setIsVisible(false);
      onClose();
    });
  }, [onClose, backdropOpacity, sheetTranslateY]);

  const activeAction = riveInputs.isShield ? 'shield' : riveInputs.isSwap ? 'swap' : 'send';
  const headlines = HEADLINES[activeAction];
  const { width: screenWidth } = Dimensions.get('window');

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={StyleSheet.absoluteFill}>
        {/* Backdrop */}
        <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
          <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.BACKDROP, opacity: backdropOpacity }]} />
          <Animated.View style={[StyleSheet.absoluteFill, styles.blurWrap, { opacity: backdropOpacity }]} pointerEvents="none">
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          </Animated.View>
        </Pressable>

        {/* Bottom sheet */}
        <Animated.View
          style={[
            styles.sheet,
            { width: screenWidth, height: SHEET_HEIGHT, backgroundColor: COLORS.SHEET_BG },
            { transform: [{ translateY: sheetTranslateY }] },
          ]}
        >
          {/* Rive */}
          <View style={styles.riveContainer}>
            {riveFile && (
              <RiveView
                hybridRef={setHybridRef}
                file={riveFile}
                stateMachineName={STATE_MACHINE_NAME}
                autoPlay
                fit={Fit.FitWidth}
                alignment={Alignment.TopCenter}
                style={styles.rive}
              />
            )}
            <View style={[styles.handleBar, { backgroundColor: COLORS.HANDLE }]} />
          </View>

          <ScrollView
            style={styles.sheetScroll}
            contentContainerStyle={styles.sheetScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Text */}
            <View style={styles.textBlock}>
              <Animated.View style={[styles.headlineRow, { opacity: stagger1Opacity, transform: [{ translateY: stagger1TranslateY }] }]}>
                <Text style={[styles.headline, { color: COLORS.SHIMMER_HIGHLIGHT, opacity: localDone ? 0 : 1 }]} numberOfLines={1}>
                  {headlines.pending}
                </Text>
                <Text style={[styles.headline, { color: COLORS.TEXT_PRIMARY, opacity: localDone ? 1 : 0 }]} numberOfLines={1}>
                  {headlines.done}
                </Text>
              </Animated.View>

              <Animated.View style={[styles.subRow, { opacity: stagger2Opacity, transform: [{ translateY: stagger2TranslateY }] }]}>
                <Text style={[styles.subText, { color: COLORS.TEXT_PRIMARY, opacity: localDone ? 0 : 1 }]}>
                  {headlines.pendingSub}
                </Text>
                <Text style={[styles.subText, { color: COLORS.TEXT_PRIMARY, opacity: localDone ? 1 : 0 }]}>
                  {headlines.doneSub}
                </Text>
              </Animated.View>
            </View>

            {/* Done button */}
            <Animated.View style={[styles.doneButtonWrap, { opacity: buttonOpacity, transform: [{ translateY: buttonTranslateY }] }]}>
              <TouchableOpacity
                style={[styles.doneButton, { backgroundColor: COLORS.TEXT_PRIMARY }]}
                onPress={handleClose}
                activeOpacity={0.8}
              >
                <Text style={[styles.doneButtonText, { color: COLORS.BACKGROUND }]}>Done</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* isDone toggle (inside modal) */}
            <View style={styles.doneToggleWrap}>
              <TouchableOpacity
                onPress={() => setLocalDone(prev => !prev)}
                style={[styles.doneToggle, localDone ? styles.doneToggleOn : styles.doneToggleOff]}
                activeOpacity={0.8}
              >
                <Text style={styles.doneToggleText}>isDone: {localDone ? 'ON' : 'OFF'}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurWrap: { overflow: 'hidden' },
  sheet: {
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  riveContainer: { width: '100%', height: RIVE_HEIGHT, position: 'relative' },
  rive: { width: '100%', height: RIVE_HEIGHT },
  handleBar: {
    position: 'absolute',
    top: 12,
    width: 24,
    height: 3,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'center',
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 1,
  },
  sheetScroll: { flex: 1 },
  sheetScrollContent: { paddingBottom: 32, alignItems: 'center' },
  textBlock: { paddingHorizontal: SPACING.xl, gap: SPACING.sm, alignItems: 'center', width: '100%' },
  headlineRow: { height: 36, width: '100%', justifyContent: 'center', alignItems: 'center' },
  headline: { position: 'absolute', fontSize: 32, fontWeight: '600', letterSpacing: -0.64, textAlign: 'center' },
  subRow: { position: 'relative', minHeight: 42, width: '100%', justifyContent: 'center', alignItems: 'center' },
  subText: { position: 'absolute', left: 0, right: 0, fontSize: 15, fontWeight: '500', lineHeight: 21, textAlign: 'center' },
  doneButtonWrap: { marginTop: SPACING.sm, marginBottom: SPACING.lg, alignItems: 'center' },
  doneButton: { width: 320, height: 48, borderRadius: BORDER_RADIUS.full, alignItems: 'center', justifyContent: 'center' },
  doneButtonText: { fontSize: 15, fontWeight: '700', letterSpacing: 0.45, textTransform: 'uppercase' },
  doneToggleWrap: { alignItems: 'center', marginTop: SPACING.sm },
  doneToggle: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, minWidth: 160 },
  doneToggleOn: { backgroundColor: '#13bc80' },
  doneToggleOff: { backgroundColor: '#333' },
  doneToggleText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
