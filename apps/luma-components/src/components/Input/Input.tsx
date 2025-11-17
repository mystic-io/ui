import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/**
 * Luma Input Component
 * Extracted from https://luma.com/style-guide/input
 *
 * Variants: default, filled, error
 * States: default, focused, error, disabled
 */

const inputVariants = cva(
  'w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        filled: 'bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        error: 'bg-white border-2 border-red-600 focus:border-red-700 focus:ring-2 focus:ring-red-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded',
        md: 'px-4 py-2 text-base rounded-md',
        lg: 'px-5 py-3 text-lg rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Error message to display */
  error?: string
  /** Helper text to display */
  helperText?: string
  /** Label for the input */
  label?: string
  /** Icon to display on the left */
  leftIcon?: React.ReactNode
  /** Icon or element to display on the right (accessory) */
  rightAccessory?: React.ReactNode
  /** Wrapper class name */
  wrapperClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      error,
      helperText,
      label,
      leftIcon,
      rightAccessory,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const hasError = Boolean(error)

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: hasError ? 'error' : variant, size }),
              leftIcon && 'pl-10',
              rightAccessory && 'pr-10',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {rightAccessory && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightAccessory}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
export { inputVariants }
