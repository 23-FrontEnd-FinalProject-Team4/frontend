import KebabIcon from '@/assets/icons/kebab.svg?react';
import { cn } from '@/utils/cn';

import type { ReplyProps, ReplySize } from './type';

const dateSizeClass: Record<ReplySize, string> = {
  sm: 'text-xs',
  lg: 'text-md',
};

const Reply = ({
  size = 'sm',
  author,
  avatar,
  children,
  date,
  highlighted = false,
  onMenuClick,
}: ReplyProps) => {
  return (
    <div
      className={cn(
        'relative flex items-start gap-3 px-5 py-6',
        onMenuClick && 'pr-11',
        highlighted && 'bg-slate-50',
      )}
    >
      <div className="shrink-0">{avatar}</div>

      <div className="-mt-0.5 min-w-0 flex-1">
        <strong className="text-text-primary text-sm font-medium">{author}</strong>

        <div className="text-text-primary mt-1 text-sm whitespace-pre-line">{children}</div>

        {date && <p className={cn('mt-2 text-slate-400', dateSizeClass[size])}>{date}</p>}
      </div>

      {onMenuClick && (
        <button
          type="button"
          aria-label="메뉴"
          onClick={onMenuClick}
          className="absolute top-6 right-5"
        >
          <KebabIcon aria-hidden />
        </button>
      )}
    </div>
  );
};

export default Reply;
