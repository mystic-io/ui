import React from 'react'
import { cn } from '../../utils/cn'

/**
 * Luma Forecast Card Component
 * Weather forecast display for multiple days
 */

export interface ForecastDay {
  day: string
  high: number
  low: number
  condition: string
  icon?: React.ReactNode
}

export interface ForecastCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Forecast data */
  forecast: ForecastDay[]
  /** Title */
  title?: string
}

export const ForecastCard = React.forwardRef<HTMLDivElement, ForecastCardProps>(
  ({ className, forecast, title = '5-Day Forecast', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-lg border border-gray-200 p-4',
          className
        )}
        {...props}
      >
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        <div className="space-y-3">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
                  {day.day}
                </span>
                {day.icon && (
                  <div className="flex-shrink-0">
                    {day.icon}
                  </div>
                )}
                <span className="text-sm text-gray-600">{day.condition}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-900">{day.high}°</span>
                <span className="text-gray-500">/</span>
                <span className="text-gray-600">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

ForecastCard.displayName = 'ForecastCard'

export default ForecastCard
