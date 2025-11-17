import type { Meta, StoryObj } from '@storybook/react'
import { ChatMessage } from './ChatMessage'

const meta: Meta<typeof ChatMessage> = {
  title: 'Luma/ChatMessage',
  component: ChatMessage,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ChatMessage>

export const FromMe: Story = {
  args: {
    author: 'me',
    message: 'Hello! How are you?',
    avatar: 'https://i.pravatar.cc/150?img=1',
    timestamp: '2:30 PM',
  },
}

export const FromOther: Story = {
  args: {
    author: 'other',
    message: "I'm doing great, thanks for asking!",
    avatar: 'https://i.pravatar.cc/150?img=2',
    timestamp: '2:31 PM',
  },
}

export const System: Story = {
  args: {
    author: 'system',
    message: 'John joined the chat',
  },
}

export const EmojiOnly: Story = {
  args: {
    author: 'other',
    message: '👍',
    emojiOnly: true,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
}

export const WithReadStatus: Story = {
  args: {
    author: 'me',
    message: 'Did you see my last message?',
    avatar: 'https://i.pravatar.cc/150?img=1',
    timestamp: '3:45 PM',
    read: true,
  },
}

export const ErrorMessage: Story = {
  args: {
    author: 'me',
    message: 'This message failed to send',
    avatar: 'https://i.pravatar.cc/150?img=1',
    error: true,
  },
}

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-2xl p-4 bg-gray-50 rounded-lg">
      <ChatMessage
        author="system"
        message="Today, 2:30 PM"
      />
      <ChatMessage
        author="other"
        message="Hey! How's the project going?"
        avatar="https://i.pravatar.cc/150?img=2"
        timestamp="2:30 PM"
      />
      <ChatMessage
        author="me"
        message="Going well! I just finished the design system."
        avatar="https://i.pravatar.cc/150?img=1"
        timestamp="2:31 PM"
        read={true}
      />
      <ChatMessage
        author="me"
        message="Want to take a look?"
        avatar="https://i.pravatar.cc/150?img=1"
        timestamp="2:31 PM"
        read={false}
      />
      <ChatMessage
        author="other"
        message="Absolutely! 🎉"
        avatar="https://i.pravatar.cc/150?img=2"
        timestamp="2:32 PM"
      />
      <ChatMessage
        author="other"
        message="🔥"
        avatar="https://i.pravatar.cc/150?img=2"
        emojiOnly={true}
      />
    </div>
  ),
}
