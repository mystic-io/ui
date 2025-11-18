import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'
import { Label } from './label'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rounded'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here.',
    className: 'w-[350px]',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="w-[350px] space-y-2">
      <Label htmlFor="message">Your Message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
}

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    placeholder: 'Rounded variant',
    className: 'w-[350px]',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
    className: 'w-[350px]',
  },
}

export const EventDescription: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <Label htmlFor="description">Event Description</Label>
      <Textarea
        id="description"
        placeholder="Describe your event in detail..."
        rows={5}
      />
      <p className="text-sm text-muted-foreground">
        Provide a detailed description of what attendees can expect.
      </p>
    </div>
  ),
}
