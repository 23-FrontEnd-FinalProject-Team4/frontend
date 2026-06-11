'use client';

import { useCallback, useMemo, useState } from 'react';

import { overlay } from 'overlay-kit';
import { toast } from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';

import { getGroup, getGroupInvitation, getGroupTasks } from '@/apis/group';
import type { Member, TaskList } from '@/apis/group/type';
import type { Task } from '@/apis/task/type';
import { getMyGroups, getMyProfile } from '@/apis/user';

import Modal from '@/components/modal/Modal';
import type { TeamCardSize } from '@/components/team/type';

import useMediaQuery, { MEDIA_QUERY } from '@/hooks/useMediaQuery';

import { TASK_LISTS, TASK_STATUS_SECTIONS, TEAM_PAGE_MEMBERS } from '../_constants/mockData';
import type { TaskListItem, TeamPageMember, TeamPageRole } from '../type';
import TeamPageHeader from './header/TeamPageHeader';
import MemberSection from './member/MemberSection';
import CreateTaskListModal from './task-list/CreateTaskListModal';
import TaskListSection from './task-list/TaskListSection';

interface TeamPageClientProps {
  teamId: string;
}

const TEAM_PAGE_QUERY_KEY = {
  myGroups: ['team-page', 'my-groups'] as const,
  myProfile: ['team-page', 'my-profile'] as const,
  group: (groupId: number) => ['team-page', 'group', groupId] as const,
  groupTasks: (groupId: number, date: string) =>
    ['team-page', 'group-tasks', groupId, date] as const,
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

  const inviteLink = groupId ? await getGroupInvitation({ id: groupId }) : FALLBACK_INVITE_LINK;

  await navigator.clipboard.writeText(inviteLink);
};

const closeOverlay = (close: () => void, unmount: () => void) => {
  close();
  setTimeout(unmount, 200);
};

export default function TeamPageClient({ teamId }: TeamPageClientProps) {
  const isDesktop = useMediaQuery(MEDIA_QUERY.desktop);
  const isTablet = useMediaQuery(MEDIA_QUERY.tablet);
  const today = useMemo(() => new Date().toISOString(), []);

  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);

  const routeGroupId = getRouteGroupId(teamId);

  const { data: myGroups = [] } = useQuery({
    queryKey: TEAM_PAGE_QUERY_KEY.myGroups,
    queryFn: getMyGroups,
  });

  const selectedGroupId = routeGroupId ?? myGroups[0]?.id;

  const { data: myProfile } = useQuery({
    queryKey: TEAM_PAGE_QUERY_KEY.myProfile,
    queryFn: getMyProfile,
  });

  const { data: group } = useQuery({
    queryKey: selectedGroupId
      ? TEAM_PAGE_QUERY_KEY.group(selectedGroupId)
      : [...TEAM_PAGE_QUERY_KEY.group(0), 'disabled'],
    queryFn: () => getGroup({ id: selectedGroupId as number }),
    enabled: Boolean(selectedGroupId),
  });

  const { data: todayTasks } = useQuery({
    queryKey: selectedGroupId
      ? TEAM_PAGE_QUERY_KEY.groupTasks(selectedGroupId, today)
      : [...TEAM_PAGE_QUERY_KEY.groupTasks(0, today), 'disabled'],
    queryFn: () => getGroupTasks({ id: selectedGroupId as number, date: today }),
    enabled: Boolean(selectedGroupId),
  });

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
              void copyInviteLink(selectedGroupId).then(() => {
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
  }, [selectedGroupId]);

  const openCreateListModal = useCallback(() => {
    overlay.open(({ isOpen, close, unmount }) => {
      const closeModal = () => closeOverlay(close, unmount);

      return <CreateTaskListModal isOpen={isOpen} onClose={closeModal} />;
    });
  }, []);

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

        <TaskListSection
          teamId={String(selectedGroupId ?? teamId)}
          taskListsCount={taskLists.length}
          sections={groupedTaskLists}
          onCreateTaskList={openCreateListModal}
        />

        <MemberSection members={members} onInviteClick={openInviteModal} />
      </div>
    </div>
  );
}
