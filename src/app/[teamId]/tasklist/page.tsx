import { notFound, redirect } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { TaskList } from '@/apis/group/type';
import { groupKeys } from '@/queries/group/queryKey';
import { formatISODate } from '@/utils/date';

import { getGroupAction } from './_action/group';
import TaskListPageClient from './_components/TaskListPageClient';

interface TaskListPageProps {
  params: Promise<{ teamId: string }>;
  searchParams: Promise<{ taskListId?: string; date?: string }>;
}

const TaskListPage = async ({ params, searchParams }: TaskListPageProps) => {
  const { teamId } = await params;
  const { taskListId, date } = await searchParams;

  // 예외 처리
  const groupId = Number(teamId);
  if (Number.isNaN(groupId)) return notFound();

  const queryClient = new QueryClient();

  const groupData = await queryClient.fetchQuery({
    queryKey: groupKeys.detail({ groupId }),
    queryFn: () => getGroupAction({ groupId }),
  });

  const hasTaskLists = groupData && groupData.taskLists.length > 0;
  const isValidTaskListId = taskListId
    ? groupData.taskLists.some((list: TaskList) => list.id.toString() === taskListId)
    : false;

  if (taskListId && !isValidTaskListId) return notFound();

  const targetDate = date || formatISODate(new Date());
  const targetTaskListId =
    taskListId || (hasTaskLists ? groupData.taskLists[0].id.toString() : undefined);

  if (date !== targetDate || taskListId !== targetTaskListId) {
    const params = new URLSearchParams();
    params.set('date', targetDate);
    if (targetTaskListId) {
      params.set('taskListId', targetTaskListId);
    }
    redirect(`?${params.toString()}`);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskListPageClient groupId={groupId} taskListId={taskListId} />
    </HydrationBoundary>
  );
};

export default TaskListPage;
