import SettingsIcon from '@/assets/icons/setting.svg?react';
import { cn } from '@/utils/cn';

import Team from '@/components/team/Team';
import type { TeamCardSize, TeamMember } from '@/components/team/type';

import type { TeamPageRole } from '../../type';

interface TeamPageHeaderProps {
  role: TeamPageRole;
  size: TeamCardSize;
  members: TeamMember[];
  memberCount: number;
  isSettingsOpen: boolean;
  onSettingsClick: () => void;
}

export default function TeamPageHeader({
  role,
  size,
  members,
  memberCount,
  isSettingsOpen,
  onSettingsClick,
}: TeamPageHeaderProps) {
  const isAdmin = role === 'ADMIN';
  const isAdminLayout = isAdmin || size === 'lg';

  return (
    <div className="relative">
      <Team
        name="경영관리팀"
        members={members}
        memberCount={memberCount}
        completedTaskCount={5}
        totalTaskCount={20}
        progressValue={25}
        variant={isAdminLayout ? 'admin' : 'user'}
        size={size}
        className={cn(
          'w-full transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgb(15_23_42/0.08)]',
          isAdminLayout
            ? 'xl:rounded-5 min-h-37.75 gap-4 rounded-xl p-5 md:min-h-37.75 xl:min-h-59.75 xl:gap-6 xl:p-8 xl:[&_[role=progressbar]]:w-[calc(100%-32px)]'
            : 'h-14 rounded-xl px-4 md:h-16 xl:h-16 xl:px-6',
        )}
      />

      {isAdmin && (
        <button
          type="button"
          aria-label="팀 설정"
          aria-expanded={isSettingsOpen}
          className="text-icon-primary hover:bg-background-primary/80 hover:text-brand-primary hover:shadow-[0_8px_24px_rgb(15_23_42/0.10)] focus-visible:ring-brand-primary absolute top-5 right-5 z-10 flex size-7 items-center justify-center rounded-full backdrop-blur-sm transition-[background-color,box-shadow,color,transform] duration-300 ease-out focus-visible:ring-2 focus-visible:outline-none active:scale-95 xl:top-auto xl:right-6 xl:bottom-12.5"
          onClick={onSettingsClick}
        >
          <SettingsIcon className="size-6" aria-hidden="true" />
        </button>
      )}

      {isSettingsOpen && isAdmin && (
        <div className="border-border-primary bg-background-primary absolute top-13 right-2 z-20 w-30 overflow-hidden rounded-xl border py-2 shadow-lg xl:top-47.5 xl:right-0">
          <button
            type="button"
            className="hover:bg-background-secondary focus-visible:ring-brand-primary text-text-primary text-md w-full px-5 py-4 text-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            수정하기
          </button>
          <button
            type="button"
            className="hover:bg-background-secondary focus-visible:ring-brand-primary text-text-primary text-md w-full px-5 py-4 text-center transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
