import React from 'react'
import { cn } from '../../utils/cn'

/**
 * Luma Chat Message Component
 * Extracted from https://luma.com/style-guide/chat
 */

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Message author type */
  author: 'me' | 'other' | 'system'
  /** Avatar URL or element */
  avatar?: string | React.ReactNode
  /** Message content */
  message: React.ReactNode
  /** Timestamp */
  timestamp?: string
  /** Whether this is emoji-only message */
  emojiOnly?: boolean
  /** Read status */
  read?: boolean
  /** Error state */
  error?: boolean
}

export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      className,
      author,
      avatar,
      message,
      timestamp,
      emojiOnly,
      read,
      error,
      ...props
    },
    ref
  ) => {
    if (author === 'system') {
      return (
        <div
          ref={ref}
          className={cn(
            'text-center text-sm text-gray-500 py-2',
            className
          )}
          {...props}
        >
          {message}
        </div>
      )
    }

    const isMe = author === 'me'

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2',
          isMe && 'flex-row-reverse',
          className
        )}
        {...props}
      >
        {avatar && (
          <div className="flex-shrink-0">
            {typeof avatar === 'string' ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
            ) : (
              avatar
            )}
          </div>
        )}
        <div
          className={cn(
            'flex flex-col gap-1 max-w-[70%]',
            isMe && 'items-end'
          )}
        >
          <div
            className={cn(
              'px-3 py-2 rounded-2xl',
              emojiOnly
                ? 'text-4xl bg-transparent p-0'
                : isMe
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900',
              error && 'bg-red-100 text-red-900 border border-red-300'
            )}
            style={{ lineHeight: emojiOnly ? '1' : '1.4' }}
          >
            {message}
          </div>
          {(timestamp || read !== undefined) && (
            <div className="flex items-center gap-1 text-xs text-gray-500 px-1">
              {timestamp && <span>{timestamp}</span>}
              {read !== undefined && isMe && (
                <span>{read ? 'Seen' : 'Sent'}</span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ChatMessage.displayName = 'ChatMessage'

export default ChatMessage
