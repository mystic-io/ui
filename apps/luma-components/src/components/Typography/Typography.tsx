import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/**
 * Luma Typography Component
 * Extracted from https://luma.com/style-guide/text
 */

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold leading-tight tracking-tight',
      h2: 'text-3xl font-bold leading-tight tracking-tight',
      h3: 'text-2xl font-semibold leading-snug tracking-tight',
      h4: 'text-xl font-semibold leading-snug',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
      body: 'text-base font-normal leading-normal',
      bodySmall: 'text-sm font-normal leading-normal',
      caption: 'text-xs font-normal leading-normal tracking-wide',
      subtitle: 'text-lg font-normal leading-relaxed',
    },
    color: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      tertiary: 'text-gray-600',
      disabled: 'text-gray-400',
      error: 'text-red-700',
      success: 'text-green-700',
      warning: 'text-yellow-700',
      info: 'text-blue-700',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
})

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  /** HTML element to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, as, children, ...props }, ref) => {
    const Component = as || (variant?.startsWith('h') ? variant : 'p')

    return React.createElement(
      Component,
      {
        ref,
        className: cn(typographyVariants({ variant, color }), className),
        ...props,
      },
      children
    )
  }
)

Typography.displayName = 'Typography'

export default Typography
export { typographyVariants }
