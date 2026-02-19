/**
 * SVG icon components for React Native.
 * Converted from the raw SVG files exported from Figma.
 * All icons accept `width`, `height`, and `color` props.
 */
import React from 'react';
import Svg, { Path, G, Rect, Circle, Defs, ClipPath } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
}

// ─── QR Code / Eye Icon ──────────────────────────────────────────────
export const QrCodeIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = 'white',
  opacity = 0.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G opacity={opacity}>
      <Path
        d="M10 4C14.5714 4 18 10 18 10C18 10 14.5714 16 10 16C5.42857 16 2 10 2 10C2 10 5.42857 4 10 4ZM7 10L10 13L13 10L10 7L7 10Z"
        fill={color}
      />
    </G>
  </Svg>
);

// ─── Scan / Refresh Icon ─────────────────────────────────────────────
export const ScanIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  color = 'white',
  opacity = 0.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G opacity={opacity}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 3V8.56641H11.4336V6.71094H13.957C13.2809 5.89713 12.3673 5.30847 11.3379 5.03125C10.1484 4.71098 8.88288 4.82807 7.77246 5.36133C6.66244 5.89458 5.78072 6.80831 5.28711 7.93652C4.79349 9.06497 4.72005 10.3335 5.08203 11.5107C5.44415 12.6881 6.21721 13.6974 7.25977 14.3535C8.30229 15.0095 9.54654 15.2698 10.7646 15.0869C11.9826 14.9039 13.0946 14.2887 13.8984 13.3555C14.7019 12.4224 15.144 11.2323 15.1445 10.001H17C16.9996 13.8665 13.8665 16.9996 10.001 17C6.13506 17 3.00044 13.8668 3 10.001C3 6.13479 6.13479 3 10.001 3L10.4072 3.01172C11.3535 3.06647 12.2805 3.31317 13.1309 3.73828C13.8905 4.11815 14.5716 4.63415 15.1445 5.25586V3H17ZM13.0176 3.96484L12.708 3.81934C12.7002 3.8159 12.6915 3.81298 12.6836 3.80957C12.796 3.85831 12.9076 3.90988 13.0176 3.96484Z"
        fill={color}
      />
    </G>
  </Svg>
);

// ─── Arrow Down Icon ─────────────────────────────────────────────────
export const ArrowDownIcon: React.FC<IconProps> = ({
  width = 11,
  height = 7,
  color = 'white',
}) => (
  <Svg width={width} height={height} viewBox="0 0 11 6.99984" fill="none">
    <Path
      d="M5.76191 6.99984L0 2.33385V0.000292167L5.76191 4.66633L11 0V2.33355L5.76191 6.99984Z"
      fill={color}
    />
  </Svg>
);

// ─── Send Icon ───────────────────────────────────────────────────────
export const SendIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'white',
  opacity = 0.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G opacity={opacity}>
      <Path
        d="M18 11.9684L18 14.6702L13.0226 9.63509L13.0226 24L11.0021 24L11.0021 9.63509L6 14.6702V11.9684L12.0123 6L18 11.9684Z"
        fill={color}
      />
      <Circle cx={12} cy={12} r={11} stroke={color} strokeWidth={2} />
    </G>
  </Svg>
);

// ─── Receive Icon ────────────────────────────────────────────────────
export const ReceiveIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'white',
  opacity = 0.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G opacity={opacity}>
      <Path
        d="M18 12.0316L18 9.32982L13.0226 14.3649L13.0226 0L11.0021 5.96046e-08L11.0021 14.3649L6 9.32982V12.0316L12.0123 18L18 12.0316Z"
        fill={color}
      />
      <Circle cx={12} cy={12} r={11} stroke={color} strokeWidth={2} />
    </G>
  </Svg>
);

// ─── Shield Icon ─────────────────────────────────────────────────────
export const ShieldIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'white',
  opacity = 0.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G opacity={opacity}>
      <Path
        d="M15.3666 20.3167L12 22L8.63344 20.3167C4.56803 18.284 2 14.1289 2 9.58359V4L2.35762 3.85695C5.42436 2.63025 8.69701 2 12 2C15.303 2 18.5756 2.63025 21.6424 3.85695L22 4V9.58359C22 14.1289 19.432 18.284 15.3666 20.3167Z"
        stroke={color}
        strokeWidth={2}
      />
      <Path d="M15 11L12 14L9 11L12 8L15 11Z" fill={color} />
    </G>
  </Svg>
);

// ─── Swap Icon ───────────────────────────────────────────────────────
export const SwapIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'white',
  opacity = 0.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G opacity={opacity}>
      <Path
        d="M13 8.96842L13 11.6702L8.02259 6.63509L8.02259 20H6.00205L6.00205 6.63509L1 11.6702V8.96842L7.01232 3L13 8.96842Z"
        fill={color}
      />
      <Path
        d="M23 15.0316L23 12.3298L18.0226 17.3649L18.0226 4L16.0021 4L16.0021 17.3649L11 12.3298V15.0316L17.0123 21L23 15.0316Z"
        fill={color}
      />
    </G>
  </Svg>
);

// ─── Records Icon ────────────────────────────────────────────────────
export const RecordsIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = 'white',
  opacity = 0.5,
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <G opacity={opacity}>
      <Path
        d="M9.19995 20C4.78167 20 1.19995 16.4183 1.19995 12C1.19995 7.58172 4.78167 4 9.19995 4"
        stroke={color}
        strokeWidth={2}
      />
      <Rect x={11.2} y={3} width={2} height={18} fill={color} />
      <Path
        d="M15.2 20C19.6182 20 23.2 16.4183 23.2 12C23.2 7.58172 19.6182 4 15.2 4"
        stroke={color}
        strokeWidth={2}
      />
    </G>
  </Svg>
);

// ─── Aleo Logo Icon ─────────────────────────────────────────────────
export const AleoLogoIcon: React.FC<IconProps> = ({
  width = 32,
  height = 32,
  color = '#EBF9F0',
}) => (
  <Svg width={width} height={height} viewBox="0 0 32 32.0083" fill="none">
    <Path
      d="M18.1483 7.32812H16.2364H14.1452L10.6699 17.4697H12.7863L15.601 9.19616H16.6199L19.4343 17.4697H15.5547H12.7863L12.1313 19.3378H16.1854H20.0652L21.8847 24.6754H24.0684L18.1483 7.32812Z"
      fill={color}
    />
    <Path
      d="M8.20032 24.6775H10.3111L12.1308 19.3398H10.0292L8.20032 24.6775Z"
      fill={color}
    />
    <Path
      d="M8.57181 17.4727L7.93164 19.3407H10.0288L10.6689 17.4727H8.57181Z"
      fill={color}
    />
  </Svg>
);

export default {
  QrCodeIcon,
  ScanIcon,
  ArrowDownIcon,
  SendIcon,
  ReceiveIcon,
  ShieldIcon,
  SwapIcon,
  RecordsIcon,
  AleoLogoIcon,
};
