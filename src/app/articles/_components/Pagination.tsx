'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ArrowLeftIcon from '@/assets/icons/arrow_left.svg';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import { getVisiblePages } from '@/utils/articles/pagination';
import { cn } from '@/utils/cn';

export default function Pagination({
  page: currentPage,
  totalCount,
}: {
  page: number;
  totalCount: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = currentPage;

  const totalPages = Math.max(1, Math.ceil(totalCount / 10));
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="mt-8 flex justify-center gap-2">
      <button
        type="button"
        className={cn(
          'hover:bg-background-tertiary hover:text-text-primary text-md disabled:text-text-disabled flex items-center justify-center gap-1 rounded-md px-2 py-1 font-medium',
        )}
        disabled={page === 1}
        onClick={() => {
          const nextPage = page - 1;
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', String(nextPage));
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        <ArrowLeftIcon className="size-4" />
      </button>

      {visiblePages.map((pageNumber) => {
        return (
          <button
            type="button"
            key={pageNumber}
            className={cn(
              'flex h-8 w-8 items-center justify-center gap-1 rounded-full',
              page === pageNumber
                ? 'bg-brand-primary text-text-inverse'
                : 'hover:bg-background-tertiary hover:text-text-primary',
            )}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', String(pageNumber));
              router.push(`${pathname}?${params.toString()}`);
            }}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        className={cn(
          'hover:bg-background-tertiary hover:text-text-primary text-md disabled:text-text-disabled font-mediu flex items-center justify-center gap-1 rounded-md px-2 py-1',
        )}
        disabled={page === totalPages}
        onClick={() => {
          const nextPage = page + 1;
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', String(nextPage));
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        <ArrowRightIcon className="size-4" />
      </button>
    </div>
  );
}
