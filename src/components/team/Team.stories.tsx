import sampleImage from '@/assets/icons/sampleImage.svg';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Team from './Team';

const MEMBERS = [
  { id: 1, name: '최일우', imageUrl: sampleImage },
  { id: 2, name: '김도욱', imageUrl: sampleImage },
  { id: 3, name: '이수진', imageUrl: sampleImage },
];

const ADMIN_ARGS = {
  name: '경영관리팀',
  imageUrl: sampleImage,
  members: MEMBERS,
  memberCount: 4,
  completedTaskCount: 5,
  totalTaskCount: 20,
  progressValue: 25,
  variant: 'admin' as const,
};

const USER_ARGS = {
  name: '경영관리팀',
  members: MEMBERS,
  memberCount: 4,
  variant: 'user' as const,
};

const meta = {
  title: 'Components/Team',
  component: Team,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['admin', 'user'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    progressValue: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
  args: {
    onSettingsClick: fn(),
  },
} satisfies Meta<typeof Team>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminLarge: Story = {
  args: {
    ...ADMIN_ARGS,
    size: 'lg',
  },
};

export const AdminMedium: Story = {
  args: {
    ...ADMIN_ARGS,
    size: 'md',
  },
};

export const AdminSmall: Story = {
  args: {
    ...ADMIN_ARGS,
    size: 'sm',
  },
};

export const UserLarge: Story = {
  args: {
    ...USER_ARGS,
    size: 'lg',
  },
};

export const UserMedium: Story = {
  args: {
    ...USER_ARGS,
    size: 'md',
  },
};

export const UserSmall: Story = {
  args: {
    ...USER_ARGS,
    size: 'sm',
  },
};
