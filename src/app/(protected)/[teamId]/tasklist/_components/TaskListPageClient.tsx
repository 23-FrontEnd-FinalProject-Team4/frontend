'use client';

import { useGetGroup } from '@/queries/group/queries';

import TaskListHeader from './TaskListHeader';
import TaskListMain from './TaskListMain';
import TaskListPageSkeleton from './TaskListPageSkeleton';
import TaskListSet from './TaskListSet';

const TaskListPageClient = ({ groupId, taskListId }: { groupId: number; taskListId?: string }) => {
  const { data: groupInfo, isFetching, isPending, isError, refetch } = useGetGroup({ groupId });

  if (isError) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
        <p className="text-text-default text-sm">할 일 목록을 불러오지 못했습니다.</p>
        <button
          type="button"
          className="border-brand-primary text-brand-primary hover:bg-brand-secondary focus-visible:ring-brand-primary rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          {isFetching ? '다시 불러오는 중...' : '다시 시도'}
        </button>
      </div>
    );
  }

  if (isPending) {
    return <TaskListPageSkeleton />;
  }

  if (!groupInfo) return null;

  const selectedTaskListId = taskListId || groupInfo.taskLists[0]?.id;
  const selectedTaskList = groupInfo.taskLists.find(
    (taskList) => taskList.id === Number(selectedTaskListId),
  );

  return (
    <div className="flex flex-col gap-5 p-4 md:gap-7 md:px-6 md:py-17.5 xl:px-30 xl:py-30">
      {selectedTaskList && (
        <TaskListHeader
          name={selectedTaskList.name}
          groupId={groupId}
          taskListId={Number(selectedTaskListId)}
        />
      )}
      <div className="flex flex-col gap-6 xl:flex-row">
        <TaskListSet
          taskLists={groupInfo.taskLists}
          selectedTaskListId={Number(selectedTaskListId)}
          groupId={groupId}
        />
        <div className="flex-1">
          <TaskListMain
            taskListId={Number(selectedTaskListId)}
            groupId={groupId}
            taskListName={selectedTaskList?.name}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskListPageClient;
