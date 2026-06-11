import { Meta, StoryObj } from '@storybook/nextjs-vite';
import CalendarDate from './CalendarDate';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useState } from 'react';

const meta = {
  component: CalendarDate,
  title: 'Components/CalendarDate',
  tags: ['autodocs'],

  // 상태 변화 검증을 위해 render 함수 안에서 state 사용
  render: (args) => {
    const [selectedDate, setSelectedDate] = useState(args.selectedDate);

    return (
      <CalendarDate
        {...args}
        selectedDate={selectedDate}
        setSelectedDate={(date) => {
          setSelectedDate(date);
          args.setSelectedDate(date);
        }}
      />
    );
  },
} satisfies Meta<typeof CalendarDate>;
export default meta;

type Story = StoryObj<typeof meta>;

// data-day 속성을 이용해 버튼 엘리먼트를 편리하게 가져오는 헬퍼 함수
const getDayButton = (canvasElement: HTMLElement, dateString: string) => {
  // td에 data-day가 있으므로, 해당 td 내의 button 요소를 탐색합니다.
  const cell = canvasElement.querySelector(`td[data-day="${dateString}"]`);
  const button = cell?.querySelector('button');
  if (!button || !cell) {
    throw new Error(`data-day="${dateString}"에 해당하는 날짜 버튼을 찾을 수 없습니다.`);
  }
  return [button, cell];
};

export const Today: Story = {
  args: {
    selectedDate: new Date(),
    setSelectedDate: fn(),
  },
};

export const SelectDateInSameMonth: Story = {
  args: {
    selectedDate: new Date(2026, 1 - 1, 1),
    setSelectedDate: fn(),
  },
  play: async ({ canvasElement }) => {
    // 1일 버튼과 3일 버튼 및 셀을 각각 가져옵니다.
    const [, cellJan1] = getDayButton(canvasElement, '2026-01-01');
    const [buttonJan3, cellJan3] = getDayButton(canvasElement, '2026-01-03');

    // [클릭 전 검증]
    expect(cellJan1).toHaveClass('bg-brand-primary');
    expect(cellJan3).not.toHaveClass('bg-brand-primary');

    // [클릭 액션 실행]
    await userEvent.click(buttonJan3);

    // [클릭 후 검증 - UI 상태가 바뀌었는지 확인]
    expect(cellJan1).not.toHaveClass('bg-brand-primary');
    expect(cellJan3).toHaveClass('bg-brand-primary');
  },
};

export const PreventSelectingOtherMonth: Story = {
  args: {
    selectedDate: new Date(2026, 1 - 1, 1),
    setSelectedDate: fn(),
  },
  play: async ({ canvasElement }) => {
    const [, cellJan1] = getDayButton(canvasElement, '2026-01-01');
    const [buttonDec31, cellDec31] = getDayButton(canvasElement, '2025-12-31');

    // [클릭 전 검증]
    expect(cellJan1).toHaveClass('bg-brand-primary');
    expect(cellDec31).not.toHaveClass('bg-brand-primary');

    // [클릭 액션 실행]
    await userEvent.click(buttonDec31);

    // [클릭 후 검증 - UI 상태가 바뀌지 않았는지 확인]
    expect(cellJan1).toHaveClass('bg-brand-primary');
    expect(cellDec31).not.toHaveClass('bg-brand-primary');
  },
};

export const SelectDateInDifferentMonth: Story = {
  args: {
    selectedDate: new Date(2026, 1 - 1, 1),
    setSelectedDate: fn(),
  },
  play: async ({ canvasElement }) => {
    // 이전 달로 이동 버튼 가져오기
    const previousMonthButton = within(canvasElement).getByRole('button', {
      name: '이전 달로 이동',
    });

    // [이전 달로 이동 액션 실행]
    await userEvent.click(previousMonthButton);

    // [변화된 달력에 맞춰서 다시 요소를 가져옴]
    const [, cellJan1] = getDayButton(canvasElement, '2026-01-01');
    const [buttonDec31, cellDec31] = getDayButton(canvasElement, '2025-12-31');

    // [날짜 클릭 액션 실행]
    await userEvent.click(buttonDec31);

    // [클릭 후 검증 - UI 상태가 바뀌었는지 확인]
    expect(cellJan1).not.toHaveClass('bg-brand-primary');
    expect(cellDec31).toHaveClass('bg-brand-primary');
  },
};
