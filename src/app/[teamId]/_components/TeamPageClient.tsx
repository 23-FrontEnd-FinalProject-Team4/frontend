'use client';

import { useMemo, useState } from 'react';

import Modal from '@/components/modal/Modal';
import type { TeamCardSize } from '@/components/team/type';

import useMediaQuery from '@/hooks/useMediaQuery';

import MemberSection from './MemberSection';
import TaskListSection from './TaskListSection';
import TeamPageHeader from './TeamPageHeader';
import { TASK_LISTS, TASK_STATUS_SECTIONS, TEAM_PAGE_MEMBERS } from './mockData';
import type { TeamPageRole } from './types';

interface TeamPageClientProps {
  teamId: string;
}

const isMemberView = (teamId: string) => ['member', 'user'].includes(teamId.toLowerCase());

const copyInviteLink = async () => {
  if (!navigator.clipboard) {
    return;
  }

  await navigator.clipboard.writeText('https://coworkers.example.com/invite/management');
};

export default function TeamPageClient({ teamId }: TeamPageClientProps) {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isTablet = useMediaQuery('(min-width: 744px)');

  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);

  const role: TeamPageRole = isMemberView(teamId) ? 'MEMBER' : 'ADMIN';
  const teamCardSize: TeamCardSize = isDesktop ? 'lg' : isTablet ? 'md' : 'sm';

  const groupedTaskLists = useMemo(
    () =>
      TASK_STATUS_SECTIONS.map((section) => ({
        ...section,
        items: TASK_LISTS.filter((item) => item.status === section.status),
      })),
    [],
  );

  return (
    <div className="bg-background-secondary tablet:px-6 desktop:px-16 desktop:py-15.75 relative min-h-full overflow-y-auto px-4 py-6">
      <div className="tablet:max-w-155 desktop:mx-0 desktop:max-w-280 mx-auto flex w-full max-w-85.75 flex-col gap-8">
        <TeamPageHeader
          role={role}
          size={teamCardSize}
          members={TEAM_PAGE_MEMBERS}
          memberCount={TEAM_PAGE_MEMBERS.length}
          isSettingsOpen={isTeamMenuOpen}
          onSettingsClick={() => setIsTeamMenuOpen((prev) => !prev)}
        />

        <TaskListSection
          teamId={teamId}
          taskListsCount={TASK_LISTS.length}
          sections={groupedTaskLists}
          onCreateTaskList={() => setIsCreateListModalOpen(true)}
        />

        <MemberSection
          members={TEAM_PAGE_MEMBERS}
          onInviteClick={() => setIsInviteModalOpen(true)}
        />
      </div>

      <Modal
        isOpen={isInviteModalOpen}
        title="멤버 초대"
        description="그룹에 참여할 수 있는 링크를 복사합니다."
        primaryAction={{
          label: '링크 복사하기',
          onClick: () => {
            void copyInviteLink();
            setIsInviteModalOpen(false);
          },
        }}
        size="md"
        onClose={() => setIsInviteModalOpen(false)}
      />

      <Modal
        isOpen={isCreateListModalOpen}
        title="할 일 목록"
        primaryAction={{
          label: '만들기',
          onClick: () => setIsCreateListModalOpen(false),
        }}
        size="md"
        onClose={() => setIsCreateListModalOpen(false)}
      >
        <input
          type="text"
          placeholder="목록 명을 입력해주세요."
          className="border-border-primary text-text-primary placeholder:text-text-disabled focus:border-brand-primary focus:ring-brand-primary h-11 w-full rounded-lg border px-4 text-sm transition-colors outline-none focus:ring-2"
        />
      </Modal>
    </div>
  );
}
