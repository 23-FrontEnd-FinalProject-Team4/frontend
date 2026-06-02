import React from 'react';

import { cn } from '@/utils/cn';

import Profile from '../Profile/Profile';
import { ProfileMemberProps } from './type';

const ProfileMember = React.forwardRef<HTMLDivElement, ProfileMemberProps>(
  ({ className, member, onKebabClick, ...props }, ref) => {
    const { userName, userEmail, userImage } = member;

    return (
      <div
        ref={ref}
        className={cn('inline-flex h-8 w-full items-center gap-3 select-none', className)}
        {...props}
      >
        <Profile src={userImage} size="md" alt={`${userName}의 프로필`} />

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="truncate text-sm leading-tight font-medium text-slate-800">
            {userName}
          </span>
          <span className="truncate text-xs leading-tight text-slate-400">{userEmail}</span>
        </div>

        <button
          type="button"
          onClick={() => onKebabClick?.(member)}
          className="shrink-0 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-50 focus:outline-none active:bg-slate-100"
          aria-label={`${userName} 관리 메뉴`}
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    );
  },
);

ProfileMember.displayName = 'ProfileMember';

export default ProfileMember;
