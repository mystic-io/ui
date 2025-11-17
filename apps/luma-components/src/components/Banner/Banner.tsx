import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

/**
 * Luma Banner Component
 * Extracted from https://luma.com/style-guide/banner
 *
 * Types: info, success, warning, error
 */

const bannerVariants = cva(
  'flex items-start gap-2 px-4 py-2.5 border rounded-md transition-colors',
  {
    variants: {
      type: {
        info: 'bg-blue-50 border-blue-200 text-blue-900',
        success: 'bg-green-50 border-green-200 text-green-900',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
        error: 'bg-red-50 border-red-200 text-red-900',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
)

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Icon to display */
  icon?: React.ReactNode
  /** Call-to-action element */
  cta?: React.ReactNode
  /** Dismiss handler */
  onDismiss?: () => void
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, type, icon, children, cta, onDismiss, ...props }, ref) => {
    const linkColorClass =
      type === 'success'
        ? 'text-green-700 hover:text-green-800'
        : type === 'warning'
          ? 'text-yellow-700 hover:text-yellow-800'
          : type === 'error'
            ? 'text-red-700 hover:text-red-800'
            : 'text-blue-700 hover:text-blue-800'

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ type }), className)}
        role="alert"
        {...props}
      >
        {icon && (
          <span className="flex-shrink-0 translate-y-0.5">{icon}</span>
        )}
        <div className="flex-1 flex flex-col gap-1.5">
          <div>{children}</div>
          {cta && (
            <div className={cn('text-sm font-medium', linkColorClass)}>
              {cta}
            </div>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-current opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Banner.displayName = 'Banner'

export default Banner
export { bannerVariants }
