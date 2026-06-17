import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MOCK_TASKLISTS } from '../_constants/mockData';
import TaskListMain from './TaskListMain';

const queryClient = new QueryClient();

const meta = {
  component: TaskListMain,
  title: 'TaskList/Main',
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '0/tasklist',
        query: {
          date: '2026-06-06',
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof TaskListMain>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    taskListId: MOCK_TASKLISTS[0].id,
    taskListName: MOCK_TASKLISTS[0].name,
    groupId: 0,
  },
};
