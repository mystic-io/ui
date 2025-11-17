import type { Meta, StoryObj } from '@storybook/react'
import { Calendar } from './Calendar'
import React from 'react'

const meta = {
  title: 'Components/DateTime/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: new Date(),
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<Date>(new Date())
    return (
      <div className="flex flex-col gap-4">
        <Calendar value={value} onChange={setValue} />
        <p className="text-sm text-gray-600 text-center">
          Selected: {value.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
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
      <div className="flex flex-col gap-4">
        <Calendar
          defaultValue={today}
          minDate={minDate}
          maxDate={maxDate}
        />
        <p className="text-sm text-gray-600 text-center">
          Only current month is selectable
        </p>
      </div>
    )
  },
}

export const WithDisabledDates: Story = {
  render: () => {
    const today = new Date()
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), 5),
      new Date(today.getFullYear(), today.getMonth(), 15),
      new Date(today.getFullYear(), today.getMonth(), 25),
    ]

    return (
      <div className="flex flex-col gap-4">
        <Calendar
          defaultValue={today}
          disabledDates={disabledDates}
        />
        <p className="text-sm text-gray-600 text-center">
          5th, 15th, and 25th are disabled
        </p>
      </div>
    )
  },
}

export const FutureDatesOnly: Story = {
  render: () => {
    const today = new Date()
    return (
      <div className="flex flex-col gap-4">
        <Calendar
          defaultValue={today}
          minDate={today}
        />
        <p className="text-sm text-gray-600 text-center">
          Only future dates are selectable
        </p>
      </div>
    )
  },
}
