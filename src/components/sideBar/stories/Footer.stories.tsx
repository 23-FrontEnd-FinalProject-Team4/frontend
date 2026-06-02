import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import SidebarFooter from '@/components/sidebardddd/SidebarFooter';

const meta: Meta<typeof SidebarFooter> = {
  title: 'components/Sidebar/SidebarFooter',
  component: SidebarFooter,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SidebarFooter>;

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    collapsed: false,
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary w-[272px]">
        <Story />
      </div>
    ),
  ],
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
    collapsed: false,
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary w-[272px]">
        <Story />
      </div>
    ),
  ],
};

export const CollapsedLoggedIn: Story = {
  args: {
    isLoggedIn: true,
    collapsed: true,
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary w-[72px]">
        <Story />
      </div>
    ),
  ],
};

export const CollapsedLoggedOut: Story = {
  args: {
    isLoggedIn: false,
    collapsed: true,
  },
  decorators: [
    (Story) => (
      <div className="bg-background-primary w-[72px]">
        <Story />
      </div>
    ),
  ],
};
