import { Meta, StoryObj } from '@storybook/nextjs-vite';

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
  render: (args) => <DropdownMd {...args} isMenuOpen={true} />,
  args: {
    children: '최신순',
    size: 'md',
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
  render: (args) => <DropdownMd {...args} isMenuOpen={true} />,
  args: {
    children: '최신순',
    size: 'sm',
    options: ['최신순', '오래된 순'],
  },
};
