/**
 * Luma Design System - Shadow Tokens
 * Extracted from Luma style guide
 */

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  inputFocus: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  buttonFocus: '0 0 0 3px rgba(59, 130, 246, 0.2)',
} as const

export const borders = {
  none: '0',
  thin: '1px',
  base: '1px',
  thick: '2px',
  thicker: '4px',
} as const

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  base: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px', // Circular
  chatAvatar: '1000px', // Used in chat avatars (basically circular)
  chatAvatarSquare: '0.25rem',
} as const

export type Shadows = typeof shadows
export type Borders = typeof borders
export type BorderRadius = typeof borderRadius
