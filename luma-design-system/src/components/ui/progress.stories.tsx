import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'
import { useState, useEffect } from 'react'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 33,
    className: 'w-[300px]',
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    className: 'w-[300px]',
  },
}

export const Loading: Story = {
  render: () => {
    const [progress, setProgress] = useState(13)

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])

    return <Progress value={progress} className="w-[300px]" />
  },
}

export const UploadProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 300)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between text-sm">
          <span>Uploading...</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>
    )
  },
}
