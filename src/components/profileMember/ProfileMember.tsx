import React from 'react';

import Image from 'next/image';

import kebab from '@/assets/icons/kebab.svg';
import { cn } from '@/utils/cn';

import Profile from '@/components/profile/Profile';

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
          <span className="text-text-primary truncate text-sm leading-tight font-medium">
            {userName}
          </span>
          <span className="text-text-secondary truncate text-xs leading-tight">{userEmail}</span>
        </div>
        <button
          type="button"
          onClick={() => onKebabClick?.(member)}
          className="text-icon-primary hover:bg-background-secondary active:bg-background-tertiary shrink-0 rounded-md p-1 transition-colors focus:outline-none"
        >
          <Image
            src={kebab}
            alt="프로필 메뉴 버튼"
            height={16}
            width={16}
            className="block h-4 w-4"
          />
        </button>
      </div>
    );
  },
);

ProfileMember.displayName = 'ProfileMember';

export default ProfileMember;
