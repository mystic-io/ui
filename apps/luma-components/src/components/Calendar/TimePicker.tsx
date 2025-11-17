import React from 'react'
import { cn } from '../../utils/cn'

/**
 * Luma TimePicker Component
 * Time selection input
 */

export interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  /** Selected time (24-hour format) */
  value?: string
  /** Change handler */
  onChange?: (time: string) => void
  /** Label */
  label?: string
  /** Error message */
  error?: string
  /** Use 12-hour format */
  use12Hour?: boolean
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  (
    {
      className,
      value,
      onChange,
      label,
      error,
      use12Hour = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `timepicker-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="time"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            'w-full px-4 py-2 text-base rounded-md border transition-all',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            error
              ? 'border-red-600 focus:ring-red-500'
              : 'border-gray-300',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

TimePicker.displayName = 'TimePicker'

export default TimePicker
