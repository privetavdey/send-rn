/**
 * OnrampOfframp — Main wallet screen ported to React Native.
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { SPACING, BORDER_RADIUS } from '../constants/styles';
import { useThemeColors } from '../constants/ThemeContext';
import { NavIcon } from './NavIcon';
import { RefreshLoader } from './RefreshLoader';
import { SendModal, type RiveInputs } from './SendModal';

const homeIconRiv = require('../assets/rive/home_icon.riv');
const browserIconRiv = require('../assets/rive/browser_icon.riv');
const historyIconRiv = require('../assets/rive/history_icon.riv');
const settingsIconRiv = require('../assets/rive/settings_icon.riv');

import {
  QrCodeIcon,
  ScanIcon,
  ArrowDownIcon,
  SendIcon,
  ReceiveIcon,
  ShieldIcon,
  SwapIcon,
  RecordsIcon,
  AleoLogoIcon,
} from '../assets/icons';

// ─── Local image assets ──────────────────────────────────────────────
const profileImage = require('../assets/images/profile-image.png');
const pondoLogo = require('../assets/images/pondo-logo.png');
const vusdcLogo = require('../assets/images/vusdc-logo.png');


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTENT_WIDTH = Math.min(SCREEN_WIDTH, 393);

// ─── Action button data ──────────────────────────────────────────────
const ACTION_BUTTONS = [
  { Icon: SendIcon, label: 'SEND', action: 'send' as const },
  { Icon: ReceiveIcon, label: 'RECEIVE', action: null },
  { Icon: ShieldIcon, label: 'SHIELD', action: null },
  { Icon: SwapIcon, label: 'SWAP', action: null },
  { Icon: RecordsIcon, label: 'RECORDS', action: null },
];

// ─── Token list data ─────────────────────────────────────────────────
interface TokenItem {
  icon: 'aleo' | 'pondo' | 'vusdc';
  name: string;
  amount: string;
  value: string;
}

const TOKENS: TokenItem[] = [
  { icon: 'aleo', name: 'ALEO', amount: '125,077 ALEO', value: '$15,009' },
  { icon: 'pondo', name: 'Pondo', amount: '3,171,936 PNDO', value: '$2,648' },
  { icon: 'vusdc', name: 'vUSDC', amount: '0 VUSDC', value: '$0.00' },
];

interface OnrampOfframpProps {
  riveInputs: RiveInputs;
  onToggle: (key: keyof RiveInputs, value: boolean) => void;
}

export default function OnrampOfframp({ riveInputs, onToggle }: OnrampOfframpProps) {
  const colors = useThemeColors();
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const handleRefresh = useCallback(() => {
    if (refreshing) return;
    setRefreshing(true);
  }, [refreshing]);

  const handleRefreshFinished = useCallback(() => {
    setRefreshing(false);
  }, []);

  const tokenIconStyle = [styles.tokenIconContainer, { borderColor: colors.BORDER, backgroundColor: colors.BACKGROUND }];

  const renderTokenIcon = (type: TokenItem['icon']) => {
    switch (type) {
      case 'aleo':
        return (
          <View style={tokenIconStyle}>
            <AleoLogoIcon width={32} height={32} />
          </View>
        );
      case 'pondo':
        return (
          <View style={tokenIconStyle}>
            <Image source={pondoLogo} style={styles.tokenImage} />
          </View>
        );
      case 'vusdc':
        return (
          <View style={tokenIconStyle}>
            <Image source={vusdcLogo} style={styles.tokenImage} />
          </View>
        );
    }
  };

  const isDark = riveInputs.isDark;

  return (
    <View style={[styles.root, { backgroundColor: colors.BACKGROUND }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={[styles.profileImageWrapper, { borderColor: colors.BORDER }]}>
          <Image source={profileImage} style={styles.profileImage} />
          <LinearGradient
            colors={['rgba(0,212,255,1)', 'rgba(9,9,121,1)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={styles.headerActions}>
          <View style={[styles.headerButton, { backgroundColor: colors.BG_SUBTLE }]}>
            <QrCodeIcon width={20} height={20} color={colors.TEXT_PRIMARY} />
          </View>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: colors.BG_SUBTLE }]}
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            <ScanIcon width={20} height={20} color={colors.TEXT_PRIMARY} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Pull-to-refresh Loader ── */}
      {refreshing && (
        <View style={styles.loaderContainer}>
          <RefreshLoader
            style={styles.loaderRive}
            onFinished={handleRefreshFinished}
          />
        </View>
      )}

      {/* ── Balance Card ── */}
      <LinearGradient
        colors={['transparent', colors.BG_SUBTLE]}
        style={styles.balanceCard}
      >
        <Text style={[styles.balanceLabel, { color: colors.TEXT_PRIMARY }]}>Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={[styles.balanceAmount, { color: colors.TEXT_PRIMARY }]}>
            $17,657
            <Text style={{ color: colors.TEXT_TERTIARY }}>.89</Text>
          </Text>
          <View style={[styles.arrowButton, { backgroundColor: colors.BG_SUBTLE }]}>
            <ArrowDownIcon width={11} height={7} color={colors.TEXT_PRIMARY} />
          </View>
        </View>
      </LinearGradient>

      {/* ── Action Buttons ── */}
      <View style={styles.actionsRow}>
        {ACTION_BUTTONS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionItem}
            activeOpacity={0.7}
            onPress={item.action === 'send' ? () => setIsSendModalOpen(true) : undefined}
          >
            <View style={[styles.actionIconBox, { backgroundColor: colors.BG_SUBTLE }]}>
              <item.Icon width={24} height={24} color={colors.TEXT_PRIMARY} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.TEXT_PRIMARY }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── State Machine Harness ── */}
      <View style={styles.harnessRow}>
        {(['isSend', 'isShield', 'isSwap'] as const).map((key) => (
          <TouchableOpacity
            key={key}
            onPress={() => onToggle(key, !riveInputs[key])}
            style={[styles.harnessToggle, riveInputs[key] ? styles.harnessOn : styles.harnessOff]}
            activeOpacity={0.8}
          >
            <Text style={styles.harnessText}>{key}: {riveInputs[key] ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => onToggle('isDark', !riveInputs.isDark)}
          style={[
            styles.harnessToggle,
            { backgroundColor: isDark ? '#1a1a1a' : '#e5e5e5', borderWidth: 1, borderColor: isDark ? '#444' : '#ccc' },
          ]}
          activeOpacity={0.8}
        >
          <Text style={[styles.harnessText, { color: isDark ? '#fff' : '#000' }]}>
            {isDark ? '● Dark' : '○ Light'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Token List ── */}
      <LinearGradient
        colors={[colors.BG_SUBTLE, 'transparent']}
        style={styles.tokenListContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tokenListContent}>
          {TOKENS.map((token, index) => (
            <View key={index} style={styles.tokenRow}>
              {renderTokenIcon(token.icon)}
              <View style={styles.tokenInfo}>
                <View>
                  <Text style={[styles.tokenName, { color: colors.TEXT_PRIMARY }]}>{token.name}</Text>
                  <Text style={[styles.tokenAmount, { color: colors.TEXT_SECONDARY }]}>{token.amount}</Text>
                </View>
                <Text style={[styles.tokenValue, { color: colors.TEXT_PRIMARY }]}>{token.value}</Text>
              </View>
            </View>
          ))}

          {/* Manage tokens */}
          <View style={styles.manageTokensContainer}>
            <Text style={[styles.manageTokensText, { color: colors.TEXT_PRIMARY }]}>Don't see your token?</Text>
            <TouchableOpacity
              style={[styles.manageTokensButton, { backgroundColor: colors.BG_SUBTLE, borderColor: colors.BORDER_SUBTLE }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.manageTokensButtonText, { color: colors.TEXT_QUINARY }]}>Manage tokens</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* ── Bottom Nav Bar ── */}
      <View style={[styles.bottomNavOuter, { borderColor: colors.BORDER_SUBTLE }]}>
        <BlurView
          intensity={40}
          tint={isDark ? 'dark' : 'light'}
          style={[styles.bottomNavBlur, { backgroundColor: isDark ? 'rgba(9,7,7,0.64)' : 'rgba(255,255,255,0.72)' }]}
        >
          <View style={styles.bottomNavInner}>
            <View style={styles.navItem}>
              <NavIcon
                source={homeIconRiv}
                isActive={activeTab === 0}
                onPress={() => setActiveTab(0)}
                size={24}
              />
            </View>
            <View style={styles.navItem}>
              <NavIcon
                source={browserIconRiv}
                isActive={activeTab === 1}
                onPress={() => setActiveTab(1)}
                size={24}
              />
            </View>
            <View style={styles.navItem}>
              <NavIcon
                source={historyIconRiv}
                isActive={activeTab === 2}
                onPress={() => setActiveTab(2)}
                size={24}
              />
            </View>
            <View style={styles.navItem}>
              <NavIcon
                source={settingsIconRiv}
                isActive={activeTab === 3}
                onPress={() => setActiveTab(3)}
                size={24}
              />
            </View>
          </View>
        </BlurView>
        <View style={[styles.navGlow, { borderColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }]} pointerEvents="none" />
      </View>

      {/* ── Home Indicator ── */}
      <View style={styles.homeIndicator}>
        <View style={[styles.homeIndicatorBar, { backgroundColor: colors.TEXT_PRIMARY }]} />
      </View>

      <SendModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        riveInputs={riveInputs}
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: SPACING.xs,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: CONTENT_WIDTH - 40,
    marginBottom: SPACING.sm,
  },
  profileImageWrapper: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: BORDER_RADIUS.full,
    position: 'absolute',
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  headerButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Loader
  loaderContainer: {
    width: CONTENT_WIDTH - 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  loaderRive: {
    width: CONTENT_WIDTH - 40,
    height: 120,
  },

  // Balance
  balanceCard: {
    width: CONTENT_WIDTH - 40,
    height: 168,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingBottom: 19,
    justifyContent: 'flex-end',
    marginBottom: SPACING.lg,
  },
  balanceLabel: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 15 * 1.35,
    opacity: 0.48,
    marginBottom: SPACING.sm,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '500',
    letterSpacing: -0.8,
  },
  arrowButton: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }],
  },

  // Actions
  actionsRow: {
    flexDirection: 'row',
    gap: 27,
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  actionItem: {
    alignItems: 'center',
    gap: 12,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.66,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // Harness
  harnessRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  harnessToggle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  harnessOn: { backgroundColor: '#13bc80' },
  harnessOff: { backgroundColor: '#333' },
  harnessText: { color: '#fff', fontSize: 11, fontWeight: '600' },

  // Token List
  tokenListContainer: {
    width: CONTENT_WIDTH - 40,
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingTop: 20,
  },
  tokenListContent: {
    gap: 24,
    paddingBottom: 120,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  tokenIconContainer: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tokenImage: {
    width: 38,
    height: 38,
    borderRadius: 40,
  },
  tokenInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenName: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 15 * 1.35,
    letterSpacing: 0.15,
  },
  tokenAmount: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    letterSpacing: 0.13,
    textTransform: 'uppercase',
  },
  tokenValue: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 15 * 1.35,
    letterSpacing: 0.15,
    textTransform: 'uppercase',
    textAlign: 'right',
  },

  // Manage tokens
  manageTokensContainer: {
    alignItems: 'center',
    gap: 15,
    opacity: 0.5,
    marginTop: 24,
  },
  manageTokensText: {
    fontSize: 15,
    fontWeight: '500',
  },
  manageTokensButton: {
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageTokensButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Bottom Nav
  bottomNavOuter: {
    position: 'absolute',
    bottom: 42,
    width: 280,
    height: 64,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
  },
  bottomNavBlur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
  },
  bottomNavInner: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 16,
    overflow: 'hidden',
    padding: 8,
  },
  navGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
  },

  // Home Indicator
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 139,
    height: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIndicatorBar: {
    width: 139,
    height: 5,
    borderRadius: 100,
  },
});
