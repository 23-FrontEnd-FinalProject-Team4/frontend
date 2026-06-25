'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getArticles } from '@/apis/article';
import { Article } from '@/apis/article/type';
import BestSection from '@/app/(protected)/articles/_components/BestSection';
import ListSection from '@/app/(protected)/articles/_components/ListSection';
import SearchInput from '@/app/(protected)/articles/_components/SearchInput';
import ArrowLeftIcon from '@/assets/icons/arrow_left.svg';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg';
import WriteIcon from '@/assets/icons/pencil.svg';
import Button from '@/components/button/Button';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/utils/cn';

import { ArticleListSkeleton, BestArticlesSkeleton } from './ArticlesSkeleton';

const ArticlesClient = () => {
  const [bestPage, setBestPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [searchValue, setSearchValue] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const sortType = searchParams.get('orderBy') === 'like' ? 'like' : 'recent';

  const pageParam = Number(searchParams.get('page'));
  const page = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;

  const onSortChange = (value: 'recent' | 'like') => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('orderBy', value);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const debouncedKeyword = useDebounce(searchValue, 500);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ['articles', page, debouncedKeyword, sortType],
    queryFn: () =>
      getArticles({
        page,
        pageSize: 10,
        orderBy: sortType,
        keyword: debouncedKeyword || undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const { data: bestData, isPending: isBestPending } = useQuery({
    queryKey: ['best-articles'],
    queryFn: () =>
      getArticles({
        page: 1,
        pageSize: 30,
        orderBy: 'like',
      }),
  });

  const articleList = data?.list ?? [];
  const articleCards = articleList.map((article: Article) => ({
    ...article,
    writer: article.writer.nickname,
    id: `${article.id}`,
  }));

  const bestArticleList = bestData?.list ?? [];
  const bestArticleCards = bestArticleList.map((article: Article) => ({
    ...article,
    writer: article.writer.nickname,
    id: `${article.id}`,
  }));

  const bestArticles = bestArticleCards.slice(
    (bestPage - 1) * itemsPerPage,
    bestPage * itemsPerPage,
  );

  const bestTotalPages = Math.max(1, Math.ceil(bestArticleCards.length / itemsPerPage));

  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / 10));
  const PAGE_WINDOW = 5;

  const startPage = Math.max(1, page - Math.floor(PAGE_WINDOW / 2));
  const endPage = Math.min(totalPages, startPage + PAGE_WINDOW - 1);

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="bg-background-primary mx-auto flex min-h-screen p-0 md:p-22">
      <main className="min-h-screen w-full">
        <div className="mb-7 flex w-full flex-col gap-4 p-5 px-6 md:flex-row md:items-center md:justify-between xl:px-0">
          <h1 className="text-text-primary text-2xl font-semibold">자유게시판</h1>
          <SearchInput
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', '1');
              router.replace(`${pathname}?${params.toString()}`);
            }}
            placeholder="검색어를 입력해주세요."
            aria-label="검색"
          />
        </div>
        {isBestPending ? (
          <BestArticlesSkeleton />
        ) : (
          <BestSection
            articles={bestArticles}
            currentPage={bestPage}
            totalPages={bestTotalPages}
            onPageChange={(nextPage) => setBestPage(nextPage)}
          />
        )}
        {isPending ? (
          <ArticleListSkeleton />
        ) : articleCards.length === 0 && searchValue ? (
          <div className="text-text-default flex min-h-40 items-center justify-center text-center">
            '{searchValue}'에 해당하는 결과가 없습니다.
          </div>
        ) : articleCards.length === 0 ? (
          <div className="text-text-default flex min-h-40 items-center justify-center text-center">
            아직 등록된 게시글이 없습니다.
          </div>
        ) : (
          <ListSection articles={articleCards} onSortChange={onSortChange} sortType={sortType} />
        )}
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
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
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
                  router.push(`${pathname}?${params.toString()}`, {
                    scroll: false,
                  });
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
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
          >
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
        <Button
          className="shadow-brand-tertiary-30 fixed right-10 bottom-10 shadow-md md:right-20 md:bottom-20"
          variant="icon-circle"
          icon={<WriteIcon className="size-6" />}
          onClick={() => router.push('/articles/write')}
        ></Button>
      </main>
    </div>
  );
};

export default ArticlesClient;
