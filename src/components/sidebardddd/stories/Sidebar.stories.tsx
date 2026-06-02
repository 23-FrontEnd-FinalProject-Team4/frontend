import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Sidebar from '@/components/sidebardddd/Sidebar';
import SidebarView from '@/components/sidebardddd/SidebarView';

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
    groups: [],
    isLoggedIn: true,
  },
};

export const LoggedOut: Story = {
  args: {
    groups: [],
    isLoggedIn: false,
  },
};

export const CollapsedLoggedIn: Story = {
  render: () => (
    <div className="w-[72px]">
      <SidebarView isLoggedIn={true} collapsed={true} onToggleCollapse={() => {}} groups={[]} />
    </div>
  ),
};

export const CollapsedLoggedOut: Story = {
  render: () => (
    <div className="w-[72px]">
      <SidebarView isLoggedIn={false} collapsed={true} onToggleCollapse={() => {}} groups={[]} />
    </div>
  ),
};
