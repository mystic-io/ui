import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

/**
 * Button component from Luma Design System
 * Extracted from https://luma.com/style-guide/button
 *
 * Features:
 * - 15 color variants
 * - 6 sizes
 * - Multiple styles (solid, outline, ghost)
 * - Loading states
 * - Icon support
 */
const meta: Meta<typeof Button> = {
  title: 'Luma/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'light',
        'brand',
        'success',
        'error',
        'warning',
        'barney',
        'blue',
        'gray',
        'green',
        'orange',
        'purple',
        'red',
        'yellow',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {[
        'primary',
        'secondary',
        'light',
        'brand',
        'success',
        'error',
        'warning',
        'barney',
        'blue',
        'gray',
        'green',
        'orange',
        'purple',
        'red',
        'yellow',
      ].map((color) => (
        <Button key={color} color={color as any}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Button>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((size) => (
        <Button key={size} size={size as any}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="solid" color="success">
          Solid Success
        </Button>
        <Button variant="outline" color="success">
          Outline Success
        </Button>
        <Button variant="ghost" color="success">
          Ghost Success
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="solid" color="error">
          Solid Error
        </Button>
        <Button variant="outline" color="error">
          Outline Error
        </Button>
        <Button variant="ghost" color="error">
          Ghost Error
        </Button>
      </div>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button leftIcon={<span>←</span>}>Back</Button>
      <Button rightIcon={<span>→</span>}>Next</Button>
      <Button leftIcon={<span>+</span>} rightIcon={<span>→</span>}>
        Add Item
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button loading color="success">
        Saving...
      </Button>
      <Button loading color="error">
        Deleting...
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled variant="ghost">
        Disabled Ghost
      </Button>
    </div>
  ),
}

export const FullWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline">
        Full Width Outline
      </Button>
    </div>
  ),
}

/**
 * Complete color matrix - All 15 colors in 6 sizes (matching Luma)
 */
export const CompleteColorMatrix: Story = {
  render: () => {
    const colors = [
      'primary',
      'secondary',
      'light',
      'brand',
      'success',
      'error',
      'warning',
      'barney',
      'blue',
      'gray',
      'green',
      'orange',
      'purple',
      'red',
      'yellow',
    ]
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']

    return (
      <div className="flex flex-col gap-8">
        {colors.map((color) => (
          <div key={color} className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold capitalize">{color}</h3>
            <div className="flex flex-wrap items-end gap-2">
              {sizes.map((size) => (
                <Button key={`${color}-${size}`} color={color as any} size={size as any}>
                  {size}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  },
}
