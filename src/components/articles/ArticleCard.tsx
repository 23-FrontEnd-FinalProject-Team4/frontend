import Image from 'next/image';

import BestIcon from '@/assets/icons/best.svg?react';
import HeartEmptyIcon from '@/assets/icons/heart_empty.svg?react';

import type { ArticleCardProps } from './ArticleCard.type';

export default function ArticleCard({ article, variant = 'normal' }: ArticleCardProps) {
  const { id, title, content, image, writer, createdAt, likeCount } = article;
  const isBest = variant === 'best';
  return (
    <div className="border-border-primary bg-background-primary flex flex-col gap-4 rounded-2xl border px-6 py-4">
      {isBest && (
        <span className="bg-background-secondary text-brand-primary flex w-18 flex-row items-center justify-center gap-1 rounded-full py-1.5 text-[14px] font-bold">
          <BestIcon className="h-6 w-4" />
          인기
        </span>
      )}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="text-text-primary text-2lg--line-height-24 font-bold">{title}</span>
            <p className="text-text-disabled text-md--line-height-17 line-clamp-2 font-light">
              {content}
            </p>
          </div>
          {image && (
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
            <span className="text-text-disabled text-md">{createdAt}</span>
          </div>
          <span className="text-text-disabled text-md flex flex-row items-center gap-1 font-light">
            <HeartEmptyIcon className="h-6 w-4" /> {likeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
