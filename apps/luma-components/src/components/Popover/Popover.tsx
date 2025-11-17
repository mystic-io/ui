import React from 'react'
import { cn } from '../../utils/cn'

/**
 * Luma Popover Component
 * Interactive tooltip-like component that can contain interactive content
 */

export interface PopoverProps {
  /** Trigger element */
  trigger: React.ReactNode
  /** Popover content */
  children: React.ReactNode
  /** Trigger mode */
  triggerMode?: 'click' | 'hover'
  /** Placement */
  placement?: 'top' | 'right' | 'bottom' | 'left'
  /** Custom className */
  className?: string
  /** Show arrow */
  showArrow?: boolean
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  triggerMode = 'click',
  placement = 'bottom',
  className,
  showArrow = true,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const popoverRef = React.useRef<HTMLDivElement>(null)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (triggerMode === 'click' && isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, triggerMode])

  const handleMouseEnter = () => {
    if (triggerMode === 'hover') {
      timeoutRef.current = setTimeout(() => setIsOpen(true), 200)
    }
  }

  const handleMouseLeave = () => {
    if (triggerMode === 'hover') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      setIsOpen(false)
    }
  }

  const handleClick = () => {
    if (triggerMode === 'click') {
      setIsOpen(!isOpen)
    }
  }

  const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-gray-200',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-gray-200',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-gray-200',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-gray-200',
  }

  return (
    <div
      ref={popoverRef}
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick}>{trigger}</div>
      {isOpen && (
        <div
          role="dialog"
          className={cn(
            'absolute z-50 bg-white rounded-md shadow-lg border border-gray-200',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            placementClasses[placement],
            className
          )}
        >
          {children}
          {showArrow && (
            <div
              className={cn(
                'absolute w-0 h-0 border-4 border-white',
                arrowClasses[placement]
              )}
            />
          )}
        </div>
      )}
    </div>
  )
}

Popover.displayName = 'Popover'

export default Popover
