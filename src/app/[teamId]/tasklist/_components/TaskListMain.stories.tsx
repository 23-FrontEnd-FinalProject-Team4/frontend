import { Meta, StoryObj } from '@storybook/nextjs-vite';
import TaskListMain from './TaskListMain';
import { MOCK_TASKLISTS } from '../_constants/mockData';

const meta = {
  component: TaskListMain,
  title: 'TaskList/Main',
  tags: ['autodocs'],
} satisfies Meta<typeof TaskListMain>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    taskList: MOCK_TASKLISTS[0],
  },
};
