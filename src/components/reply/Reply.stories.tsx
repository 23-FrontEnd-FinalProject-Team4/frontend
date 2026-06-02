import ProfileIcon from '@/assets/icons/profile.svg?react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import Reply from './Reply';

const avatar = <ProfileIcon className="size-8" />;

const baseArgs = {
  size: 'sm' as const,
  author: '이차현',
  avatar,
  children: '안녕하세요, 댓글입니다.',
  menu: {
    date: '2026.06.02',
    onMenuClick: fn(),
  },
};

const meta = {
  title: 'Components/Reply',
  component: Reply,
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Reply>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: baseArgs,
};

export const Multiline: Story = {
  args: {
    ...baseArgs,
    children: '첫 번째 줄입니다.\n두 번째 줄입니다.',
  },
};

export const Large: Story = {
  args: {
    ...baseArgs,
    size: 'lg',
  },
};
