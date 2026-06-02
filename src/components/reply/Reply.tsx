import KebabIcon from '@/assets/icons/kebab.svg?react';
import { cn } from '@/utils/cn';

import type { ReplyProps, ReplySize } from './type';

const dateSizeClass: Record<ReplySize, string> = {
  sm: 'text-xs',
  lg: 'text-md',
};

const Reply = ({ size = 'sm', author, avatar, children, menu }: ReplyProps) => {
  return (
    <div className="relative flex items-start gap-3 px-5 py-6 pr-11">
      <div className="shrink-0">{avatar}</div>

      <div className="-mt-0.5 min-w-0 flex-1">
        <strong className="text-text-primary text-sm font-semibold">{author}</strong>

        <div className="text-text-primary mt-1 text-sm whitespace-pre-line">{children}</div>

        <p className={cn('mt-2 text-slate-400', dateSizeClass[size])}>{menu.date}</p>
      </div>

      <button
        type="button"
        aria-label="메뉴"
        onClick={menu.onMenuClick}
        className="absolute top-6 right-5"
      >
        <KebabIcon aria-hidden />
      </button>
    </div>
  );
};

export default Reply;
