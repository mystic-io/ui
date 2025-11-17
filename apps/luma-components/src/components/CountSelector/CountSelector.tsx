import React from 'react'
import { cn } from '../../utils/cn'

/**
 * Luma Count Selector Component
 * Extracted from https://luma.com/style-guide/controls
 * Increment/decrement number input
 */

export interface CountSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value */
  value?: number
  /** Default value (uncontrolled) */
  defaultValue?: number
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Change handler */
  onChange?: (value: number) => void
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export const CountSelector = React.forwardRef<HTMLDivElement, CountSelectorProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      disabled,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = controlledValue ?? internalValue

    const handleIncrement = () => {
      const newValue = Math.min(value + step, max)
      if (!controlledValue) setInternalValue(newValue)
      onChange?.(newValue)
    }

    const handleDecrement = () => {
      const newValue = Math.max(value - step, min)
      if (!controlledValue) setInternalValue(newValue)
      onChange?.(newValue)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value) || 0
      const clampedValue = Math.min(Math.max(newValue, min), max)
      if (!controlledValue) setInternalValue(clampedValue)
      onChange?.(clampedValue)
    }

    const sizeClasses = {
      sm: 'h-7',
      md: 'h-9',
      lg: 'h-11',
    }

    const inputSizeClasses = {
      sm: 'w-12 text-sm',
      md: 'w-16 text-base',
      lg: 'w-20 text-lg',
    }

    const buttonSizeClasses = {
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-11 h-11',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center border border-gray-300 rounded-md overflow-hidden',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          className={cn(
            buttonSizeClasses[size],
            'flex items-center justify-center bg-white hover:bg-gray-100',
            'border-r border-gray-300 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white'
          )}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={cn(
            inputSizeClasses[size],
            sizeClasses[size],
            'text-center border-0 focus:outline-none focus:ring-0',
            'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          )}
        />

        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          className={cn(
            buttonSizeClasses[size],
            'flex items-center justify-center bg-white hover:bg-gray-100',
            'border-l border-gray-300 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white'
          )}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    )
  }
)

CountSelector.displayName = 'CountSelector'

export default CountSelector
