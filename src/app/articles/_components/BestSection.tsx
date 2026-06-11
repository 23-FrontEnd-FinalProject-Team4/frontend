import ArrowLeftIcon from '@/assets/icons/arrow_left.svg?react';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg?react';
import { cn } from '@/utils/cn';

import ArticleCard from './Card';
import type { ArticleWithLike } from './Card.type';
import PageIndicator from './PageIndicator';

type BestSectionProps = {
  articles: ArticleWithLike[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const BestSection = ({ articles, currentPage, totalPages, onPageChange }: BestSectionProps) => {
  return (
    <div className="bg-background-secondary mb-10 flex w-full flex-col items-center gap-6 px-6 py-10 xl:rounded-2xl">
      <h1 className="text-text-primary text-xl font-bold">베스트 게시글</h1>
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {articles.slice(0, 3).map((article, index) => (
          <div
            key={article.id}
            className={cn(index === 1 && 'hidden md:block', index === 2 && 'hidden xl:block')}
          >
            <ArticleCard key={article.id} article={article} variant="best" />
          </div>
        ))}
      </div>
      <div className={cn('relative flex w-full flex-col items-center gap-4')}>
        <PageIndicator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <div className="absolute right-0 -bottom-3 flex flex-row items-center gap-1">
          <button
            type="button"
            className={cn(
              'border-border-primary bg-background-primary hover:bg-background-tertiary hover:text-text-primary flex h-8 w-8 items-center justify-center gap-1 rounded-full border',
            )}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              'border-border-primary bg-background-primary hover:bg-background-tertiary hover:text-text-primary flex h-8 w-8 items-center justify-center gap-1 rounded-full border',
            )}
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSection;
