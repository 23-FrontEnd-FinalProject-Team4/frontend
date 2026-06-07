import { Meta, StoryObj } from '@storybook/nextjs-vite';
import TaskListTitle from './TaskListTitle';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';

const meta = {
  component: TaskListTitle,
  title: 'TaskList/Title',
  tags: ['autodocs'],
  render: (args) => {
    // 상태 변화 검증을 위해 state 사용
    const [selectedDate, setSelectedDate] = useState(args.selectedDate);

    const handleNextWeek = () => {
      setSelectedDate((prevDate) => new Date(prevDate.getTime() + 7 * 24 * 60 * 60 * 1000));
    };

    const handlePrevWeek = () => {
      setSelectedDate((prevDate) => new Date(prevDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    };

    const handleToday = () => {
      setSelectedDate(new Date());
    };

    return (
      <div className="md:w-1/2">
        <TaskListTitle
          {...args}
          selectedDate={selectedDate}
          onChangeDate={setSelectedDate}
          onNextWeek={handleNextWeek}
          onPrevWeek={handlePrevWeek}
          onToday={handleToday}
        />
      </div>
    );
  },
} satisfies Meta<typeof TaskListTitle>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    taskName: '할 일 목록 1',
    selectedDate: new Date(),
    onNextWeek: fn(),
    onPrevWeek: fn(),
    onToday: fn(),
    onChangeDate: fn(),
  },
};

export const PrevWeekButtonCheck: Story = {
  args: {
    ...Default.args,
    selectedDate: new Date(2026, 6 - 1, 6),
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);

    // Act
    await userEvent.click(canvas.getByRole('button', { name: '이전주' }));

    // Assert
    const dateButton0 = canvas.queryByRole('button', { name: '5월 26일' });
    expect(dateButton0).toBeFalsy();

    const dateButton1 = canvas.queryByRole('button', { name: '5월 27일' });
    expect(dateButton1).toBeTruthy();
    const dateButton2 = canvas.queryByRole('button', { name: '5월 28일' });
    expect(dateButton2).toBeTruthy();
    const dateButton3 = canvas.queryByRole('button', { name: '5월 29일' });
    expect(dateButton3).toBeTruthy();
    const dateButton4 = canvas.queryByRole('button', { name: '5월 30일' });
    expect(dateButton4).toBeTruthy();
    expect(dateButton4?.className).toContain('bg-slate-800'); // 선택 상태 검증
    const dateButton5 = canvas.queryByRole('button', { name: '5월 31일' });
    expect(dateButton5).toBeTruthy();
    const dateButton6 = canvas.queryByRole('button', { name: '6월 1일' });
    expect(dateButton6).toBeTruthy();
    const dateButton7 = canvas.queryByRole('button', { name: '6월 2일' });
    expect(dateButton7).toBeTruthy();

    const dateButton8 = canvas.queryByRole('button', { name: '6월 3일' });
    expect(dateButton8).toBeFalsy();
  },
};

export const NextWeekButtonCheck: Story = {
  args: {
    ...Default.args,
    selectedDate: new Date(2026, 6 - 1, 6),
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);

    // Act
    await userEvent.click(canvas.getByRole('button', { name: '다음주' }));

    // Assert
    const dateButton0 = canvas.queryByRole('button', { name: '6월 9일' });
    expect(dateButton0).toBeFalsy();

    const dateButton1 = canvas.queryByRole('button', { name: '6월 10일' });
    expect(dateButton1).toBeTruthy();
    const dateButton2 = canvas.queryByRole('button', { name: '6월 11일' });
    expect(dateButton2).toBeTruthy();
    const dateButton3 = canvas.queryByRole('button', { name: '6월 12일' });
    expect(dateButton3).toBeTruthy();
    const dateButton4 = canvas.queryByRole('button', { name: '6월 13일' });
    expect(dateButton4).toBeTruthy();
    expect(dateButton4?.className).toContain('bg-slate-800'); // 선택 상태 검증
    const dateButton5 = canvas.queryByRole('button', { name: '6월 14일' });
    expect(dateButton5).toBeTruthy();
    const dateButton6 = canvas.queryByRole('button', { name: '6월 15일' });
    expect(dateButton6).toBeTruthy();
    const dateButton7 = canvas.queryByRole('button', { name: '6월 16일' });
    expect(dateButton7).toBeTruthy();

    const dateButton8 = canvas.queryByRole('button', { name: '6월 17일' });
    expect(dateButton8).toBeFalsy();
  },
};

export const TodayButtonCheck: Story = {
  args: {
    ...Default.args,
    selectedDate: new Date(2026, 1 - 1, 1),
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);

    // Act
    await userEvent.click(canvas.getByRole('button', { name: '오늘' }));

    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    console.log(`${month}월 ${day}일`);

    // Assert
    const dateButton = canvas.queryByRole('button', { name: `${month}월 ${day}일` });
    expect(dateButton).toBeTruthy();
    expect(dateButton?.className).toContain('bg-slate-800'); // 선택 상태 검증
  },
};
