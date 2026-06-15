import KebabIcon from '@/assets/icons/kebab.svg?react';
import { cn } from '@/utils/cn';

import type { ReplyProps, ReplySize } from './type';

const textSizeClass: Record<ReplySize, string> = {
  sm: 'text-sm',
  lg: 'text-md',
};

const dateSizeClass: Record<ReplySize, string> = {
  sm: 'text-xs',
  lg: 'text-md',
};

const authorWeightClass: Record<ReplySize, string> = {
  sm: 'font-medium',
  lg: 'font-semibold',
};

const Reply = ({ size = 'sm', author, avatar, children, date, onMenuClick }: ReplyProps) => {
  return (
    <div
      className={cn(
        'relative flex items-start gap-3 px-5 py-6',
        onMenuClick && 'pr-11',
      )}
    >
      <div className="shrink-0">{avatar}</div>

      <div className="-mt-0.5 min-w-0 flex-1">
        <strong className={cn('text-text-primary', textSizeClass[size], authorWeightClass[size])}>
          {author}
        </strong>

        <div className={cn('text-text-primary mt-1 whitespace-pre-line', textSizeClass[size])}>
          {children}
        </div>

        <p className={cn('mt-2 text-slate-400', dateSizeClass[size])}>{date}</p>
      </div>

      {onMenuClick && (
        <button
          type="button"
          aria-label="메뉴"
          onClick={onMenuClick}
          className="absolute top-6 right-5"
        >
          <KebabIcon className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
};

export default Reply;
