'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { toast } from 'react-hot-toast';

import type { Member } from '@/apis/group/type';
import type { TeamCardSize } from '@/components/team/type';
import useMediaQuery, { MEDIA_QUERY } from '@/hooks/useMediaQuery';
import {
  useCreateTeamTaskListMutation,
  useDeleteTeamMemberMutation,
  useDeleteTeamMutation,
} from '@/queries/teams/queries';
import { teamKeys } from '@/queries/teams/queryKeys';

import { getTeamPageDataAction } from '../_actions/team-page.action';
import { TASK_LISTS, TASK_STATUS_SECTIONS, TEAM_PAGE_MEMBERS } from '../_constants/mockData';
import { createTaskItemsByStatus } from '../_utils/taskSections';
import { isTaskDone } from '../_utils/taskStatus';
import type { TeamPageMember, TeamPageRole } from '../type';
import TeamPageSkeleton from './TeamPageSkeleton';
import TeamPageHeader from './header/TeamPageHeader';
import MemberSection from './member/MemberSection';
import DeleteTeamModal from './modals/DeleteTeamModal';
import InviteMemberModal from './modals/InviteMemberModal';
import RemoveMemberModal from './modals/RemoveMemberModal';
import CreateTaskListModal from './task-list/CreateTaskListModal';
import TaskListSection from './task-list/TaskListSection';

interface TeamPageClientProps {
  teamId: string;
  initialDate: string;
}

const FALLBACK_TASK_ITEMS_BY_STATUS = {
  today: TASK_LISTS.filter((item) => item.status === 'today'),
  scheduled: TASK_LISTS.filter((item) => item.status === 'scheduled'),
  done: TASK_LISTS.filter((item) => item.status === 'done'),
};

const isMemberView = (teamId: string) => ['member', 'user'].includes(teamId.toLowerCase());

const getRouteGroupId = (teamId: string) => {
  const groupId = Number(teamId);
  return Number.isSafeInteger(groupId) && groupId > 0 ? groupId : undefined;
};

const getProgressValue = (completedTaskCount: number, totalTaskCount: number) => {
  if (totalTaskCount <= 0) {
    return 0;
  }

  return Math.round((completedTaskCount / totalTaskCount) * 100);
};

const compareMembersByRole = (firstMember: Member, secondMember: Member) => {
  if (firstMember.role === secondMember.role) {
    return 0;
  }

  return firstMember.role === 'ADMIN' ? -1 : 1;
};

const mapMembers = (members: Member[]): TeamPageMember[] =>
  [...members].sort(compareMembersByRole).map((member) => ({
    id: member.userId,
    name: member.userName,
    email: member.userEmail,
    imageUrl: member.userImage ?? undefined,
    role: member.role,
  }));

const TeamPageStatus = ({ message }: { message: string }) => (
  <div className="bg-background-primary text-text-default text-md flex min-h-60 items-center justify-center rounded-xl font-medium shadow-sm">
    {message}
  </div>
);

