'use client';

import { useMemo, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { overlay } from 'overlay-kit';
import { toast } from 'react-hot-toast';

import type { Member, TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';
import Modal from '@/components/modal/Modal';
import type { TeamCardSize } from '@/components/team/type';
import useMediaQuery, { MEDIA_QUERY } from '@/hooks/useMediaQuery';

import {
  createTeamTaskListAction,
  getTeamInvitationAction,
  getTeamPageDataAction,
} from '../_actions/team-page.action';
import { TASK_LISTS, TASK_STATUS_SECTIONS, TEAM_PAGE_MEMBERS } from '../_constants/mockData';
import type { TaskListItem, TeamPageMember, TeamPageRole } from '../type';
import TeamPageHeader from './header/TeamPageHeader';
import MemberSection from './member/MemberSection';
import CreateTaskListModal from './task-list/CreateTaskListModal';
import TaskListSection from './task-list/TaskListSection';

interface TeamPageClientProps {
  teamId: string;
  initialDate: string;
}

const TEAM_PAGE_QUERY_KEY = {
  data: (teamId: string, date: string) => ['team-page', teamId, date] as const,
};

const FALLBACK_INVITE_LINK = 'https://coworkers.example.com/invite/management';

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

const copyInviteLink = async (groupId?: number) => {
  if (!navigator.clipboard) {
    return;
  }

  if (!groupId) {
    await navigator.clipboard.writeText(FALLBACK_INVITE_LINK);
    return;
  }

  const inviteResult = await getTeamInvitationAction({ groupId });

  if (!inviteResult.success) {
    throw new Error(inviteResult.error);
  }

  await navigator.clipboard.writeText(inviteResult.data);
};

interface InviteMemberModalProps {
  isOpen: boolean;
  groupId?: number;
  onClose: () => void;
}

const InviteMemberModal = ({ isOpen, groupId, onClose }: InviteMemberModalProps) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyInviteLink = async () => {
    if (isCopying) {
      return;
    }

    setIsCopying(true);

    try {
      await copyInviteLink(groupId);
      toast.success('초대 링크가 클립보드에 복사되었습니다.');
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '초대 링크를 복사하지 못했습니다.');
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title="멤버 초대"
      description="그룹에 참여할 수 있는 링크를 복사합니다."
      primaryAction={{
        label: '링크 복사하기',
        loadingLabel: '복사 중',
        onClick: handleCopyInviteLink,
        disabled: isCopying,
        isLoading: isCopying,
      }}
      size="md"
      onClose={onClose}
    />
  );
};

const TeamPageStatus = ({ message }: { message: string }) => (
  <div className="bg-background-primary text-text-default text-md flex min-h-60 items-center justify-center rounded-xl font-medium shadow-sm">
    {message}
  </div>
);

export default function TeamPageClient({ teamId, initialDate }: TeamPageClientProps) {
  const queryClient = useQueryClient();
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

            const result = await createTeamTaskListAction({
              groupId: selectedGroupId,
              name: title,
            });

            if (!result.success) {
              toast.error(result.error);
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
}
