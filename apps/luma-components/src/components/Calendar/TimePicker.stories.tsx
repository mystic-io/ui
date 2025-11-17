import type { Meta, StoryObj } from '@storybook/react'
import { TimePicker } from './TimePicker'
import React from 'react'

const meta = {
  title: 'Components/DateTime/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select time',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Event time',
    value: '14:30',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('09:00')
    return (
      <div className="flex flex-col gap-4 w-80">
        <TimePicker
          label="Select time"
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-gray-600">
          Selected: {value || 'None'}
        </p>
      </div>
    )
  },
}

export const With12HourFormat: Story = {
  args: {
    label: 'Meeting time',
    use12Hour: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Start time',
    error: 'Please select a valid time',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Time',
    value: '10:00',
    disabled: true,
  },
}

export const Multiple: Story = {
  render: () => {
    const [startTime, setStartTime] = React.useState('09:00')
    const [endTime, setEndTime] = React.useState('17:00')

    return (
      <div className="flex flex-col gap-4 w-80">
        <TimePicker
          label="Start time"
          value={startTime}
          onChange={setStartTime}
        />
        <TimePicker
          label="End time"
          value={endTime}
          onChange={setEndTime}
        />
        <p className="text-sm text-gray-600">
          Duration: {startTime} - {endTime}
        </p>
      </div>
    )
  },
}
