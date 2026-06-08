import HeartEmptyIcon from '@/assets/icons/heart_empty.svg';
import HeartFillIcon from '@/assets/icons/heart_fill.svg';
import { cn } from '@/utils/cn';

import type { LikeButtonProps } from '@/components/articlesDetail/ArticleDetail.type';

export default function LikeButton({ isLiked, likeCount }: LikeButtonProps) {
  return (
    <div className="flex w-full justify-end px-4">
      <button
        className={cn(
          'text-md flex flex-row items-center gap-1 font-light',
          isLiked ? 'text-brand-primary' : 'text-text-disabled',
        )}
      >
        {isLiked ? <HeartFillIcon className="h-6 w-4" /> : <HeartEmptyIcon className="h-6 w-4" />}
        {likeCount}
      </button>
    </div>
  );
}
