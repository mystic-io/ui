import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Luma/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'This username is already taken',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
}

export const Filled: Story = {
  args: {
    label: 'Name',
    variant: 'filled',
    placeholder: 'Enter your name',
  },
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input
        label="Search"
        placeholder="Search..."
        leftIcon={<span>🔍</span>}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        rightAccessory={<button className="text-blue-600 text-sm font-medium">Verify</button>}
      />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Input label="Default" placeholder="Default state" />
      <Input label="Disabled" placeholder="Disabled state" disabled />
      <Input label="With Value" value="Some text" readOnly />
      <Input label="Error" error="This field has an error" />
    </div>
  ),
}
