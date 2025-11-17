import React from 'react'
import { cn } from '../../utils/cn'

/**
 * Social Button Component
 * Extracted from https://luma.com/style-guide/button
 *
 * Pre-styled buttons for social media platforms
 */

export interface SocialButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  platform:
    | 'discord'
    | 'ethereum'
    | 'solana'
    | 'twitter'
    | 'google'
    | 'youtube'
    | 'zoom'
    | 'apple'
    | 'facebook'
    | 'linkedin'
}

const socialStyles: Record<
  SocialButtonProps['platform'],
  { color: string; hoverColor: string; icon: string }
> = {
  discord: {
    color: 'bg-[#5865F2]',
    hoverColor: 'hover:bg-[#4752C4]',
    icon: '🎮', // Placeholder - would use actual icon
  },
  ethereum: {
    color: 'bg-[#627EEA]',
    hoverColor: 'hover:bg-[#4E6BC7]',
    icon: '⟠',
  },
  solana: {
    color: 'bg-[#9945FF]',
    hoverColor: 'hover:bg-[#7A37CC]',
    icon: '◎',
  },
  twitter: {
    color: 'bg-[#1DA1F2]',
    hoverColor: 'hover:bg-[#1A8CD8]',
    icon: '🐦',
  },
  google: {
    color: 'bg-white text-gray-700 border border-gray-300',
    hoverColor: 'hover:bg-gray-50',
    icon: 'G',
  },
  youtube: {
    color: 'bg-[#FF0000]',
    hoverColor: 'hover:bg-[#CC0000]',
    icon: '▶',
  },
  zoom: {
    color: 'bg-[#2D8CFF]',
    hoverColor: 'hover:bg-[#2472CC]',
    icon: '📹',
  },
  apple: {
    color: 'bg-black',
    hoverColor: 'hover:bg-gray-900',
    icon: '',
  },
  facebook: {
    color: 'bg-[#1877F2]',
    hoverColor: 'hover:bg-[#1464C2]',
    icon: 'f',
  },
  linkedin: {
    color: 'bg-[#0A66C2]',
    hoverColor: 'hover:bg-[#084D92]',
    icon: 'in',
  },
}

export const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ platform, className, children, ...props }, ref) => {
    const platformName = platform.charAt(0).toUpperCase() + platform.slice(1)
    const styles = socialStyles[platform]

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-md text-white shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          styles.color,
          styles.hoverColor,
          'focus:ring-opacity-50',
          platform === 'google' && 'focus:ring-gray-400',
          className
        )}
        {...props}
      >
        <span className="mr-2">{styles.icon}</span>
        {children || platformName}
      </button>
    )
  }
)

SocialButton.displayName = 'SocialButton'

export default SocialButton
