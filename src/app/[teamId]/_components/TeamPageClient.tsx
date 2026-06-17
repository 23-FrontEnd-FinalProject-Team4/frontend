'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { toast } from 'react-hot-toast';

import type { Member, TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';
import type { TeamCardSize } from '@/components/team/type';
import useMediaQuery, { MEDIA_QUERY } from '@/hooks/useMediaQuery';
import {
  useCreateTeamTaskListMutation,
  useDeleteTeamMutation,
} from '@/queries/teams/queries';

import { getTeamPageDataAction } from '../_actions/team-page.action';
import { TASK_LISTS, TASK_STATUS_SECTIONS, TEAM_PAGE_MEMBERS } from '../_constants/mockData';
import type { TaskListItem, TeamPageMember, TeamPageRole } from '../type';
import TeamPageHeader from './header/TeamPageHeader';
import MemberSection from './member/MemberSection';
import DeleteTeamModal from './modals/DeleteTeamModal';
import InviteMemberModal from './modals/InviteMemberModal';
import CreateTaskListModal from './task-list/CreateTaskListModal';
import TaskListSection from './task-list/TaskListSection';

interface TeamPageClientProps {
  teamId: string;
  initialDate: string;
}

const TEAM_PAGE_QUERY_KEY = {
  data: (teamId: string, date: string) => ['team-page', teamId, date] as const,
};

const isMemberView = (teamId: string) => ['member', 'user'].includes(teamId.toLowerCase());

const getRouteGroupId = (teamId: string) => {
  const groupId = Number(teamId);
  return Number.isSafeInteger(groupId) && groupId > 0 ? groupId : undefined;
};

const isTaskDone = (task: Task) => Boolean(task.doneAt || task.doneBy?.user);

const getProgressValue = (completedTaskCount: number, totalTaskCount: number) => {
  if (totalTaskCount <= 0) {
    return 0;
  }

  return Math.round((completedTaskCount / totalTaskCount) * 100);
};

const mapMembers = (members: Member[]): TeamPageMember[] =>
  members.map((member) => ({
    id: member.userId,
    name: member.userName,
    email: member.userEmail,
    imageUrl: member.userImage ?? undefined,
  }));

const mapTaskLists = (taskLists: TaskList[] = []): TaskListItem[] =>
  taskLists.map((taskList) => {
    const tasks = taskList.tasks ?? [];
    const doneCount = tasks.filter(isTaskDone).length;
    const totalCount = tasks.length;

    return {
      id: taskList.id,
      title: taskList.name,
      status: totalCount > 0 && doneCount === totalCount ? 'done' : 'today',
      doneCount,
      totalCount,
      tasks: tasks.slice(0, 3).map((task) => ({
        id: task.id,
        title: task.name,
        done: isTaskDone(task),
      })),
    };
  });

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
  const isDesktop = useMediaQuery(MEDIA_QUERY.desktop);
  const isTablet = useMediaQuery(MEDIA_QUERY.tablet);
  const today = initialDate;

  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);

  const routeGroupId = getRouteGroupId(teamId);

  const { data: teamPageResult, isPending } = useQuery({
    queryKey: TEAM_PAGE_QUERY_KEY.data(teamId, today),
    queryFn: () => getTeamPageDataAction({ teamId, date: today }),
    enabled: Boolean(today),
  });

  const teamPageError = teamPageResult?.success === false ? teamPageResult.error : undefined;
  const teamPageData = teamPageResult?.success ? teamPageResult.data : undefined;
  const myGroups = teamPageData?.myGroups ?? [];
  const myProfile = teamPageData?.myProfile;
  const selectedGroupId = teamPageData?.selectedGroupId ?? routeGroupId ?? myGroups[0]?.id;
  const group = teamPageData?.group;
  const todayTasks = teamPageData?.todayTasks;

  const fallbackRole: TeamPageRole = isMemberView(teamId) ? 'MEMBER' : 'ADMIN';
  const role =
    myProfile?.memberships?.find((membership) => membership.groupId === selectedGroupId)?.role ??
    fallbackRole;
  const teamCardSize: TeamCardSize = isDesktop ? 'lg' : isTablet ? 'md' : 'sm';
  const members = useMemo(
    () => (group?.members ? mapMembers(group.members) : TEAM_PAGE_MEMBERS),
    [group],
  );
  const taskLists = useMemo(
    () => (group?.taskLists ? mapTaskLists(group.taskLists) : TASK_LISTS),
    [group],
  );
  const totalTaskCount =
    todayTasks?.length ?? taskLists.reduce((total, taskList) => total + taskList.totalCount, 0);
  const completedTaskCount =
    todayTasks?.filter(isTaskDone).length ??
    taskLists.reduce((total, taskList) => total + taskList.doneCount, 0);
  const progressValue = getProgressValue(completedTaskCount, totalTaskCount);

  const groupedTaskLists = useMemo(
    () =>
      TASK_STATUS_SECTIONS.map((section) => ({
        ...section,
        items: taskLists.filter((item) => item.status === section.status),
      })),
    [taskLists],
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
    router.push(`/${selectedGroupId}/edit-team`);
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
            await queryClient.invalidateQueries({
              queryKey: TEAM_PAGE_QUERY_KEY.data(teamId, today),
            });

            return true;
          }}
        />
      );
    });
  };

  return (
    <div className="bg-background-secondary relative min-h-full overflow-y-auto px-4 py-6 md:px-6 xl:px-16 xl:py-15.75">
      <div className="mx-auto flex w-full max-w-85.75 flex-col gap-8 md:max-w-155 xl:mx-0 xl:max-w-280">
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

        {isPending ? (
          <TeamPageStatus message="팀 페이지 정보를 불러오는 중입니다." />
        ) : teamPageError ? (
          <TeamPageStatus message={teamPageError} />
        ) : (
          <>
            <TaskListSection
              teamId={String(selectedGroupId ?? teamId)}
              taskListsCount={taskLists.length}
              sections={groupedTaskLists}
              onCreateTaskList={openCreateListModal}
            />

            <MemberSection members={members} onInviteClick={openInviteModal} />
          </>
        )}
      </div>
    </div>
  );
};

export default TeamPageClient;
