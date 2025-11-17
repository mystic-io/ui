import React from 'react'
import { cn } from '../../utils/cn'

/**
 * Luma Calendar Component
 * Date selection calendar without external dependencies
 */

export interface CalendarProps {
  /** Selected date */
  value?: Date
  /** Default value (uncontrolled) */
  defaultValue?: Date
  /** Change handler */
  onChange?: (date: Date) => void
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Disabled dates */
  disabledDates?: Date[]
  /** Custom className */
  className?: string
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const Calendar: React.FC<CalendarProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  className,
}) => {
  const [selectedDate, setSelectedDate] = React.useState(defaultValue || new Date())
  const [viewDate, setViewDate] = React.useState(controlledValue || defaultValue || new Date())

  const value = controlledValue || selectedDate

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return disabledDates.some((d) => isSameDay(d, date))
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
    if (isDateDisabled(newDate)) return

    setSelectedDate(newDate)
    onChange?.(newDate)
  }

  const handlePreviousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))
  }

  const daysInMonth = getDaysInMonth(viewDate)
  const firstDayOfMonth = getFirstDayOfMonth(viewDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  return (
    <div className={cn('bg-white p-4 rounded-lg border border-gray-200', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h2 className="text-lg font-semibold">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </h2>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
          const isSelected = isSameDay(date, value)
          const isToday = isSameDay(date, new Date())
          const isDisabled = isDateDisabled(date)

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={cn(
                'aspect-square flex items-center justify-center rounded-md text-sm transition-colors',
                'hover:bg-gray-100',
                isSelected && 'bg-blue-600 text-white hover:bg-blue-700',
                isToday && !isSelected && 'bg-blue-50 text-blue-600 font-semibold',
                isDisabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = 'Calendar'

export default Calendar