const TeamPageClient = ({ teamId, initialDate }: TeamPageClientProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: createTeamTaskList } = useCreateTeamTaskListMutation();
  const { mutateAsync: deleteTeam } = useDeleteTeamMutation();
  const { mutateAsync: deleteTeamMember } = useDeleteTeamMemberMutation();
  const isDesktop = useMediaQuery(MEDIA_QUERY.desktop);
  const isTablet = useMediaQuery(MEDIA_QUERY.tablet);
  const today = initialDate;

  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);

  const routeGroupId = getRouteGroupId(teamId);

  const { data: teamPageResult, isPending } = useQuery({
    queryKey: teamKeys.detail({ teamId, date: today }),
    queryFn: () => getTeamPageDataAction({ teamId, date: today }),
  });

  const teamPageError = teamPageResult?.success === false ? teamPageResult.error : undefined;
  const teamPageData = teamPageResult?.success ? teamPageResult.data : undefined;
  const myGroups = teamPageData?.myGroups ?? [];
  const myProfile = teamPageData?.myProfile;
  const selectedGroupId = teamPageData?.selectedGroupId ?? routeGroupId ?? myGroups[0]?.id;
  const group = teamPageData?.group;
  const todayTasks = teamPageData?.todayTasks;

  const fallbackRole: TeamPageRole =
    routeGroupId !== undefined || isMemberView(teamId) ? 'MEMBER' : 'ADMIN';
  const role =
    myProfile?.memberships?.find((membership) => membership.groupId === selectedGroupId)?.role ??
    fallbackRole;
  const teamCardSize: TeamCardSize = isDesktop ? 'lg' : isTablet ? 'md' : 'sm';
  const members = useMemo(
    () => (group?.members ? mapMembers(group.members) : TEAM_PAGE_MEMBERS),
    [group],
  );
  const taskItemsByStatus = useMemo(
    () =>
      group?.taskLists
        ? createTaskItemsByStatus(group.taskLists, today)
        : FALLBACK_TASK_ITEMS_BY_STATUS,
    [group, today],
  );
  const totalTaskCount = todayTasks?.length ?? 0;
  const completedTaskCount = todayTasks?.filter(isTaskDone).length ?? 0;
  const progressValue = getProgressValue(completedTaskCount, totalTaskCount);

  const groupedTaskLists = useMemo(
    () =>
      TASK_STATUS_SECTIONS.map((section) => ({
        ...section,
        items: taskItemsByStatus[section.status],
      })),
    [taskItemsByStatus],
  );

  const openInviteModal = () => {
    overlay.open(({ isOpen, close }) => {
      return <InviteMemberModal isOpen={isOpen} groupId={selectedGroupId} onClose={close} />;
    });
  };

  const handleEditTeam = () => {
    if (!selectedGroupId) {
      toast.error('팀 정보를 찾을 수 없습니다.');
      return;
    }

    setIsTeamMenuOpen(false);
    router.push(`/${selectedGroupId}/editteam`);
  };

  const openDeleteTeamModal = () => {
    if (!selectedGroupId) {
      toast.error('팀 정보를 찾을 수 없습니다.');
      return;
    }

    setIsTeamMenuOpen(false);

    overlay.open(({ isOpen, close }) => {
      const handleDeleteTeam = async () => {
        try {
          await deleteTeam({ groupId: selectedGroupId });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : '팀을 삭제하지 못했습니다.');
          return false;
        }

        const nextGroupId = myGroups.find((myGroup) => myGroup.id !== selectedGroupId)?.id;

        toast.success('팀을 삭제했습니다.');
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['sidebar'] }),
          queryClient.invalidateQueries({ queryKey: ['team-page'] }),
        ]);

        router.push(nextGroupId ? `/${nextGroupId}` : '/no-team');
        return true;
      };

      return (
        <DeleteTeamModal
          isOpen={isOpen}
          teamName={group?.name ?? '선택한'}
          onClose={close}
          onDelete={handleDeleteTeam}
        />
      );
    });
  };

  const openRemoveMemberModal = (member: TeamPageMember) => {
    if (!selectedGroupId) {
      toast.error('팀 정보를 찾을 수 없습니다.');
      return;
    }

    if (role !== 'ADMIN' || member.role === 'ADMIN') {
      toast.error('멤버를 관리할 권한이 없습니다.');
      return;
    }

    overlay.open(({ isOpen, close }) => {
      const handleRemoveMember = async () => {
        try {
          await deleteTeamMember({
            groupId: selectedGroupId,
            memberUserId: member.id,
          });
        } catch (error) {
          toast.error(error instanceof Error ? error.message : '멤버를 내보내지 못했습니다.');
          return false;
        }

        toast.success(`${member.name}님을 팀에서 내보냈습니다.`);
        return true;
      };

      return (
        <RemoveMemberModal
          isOpen={isOpen}
          memberName={member.name}
          onClose={close}
          onRemove={handleRemoveMember}
        />
      );
    });
  };

  const openCreateListModal = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <CreateTaskListModal
          isOpen={isOpen}
          onClose={close}
          onCreate={async (title) => {
            if (!selectedGroupId) {
              toast.error('팀 정보를 찾을 수 없습니다.');
              return false;
            }

            try {
              await createTeamTaskList({
                groupId: selectedGroupId,
                name: title,
              });
            } catch (error) {
              toast.error(
                error instanceof Error ? error.message : '할 일 목록을 생성하지 못했습니다.',
              );
              return false;
            }

            toast.success('할 일 목록을 만들었습니다.');

            return true;
          }}
        />
      );
    });
  };

  return (
    <div className="bg-background-secondary relative min-h-full overflow-y-auto px-4 py-6 md:px-6 xl:px-16 xl:py-15.75">
      <div className="mx-auto flex w-full max-w-85.75 flex-col gap-8 md:max-w-155 xl:mx-0 xl:max-w-280">
        {isPending ? (
          <TeamPageSkeleton />
        ) : teamPageError ? (
          <TeamPageStatus message={teamPageError} />
        ) : (
          <>
            <TeamPageHeader
              name={group?.name ?? '경영관리팀'}
              imageUrl={group?.image}
              role={role}
              size={teamCardSize}
              members={members}
              memberCount={members.length}
              completedTaskCount={completedTaskCount}
              totalTaskCount={totalTaskCount}
              progressValue={progressValue}
              isSettingsOpen={isTeamMenuOpen}
              onSettingsClick={() => setIsTeamMenuOpen((prev) => !prev)}
              onEditClick={handleEditTeam}
              onDeleteClick={openDeleteTeamModal}
            />

            <TaskListSection
              teamId={String(selectedGroupId ?? teamId)}
              taskListsCount={group?.taskLists.length ?? TASK_LISTS.length}
              sections={groupedTaskLists}
              onCreateTaskList={openCreateListModal}
            />

            <MemberSection
              members={members}
              viewerRole={role}
              onInviteClick={openInviteModal}
              onRemoveMember={openRemoveMemberModal}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TeamPageClient;
