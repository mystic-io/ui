import React from 'react'
import { cn } from '../../utils/cn'
import { Calendar } from './Calendar'

/**
 * Luma DatePicker Component
 * Input field with calendar dropdown
 */

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  /** Selected date */
  value?: Date
  /** Change handler */
  onChange?: (date: Date | null) => void
  /** Date format */
  format?: (date: Date) => string
  /** Minimum date */
  minDate?: Date
  /** Maximum date */
  maxDate?: Date
  /** Label */
  label?: string
  /** Error message */
  error?: string
  /** Helper text */
  helperText?: string
}

const defaultFormat = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      value,
      onChange,
      format = defaultFormat,
      minDate,
      maxDate,
      label,
      error,
      helperText,
      id,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    const handleDateChange = (date: Date) => {
      onChange?.(date)
      setIsOpen(false)
    }

    const handleClear = () => {
      onChange?.(null)
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div ref={containerRef} className="relative">
          <div className="relative">
            <input
              ref={ref}
              id={inputId}
              type="text"
              value={value ? format(value) : ''}
              onClick={() => setIsOpen(!isOpen)}
              readOnly
              className={cn(
                'w-full px-4 py-2 pr-20 text-base rounded-md border transition-all',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'cursor-pointer',
                error
                  ? 'border-red-600 focus:ring-red-500'
                  : 'border-gray-300',
                className
              )}
              {...props}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {value && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear()
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Clear"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Toggle calendar"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-50 mt-2 animate-in fade-in-0 zoom-in-95 duration-200">
              <Calendar
                value={value}
                onChange={handleDateChange}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export default DatePicker
