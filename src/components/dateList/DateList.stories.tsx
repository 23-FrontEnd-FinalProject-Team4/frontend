import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import DateList from './DateList';

const meta = {
  component: DateList,
  title: 'Components/DateList',
  tags: ['autodocs'],
} satisfies Meta<typeof DateList>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Today: Story = {
  args: {
    selectedDate: new Date(),
    onChange: fn(),
  },
};

export const Tomorrow: Story = {
  args: {
    selectedDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    onChange: fn(),
  },
};

export const Date20260101To20260102: Story = {
  args: {
    selectedDate: new Date('2026-01-01'),
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: '1월 2일' });
    await userEvent.click(button);
    expect(args.onChange).toHaveBeenCalledWith(new Date('2026-01-02'));
  },
};
