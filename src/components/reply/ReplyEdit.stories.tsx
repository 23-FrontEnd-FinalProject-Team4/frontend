import { useState } from 'react';

import ProfileIcon from '@/assets/icons/profile.svg?react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import ReplyEdit from './ReplyEdit';

const avatar = <ProfileIcon className="size-8" />;

const meta = {
  title: 'Components/ReplyEdit',
  component: ReplyEdit,
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReplyEdit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <ReplyEdit {...args} value={value} onChange={setValue} />;
  },
  args: {
    author: '이차현',
    avatar,
    value:
      '수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.수정할 댓글 내용입니다.',
    onChange: () => {},
    onCancel: fn(),
    onSubmit: fn(),
  },
};

export const Empty: Story = {
  render: Default.render,
  args: {
    ...Default.args,
    value: '',
  },
};
