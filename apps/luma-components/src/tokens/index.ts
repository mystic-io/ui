/**
 * Luma Design System - Design Tokens
 * Complete token system extracted from https://luma.com/style-guide
 */

export * from './colors'
export * from './spacing'
export * from './typography'
export * from './shadows'

import { lumaColors, semanticColors, darkModeColors } from './colors'
import { spacing, componentSpacing } from './spacing'
import { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, typography } from './typography'
import { shadows, borders, borderRadius } from './shadows'

/**
 * Complete Luma design tokens
 */
export const lumaTokens = {
  colors: {
    scale: lumaColors,
    semantic: semanticColors,
    darkMode: darkModeColors,
  },
  spacing: {
    base: spacing,
    component: componentSpacing,
  },
  typography: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    presets: typography,
  },
  effects: {
    shadows,
    borders,
    borderRadius,
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
    toast: 1600,
  },
} as const

export default lumaTokens
