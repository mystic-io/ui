import type { Meta, StoryObj } from '@storybook/react'
import { Icon, type IconName } from './Icon'
import * as icons from './icons'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Calendar',
    size: 24,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Icon name="Star" size={16} />
      <Icon name="Star" size={24} />
      <Icon name="Star" size={32} />
      <Icon name="Star" size={48} />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Icon name="Heart" variant="outline" size={32} />
        <span className="text-sm text-gray-600">Outline</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="Heart" variant="filled" size={32} className="text-red-500" />
        <span className="text-sm text-gray-600">Filled</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="Heart" variant="thick" size={32} />
        <span className="text-sm text-gray-600">Thick</span>
      </div>
    </div>
  ),
}

export const WithColors: Story = {
  render: () => (
    <div className="flex gap-4">
      <Icon name="CheckCircle" size={32} className="text-green-600" />
      <Icon name="AlertCircle" size={32} className="text-blue-600" />
      <Icon name="XCircle" size={32} className="text-red-600" />
      <Icon name="AlertTriangle" size={32} className="text-yellow-600" />
    </div>
  ),
}

export const CoreUIIcons: Story = {
  render: () => {
    const coreIcons: IconName[] = [
      'Home', 'Search', 'Bell', 'User', 'Users', 'Settings',
      'Mail', 'Calendar', 'Clock', 'Star', 'Heart', 'Edit',
      'Trash', 'Plus', 'Minus', 'Check', 'Close', 'Menu',
      'Filter', 'Grid', 'List', 'Eye', 'EyeOff', 'Link',
    ]

    return (
      <div className="grid grid-cols-8 gap-6 p-4">
        {coreIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const NavigationIcons: Story = {
  render: () => {
    const navIcons: IconName[] = [
      'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight',
      'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    ]

    return (
      <div className="grid grid-cols-4 gap-6 p-4">
        {navIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const StatusIcons: Story = {
  render: () => {
    const statusIcons: IconName[] = [
      'CheckCircle', 'XCircle', 'AlertCircle', 'AlertTriangle',
      'HelpCircle', 'Info', 'Warning',
    ]

    return (
      <div className="grid grid-cols-4 gap-6 p-4">
        {statusIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const WeatherIcons: Story = {
  render: () => {
    const weatherIcons: IconName[] = [
      'Sun', 'Cloud', 'Rain', 'Snow', 'Wind', 'Thunderstorm', 'ClearNight',
    ]

    return (
      <div className="grid grid-cols-4 gap-6 p-4">
        {weatherIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={32} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const BrandIcons: Story = {
  render: () => {
    const brandIcons: IconName[] = [
      'Apple', 'Google', 'GitHub', 'Discord', 'Stripe',
      'Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'YouTube',
    ]

    return (
      <div className="grid grid-cols-5 gap-6 p-4">
        {brandIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} variant="filled" />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const FileIcons: Story = {
  render: () => {
    const fileIcons: IconName[] = [
      'File', 'FileText', 'Folder', 'Image', 'Download', 'Upload',
    ]

    return (
      <div className="grid grid-cols-3 gap-6 p-4">
        {fileIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const MediaIcons: Story = {
  render: () => {
    const mediaIcons: IconName[] = [
      'Play', 'Pause', 'Stop', 'Video', 'Maximize', 'Minimize', 'Refresh',
    ]

    return (
      <div className="grid grid-cols-4 gap-6 p-4">
        {mediaIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const CommunicationIcons: Story = {
  render: () => {
    const commIcons: IconName[] = [
      'Chat', 'MessageCircle', 'Mail', 'Phone', 'Send', 'Share',
    ]

    return (
      <div className="grid grid-cols-3 gap-6 p-4">
        {commIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const ActivityIcons: Story = {
  render: () => {
    const activityIcons: IconName[] = [
      'Running', 'Trophy', 'Target', 'Flag',
    ]

    return (
      <div className="grid grid-cols-4 gap-6 p-4">
        {activityIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center gap-2">
            <Icon name={iconName} size={24} />
            <span className="text-xs text-gray-600 text-center">{iconName}</span>
          </div>
        ))}
      </div>
    )
  },
}

export const AllIcons: Story = {
  render: () => {
    const allIconNames = Object.keys(icons) as IconName[]

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">All Icons ({allIconNames.length})</h2>
        <div className="grid grid-cols-10 gap-4">
          {allIconNames.map((iconName) => (
            <div
              key={iconName}
              className="flex flex-col items-center gap-2 p-3 hover:bg-gray-100 rounded transition-colors"
              title={iconName}
            >
              <Icon name={iconName} size={24} />
              <span className="text-xs text-gray-600 text-center truncate w-full">
                {iconName}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const InButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        <Icon name="Plus" size={20} />
        Create Event
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
        <Icon name="Download" size={20} />
        Download
      </button>
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
        Share
        <Icon name="ExternalLink" size={16} />
      </button>
    </div>
  ),
}
