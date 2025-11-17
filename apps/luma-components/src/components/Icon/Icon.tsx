import React from 'react'
import { cn } from '../../utils/cn'
import * as icons from './icons'

/**
 * Luma Icon Component
 * Scalable SVG icon system with multiple variants and sizes
 */

export type IconName = keyof typeof icons

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name */
  name: IconName
  /** Icon size */
  size?: 16 | 24 | 32 | 48 | number
  /** Icon variant */
  variant?: 'outline' | 'filled' | 'thick'
  /** Custom color (defaults to currentColor) */
  color?: string
  /** Custom className */
  className?: string
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      size = 24,
      variant = 'outline',
      color = 'currentColor',
      className,
      ...props
    },
    ref
  ) => {
    const IconComponent = icons[name]

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found`)
      return null
    }

    const strokeWidth = variant === 'thick' ? 2.5 : variant === 'outline' ? 2 : 0

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={variant === 'filled' ? color : 'none'}
        stroke={variant !== 'filled' ? color : 'none'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('inline-block', className)}
        aria-hidden="true"
        {...props}
      >
        <IconComponent />
      </svg>
    )
  }
)

Icon.displayName = 'Icon'

export default Icon
