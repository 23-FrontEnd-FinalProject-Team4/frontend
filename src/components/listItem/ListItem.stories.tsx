import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { MOCK_TASKLISTS } from '../../app/[teamId]/tasklist/_constants/mockData';
import ListItem from './ListItem';

const meta = {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],

  render: (args) => (
    <div className="w-1/2">
      <ListItem {...args} />
    </div>
  ),
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: MOCK_TASKLISTS[0].tasks[0],
    onEdit: fn(),
    onDelete: fn(),
    onToggle: fn(),
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    task: {
      ...Default.args.task,
      doneAt: '2026년 6월 3일',
    },
  },
};

export const NoComment: Story = {
  args: {
    ...Default.args,
    task: {
      ...Default.args.task,
      commentCount: 0,
    },
  },
};

export const ToggleTest: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    // Arrange
    const canvas = within(canvasElement);

    // Act
    await userEvent.click(canvas.getByText('Task 1'));

    // Assert
    expect(args.onToggle).toHaveBeenCalledWith(true);
  },
};

export const DropdownTest: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement, args }) => {
    // Arrange
    const canvas = within(canvasElement);
    const kebabButton = canvas.getByRole('button', { name: '할 일 메뉴 열기' });

    // Assert 1: 열리기 전에는 dropdown button들이 없어야 함
    expect(canvas.queryByRole('button', { name: '수정하기' })).not.toBeInTheDocument();
    expect(canvas.queryByRole('button', { name: '삭제하기' })).not.toBeInTheDocument();

    // Act 1: kebab button 클릭
    await userEvent.click(kebabButton);

    // ---------------------------------------------------------------------------------
    // Arrange 2: 클릭 후에는 드롭다운 메뉴('수정하기', '삭제하기' 버튼)가 화면에 보여야 함
    const editButton = canvas.getByRole('button', { name: '수정하기' });

    // Assert 2: 클릭 후에는 드롭다운 메뉴('수정하기', '삭제하기' 버튼)가 화면에 보여야 함
    expect(editButton).toBeInTheDocument();

    // ---------------------------------------------------------------------------------
    // Act 2: edit button 클릭
    await userEvent.click(editButton);

    // Assert 3: 함수 호출 확인 및 드롭다운 메뉴가 화면에 보이지 않는지 확인
    expect(args.onEdit).toHaveBeenCalled();
    expect(editButton).not.toBeInTheDocument();

    // ---------------------------------------------------------------------------------
    // Act 3: delete button 클릭
    await userEvent.click(kebabButton);
    const deleteButton = canvas.getByRole('button', { name: '삭제하기' });

    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);

    // Assert 4: 함수 호출 확인 및 드롭다운 메뉴가 화면에 보이지 않는지 확인
    expect(args.onDelete).toHaveBeenCalled();
    expect(deleteButton).not.toBeInTheDocument();
  },
};
