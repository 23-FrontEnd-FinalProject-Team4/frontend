import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'lg',
    type: 'text',
    value: 'test@example.com',
    placeholder: '이메일을 입력하세요.',
    onChange: () => {},
    isError: false,
    isDisabled: false,
  },
};
