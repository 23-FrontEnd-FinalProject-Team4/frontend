import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import GroupItem from '@/components/sidebar/GroupItems';
import Sidebar from '@/components/sidebar/Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
  },
};

export const LoggedOut: Story = {
  args: {
    isLoggedIn: false,
  },
};

/**
 * GroupItem Stories
 */

export const GroupDefault: StoryObj<typeof GroupItem> = {
  render: () => (
    <div className="w-[240px]">
      <GroupItem id={1} name="경영관리팀" selected={false} />
    </div>
  ),
};

export const GroupSelected: StoryObj<typeof GroupItem> = {
  render: () => (
    <div className="w-[240px]">
      <GroupItem id={1} name="경영관리팀" selected={true} />
    </div>
  ),
};
