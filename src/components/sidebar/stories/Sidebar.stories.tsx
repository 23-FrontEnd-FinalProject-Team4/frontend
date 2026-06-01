import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Sidebar from '@/components/sidebar/Sidebar';
import SidebarView from '@/components/sidebar/SidebarView';

const meta: Meta<typeof Sidebar> = {
  title: 'components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-background-secondary h-screen">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    isLoggedIn: true,
    selected: true,
  },
  render: (args) => (
    <div className="w-[272px]">
      <Sidebar {...args} />
    </div>
  ),
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    selected: false,
  },
  render: (args) => (
    <div className="w-[272px]">
      <Sidebar {...args} />
    </div>
  ),
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    selected: false,
  },
  render: (args) => (
    <div className="w-[272px]">
      <Sidebar {...args} />
    </div>
  ),
};

export const CollapsedLoggedIn: Story = {
  render: () => (
    <div className="w-[72px]">
      <SidebarView isLoggedIn={true} collapsed={true} selected={true} onToggleCollapse={() => {}} />
    </div>
  ),
};

export const CollapsedLoggedOut: Story = {
  render: () => (
    <div className="w-[72px]">
      <SidebarView
        isLoggedIn={false}
        collapsed={true}
        selected={false}
        onToggleCollapse={() => {}}
      />
    </div>
  ),
};
