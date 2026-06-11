import Link from 'next/link';

import KebabIcon from '@/assets/icons/kebab.svg?react';

import BadgeDone from '@/components/badgeDone/BadgeDone';
import TaskCheckbox from '@/components/taskCheckbox/TaskCheckbox';

import type { TaskListItem } from '../../type';

interface TaskListCardProps {
  item: TaskListItem;
  teamId: string;
}

export default function TaskListCard({ item, teamId }: TaskListCardProps) {
  const badgeStatus =
    item.totalCount === 0 ? 'none' : item.doneCount >= item.totalCount ? 'done' : 'progress';

  return (
    <article className="border-border-primary bg-background-primary hover:border-brand-primary/40 focus-within:ring-brand-primary/30 relative h-37.75 overflow-hidden rounded-xl border px-5 pt-5 pb-4 shadow-sm transition-all duration-200 focus-within:ring-2 hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/${teamId}/tasklist?taskListId=${item.id}`}
        className="absolute inset-0 z-0 rounded-xl focus:outline-none"
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
          <button
            type="button"
            className="text-icon-primary hover:bg-background-secondary hover:text-brand-primary focus-visible:ring-brand-primary pointer-events-auto flex size-5 items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-95"
            aria-label={`${item.title} 메뉴 열기`}
          >
            <KebabIcon className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mt-5 flex flex-col gap-2 [&_label]:min-w-0 [&_span]:block [&_span]:truncate [&_span]:text-xs">
        {item.tasks.map((task) => (
          <TaskCheckbox key={task.id} task={task.title} checked={task.done} disabled />
        ))}
      </div>
    </article>
  );
}
