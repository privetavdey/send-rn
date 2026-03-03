// Design tokens ported to React Native (numeric values for StyleSheet)

export const DARK_COLORS = {
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
  SHEET_BG: '#131111',
  SHIMMER_BASE: 'rgba(255, 255, 255, 0.48)',
  SHIMMER_HIGHLIGHT: 'rgba(255, 255, 255, 0.88)',
  BACKDROP: 'rgba(11, 6, 5, 0.5)',
  HANDLE: 'rgba(255, 255, 255, 0.2)',
};

export type ColorTheme = { [K in keyof typeof DARK_COLORS]: string };

export const LIGHT_COLORS: ColorTheme = {
  BACKGROUND: '#ffffff',
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: 'rgba(0, 0, 0, 0.5)',
  TEXT_TERTIARY: 'rgba(0, 0, 0, 0.32)',
  TEXT_QUATERNARY: 'rgba(0, 0, 0, 0.48)',
  TEXT_QUINARY: 'rgba(0, 0, 0, 0.88)',
  ACCENT_GREEN: '#13bc80',
  BORDER: 'rgba(0, 0, 0, 0.1)',
  BORDER_SUBTLE: 'rgba(0, 0, 0, 0.04)',
  BG_SUBTLE: 'rgba(0, 0, 0, 0.06)',
  SHEET_BG: '#f5f5f5',
  SHIMMER_BASE: 'rgba(0, 0, 0, 0.48)',
  SHIMMER_HIGHLIGHT: 'rgba(0, 0, 0, 0.88)',
  BACKDROP: 'rgba(0, 0, 0, 0.25)',
  HANDLE: 'rgba(0, 0, 0, 0.2)',
};

/** @deprecated Use DARK_COLORS or LIGHT_COLORS via useThemeColors() */
export const COLORS = DARK_COLORS;

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
