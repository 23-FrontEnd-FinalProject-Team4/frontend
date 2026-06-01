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
  args: {
    groups: [],
    isLoggedIn: true,
  },
};

export const CollapsedLoggedOut: Story = {
  args: {
    groups: [],
    isLoggedIn: false,
  },
};
