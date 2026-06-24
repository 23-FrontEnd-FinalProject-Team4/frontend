import ArrowLeftIcon from '@/assets/icons/arrow_left.svg?react';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg?react';
import { cn } from '@/utils/cn';

import ArticleCard from './Card';
import type { Article } from './Card.type';
import PageIndicator from './PageIndicator';

type BestSectionProps = {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const BestSection = ({ articles, currentPage, totalPages, onPageChange }: BestSectionProps) => {
  return (
    <div className="bg-background-secondary mb-10 flex w-full flex-col items-center gap-6 px-6 py-10 md:rounded-2xl">
      <h1 className="text-text-primary text-xl font-bold">베스트 게시글</h1>
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="best" />
        ))}
      </div>
      <nav
        aria-label="베스트 게시글 페이지"
        className={cn('relative flex w-full flex-col items-center gap-4')}
      >
        <PageIndicator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <div className="absolute right-0 -bottom-3 flex flex-row items-center gap-1">
          <button
            type="button"
            aria-label="이전 페이지"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={cn(
              'border-border-primary bg-background-primary hover:bg-background-tertiary hover:text-text-primary focus-visible:ring-brand-primary flex h-8 w-8 items-center justify-center gap-1 rounded-full border focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none',
            )}
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="다음 페이지"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={cn(
              'border-border-primary bg-background-primary hover:bg-background-tertiary hover:text-text-primary focus-visible:ring-brand-primary flex h-8 w-8 items-center justify-center gap-1 rounded-full border focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none',
            )}
          >
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default BestSection;
