import { Meta, StoryObj } from '@storybook/nextjs-vite';
import TaskListSet from './TaskListSet';
import { fn } from 'storybook/test';
import { MOCK_TASKLISTS } from '../_constants/mockData';
import { useState } from 'react';

const meta = {
  component: TaskListSet,
  title: 'TaskList/Set',
  tags: ['autodocs'],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: (args) => {
    const [selectedId, setSelectedId] = useState<number>(args.selectedTaskList?.id ?? 0);
    const selectedTaskList = MOCK_TASKLISTS.find((t) => t.id === selectedId) ?? MOCK_TASKLISTS[0];
    return (
      <div className="xl:w-1/4">
        <TaskListSet
          {...args}
          selectedTaskList={selectedTaskList}
          onSelectedTaskListId={setSelectedId}
        />
      </div>
    );
  },
} satisfies Meta<typeof TaskListSet>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  args: {
    taskLists: MOCK_TASKLISTS,
    selectedTaskList: MOCK_TASKLISTS[0],
    onSelectedTaskListId: fn(),
  },
  globals: {
    viewport: {
      value: 'mobile',
      isRotated: false,
    },
  },
};

export const Desktop: Story = {
  args: Mobile.args,
  globals: {
    viewport: {
      value: 'desktop',
      isRotated: false,
    },
  },
};
