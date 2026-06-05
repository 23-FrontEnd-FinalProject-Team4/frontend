'use client';

import { useState } from 'react';

import WriteIcon from '@/assets/icons/pencil.svg';

import ArticleListSection from '@/components/articles/ArticleListSection';
import BestArticleSection from '@/components/articles/BestArticleSection';
import SearchInput from '@/components/articles/SearchInput';
import Button from '@/components/button/Button';

import { mockArticles } from './mockArticles';

const ArticlesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="bg-background-primary tablet:pt-22 mx-auto flex min-h-screen p-0 lg:p-22">
      <main className="min-h-screen">
        {/* 자유게시판 헤더 */}
        <div className="tablet:flex-row mb-7 flex flex-col gap-4 p-5 px-6 md:justify-between lg:px-0">
          <h1 className="text-text-primary text-2xl font-bold">자유게시판</h1>
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="검색어를 입력해주세요."
            aria-label="검색"
          />
        </div>
        {/* 베스트 게시글  */}
        <BestArticleSection articles={mockArticles} />
        {/* 전체 게시글 */}
        <ArticleListSection articles={mockArticles} />
        {/* 글쓰기 플로팅 버튼 */}
        <Button
          className="shadow-brand-tertiary-30 fixed right-10 bottom-10 shadow-md md:right-20 md:bottom-20"
          variant="icon-circle"
          icon={<WriteIcon />}
        ></Button>
      </main>
    </div>
  );
};

export default ArticlesPage;
