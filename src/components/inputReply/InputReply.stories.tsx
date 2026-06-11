import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import InputReply from './InputReply';

const meta = {
  title: 'Components/InputReply',
  component: InputReply,
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputReply>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');

    return <InputReply {...args} value={value} onChange={setValue} />;
  },
  args: {
    size: 'sm',
    value: '안녕하세요',
    placeholder: '댓글을 달아주세요',
    onChange: () => {},
    onSubmit: () => {},
  },
};

export const Large: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    size: 'lg',
    value: '',
  },
};
