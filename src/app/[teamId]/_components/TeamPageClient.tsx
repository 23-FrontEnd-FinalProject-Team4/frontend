'use client';

import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { overlay } from 'overlay-kit';

import Modal from '@/components/modal/Modal';
import type { TeamCardSize } from '@/components/team/type';

import useMediaQuery, { MEDIA_QUERY } from '@/hooks/useMediaQuery';

import { TASK_LISTS, TASK_STATUS_SECTIONS, TEAM_PAGE_MEMBERS } from '../_constants/mockData';
import type { TeamPageRole } from '../type';
import TeamPageHeader from './header/TeamPageHeader';
import MemberSection from './member/MemberSection';
import CreateTaskListModal from './task-list/CreateTaskListModal';
import TaskListSection from './task-list/TaskListSection';

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

const closeOverlay = (close: () => void, unmount: () => void) => {
  close();
  setTimeout(unmount, 200);
};

export default function TeamPageClient({ teamId }: TeamPageClientProps) {
  const isDesktop = useMediaQuery(MEDIA_QUERY.desktop);
  const isTablet = useMediaQuery(MEDIA_QUERY.tablet);

  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);

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

  const openInviteModal = useCallback(() => {
    overlay.open(({ isOpen, close, unmount }) => {
      const closeModal = () => closeOverlay(close, unmount);

      return (
        <Modal
          isOpen={isOpen}
          title="멤버 초대"
          description="그룹에 참여할 수 있는 링크를 복사합니다."
          primaryAction={{
            label: '링크 복사하기',
            onClick: () => {
              void copyInviteLink().then(() => {
                toast.success('초대 링크가 클립보드에 복사되었습니다.');
              });
              closeModal();
            },
          }}
          size="md"
          onClose={closeModal}
        />
      );
    });
  }, []);

  const openCreateListModal = useCallback(() => {
    overlay.open(({ isOpen, close, unmount }) => {
      const closeModal = () => closeOverlay(close, unmount);

      return (
        <CreateTaskListModal
          isOpen={isOpen}
          onClose={closeModal}
        />
      );
    });
  }, []);

  return (
    <div className="bg-background-secondary relative min-h-full overflow-y-auto px-4 py-6 md:px-6 xl:px-16 xl:py-15.75">
      <div className="mx-auto flex w-full max-w-85.75 flex-col gap-8 md:max-w-155 xl:mx-0 xl:max-w-280">
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
          onCreateTaskList={openCreateListModal}
        />

        <MemberSection members={TEAM_PAGE_MEMBERS} onInviteClick={openInviteModal} />
      </div>
    </div>
  );
}
