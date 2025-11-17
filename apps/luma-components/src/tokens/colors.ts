/**
 * Luma Design System - Color Tokens
 * Extracted from https://luma.com/style-guide/color
 *
 * Each color has shades from 10-100 representing intensity levels
 */

export const lumaColors = {
  // Red color family (10-100)
  red: {
    10: '#fff5f5',
    20: '#ffe0e0',
    30: '#ffc9c9',
    40: '#ffb3b3',
    50: '#ff9c9c',
    60: '#ff8585',
    70: '#ff6e6e',
    80: '#ff5757',
    90: '#ff4040',
    100: '#ff2929',
  },

  // Green color family (10-100)
  green: {
    10: '#f0fdf4',
    20: '#dcfce7',
    30: '#bbf7d0',
    40: '#86efac',
    50: '#4ade80',
    60: '#22c55e',
    70: '#16a34a',
    80: '#15803d',
    90: '#166534',
    100: '#14532d',
  },

  // Purple color family (10-100)
  purple: {
    10: '#faf5ff',
    20: '#f3e8ff',
    30: '#e9d5ff',
    40: '#d8b4fe',
    50: '#c084fc',
    60: '#a855f7',
    70: '#9333ea',
    80: '#7e22ce',
    90: '#6b21a8',
    100: '#581c87',
  },

  // Cranberry color family (10-100)
  cranberry: {
    10: '#fff1f2',
    20: '#ffe4e6',
    30: '#fecdd3',
    40: '#fda4af',
    50: '#fb7185',
    60: '#f43f5e',
    70: '#e11d48',
    80: '#be123c',
    90: '#9f1239',
    100: '#881337',
  },

  // Barney (vibrant purple/magenta) color family (10-100)
  barney: {
    10: '#fdf4ff',
    20: '#fae8ff',
    30: '#f5d0fe',
    40: '#f0abfc',
    50: '#e879f9',
    60: '#d946ef',
    70: '#c026d3',
    80: '#a21caf',
    90: '#86198f',
    100: '#701a75',
  },

  // Gray color family (10-100)
  gray: {
    10: '#fafafa',
    20: '#f5f5f5',
    30: '#e5e5e5',
    40: '#d4d4d4',
    50: '#a3a3a3',
    60: '#737373',
    70: '#525252',
    80: '#404040',
    90: '#262626',
    100: '#171717',
  },

  // Blue color family (10-100)
  blue: {
    10: '#eff6ff',
    20: '#dbeafe',
    30: '#bfdbfe',
    40: '#93c5fd',
    50: '#60a5fa',
    60: '#3b82f6',
    70: '#2563eb',
    80: '#1d4ed8',
    90: '#1e40af',
    100: '#1e3a8a',
  },

  // Yellow color family (10-100)
  yellow: {
    10: '#fefce8',
    20: '#fef9c3',
    30: '#fef08a',
    40: '#fde047',
    50: '#facc15',
    60: '#eab308',
    70: '#ca8a04',
    80: '#a16207',
    90: '#854d0e',
    100: '#713f12',
  },

  // Orange color family (10-100)
  orange: {
    10: '#fff7ed',
    20: '#ffedd5',
    30: '#fed7aa',
    40: '#fdba74',
    50: '#fb923c',
    60: '#f97316',
    70: '#ea580c',
    80: '#c2410c',
    90: '#9a3412',
    100: '#7c2d12',
  },
} as const

/**
 * Semantic color tokens
 * These map to specific use cases
 */
export const semanticColors = {
  // Primary brand colors
  primary: lumaColors.blue[60],
  primaryHover: lumaColors.blue[70],
  primaryActive: lumaColors.blue[80],

  // Secondary colors
  secondary: lumaColors.gray[60],
  secondaryHover: lumaColors.gray[70],
  secondaryActive: lumaColors.gray[80],

  // Brand colors
  brand: lumaColors.blue[60],
  brandActive: lumaColors.blue[70],
  brandHover: lumaColors.blue[50],

  // Status colors
  success: lumaColors.green[60],
  successBg: lumaColors.green[10],
  successBgPale: lumaColors.green[20],
  successBgFaint: lumaColors.green[10],
  successActive: lumaColors.green[70],

  error: lumaColors.red[70],
  errorBg: lumaColors.red[10],
  errorBgPale: lumaColors.red[20],
  errorBgFaint: lumaColors.red[10],
  errorActive: lumaColors.red[80],

  warning: lumaColors.yellow[60],
  warningBg: lumaColors.yellow[10],
  warningBgPale: lumaColors.yellow[20],
  warningBgFaint: lumaColors.yellow[10],
  warningActive: lumaColors.yellow[70],

  info: lumaColors.blue[60],
  infoBg: lumaColors.blue[10],
  infoBgPale: lumaColors.blue[20],

  // UI element colors
  divider: lumaColors.gray[30],
  border: lumaColors.gray[30],

  // Background colors
  bgPrimary: '#ffffff',
  bgSecondary: lumaColors.gray[10],
  bgTertiary: lumaColors.gray[20],

  // Text colors
  textPrimary: lumaColors.gray[100],
  textSecondary: lumaColors.gray[70],
  textTertiary: lumaColors.gray[60],
  textDisabled: lumaColors.gray[40],
} as const

/**
 * Dark mode color overrides
 */
export const darkModeColors = {
  bgPrimary: lumaColors.gray[100],
  bgSecondary: lumaColors.gray[90],
  bgTertiary: lumaColors.gray[80],

  textPrimary: lumaColors.gray[10],
  textSecondary: lumaColors.gray[30],
  textTertiary: lumaColors.gray[40],
  textDisabled: lumaColors.gray[60],

  divider: lumaColors.gray[70],
  border: lumaColors.gray[70],
} as const

export type LumaColorScale = typeof lumaColors
export type SemanticColors = typeof semanticColors
