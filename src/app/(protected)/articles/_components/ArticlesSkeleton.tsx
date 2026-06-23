import Skeleton from '@/components/skeleton/Skeleton';

const ArticleCardSkeleton = ({ isBest = false }: { isBest?: boolean }) => (
  <div
    className={`border-border-primary bg-background-primary rounded-2xl border px-6 py-4 ${isBest ? 'min-h-52' : 'min-h-40'}`}
  >
    {isBest && <Skeleton className="mb-5 h-7 w-18 rounded-full" />}
    <div className="space-y-3">
      <Skeleton className="h-5 w-3/4 rounded-md" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-2/3 rounded-md" />
    </div>
    <div className="mt-7 flex items-center justify-between">
      <Skeleton className="h-4 w-28 rounded-md" />
      <Skeleton className="h-4 w-10 rounded-md" />
    </div>
  </div>
);

export const BestArticlesSkeleton = () => (
  <section
    role="status"
    aria-live="polite"
    aria-label="베스트 게시글을 불러오는 중"
    className="bg-background-secondary mb-10 px-6 py-10 md:rounded-2xl"
  >
    <span className="sr-only">베스트 게시글을 불러오는 중입니다.</span>
    <Skeleton className="mx-auto mb-6 h-6 w-28 rounded-md" />
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      <ArticleCardSkeleton isBest />
      <div className="hidden md:block">
        <ArticleCardSkeleton isBest />
      </div>
      <div className="hidden xl:block">
        <ArticleCardSkeleton isBest />
      </div>
    </div>
  </section>
);

export const ArticleListSkeleton = () => (
  <section
    role="status"
    aria-live="polite"
    aria-label="게시글 목록을 불러오는 중"
    className="flex flex-col gap-5 p-7 xl:p-0"
  >
    <span className="sr-only">게시글 목록을 불러오는 중입니다.</span>
    <div className="flex items-center justify-between">
      <Skeleton className="h-7 w-32 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-lg" />
    </div>
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {Array.from({ length: 4 }, (_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  </section>
);
