import React from 'react';

import ProgressDone from '@/assets/icons/progress_done.svg';
import ProgressNothing from '@/assets/icons/progress_nothing.svg';
import ProgressOnDoing from '@/assets/icons/progress_ondoing.svg';
import { cn } from '@/utils/cn';

import { BadgeDoneProps, BadgeStatus } from './type';

const BadgeDone = React.forwardRef<HTMLDivElement, BadgeDoneProps>(
  ({ className, status = 'none', current = 0, total = 0, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-md font-medium gap-1.5 select-none';

    const statusTextStyles: Record<BadgeStatus, string> = {
      done: 'text-brand-primary', // 완료: 파란색 글씨
      progress: 'text-brand-primary', // 진행 중: 파란색 글씨
      none: 'text-text-disabled', // 없음: 회색 글씨
    };

    // 상태에 따른 아이콘 매핑
    const renderIcon = () => {
      switch (status) {
        case 'done':
          return <ProgressDone className="h-5 w-5 shrink-0" />;
        case 'progress':
          return <ProgressOnDoing className="h-5 w-5 shrink-0" />;
        case 'none':
          return <ProgressNothing className="h-5 w-5 shrink-0" />;
        default:
          return null;
      }
    };

    return (
      <div ref={ref} className={cn(baseStyles, statusTextStyles[status], className)} {...props}>
        {renderIcon()}
        <span>
          {current}/{total}
        </span>
      </div>
    );
  },
);

BadgeDone.displayName = 'BadgeDone';

export default BadgeDone;
