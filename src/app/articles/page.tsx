'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { getArticles } from '@/apis/article';
import BestSection from '@/app/articles/_components/BestSection';
import ListSection from '@/app/articles/_components/ListSection';
import SearchInput from '@/app/articles/_components/SearchInput';
import WriteIcon from '@/assets/icons/pencil.svg?react';
import { useQuery } from '@tanstack/react-query';

import Button from '@/components/button/Button';

const ArticlesPage = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['articles', page, searchValue],
    queryFn: () =>
      getArticles({
        page,
        pageSize: 10,
        orderBy: 'recent',
        keyword: searchValue || undefined,
      }),
  });
  console.log('data', data);

  console.log('list', data?.list);

  console.log('count', data?.list?.length);

  const articleCards =
    data?.list.map((article) => ({
      ...article,
      writer: article.writer.nickname,
      isLiked: false,
    })) ?? [];

  const totalPages = Math.max(1, Math.ceil((data?.totalCount ?? 0) / 10));

  return (
    <div className="bg-background-primary mx-auto flex min-h-screen p-0 md:p-22">
      <main className="min-h-screen w-full">
        <div className="mb-7 flex w-full flex-col gap-4 p-5 px-6 md:flex-row md:justify-between xl:px-0">
          <h1 className="text-text-primary text-2xl font-bold">자유게시판</h1>
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="검색어를 입력해주세요."
            aria-label="검색"
          />
        </div>
        <BestSection
          articles={articleCards}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
        <ListSection articles={articleCards} />
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

export default ArticlesPage;
