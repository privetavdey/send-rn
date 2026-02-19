// Design tokens ported to React Native (numeric values for StyleSheet)

export const COLORS = {
  BACKGROUND: '#090707',
  TEXT_PRIMARY: '#ffffff',
  TEXT_SECONDARY: 'rgba(255, 255, 255, 0.5)',
  TEXT_TERTIARY: 'rgba(255, 255, 255, 0.32)',
  TEXT_QUATERNARY: 'rgba(255, 255, 255, 0.48)',
  TEXT_QUINARY: 'rgba(255, 255, 255, 0.88)',
  ACCENT_GREEN: '#13bc80',
  BORDER: 'rgba(255, 255, 255, 0.1)',
  BORDER_SUBTLE: 'rgba(255, 255, 255, 0.04)',
  BG_SUBTLE: 'rgba(255, 255, 255, 0.08)',
} as const;

export const OPACITY = {
  FULL: 1,
  HIGH: 0.88,
  MEDIUM: 0.5,
  LOW: 0.32,
  LOWER: 0.1,
  LOWEST: 0.08,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 16,
  md: 24,
  lg: 32,
  full: 999,
} as const;
