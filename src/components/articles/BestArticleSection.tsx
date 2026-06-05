import ArrowLeftIcon from '@/assets/icons/arrow_left.svg?react';
import ArrowRightIcon from '@/assets/icons/arrow_right.svg?react';
import { cn } from '@/utils/cn';

import ArticleCard from './ArticleCard';
import type { ArticleWithLike } from './ArticleCard.type';
import PageIndicator from './PageIndicator';

export default function BestArticleSection({ articles }: { articles: ArticleWithLike[] }) {
  return (
    <div className="bg-background-secondary flex w-full flex-col items-center gap-6 px-6 py-10 lg:mb-10 lg:rounded-2xl">
      <h1 className="text-text-primary text-xl font-bold">베스트 게시글</h1>
      <div className="tablet:grid-cols-2 grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="best" />
        ))}
      </div>
      <div className={cn('relative flex w-full flex-col items-center gap-4')}>
        <PageIndicator currentPage={1} totalPages={10} />
        <div className="absolute right-0 bottom-[-12px] flex flex-row items-center gap-1">
          <button
            className={cn(
              'border-border-primary bg-background-primary hover:bg-background-tertiary hover:text-text-primary flex h-8 w-8 items-center justify-center gap-1 rounded-full border',
            )}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
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
}
