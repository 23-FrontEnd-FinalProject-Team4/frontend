import Skeleton from '@/components/skeleton/Skeleton';

const TASK_SECTION_COUNT = 3;
const TASK_CARD_COUNT = 2;
const MEMBER_COUNT = 4;

const TeamPageSkeleton = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="팀 페이지를 불러오는 중"
      className="space-y-8"
    >
      <span className="sr-only">팀 페이지를 불러오는 중입니다.</span>

      <section className="border-border-primary bg-background-primary xl:rounded-5 min-h-37.75 rounded-xl border p-5 shadow-sm xl:min-h-59.75 xl:p-8">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg xl:size-9" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 xl:mt-12">
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </div>
        <Skeleton className="mt-6 h-3 w-full rounded-full" />
      </section>

      <section className="border-border-primary space-y-5 border-t pt-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-28 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>

        {Array.from({ length: TASK_SECTION_COUNT }, (_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <Skeleton className="h-9.5 w-full rounded-xl" />
            <div className="grid gap-3 md:grid-cols-2">
              {Array.from({ length: TASK_CARD_COUNT }, (_, cardIndex) => (
                <Skeleton key={cardIndex} className="h-37.75 rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="border-border-primary bg-background-primary rounded-xl border p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: MEMBER_COUNT }, (_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/3 rounded-md" />
                <Skeleton className="h-3 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamPageSkeleton;
