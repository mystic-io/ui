import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from './Popover'
import { Button } from '../Button'

const meta = {
  title: 'Components/Utility/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: <Button>Hover me</Button>,
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Popover Title</h3>
        <p className="text-sm text-gray-600">
          This is a popover with interactive content.
        </p>
      </div>
    ),
  },
}

export const ClickTrigger: Story = {
  args: {
    trigger: <Button>Click me</Button>,
    triggerMode: 'click',
    children: (
      <div className="p-4">
        <h3 className="font-semibold mb-2">Click Popover</h3>
        <p className="text-sm text-gray-600 mb-3">
          This popover opens on click.
        </p>
        <Button size="sm">Action</Button>
      </div>
    ),
  },
}

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-12 p-24">
      <Popover
        trigger={<Button>Top</Button>}
        placement="top"
      >
        <div className="p-3">
          <p className="text-sm">Placement: Top</p>
        </div>
      </Popover>

      <Popover
        trigger={<Button>Right</Button>}
        placement="right"
      >
        <div className="p-3">
          <p className="text-sm">Placement: Right</p>
        </div>
      </Popover>

      <Popover
        trigger={<Button>Bottom</Button>}
        placement="bottom"
      >
        <div className="p-3">
          <p className="text-sm">Placement: Bottom</p>
        </div>
      </Popover>

      <Popover
        trigger={<Button>Left</Button>}
        placement="left"
      >
        <div className="p-3">
          <p className="text-sm">Placement: Left</p>
        </div>
      </Popover>
    </div>
  ),
}

export const WithRichContent: Story = {
  args: {
    trigger: <Button>User Info</Button>,
    children: (
      <div className="p-4 max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-gray-600">Software Engineer</p>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-3">
          Building great products with React and TypeScript.
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Profile</Button>
          <Button size="sm">Follow</Button>
        </div>
      </div>
    ),
  },
}
