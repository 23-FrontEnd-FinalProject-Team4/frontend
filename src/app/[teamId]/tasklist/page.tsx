import { getGroupServer } from '@/apis/group/server';
import { getTaskListServer } from '@/apis/taskList/server';

import TaskListHeader from './_components/TaskListHeader';
import TaskListMain from './_components/TaskListMain';
import TaskListSet from './_components/TaskListSet';

interface TaskListPageProps {
  params: Promise<{ teamId: string }>;
  searchParams: Promise<{ taskListId?: string; date?: string }>;
}

const TaskListPage = async ({ params, searchParams }: TaskListPageProps) => {
  const { teamId } = await params;
  const { taskListId, date } = await searchParams;

  const { taskLists, name: groupName } = await getGroupServer({ id: Number(teamId) });
  const selectedTaskListId = taskListId
    ? taskListId
    : taskLists.length !== 0
      ? String(taskLists[0].id)
      : null;

  if (!selectedTaskListId) {
    return <div>임시 에러 페이지</div>;
  }

  const selectedTaskList = await getTaskListServer({
    groupId: Number(teamId),
    id: selectedTaskListId,
    date,
  });

  return (
    <div className="flex flex-col gap-5 p-4 md:gap-7 md:px-6 md:py-17.5 xl:px-30 xl:py-30">
      <TaskListHeader name={groupName} />
      <div className="flex flex-col gap-6 xl:flex-row">
        <TaskListSet
          taskLists={taskLists}
          selectedTaskListId={Number(selectedTaskListId)}
          groupId={Number(teamId)}
        />
        <div className="flex-1">
          <TaskListMain taskList={selectedTaskList} groupId={Number(teamId)} />
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
