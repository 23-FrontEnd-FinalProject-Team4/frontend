'use client';

import { useCallback, useRef, useState } from 'react';

import Link from 'next/link';

import { overlay } from 'overlay-kit';
import { toast } from 'react-hot-toast';

import KebabIcon from '@/assets/icons/kebab.svg?react';
import BadgeDone from '@/components/badgeDone/BadgeDone';
import Dropdown from '@/components/dropdown/Dropdown';
import TaskCheckbox from '@/components/taskCheckbox/TaskCheckbox';
import { OPTIONS } from '@/constants/listItem';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { getErrorMessage } from '@/lib/error';
import { useToggleTask } from '@/queries/task/queries';

import DeleteTaskListModal from '../../tasklist/_components/modals/DeleteTaskListModal';
import EditTaskListModal from '../../tasklist/_components/modals/EditTaskListModal';
import type { TaskListItem } from '../../type';

interface TaskListCardProps {
  item: TaskListItem;
  teamId: string;
}

export default function TaskListCard({ item, teamId }: TaskListCardProps) {
  const groupId = Number(teamId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { mutate: toggleTask } = useToggleTask({
    onError: (error) => {
      toast.error(getErrorMessage(error, '할 일 상태를 변경하지 못했습니다.'));
    },
  });

  const badgeStatus =
    item.totalCount === 0 ? 'none' : item.doneCount >= item.totalCount ? 'done' : 'progress';
  const canToggleTask = Number.isSafeInteger(groupId) && groupId > 0;
  const taskListHref = `/${teamId}/tasklist?taskListId=${item.id}${item.date ? `&date=${item.date}` : ''}`;

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useOutsideClick(menuRef, handleCloseMenu);

  const handleToggleTask = (taskId: number, checked: boolean) => {
    if (!canToggleTask) {
      toast.error('팀 정보를 찾을 수 없습니다.');
      return;
    }

    toggleTask({
      groupId,
      taskListId: item.id,
      taskId,
      done: checked,
    });
  };

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuItemSelect = (value: string) => {
    setIsMenuOpen(false);

    if (!canToggleTask) {
      toast.error('팀 정보를 찾을 수 없습니다.');
      return;
    }

    if (value === 'EDIT') {
      overlay.open(({ isOpen, close }) => (
        <EditTaskListModal
          isOpen={isOpen}
          onClose={close}
          groupId={groupId}
          taskListId={item.id}
          title={item.title}
        />
      ));
      return;
    }

    overlay.open(({ isOpen, close }) => (
      <DeleteTaskListModal
        isOpen={isOpen}
        onClose={close}
        groupId={groupId}
        taskListId={item.id}
        taskListName={item.title}
      />
    ));
  };

  return (
    <article className="border-border-primary bg-background-primary hover:border-brand-primary/40 focus-within:ring-brand-primary/30 relative h-37.75 overflow-visible rounded-xl border px-5 pt-5 pb-4 shadow-sm transition-all duration-200 focus-within:ring-2 hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={taskListHref}
        className="absolute inset-0 z-0 rounded-xl focus:outline-none"
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
        aria-label={`${item.title} 할 일 목록으로 이동`}
      />

      <div className="pointer-events-none relative z-10 flex items-start justify-between gap-3">
        <h3 className="text-text-primary min-w-0 truncate text-sm font-semibold">{item.title}</h3>

        <div className="flex shrink-0 items-center gap-1.5">
          <BadgeDone
            status={badgeStatus}
            current={item.doneCount}
            total={item.totalCount}
            className="min-w-10 overflow-visible border-0 bg-transparent p-0 shadow-none [&_svg]:size-4.5 [&_svg]:overflow-visible"
          />
          <div ref={menuRef} className="pointer-events-auto relative">
            <button
              type="button"
              className="text-icon-primary hover:bg-background-secondary hover:text-brand-primary focus-visible:ring-brand-primary flex size-5 items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-95"
              aria-label={`${item.title} 메뉴 열기`}
              aria-expanded={isMenuOpen}
              onClick={handleMenuButtonClick}
            >
              <KebabIcon className="size-4" aria-hidden="true" />
            </button>

            {isMenuOpen && (
              <div
                className="absolute top-full right-0 z-20 mt-1 w-[94px]"
                onClick={(event) => event.stopPropagation()}
              >
                <Dropdown options={OPTIONS} size="sm" onSelect={handleMenuItemSelect} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mt-5 flex flex-col gap-2 [&_label]:min-w-0 [&_span]:block [&_span]:truncate [&_span]:text-xs">
        {item.tasks.map((task) => (
          <div key={task.id} className="pointer-events-auto">
            <TaskCheckbox
              task={task.title}
              checked={task.done}
              disabled={!canToggleTask}
              onChange={(checked) => handleToggleTask(task.id, checked)}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
