import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/**
 * Luma Textarea Component
 * Extracted from https://luma.com/style-guide/input
 */

const textareaVariants = cva(
  'w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-vertical',
  {
    variants: {
      variant: {
        default:
          'bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        filled: 'bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        error: 'bg-white border-2 border-red-600 focus:border-red-700 focus:ring-2 focus:ring-red-100',
        rounded: 'rounded-xl',
      },
      size: {
        sm: 'px-3 py-2 text-sm rounded min-h-[80px]',
        md: 'px-4 py-2.5 text-base rounded-md min-h-[100px]',
        lg: 'px-5 py-3 text-lg rounded-lg min-h-[120px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  /** Error message */
  error?: string
  /** Helper text */
  helperText?: string
  /** Label */
  label?: string
  /** Max height in pixels */
  maxHeight?: number
  /** Wrapper class name */
  wrapperClassName?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      error,
      helperText,
      label,
      maxHeight = 150,
      wrapperClassName,
      id,
      style,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const hasError = Boolean(error)

    return (
      <div className={cn('flex flex-col gap-1.5', wrapperClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            textareaVariants({ variant: hasError ? 'error' : variant, size }),
            className
          )}
          style={{
            ...style,
            maxHeight: `${maxHeight}px`,
          }}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
export { textareaVariants }
