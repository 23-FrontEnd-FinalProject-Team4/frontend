import TaskListCard from './TaskListCard';
import type { TaskListItem, TaskStatus, TaskStatusSection } from './types';

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

export default function TaskListSection({
  teamId,
  taskListsCount,
  sections,
  onCreateTaskList,
}: TaskListSectionProps) {
  return (
    <section className="border-border-primary border-t pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-text-primary text-md font-semibold">
          할 일 목록 <span className="text-text-default font-medium">({taskListsCount}개)</span>
        </h2>

        <button
          type="button"
          className="text-brand-primary hover:text-interaction-hover focus-visible:ring-brand-primary desktop:block hidden rounded-sm text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          onClick={onCreateTaskList}
        >
          할일 추가하기 +
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <section key={section.status} className="flex flex-col gap-3">
            <div
              className={`${TASK_SECTION_HEADER_STYLE[section.status]} flex h-9.5 items-center rounded-xl px-5`}
            >
              <h3 className="text-text-primary text-xs font-semibold">{section.label}</h3>
            </div>

            <div className="tablet:grid-cols-1 desktop:grid-cols-4 grid gap-3">
              {section.items.map((item) => (
                <TaskListCard key={item.id} item={item} teamId={teamId} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
