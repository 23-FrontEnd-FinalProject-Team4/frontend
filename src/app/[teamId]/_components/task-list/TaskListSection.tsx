'use client';

import ArrowLeftIcon from '@/assets/icons/arrow_left.svg?react';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg?react';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import { cn } from '@/utils/cn';

import type { TaskListItem, TaskStatus, TaskStatusSection } from '../../type';
import TaskListCard from './TaskListCard';

const TASK_SECTION_HEADER_STYLE: Record<TaskStatus, string> = {
  today: 'bg-brand-secondary',
  scheduled: 'bg-background-tertiary',
  done: 'bg-background-tertiary',
};

interface GroupedTaskStatusSection extends TaskStatusSection {
  items: TaskListItem[];
}

interface TaskListSectionProps {
  teamId: string;
  taskListsCount: number;
  sections: GroupedTaskStatusSection[];
  onCreateTaskList: () => void;
}

interface TaskStatusSectionRowProps {
  teamId: string;
  section: GroupedTaskStatusSection;
}

const TaskStatusSectionRow = ({ teamId, section }: TaskStatusSectionRowProps) => {
  const { scrollRef, canScrollLeft, canScrollRight, isDragging, scrollByDirection, dragHandlers } =
    useHorizontalScroll<HTMLDivElement>();
  const isScrollable = canScrollLeft || canScrollRight;

  return (
    <section className="flex flex-col gap-3">
      <div
        className={`${TASK_SECTION_HEADER_STYLE[section.status]} flex h-9.5 items-center justify-between rounded-xl px-5`}
      >
        <h3 className="text-text-primary text-xs font-semibold">{section.label}</h3>

        {isScrollable && (
          <div className="hidden items-center gap-1 xl:flex">
            <button
              type="button"
              className="text-icon-primary hover:bg-background-primary hover:text-brand-primary focus-visible:ring-brand-primary disabled:text-text-disabled flex size-6 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none"
              aria-label={`${section.label} 왼쪽으로 스크롤`}
              disabled={!canScrollLeft}
              onClick={() => scrollByDirection('left')}
            >
              <ArrowLeftIcon className="size-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              className="text-icon-primary hover:bg-background-primary hover:text-brand-primary focus-visible:ring-brand-primary disabled:text-text-disabled flex size-6 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none"
              aria-label={`${section.label} 오른쪽으로 스크롤`}
              disabled={!canScrollRight}
              onClick={() => scrollByDirection('right')}
            >
              <ArrowRightIcon className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div
        ref={scrollRef}
        className={cn(
          'custom-scrollbar -mx-1 min-w-0 overflow-x-auto px-1 py-1 pb-3 xl:pb-4',
          isDragging ? 'cursor-grabbing select-none' : 'xl:cursor-grab',
        )}
        {...dragHandlers}
      >
        <div className="grid gap-3 md:grid-cols-1 xl:flex xl:w-max xl:flex-nowrap">
          {section.items.map((item) => (
            <div key={item.id} className="py-1 xl:w-[270px] xl:shrink-0">
              <TaskListCard item={item} teamId={teamId} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TaskListSection = ({
  teamId,
  taskListsCount,
  sections,
  onCreateTaskList,
}: TaskListSectionProps) => {
  return (
    <section className="border-border-primary border-t pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-primary text-md font-semibold">
          할 일 목록 <span className="text-text-default font-medium">({taskListsCount}개)</span>
        </h2>

        <button
          type="button"
          className="text-brand-primary hover:text-interaction-hover focus-visible:ring-brand-primary rounded-sm text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          onClick={onCreateTaskList}
        >
          할일 추가하기 +
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <TaskStatusSectionRow key={section.status} teamId={teamId} section={section} />
        ))}
      </div>
    </section>
  );
};

export default TaskListSection;
