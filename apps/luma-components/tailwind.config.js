import { lumaTokens } from './src/tokens'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Luma color scales
        ...Object.entries(lumaTokens.colors.scale).reduce((acc, [name, shades]) => {
          acc[name] = shades
          return acc
        }, {}),
      },
      spacing: lumaTokens.spacing.base,
      fontSize: lumaTokens.typography.fontSize,
      fontWeight: lumaTokens.typography.fontWeight,
      lineHeight: lumaTokens.typography.lineHeight,
      letterSpacing: lumaTokens.typography.letterSpacing,
      fontFamily: lumaTokens.typography.fontFamily,
      boxShadow: lumaTokens.effects.shadows,
      borderRadius: lumaTokens.effects.borderRadius,
      borderWidth: lumaTokens.effects.borders,
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: lumaTokens.zIndex,
    },
  },
  plugins: [],
}
