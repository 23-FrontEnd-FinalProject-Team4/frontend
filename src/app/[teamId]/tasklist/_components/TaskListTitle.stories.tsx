import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import TaskListTitle from './TaskListTitle';

const meta = {
  component: TaskListTitle,
  title: 'TaskList/Title',
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
} satisfies Meta<typeof TaskListTitle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    taskName: '할 일 목록 1',
    onNextWeek: fn(),
    onPrevWeek: fn(),
    onToday: fn(),
  },
};

export const PrevWeekButtonCheck: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    // Arrange
    const canvas = within(canvasElement);

    // Act
    await userEvent.click(canvas.getByRole('button', { name: '이전' }));

    // Assert
    expect(args.onPrevWeek).toHaveBeenCalled();
  },
};

export const NextWeekButtonCheck: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    // Arrange
    const canvas = within(canvasElement);

    // Act
    await userEvent.click(canvas.getByRole('button', { name: '다음' }));

    // Assert
    expect(args.onNextWeek).toHaveBeenCalled();
  },
};

export const TodayButtonCheck: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    // Arrange
    const canvas = within(canvasElement);

    // Act
    await userEvent.click(canvas.getByRole('button', { name: '오늘' }));

    // Assert
    expect(args.onToday).toHaveBeenCalled();
  },
};
