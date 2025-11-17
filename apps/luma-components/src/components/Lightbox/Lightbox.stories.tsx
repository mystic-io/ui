import type { Meta, StoryObj } from '@storybook/react'
import { Lightbox } from './Lightbox'
import { Button } from '../Button'
import React from 'react'

const meta = {
  title: 'Components/Utility/Lightbox',
  component: Lightbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Lightbox>

export default meta
type Story = StoryObj<typeof meta>

const sampleImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&h=800&fit=crop',
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Lightbox</Button>
        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          images={sampleImages}
          currentIndex={0}
          onNavigate={() => {}}
        />
      </>
    )
  },
}

export const WithGallery: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [currentIndex, setCurrentIndex] = React.useState(0)

    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-2">
          {sampleImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-32 h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                setCurrentIndex(index)
                setOpen(true)
              }}
            />
          ))}
        </div>

        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          images={sampleImages}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
        />
      </div>
    )
  },
}

export const SingleImage: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <img
          src={sampleImages[0]}
          alt="Preview"
          className="w-64 h-64 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setOpen(true)}
        />
        <Lightbox
          open={open}
          onClose={() => setOpen(false)}
          images={[sampleImages[0]]}
          currentIndex={0}
          onNavigate={() => {}}
        />
      </>
    )
  },
}
