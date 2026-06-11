import { Meta, StoryObj } from '@storybook/nextjs-vite';
import DateList from './DateList';
import { expect, fn, userEvent, within } from 'storybook/test';

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
    const buttons = within(canvasElement).getAllByRole('button');
    // [29 / 30 / 31 / 1 / 2 / 3 / 4] 순서에서 5번 (2일) 클릭
    await userEvent.click(buttons[4]);
    expect(args.onChange).toHaveBeenCalledWith(new Date('2026-01-02'));
  },
};
