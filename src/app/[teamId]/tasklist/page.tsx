import { redirect } from 'next/navigation';

import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { taskListKeys } from '@/queries/taskList/queryKey';
import { formatISODate } from '@/utils/date';

import { getTaskListsAction } from './_action/taskList';
import TaskListPageClient from './_components/TaskListPageClient';

interface TaskListPageProps {
  params: Promise<{ teamId: string }>;
  searchParams: Promise<{ taskListId?: string; date?: string }>;
}

const TaskListPage = async ({ params, searchParams }: TaskListPageProps) => {
  const { teamId } = await params;
  const { taskListId, date } = await searchParams;

  if (!date) {
    const params = new URLSearchParams();
    params.set('date', formatISODate(new Date()));
    if (taskListId) params.set('taskListId', taskListId);
    redirect(`?${params.toString()}`);
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: taskListKeys.all({ groupId: Number(teamId) }),
    queryFn: () => getTaskListsAction({ groupId: Number(teamId) }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskListPageClient groupId={Number(teamId)} taskListId={taskListId} />
    </HydrationBoundary>
  );
};

export default TaskListPage;
