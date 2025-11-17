import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker } from './DateRangePicker'
import React from 'react'

const meta = {
  title: 'Components/DateTime/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Select date range',
  },
}

export const WithValues: Story = {
  render: () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    return (
      <div className="w-96">
        <DateRangePicker
          label="Event dates"
          startDate={today}
          endDate={nextWeek}
        />
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [startDate, setStartDate] = React.useState<Date | null>(null)
    const [endDate, setEndDate] = React.useState<Date | null>(null)

    const handleChange = (start: Date | null, end: Date | null) => {
      setStartDate(start)
      setEndDate(end)
    }

    return (
      <div className="flex flex-col gap-4 w-96">
        <DateRangePicker
          label="Select date range"
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          onChange={handleChange}
        />
        <div className="text-sm text-gray-600">
          <p>Start: {startDate ? startDate.toLocaleDateString() : 'Not selected'}</p>
          <p>End: {endDate ? endDate.toLocaleDateString() : 'Not selected'}</p>
          {startDate && endDate && (
            <p className="mt-2 font-medium">
              Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          )}
        </div>
      </div>
    )
  },
}

export const BookingExample: Story = {
  render: () => {
    const [startDate, setStartDate] = React.useState<Date | null>(null)
    const [endDate, setEndDate] = React.useState<Date | null>(null)

    const handleChange = (start: Date | null, end: Date | null) => {
      setStartDate(start)
      setEndDate(end)
    }

    const totalNights = startDate && endDate
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0

    const pricePerNight = 150
    const totalPrice = totalNights * pricePerNight

    return (
      <div className="flex flex-col gap-4 w-96 p-6 bg-white rounded-lg border">
        <h3 className="text-lg font-semibold">Book your stay</h3>

        <DateRangePicker
          label="Travel dates"
          startDate={startDate || undefined}
          endDate={endDate || undefined}
          onChange={handleChange}
        />

        {totalNights > 0 && (
          <div className="p-4 bg-blue-50 rounded-md">
            <div className="flex justify-between text-sm mb-2">
              <span>{totalNights} nights</span>
              <span>${pricePerNight} per night</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        )}
      </div>
    )
  },
}
