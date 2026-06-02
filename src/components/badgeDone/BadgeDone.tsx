import React from 'react';

import Image, { StaticImageData } from 'next/image';

import ProgressDone from '@/assets/icons/progress_done.svg';
import ProgressNothing from '@/assets/icons/progress_nothing.svg';
import ProgressOnDoing from '@/assets/icons/progress_ondoing.svg';
import { cn } from '@/utils/cn';

import { BadgeDoneProps, BadgeStatus } from './type';

const ICON_MAP: Record<BadgeStatus, StaticImageData | string> = {
  done: ProgressDone,
  progress: ProgressOnDoing,
  none: ProgressNothing,
};

const BadgeDone = React.forwardRef<HTMLDivElement, BadgeDoneProps>(
  ({ className, status = 'none', current = 0, total = 0, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center px-2 py-1 rounded-full bg-white border border-slate-100 shadow-sm text-xs font-medium gap-1 select-none';

    const statusTextStyles: Record<BadgeStatus, string> = {
      done: 'text-brand-primary', // 완료: 파란색 글씨
      progress: 'text-brand-primary', // 진행 중: 파란색 글씨
      none: 'text-text-disabled', // 없음: 회색 글씨
    };

    const icon = ICON_MAP[status];

    return (
      <div ref={ref} className={cn(baseStyles, statusTextStyles[status], className)} {...props}>
        {icon && (
          <Image src={icon} alt={status} className="h-4 w-4 shrink-0" width={16} height={16} />
        )}
        <span>
          {current}/{total}
        </span>
      </div>
    );
  },
);

BadgeDone.displayName = 'BadgeDone';

export default BadgeDone;
