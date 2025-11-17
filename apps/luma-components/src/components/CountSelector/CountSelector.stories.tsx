import type { Meta, StoryObj } from '@storybook/react'
import { CountSelector } from './CountSelector'
import React from 'react'

const meta = {
  title: 'Components/Utility/CountSelector',
  component: CountSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CountSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 1,
    min: 0,
    max: 100,
  },
}

export const WithInitialValue: Story = {
  args: {
    label: 'Number of guests',
    defaultValue: 2,
    min: 1,
    max: 10,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <CountSelector label="Small" size="sm" defaultValue={1} min={0} max={10} />
      <CountSelector label="Medium" size="md" defaultValue={1} min={0} max={10} />
      <CountSelector label="Large" size="lg" defaultValue={1} min={0} max={10} />
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState(5)
    return (
      <div className="flex flex-col gap-4">
        <CountSelector
          label="Tickets"
          value={value}
          onChange={setValue}
          min={1}
          max={10}
        />
        <p className="text-sm text-gray-600">Current value: {value}</p>
      </div>
    )
  },
}

export const WithStep: Story = {
  args: {
    label: 'Count by 5s',
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 5,
  },
}

export const WithError: Story = {
  args: {
    label: 'Count with error',
    defaultValue: 1,
    min: 0,
    max: 10,
    error: 'This field is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 5,
    min: 0,
    max: 10,
    disabled: true,
  },
}
