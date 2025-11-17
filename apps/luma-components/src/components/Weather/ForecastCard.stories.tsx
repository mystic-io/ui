import type { Meta, StoryObj } from '@storybook/react'
import { ForecastCard } from './ForecastCard'
import React from 'react'

const meta = {
  title: 'Components/Data Display/ForecastCard',
  component: ForecastCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ForecastCard>

export default meta
type Story = StoryObj<typeof meta>

const CloudIcon = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)

const SunIcon = () => (
  <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const RainIcon = () => (
  <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z M7 19v2m5-2v2m5-2v2" />
  </svg>
)

const sampleForecast = [
  { day: 'Mon', icon: <SunIcon />, condition: 'Sunny', high: 75, low: 62 },
  { day: 'Tue', icon: <CloudIcon />, condition: 'Cloudy', high: 72, low: 60 },
  { day: 'Wed', icon: <RainIcon />, condition: 'Rainy', high: 68, low: 58 },
  { day: 'Thu', icon: <CloudIcon />, condition: 'Partly Cloudy', high: 70, low: 59 },
  { day: 'Fri', icon: <SunIcon />, condition: 'Sunny', high: 76, low: 63 },
]

export const Default: Story = {
  args: {
    title: '5-Day Forecast',
    forecast: sampleForecast,
  },
}

export const ThreeDayForecast: Story = {
  args: {
    title: '3-Day Forecast',
    forecast: sampleForecast.slice(0, 3),
  },
}

export const WeeklyForecast: Story = {
  args: {
    title: 'Weekly Forecast',
    forecast: [
      ...sampleForecast,
      { day: 'Sat', icon: <SunIcon />, condition: 'Sunny', high: 78, low: 64 },
      { day: 'Sun', icon: <CloudIcon />, condition: 'Partly Cloudy', high: 74, low: 61 },
    ],
  },
}

export const RainyWeek: Story = {
  args: {
    title: 'Rainy Week Ahead',
    forecast: [
      { day: 'Mon', icon: <RainIcon />, condition: 'Rainy', high: 65, low: 55 },
      { day: 'Tue', icon: <RainIcon />, condition: 'Heavy Rain', high: 63, low: 54 },
      { day: 'Wed', icon: <RainIcon />, condition: 'Rainy', high: 64, low: 56 },
      { day: 'Thu', icon: <CloudIcon />, condition: 'Cloudy', high: 66, low: 57 },
      { day: 'Fri', icon: <SunIcon />, condition: 'Clearing', high: 70, low: 59 },
    ],
  },
}

export const HotWeek: Story = {
  args: {
    title: 'Heat Wave',
    forecast: [
      { day: 'Mon', icon: <SunIcon />, condition: 'Hot & Sunny', high: 95, low: 78 },
      { day: 'Tue', icon: <SunIcon />, condition: 'Very Hot', high: 98, low: 80 },
      { day: 'Wed', icon: <SunIcon />, condition: 'Extreme Heat', high: 102, low: 82 },
      { day: 'Thu', icon: <SunIcon />, condition: 'Hot', high: 96, low: 79 },
      { day: 'Fri', icon: <CloudIcon />, condition: 'Cooling Down', high: 88, low: 72 },
    ],
  },
}
