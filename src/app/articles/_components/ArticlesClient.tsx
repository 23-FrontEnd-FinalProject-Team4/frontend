'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { getArticles } from '@/apis/article';
import { Article } from '@/apis/article/type';
import BestSection from '@/app/articles/_components/BestSection';
import ListSection from '@/app/articles/_components/ListSection';
import Pagination from '@/app/articles/_components/Pagination';
import SearchInput from '@/app/articles/_components/SearchInput';
import WriteIcon from '@/assets/icons/pencil.svg';
import Button from '@/components/button/Button';
import { useDebounce } from '@/hooks/useDebounce';

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

    router.push(`${pathname}?${params.toString()}`);
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

  const { data } = useQuery({
    queryKey: ['articles', page, debouncedKeyword, sortType],
    queryFn: () =>
      getArticles({
        page,
        pageSize: 10,
        orderBy: sortType,
        keyword: debouncedKeyword || undefined,
      }),
  });

  const { data: bestData } = useQuery({
    queryKey: ['best-articles'],
    queryFn: () =>
      getArticles({
        page: 1,
        pageSize: 100,
        orderBy: 'like',
      }),
  });

  const articleCards =
    data?.list.map((article: Article) => ({
      ...article,
      writer: article.writer.nickname,
      id: `${article.id}`,
    })) ?? [];

  const bestArticleCards =
    bestData?.list.map((article: Article) => ({
      ...article,
      writer: article.writer.nickname,
      id: `${article.id}`,
    })) ?? [];

  const bestArticles = bestArticleCards.slice(
    (bestPage - 1) * itemsPerPage,
    bestPage * itemsPerPage,
  );

  const bestTotalPages = Math.max(1, Math.ceil(bestArticleCards.length / itemsPerPage));

  return (
    <div className="bg-background-primary mx-auto flex min-h-screen p-0 md:p-22">
      <main className="min-h-screen w-full">
        <div className="mb-7 flex w-full flex-col gap-4 p-5 px-6 md:flex-row md:justify-between xl:px-0">
          <h1 className="text-text-primary text-2xl font-bold">자유게시판</h1>
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
        <BestSection
          articles={bestArticles}
          currentPage={bestPage}
          totalPages={bestTotalPages}
          onPageChange={(nextPage) => setBestPage(nextPage)}
        />
        {articleCards.length === 0 && searchValue ? (
          <div className="text-text-default flex min-h-40 items-center justify-center text-center">
            '{searchValue}'에 해당하는 결과가 없습니다.
          </div>
        ) : (
          <ListSection articles={articleCards} onSortChange={onSortChange} sortType={sortType} />
        )}
        <Pagination page={page} totalCount={data?.totalCount ?? 0} />
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
