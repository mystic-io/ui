import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from './Typography'
import { Pill } from './Pill'

const meta: Meta<typeof Typography> = {
  title: 'Luma/Typography',
  component: Typography,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Typography>

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
}

export const BodyText: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-2xl">
      <Typography variant="body">
        This is regular body text. It uses the base font size and normal weight,
        perfect for paragraphs and content.
      </Typography>
      <Typography variant="bodySmall">
        This is small body text, useful for secondary content or captions.
      </Typography>
      <Typography variant="subtitle">
        This is a subtitle with relaxed line height, great for section descriptions.
      </Typography>
      <Typography variant="caption">
        This is caption text with wide letter spacing
      </Typography>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography color="primary">Primary text color</Typography>
      <Typography color="secondary">Secondary text color</Typography>
      <Typography color="tertiary">Tertiary text color</Typography>
      <Typography color="disabled">Disabled text color</Typography>
      <Typography color="error">Error text color</Typography>
      <Typography color="success">Success text color</Typography>
      <Typography color="warning">Warning text color</Typography>
      <Typography color="info">Info text color</Typography>
    </div>
  ),
}

export const Pills: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Pill>Default</Pill>
      <Pill variant="success">Success</Pill>
      <Pill variant="warning">Warning</Pill>
      <Pill variant="error">Error</Pill>
      <Pill variant="info">Info</Pill>
    </div>
  ),
}

export const SectionWithSubtitle: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography variant="h2">Section Title</Typography>
      <Typography variant="subtitle" color="secondary">
        This is a subtitle that provides context
      </Typography>
    </div>
  ),
}
