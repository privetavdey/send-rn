/**
 * OnrampOfframp — Main wallet screen ported to React Native.
 */
import React, { useState } from 'react';
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

import { COLORS, SPACING, BORDER_RADIUS } from '../constants/styles';
import { NavIcon } from './NavIcon';

const homeIconRiv = require('../assets/rive/home_icon.riv');
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
  { Icon: SendIcon, label: 'SEND' },
  { Icon: ReceiveIcon, label: 'RECEIVE' },
  { Icon: ShieldIcon, label: 'SHIELD' },
  { Icon: SwapIcon, label: 'SWAP' },
  { Icon: RecordsIcon, label: 'RECORDS' },
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

export default function OnrampOfframp() {
  const [activeTab, setActiveTab] = useState(0);

  const renderTokenIcon = (type: TokenItem['icon']) => {
    switch (type) {
      case 'aleo':
        return (
          <View style={styles.tokenIconContainer}>
            <AleoLogoIcon width={32} height={32} />
          </View>
        );
      case 'pondo':
        return (
          <View style={styles.tokenIconContainer}>
            <Image source={pondoLogo} style={styles.tokenImage} />
          </View>
        );
      case 'vusdc':
        return (
          <View style={styles.tokenIconContainer}>
            <Image source={vusdcLogo} style={styles.tokenImage} />
          </View>
        );
    }
  };

  return (
    <View style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.profileImageWrapper}>
          <Image source={profileImage} style={styles.profileImage} />
          <LinearGradient
            colors={['rgba(0,212,255,1)', 'rgba(9,9,121,1)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={styles.headerActions}>
          <View style={styles.headerButton}>
            <QrCodeIcon width={20} height={20} />
          </View>
          <View style={styles.headerButton}>
            <ScanIcon width={20} height={20} />
          </View>
        </View>
      </View>

      {/* ── Balance Card ── */}
      <LinearGradient
        colors={['rgba(255,255,255,0)', COLORS.BG_SUBTLE]}
        style={styles.balanceCard}
      >
        <Text style={styles.balanceLabel}>Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>
            $17,657
            <Text style={styles.balanceCents}>.89</Text>
          </Text>
          <View style={styles.arrowButton}>
            <ArrowDownIcon width={11} height={7} color={COLORS.TEXT_PRIMARY} />
          </View>
        </View>
      </LinearGradient>

      {/* ── Action Buttons ── */}
      <View style={styles.actionsRow}>
        {ACTION_BUTTONS.map((item, index) => (
          <TouchableOpacity key={index} style={styles.actionItem} activeOpacity={0.7}>
            <View style={styles.actionIconBox}>
              <item.Icon width={24} height={24} color="white" />
            </View>
            <Text style={styles.actionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── Token List ── */}
      <LinearGradient
        colors={[COLORS.BG_SUBTLE, 'rgba(255,255,255,0)']}
        style={styles.tokenListContainer}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.tokenListContent}>
          {TOKENS.map((token, index) => (
            <View key={index} style={styles.tokenRow}>
              {renderTokenIcon(token.icon)}
              <View style={styles.tokenInfo}>
                <View>
                  <Text style={styles.tokenName}>{token.name}</Text>
                  <Text style={styles.tokenAmount}>{token.amount}</Text>
                </View>
                <Text style={styles.tokenValue}>{token.value}</Text>
              </View>
            </View>
          ))}

          {/* Manage tokens */}
          <View style={styles.manageTokensContainer}>
            <Text style={styles.manageTokensText}>Don't see your token?</Text>
            <TouchableOpacity style={styles.manageTokensButton} activeOpacity={0.7}>
              <Text style={styles.manageTokensButtonText}>Manage tokens</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* ── Bottom Nav Bar ── */}
      <View style={styles.bottomNavOuter}>
        <BlurView intensity={40} tint="dark" style={styles.bottomNavBlur}>
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
                source={historyIconRiv}
                isActive={activeTab === 1}
                onPress={() => setActiveTab(1)}
                size={24}
              />
            </View>
            <View style={styles.navItem}>
              <NavIcon
                source={settingsIconRiv}
                isActive={activeTab === 2}
                onPress={() => setActiveTab(2)}
                size={24}
              />
            </View>
          </View>
        </BlurView>
        {/* Inner glow overlay */}
        <View style={styles.navGlow} pointerEvents="none" />
      </View>

      {/* ── Home Indicator ── */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicatorBar} />
      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
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
    borderColor: COLORS.BORDER,
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
    backgroundColor: COLORS.BG_SUBTLE,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: COLORS.TEXT_PRIMARY,
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
    color: COLORS.TEXT_PRIMARY,
    letterSpacing: -0.8,
  },
  balanceCents: {
    color: COLORS.TEXT_TERTIARY,
  },
  arrowButton: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.BG_SUBTLE,
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
    backgroundColor: COLORS.BG_SUBTLE,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.TEXT_PRIMARY,
    letterSpacing: 0.66,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

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
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.BACKGROUND,
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
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 15 * 1.35,
    letterSpacing: 0.15,
  },
  tokenAmount: {
    fontSize: 13,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 13 * 1.4,
    letterSpacing: 0.13,
    textTransform: 'uppercase',
  },
  tokenValue: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
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
    color: COLORS.TEXT_PRIMARY,
  },
  manageTokensButton: {
    height: 40,
    backgroundColor: COLORS.BG_SUBTLE,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.BORDER_SUBTLE,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageTokensButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_QUINARY,
  },

  // Bottom Nav
  bottomNavOuter: {
    position: 'absolute',
    bottom: 42,
    width: 232,
    height: 64,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.BORDER_SUBTLE,
  },
  bottomNavBlur: {
    flex: 1,
    backgroundColor: 'rgba(9,7,7,0.64)',
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
    // Approximate inner glow — shadow inset isn't supported in RN,
    // so we fake it with a semi-transparent border + shadow
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
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
    backgroundColor: COLORS.TEXT_PRIMARY,
  },
});
