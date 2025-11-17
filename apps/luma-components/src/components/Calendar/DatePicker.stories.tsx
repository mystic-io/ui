import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'
import React from 'react'

const meta = {
  title: 'Components/DateTime/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select date',
    placeholder: 'Choose a date',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Event date',
    value: new Date(),
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(new Date())
    return (
      <div className="flex flex-col gap-4 w-80">
        <DatePicker
          label="Select date"
          value={value || undefined}
          onChange={setValue}
        />
        <p className="text-sm text-gray-600">
          Selected: {value ? value.toLocaleDateString() : 'None'}
        </p>
      </div>
    )
  },
}

export const WithMinMaxDates: Story = {
  render: () => {
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    return (
      <div className="w-80">
        <DatePicker
          label="Select date (current month only)"
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Birth date',
    error: 'Please select a valid date',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Event date',
    helperText: 'Choose the date for your event',
  },
}

export const CustomFormat: Story = {
  args: {
    label: 'Custom format',
    value: new Date(),
    format: (date: Date) => {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
