import { Meta, StoryObj } from '@storybook/react';

import DropdownMd from './DropdownMd';

const meta = {
  title: 'Components/DropdownMd',
  component: DropdownMd,
} satisfies Meta<typeof DropdownMd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    children: '최신순',
    size: 'md',
    options: ['최신순', '오래된 순'],
  },
};

export const MediumOpen: Story = {
  args: {
    children: '최신순',
    size: 'md',
    menuOpen: true,
    options: ['최신순', '오래된 순'],
  },
};

export const Small: Story = {
  args: {
    children: '최신순',
    size: 'sm',
    options: ['최신순', '오래된 순'],
  },
};

export const SmallOpen: Story = {
  args: {
    children: '최신순',
    size: 'sm',
    menuOpen: true,
    options: ['최신순', '오래된 순'],
  },
};
