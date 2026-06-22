import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MOCK_TASKLISTS } from '../_constants/mockData';
import TaskListHeader from './TaskListHeader';

const queryClient = new QueryClient();

const meta = {
  component: TaskListHeader,
  title: 'TaskList/Header',
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof TaskListHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    groupId: MOCK_TASKLISTS[0].groupId,
  },
};
