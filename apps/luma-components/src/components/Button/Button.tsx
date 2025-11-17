import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/**
 * Luma Button Component
 * Extracted from https://luma.com/style-guide/button
 *
 * Supports:
 * - 15 color variants
 * - 6 sizes (xs, sm, md, lg, xl, 2xl)
 * - Multiple styles (solid, outline, ghost)
 * - Social integration variants
 * - Dropdown and split button variants
 */

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none',
  {
    variants: {
      variant: {
        solid: 'text-white shadow-sm hover:shadow-md',
        outline: 'bg-transparent border-2 hover:bg-opacity-5',
        ghost: 'bg-transparent hover:bg-opacity-10',
        link: 'bg-transparent underline-offset-4 hover:underline',
      },
      color: {
        primary: '',
        secondary: '',
        light: '',
        brand: '',
        success: '',
        error: '',
        warning: '',
        barney: '',
        blue: '',
        gray: '',
        green: '',
        orange: '',
        purple: '',
        red: '',
        yellow: '',
      },
      size: {
        xs: 'px-2 py-1 text-xs rounded gap-1',
        sm: 'px-3 py-1.5 text-sm rounded-md gap-1.5',
        md: 'px-4 py-2 text-base rounded-md gap-2',
        lg: 'px-6 py-3 text-lg rounded-lg gap-2',
        xl: 'px-8 py-4 text-xl rounded-lg gap-3',
        '2xl': 'px-10 py-5 text-2xl rounded-xl gap-3',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'relative text-transparent hover:text-transparent',
        false: '',
      },
    },
    compoundVariants: [
      // Primary color variants
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      },
      {
        variant: 'ghost',
        color: 'primary',
        className: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      },

      // Secondary color variants
      {
        variant: 'solid',
        color: 'secondary',
        className: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500',
      },
      {
        variant: 'outline',
        color: 'secondary',
        className: 'border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      },

      // Light variant
      {
        variant: 'solid',
        color: 'light',
        className: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400',
      },

      // Brand color variants
      {
        variant: 'solid',
        color: 'brand',
        className: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
      },
      {
        variant: 'outline',
        color: 'brand',
        className: 'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      },

      // Success color variants
      {
        variant: 'solid',
        color: 'success',
        className: 'bg-green-600 hover:bg-green-700 active:bg-green-800 focus:ring-green-500',
      },
      {
        variant: 'outline',
        color: 'success',
        className: 'border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
      },

      // Error color variants
      {
        variant: 'solid',
        color: 'error',
        className: 'bg-red-700 hover:bg-red-800 active:bg-red-900 focus:ring-red-600',
      },
      {
        variant: 'outline',
        color: 'error',
        className: 'border-red-700 text-red-700 hover:bg-red-50 focus:ring-red-600',
      },

      // Warning color variants
      {
        variant: 'solid',
        color: 'warning',
        className: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 focus:ring-yellow-500',
      },
      {
        variant: 'outline',
        color: 'warning',
        className: 'border-yellow-600 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500',
      },

      // Barney (vibrant purple) color variants
      {
        variant: 'solid',
        color: 'barney',
        className: 'bg-fuchsia-600 hover:bg-fuchsia-700 active:bg-fuchsia-800 focus:ring-fuchsia-500',
      },
      {
        variant: 'outline',
        color: 'barney',
        className: 'border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50 focus:ring-fuchsia-500',
      },

      // Blue color variants
      {
        variant: 'solid',
        color: 'blue',
        className: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500',
      },
      {
        variant: 'outline',
        color: 'blue',
        className: 'border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      },

      // Gray color variants
      {
        variant: 'solid',
        color: 'gray',
        className: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500',
      },
      {
        variant: 'outline',
        color: 'gray',
        className: 'border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500',
      },

      // Green color variants
      {
        variant: 'solid',
        color: 'green',
        className: 'bg-green-600 hover:bg-green-700 active:bg-green-800 focus:ring-green-500',
      },
      {
        variant: 'outline',
        color: 'green',
        className: 'border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
      },

      // Orange color variants
      {
        variant: 'solid',
        color: 'orange',
        className: 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus:ring-orange-500',
      },
      {
        variant: 'outline',
        color: 'orange',
        className: 'border-orange-600 text-orange-600 hover:bg-orange-50 focus:ring-orange-500',
      },

      // Purple color variants
      {
        variant: 'solid',
        color: 'purple',
        className: 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 focus:ring-purple-500',
      },
      {
        variant: 'outline',
        color: 'purple',
        className: 'border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500',
      },

      // Red color variants
      {
        variant: 'solid',
        color: 'red',
        className: 'bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
      },
      {
        variant: 'outline',
        color: 'red',
        className: 'border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500',
      },

      // Yellow color variants
      {
        variant: 'solid',
        color: 'yellow',
        className: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-500 text-gray-900',
      },
      {
        variant: 'outline',
        color: 'yellow',
        className: 'border-yellow-500 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /** Content to display inside the button */
  children?: React.ReactNode
  /** Icon to display before the button text */
  leftIcon?: React.ReactNode
  /** Icon to display after the button text */
  rightIcon?: React.ReactNode
  /** Loading state */
  loading?: boolean
  /** Custom className */
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      fullWidth,
      loading,
      children,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, color: color as any, size, fullWidth, loading }),
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
export { buttonVariants }
