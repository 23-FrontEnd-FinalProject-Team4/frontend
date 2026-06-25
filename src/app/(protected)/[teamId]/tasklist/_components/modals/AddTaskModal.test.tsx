import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AddTaskModal from './AddTaskModal';

vi.mock('@/components/modal/Modal', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/queries/task/queries', () => ({
  useCreateTask: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

vi.mock('./TaskForm', async () => {
  const { useFormContext } =
    await vi.importActual<typeof import('react-hook-form')>('react-hook-form');
  const MockTaskForm = () => {
    const { watch } = useFormContext();
    const selectedDate = watch('date') as Date;

    return <output>{selectedDate.toISOString()}</output>;
  };

  return { default: MockTaskForm };
});

describe('AddTaskModal', () => {
  it('현재 선택한 미래 날짜를 할 일 시작 날짜의 기본값으로 사용한다', () => {
    const initialDate = new Date(2026, 5, 26);

    render(
      <AddTaskModal
        isOpen
        onClose={vi.fn()}
        groupId={1}
        taskListId={1}
        initialDate={initialDate}
      />,
    );

    expect(screen.getByText(initialDate.toISOString()).textContent).toBe(initialDate.toISOString());
  });
});
