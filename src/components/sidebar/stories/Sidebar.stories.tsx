import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Sidebar from '@/components/sidebar/Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
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
    collapsed: false,
    isLoggedIn: true,
    selected: true,
  },
};

export const LoggedOut: Story = {
  args: {
    collapsed: false,
    isLoggedIn: false,
    selected: false,
  },
};

export const CollapsedLoggedIn: Story = {
  args: {
    collapsed: true,
    isLoggedIn: true,
    selected: true,
  },
};

export const CollapsedLoggedOut: Story = {
  args: {
    collapsed: true,
    isLoggedIn: false,
    selected: false,
  },
};
