import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from './alert'
import { Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const InfoAlert: Story = {
  render: () => (
    <Alert variant="info">
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational message with important details.
      </AlertDescription>
    </Alert>
  ),
}

export const SuccessAlert: Story = {
  render: () => (
    <Alert variant="success">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your action was completed successfully!
      </AlertDescription>
    </Alert>
  ),
}

export const WarningAlert: Story = {
  render: () => (
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        Please review this important warning message.
      </AlertDescription>
    </Alert>
  ),
}

export const ErrorAlert: Story = {
  render: () => (
    <Alert variant="error">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        An error occurred. Please try again.
      </AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is an informational message with important details.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your action was completed successfully!
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please review this important warning message.
        </AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          An error occurred. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
}
