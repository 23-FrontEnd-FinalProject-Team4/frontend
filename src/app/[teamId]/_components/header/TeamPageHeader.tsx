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

  return (
    <div className="relative">
      <Team
        name="경영관리팀"
        members={members}
        memberCount={memberCount}
        completedTaskCount={5}
        totalTaskCount={20}
        progressValue={25}
        variant={isAdmin ? 'admin' : 'user'}
        size={size}
        className={cn(
          'w-full',
          isAdmin
            ? 'tablet:min-h-37.75 desktop:min-h-59.75 desktop:gap-6 desktop:rounded-5 desktop:p-8 desktop:[&_[role=progressbar]]:w-[calc(100%-32px)] min-h-37.75 gap-4 rounded-xl p-5'
            : 'tablet:h-16 desktop:h-16 desktop:px-6 h-14 rounded-xl px-4',
        )}
      />

      {isAdmin && (
        <button
          type="button"
          aria-label="팀 설정"
          aria-expanded={isSettingsOpen}
          className="hover:bg-background-secondary hover:text-brand-primary focus-visible:ring-brand-primary text-icon-primary desktop:top-auto desktop:right-6 desktop:bottom-12.5 absolute top-5 right-5 z-10 flex size-7 items-center justify-center rounded-md transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none active:scale-95"
          onClick={onSettingsClick}
        >
          <SettingsIcon className="size-6" aria-hidden="true" />
        </button>
      )}

      {isSettingsOpen && isAdmin && (
        <div className="border-border-primary bg-background-primary desktop:top-47.5 desktop:right-0 absolute top-13 right-2 z-20 w-30 overflow-hidden rounded-xl border py-2 shadow-lg">
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
