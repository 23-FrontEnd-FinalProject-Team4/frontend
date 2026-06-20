import Image from 'next/image';
import Link from 'next/link';

import BestIcon from '@/assets/icons/best.svg?react';
import HeartEmptyIcon from '@/assets/icons/heart_empty.svg';
import HeartFillIcon from '@/assets/icons/heart_fill.svg';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formatDate';
import { isAllowedImageUrl } from '@/utils/isAllowedImageUrl';

import type { ArticleCardProps } from './Card.type';

export const ArticleCard = ({ article, variant = 'normal' }: ArticleCardProps) => {
  const isBest = variant === 'best';

  const { id, title, content, image, writer, createdAt, isLiked, likeCount } = article;
  const formattedDate = formatDate(createdAt);

  return (
    <Link
      href={`/articles/${id}`}
      className="border-border-primary bg-background-primary hover:shadow-brand-tertiary-20 flex h-full flex-col gap-4 rounded-2xl border px-6 py-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      {isBest && (
        <span className="bg-background-secondary text-brand-primary flex w-18 flex-row items-center justify-center gap-1 rounded-full py-1.5 text-sm font-bold">
          <BestIcon className="h-6 w-4" />
          인기
        </span>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-text-primary text-2lg--line-height-24 line-clamp-1 font-bold">
              {title}
            </span>
            <p className="text-text-disabled text-md--line-height-17 line-clamp-2 font-light">
              {content}
            </p>
          </div>
          {isAllowedImageUrl(image) && (
            <Image
              src={image}
              alt="thumbnail"
              width={60}
              height={60}
              className="h-15 w-15 rounded-md object-cover"
            />
          )}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-text-primary text-md">{writer}</span>

            <div className="bg-text-default h-3 w-px" />
            <span className="text-text-disabled text-md">{formattedDate}</span>
          </div>
          <span
            className={cn(
              'text-md flex flex-row items-center gap-1 font-light',
              isLiked ? 'text-brand-primary' : 'text-text-disabled',
            )}
          >
            {isLiked ? (
              <HeartFillIcon className="h-6 w-4" />
            ) : (
              <HeartEmptyIcon className="h-6 w-4" />
            )}
            {likeCount}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
