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
    size: 'sm',
    type: 'text',
    value: '',
    placeholder: '이메일을 입력하세요.',
    onChange: () => {},
    isError: false,
    isDisabled: false,
    errorMessage: '',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    type: 'password',
    placeholder: '비밀번호를 입력하세요.',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    errorMessage: '이메일 형식이 올바르지 않습니다.',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    value: 'disabled@example.com',
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: 'test@example.com',
  },
};
