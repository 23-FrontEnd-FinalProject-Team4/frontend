import type { Meta, StoryObj } from '@storybook/react';

import EditableProfileImage from './EditableProfileImage';

const meta = {
  title: 'Components/EditableProfileImage',
  component: EditableProfileImage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EditableProfileImage>;

export default meta;

type Story = StoryObj<typeof meta>;

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&h=240&fit=crop';

export const Default: Story = {
  args: {
    src: SAMPLE_IMAGE,
    size: 'sm',
    onChange: () => {},
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};
