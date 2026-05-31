import type { Meta, StoryObj } from '@storybook/react';

import TaskCheckbox from './todo';

const meta = {
  title: 'Components/Todo',
  component: TaskCheckbox,
} satisfies Meta<typeof TaskCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: '할 일을 입력하세요.',
    size: 'sm',
    checked: false,
    disabled: false,
    onChange: () => {},
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
    disabled: false,
  },
};

export const CheckedWithStrikethrough: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    checked: true,
  },
};
