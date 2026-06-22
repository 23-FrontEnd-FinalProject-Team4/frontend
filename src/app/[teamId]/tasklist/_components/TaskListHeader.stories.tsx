import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { MOCK_TASKLISTS } from '../_constants/mockData';
import TaskListHeader from './TaskListHeader';

const meta = {
  component: TaskListHeader,
  title: 'TaskList/Header',
  tags: ['autodocs'],
} satisfies Meta<typeof TaskListHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    groupId: MOCK_TASKLISTS[0].groupId,
  },
};
