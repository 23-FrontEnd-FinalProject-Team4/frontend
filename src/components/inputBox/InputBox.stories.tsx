import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import InputBox from './InputBox';

const meta = {
  title: 'Components/InputBox',
  component: InputBox,
} satisfies Meta<typeof InputBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'sm',
    value: '',
    placeholder: '내용을 입력하세요',
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
