import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Skeleton from './Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    className: 'h-4 w-60 rounded-md',
  },
};

export const Card: Story = {
  args: {
    className: 'h-40 w-80 rounded-2xl',
  },
};

export const Profile: Story = {
  args: {
    className: 'size-10 rounded-full',
  },
};
