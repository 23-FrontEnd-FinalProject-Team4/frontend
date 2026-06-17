'use client';

import { notFound } from 'next/navigation';

import { useGetTaskLists } from '@/queries/taskList/queries';

import TaskListHeader from './TaskListHeader';
import TaskListMain from './TaskListMain';
import TaskListSet from './TaskListSet';

const TaskListPageClient = ({ groupId, taskListId }: { groupId: number; taskListId?: string }) => {
  const { data: taskLists } = useGetTaskLists({ groupId });

  const selectedTaskListId = taskListId || taskLists?.[0]?.id;
  const selectedTaskList = taskLists?.find(
    (taskList) => taskList.id === Number(selectedTaskListId),
  );

  // TODO: 추후에 redirect 등을 고려
  if (!selectedTaskList || !taskLists || !selectedTaskListId) return notFound();

  return (
    <div className="flex flex-col gap-5 p-4 md:gap-7 md:px-6 md:py-17.5 xl:px-30 xl:py-30">
      <TaskListHeader name={selectedTaskList.name} />
      <div className="flex flex-col gap-6 xl:flex-row">
        <TaskListSet
          taskLists={taskLists}
          selectedTaskListId={Number(selectedTaskListId)}
          groupId={groupId}
        />
        <div className="flex-1">
          <TaskListMain
            taskListId={Number(selectedTaskListId)}
            groupId={groupId}
            taskListName={selectedTaskList.name}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskListPageClient;
