import React from 'react';

import ProgressDone from '@/assets/icons/progress_done.svg?react';
import ProgressNothing from '@/assets/icons/progress_nothing.svg?react';
import ProgressOnDoing from '@/assets/icons/progress_ondoing.svg?react';
import { cn } from '@/utils/cn';

import { BadgeDoneProps, BadgeStatus } from './type';

const ICON_MAP = {
  done: ProgressDone,
  progress: ProgressOnDoing,
  none: ProgressNothing,
} as const;

const BadgeDone = React.forwardRef<HTMLDivElement, BadgeDoneProps>(
  ({ className, status = 'none', current = 0, total = 0, ...props }, ref) => {
    const baseStyles =
      'border-border-primary bg-background-primary inline-flex items-center justify-center gap-1 rounded-full border px-2 py-1 text-xs font-medium shadow-sm select-none';

    const statusTextStyles: Record<BadgeStatus, string> = {
      done: 'text-brand-primary', // 완료: 파란색 글씨
      progress: 'text-brand-primary', // 진행 중: 파란색 글씨
      none: 'text-text-disabled', // 없음: 회색 글씨
    };

    const Icon = ICON_MAP[status];

    return (
      <div ref={ref} className={cn(baseStyles, statusTextStyles[status], className)} {...props}>
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          {current}/{total}
        </span>
      </div>
    );
  },
);

BadgeDone.displayName = 'BadgeDone';

export default BadgeDone;
