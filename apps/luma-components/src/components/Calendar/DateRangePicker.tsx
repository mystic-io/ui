import React from 'react'
import { cn } from '../../utils/cn'
import { Calendar } from './Calendar'

/**
 * Luma DateRangePicker Component
 * Date range selection with two inputs
 */

export interface DateRangePickerProps {
  /** Start date */
  startDate?: Date
  /** End date */
  endDate?: Date
  /** Change handler */
  onChange?: (startDate: Date | null, endDate: Date | null) => void
  /** Label */
  label?: string
  /** Custom className */
  className?: string
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selecting, setSelecting] = React.useState<'start' | 'end'>('start')
  const containerRef = React.useRef<HTMLDivElement>(null)

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
    if (selecting === 'start') {
      onChange?.(date, endDate || null)
      setSelecting('end')
    } else {
      if (startDate && date < startDate) {
        onChange?.(date, startDate)
      } else {
        onChange?.(startDate || null, date)
      }
      setIsOpen(false)
      setSelecting('start')
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div ref={containerRef} className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={formatDate(startDate)}
            onClick={() => {
              setIsOpen(true)
              setSelecting('start')
            }}
            readOnly
            placeholder="Start date"
            className="flex-1 px-4 py-2 text-base rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="flex items-center text-gray-500">-</span>
          <input
            type="text"
            value={formatDate(endDate)}
            onClick={() => {
              setIsOpen(true)
              setSelecting('end')
            }}
            readOnly
            placeholder="End date"
            className="flex-1 px-4 py-2 text-base rounded-md border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-2 animate-in fade-in-0 zoom-in-95 duration-200">
            <Calendar
              value={selecting === 'start' ? startDate : endDate}
              onChange={handleDateChange}
              minDate={selecting === 'end' ? startDate : undefined}
            />
          </div>
        )}
      </div>
    </div>
  )
}

DateRangePicker.displayName = 'DateRangePicker'

export default DateRangePicker
