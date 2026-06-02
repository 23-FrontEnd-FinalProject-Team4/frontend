import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import GroupItem from '@/components/sidebar/GroupItems';

const meta: Meta<typeof GroupItem> = {
  title: 'components/Sidebar/GroupMenu',
  component: GroupItem,
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 1,
    name: '경영관리팀',
    selected: false,
    collapsed: false,
  },
};

export default meta;

type Story = StoryObj<typeof GroupItem>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
export const Collapsed: Story = { args: { collapsed: true } };

export const CollapsedSelected: Story = {
  args: {
    collapsed: true,
    selected: true,
  },
};
