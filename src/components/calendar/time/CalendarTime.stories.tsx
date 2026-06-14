import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import CalendarTime from './CalendarTime';

const meta = {
  component: CalendarTime,
  title: 'Components/CalendarTime',
  tags: ['autodocs'],

  // meta 레벨 render: 모든 Story가 이 wrapper를 공유
  render: (args) => {
    const [selectedHour, setSelectedHour] = useState(args.selectedHour ?? 0);
    const [selectedMinute, setSelectedMinute] = useState(args.selectedMinute ?? 0);

    return (
      <CalendarTime
        {...args}
        selectedHour={selectedHour}
        setSelectedHour={(hour) => {
          setSelectedHour(hour);
          args.setSelectedHour(hour); // ← fn() spy도 동시에 호출 (Actions 탭에 기록됨)
        }}
        selectedMinute={selectedMinute}
        setSelectedMinute={(minute) => {
          setSelectedMinute(minute);
          args.setSelectedMinute(minute); // ← fn() spy
        }}
      />
    );
  },
} satisfies Meta<typeof CalendarTime>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedHour: 0,
    selectedMinute: 0,
    setSelectedHour: fn(),
    setSelectedMinute: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const { selectedHour, selectedMinute } = args;
    const hourButtons = within(canvasElement).getByRole('button', {
      name: `${selectedHour}시`,
    });
    const minuteButtons = within(canvasElement).getByRole('button', {
      name: `${selectedMinute}분`,
    });

    expect(hourButtons).toHaveClass('outline');
    expect(minuteButtons).toHaveClass('bg-brand-primary');
  },
};

export const ClickTest: Story = {
  args: {
    selectedHour: 0,
    selectedMinute: 0,
    setSelectedHour: fn(),
    setSelectedMinute: fn(),
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const hourButtons = within(canvasElement).getByRole('button', {
      name: `15시`,
    });
    const minuteButtons = within(canvasElement).getByRole('button', {
      name: `30분`,
    });

    // Act
    await userEvent.click(hourButtons);
    await userEvent.click(minuteButtons);

    // Assert
    expect(hourButtons).toHaveClass('outline');
    expect(minuteButtons).toHaveClass('bg-brand-primary');
  },
};
