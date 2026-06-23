import Skeleton from '@/components/skeleton/Skeleton';

const TASK_ROW_COUNT = 5;

const TaskRows = () => (
  <div className="space-y-3">
    {Array.from({ length: TASK_ROW_COUNT }, (_, index) => (
      <Skeleton key={index} className="h-12 w-full rounded-xl" />
    ))}
  </div>
);

export const TaskItemsSkeleton = () => (
  <div role="status" aria-live="polite" aria-label="할 일을 불러오는 중">
    <span className="sr-only">할 일을 불러오는 중입니다.</span>
    <TaskRows />
  </div>
);

const TaskListPageSkeleton = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="할 일 목록을 불러오는 중"
      className="flex flex-col gap-5 p-4 md:gap-7 md:px-6 md:py-17.5 xl:px-30 xl:py-30"
    >
      <span className="sr-only">할 일 목록을 불러오는 중입니다.</span>
      <Skeleton className="h-8 w-48 rounded-md" />

      <div className="flex flex-col gap-6 xl:flex-row">
        <aside className="hidden w-67.5 shrink-0 space-y-4 xl:block">
          <Skeleton className="h-7 w-28 rounded-md" />
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-13.5 w-full rounded-xl" />
          ))}
        </aside>

        <section className="bg-background-primary rounded-5 flex-1 p-4 md:p-7.5 xl:p-10">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Skeleton className="h-7 w-36 rounded-md" />
            <Skeleton className="h-9 w-44 rounded-lg" />
          </div>
          <TaskRows />
        </section>
      </div>
    </div>
  );
};

export default TaskListPageSkeleton;
