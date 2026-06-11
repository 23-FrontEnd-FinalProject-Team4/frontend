'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import BestArticleSection from '@/app/articles/_components/BestSection';
import ArticleListSection from '@/app/articles/_components/ListSection';
import SearchInput from '@/app/articles/_components/SearchInput';
import WriteIcon from '@/assets/icons/pencil.svg?react';

import Button from '@/components/button/Button';

import { mockArticles } from './mockArticles';

const ArticlesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  return (
    <div className="bg-background-primary mx-auto flex min-h-screen p-0 md:pt-22 lg:p-22">
      <main className="min-h-screen">
        <div className="mb-7 flex flex-col gap-4 p-5 px-6 md:flex-row md:justify-between lg:px-0">
          <h1 className="text-text-primary text-2xl font-bold">자유게시판</h1>
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="검색어를 입력해주세요."
            aria-label="검색"
          />
        </div>
        <BestArticleSection
          articles={mockArticles}
          currentPage={page}
          totalPages={10}
          onPageChange={(page) => setPage(page)}
        />
        <ArticleListSection articles={mockArticles} />
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
