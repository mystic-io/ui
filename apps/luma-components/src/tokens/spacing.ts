/**
 * Luma Design System - Spacing Tokens
 * Extracted from https://luma.com/style-guide
 *
 * Based on rem units: 0.75rem, 1rem, 1.5rem, 2rem, 10rem
 */

export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px - Used in nav padding
  4: '1rem', // 16px - Used in nav padding horizontal, nav-items margin
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px - Used in logo margin
  7: '1.75rem', // 28px
  8: '2rem', // 32px - Used in h1 margin, title margin
  9: '2.25rem', // 36px - Used in count selector min-width
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px - Used in container padding-bottom
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
} as const

/**
 * Component-specific spacing tokens
 */
export const componentSpacing = {
  // Input padding
  inputPadding: '0.75rem 1rem',

  // Button padding by size
  buttonPaddingSmall: '0.25rem 0.75rem',
  buttonPaddingMedium: '0.5rem 1rem',
  buttonPaddingLarge: '0.75rem 1.5rem',
  buttonPaddingExtraLarge: '1rem 2rem',

  // Nav padding
  navPadding: '0.75rem 1rem',
  navItemMargin: '1rem',
  logoMargin: '1.5rem',

  // Modal/Overlay padding
  modalHorizontalPadding: '1.5rem',
  modalVerticalPadding: '1.5rem',

  // Banner/Alert padding
  bannerPadding: '0.5rem 0.75rem 0.5rem 1rem',

  // Chat message padding
  chatMessagePaddingOuter: '0.75rem 1rem',
  chatMessagePaddingInner: '0.5rem 0.75rem',
  chatMessageAvatarMargin: '0.5rem',
  chatMessageMarginSameAuthor: '0.25rem',
  chatMessageMarginDifferentAuthor: '0.75rem',

  // Card padding
  cardPadding: '1rem',
  cardPaddingLarge: '1.5rem',

  // Form spacing
  formFieldGap: '0.5rem',
  formSectionGap: '1.5rem',

  // Grid/Layout gaps
  gridGap: '1rem',
  gridGapLarge: '1.5rem',
  timelineSectionGap: '3rem',
} as const

export type Spacing = typeof spacing
export type ComponentSpacing = typeof componentSpacing
