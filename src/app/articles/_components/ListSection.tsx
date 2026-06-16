'use client';

import { useMemo, useState } from 'react';

import ArticleCard from '@/app/articles/_components/Card';
import type { ArticleWithLike } from '@/app/articles/_components/Card.type';
import DropdownMd from '@/components/dropdown/DropdownMd';

const SORT_OPTIONS = ['최신순', '좋아요 많은순'] as const;

const ListSection = ({ articles }: { articles: ArticleWithLike[] }) => {
  const [sortType, setSortType] = useState<(typeof SORT_OPTIONS)[number]>(SORT_OPTIONS[0]);

  const sortedArticles = useMemo(() => {
    const copied = [...articles];

    if (sortType === '좋아요 많은순') {
      return copied.sort((a, b) => b.likeCount - a.likeCount);
    }

    return copied.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [articles, sortType]);

  return (
    <div className="flex flex-col gap-5 p-7 xl:p-0">
      <div className="flex flex-row justify-between">
        <h1 className="text-text-primary text-2xl font-bold">전체 게시글</h1>
        <DropdownMd
          options={SORT_OPTIONS.map((option) => option.toString())}
          onSelect={(value) => setSortType(value as (typeof SORT_OPTIONS)[number])}
        >
          <div>{sortType}</div>
        </DropdownMd>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {sortedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="normal" />
        ))}
      </div>
    </div>
  );
};

export default ListSection;
