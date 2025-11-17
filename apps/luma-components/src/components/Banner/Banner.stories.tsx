import type { Meta, StoryObj } from '@storybook/react'
import { Banner } from './Banner'
import { useState } from 'react'

const meta: Meta<typeof Banner> = {
  title: 'Luma/Banner',
  component: Banner,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Banner>

export const Info: Story = {
  args: {
    type: 'info',
    children: 'This is an informational message.',
  },
}

export const Success: Story = {
  args: {
    type: 'success',
    children: 'Your changes have been saved successfully!',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    children: 'Please review your information before continuing.',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    children: 'An error occurred while processing your request.',
  },
}

export const WithIcon: Story = {
  args: {
    type: 'info',
    icon: <span>ℹ️</span>,
    children: 'New features have been added to your account.',
  },
}

export const WithCTA: Story = {
  args: {
    type: 'success',
    children: 'Your payment was successful!',
    cta: (
      <a href="#" className="underline">
        View receipt →
      </a>
    ),
  },
}

export const Dismissible: Story = {
  render: () => {
    const [show, setShow] = useState(true)

    return show ? (
      <Banner type="info" onDismiss={() => setShow(false)}>
        This banner can be dismissed
      </Banner>
    ) : (
      <button onClick={() => setShow(true)} className="text-blue-600">
        Show banner again
      </button>
    )
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Banner type="info" icon={<span>ℹ️</span>}>
        This is an informational message with important details.
      </Banner>
      <Banner type="success" icon={<span>✓</span>}>
        Your operation completed successfully!
      </Banner>
      <Banner type="warning" icon={<span>⚠</span>}>
        Please review this warning before proceeding.
      </Banner>
      <Banner type="error" icon={<span>✕</span>}>
        An error occurred. Please try again.
      </Banner>
    </div>
  ),
}
