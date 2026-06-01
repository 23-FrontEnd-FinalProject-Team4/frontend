import { Meta, StoryObj } from '@storybook/react';

import DropdownMenu from './DropdownMenu';

const meta = {
  title: 'Components/Dropdown/DropdownMenu',
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  { label: '마이 히스토리', value: '마이 히스토리' },
  { label: '계정 설정', value: '계정 설정' },
  { label: '팀 참여', value: '팀 참여' },
  { label: '로그아웃', value: '로그아웃' },
];
export const Default: Story = {
  args: {
    options: options,
  },
};
