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
    const { hour, minute } = args.selectedTime;
    const [selectedHour, setSelectedHour] = useState(hour ?? 0);
    const [selectedMinute, setSelectedMinute] = useState(minute ?? 0);

    return (
      <CalendarTime
        {...args}
        selectedTime={{ hour: selectedHour, minute: selectedMinute }}
        setSelectedTime={(time) => {
          setSelectedHour(time.hour);
          setSelectedMinute(time.minute);
        }}
      />
    );
  },
} satisfies Meta<typeof CalendarTime>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedTime: {
      hour: 0,
      minute: 0,
    },
    setSelectedTime: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const {
      selectedTime: { hour, minute },
    } = args;
    const hourButtons = within(canvasElement).getByRole('button', {
      name: `${hour}시`,
    });
    const minuteButtons = within(canvasElement).getByRole('button', {
      name: `${minute}분`,
    });

    expect(hourButtons).toHaveClass('outline');
    expect(minuteButtons).toHaveClass('bg-brand-primary');
  },
};

export const ClickTest: Story = {
  args: {
    ...Default.args,
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
