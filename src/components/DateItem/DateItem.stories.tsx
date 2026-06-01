import { Meta, StoryObj } from '@storybook/nextjs-vite';
import DateItem from './DateItem';
import { expect, fn, userEvent, within } from 'storybook/test';
import { DateItemProps } from './type';

const meta = {
  component: DateItem,
  title: 'DateItem',
  tags: ['autodocs'],
  argTypes: {
    date: { control: 'date' },
  },
} satisfies Meta<typeof DateItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
    isSelected: false,
    onClick: fn(),
  },
};

export const Selected: Story = {
  args: {
    date: new Date(),
    isSelected: true,
    onClick: fn(),
  },
};

export const Date20260101: Story = {
  // Storybook에서 date값이 Date형이 아닌 숫자형으로 치환되는 문제가 발생하여 이렇게 작성
  render: (args: DateItemProps) => <DateItem {...args} date={new Date(args.date)} />,
  args: {
    date: new Date('2026-01-01'),
    isSelected: false,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledWith(new Date('2026-01-01'));
  },
};
