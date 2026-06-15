import type { GroupDetail, TaskList } from '@/apis/group/type';
import { serverFetcher } from '@/lib/serverFetcher';

import TaskListHeader from './_components/TaskListHeader';
import TaskListMain from './_components/TaskListMain';
import TaskListSet from './_components/TaskListSet';
import { MOCK_TASKLISTS } from './_constants/mockData';

interface TaskListPageProps {
  params: Promise<{ teamId: string }>;
  searchParams: Promise<{ taskListId?: string; date?: string }>;
}

interface TaskListPageData {
  taskLists: TaskList[];
  selectedId: number;
  selectedTaskList?: TaskList;
}

const getRouteGroupId = (teamId: string) => {
  const groupId = Number(teamId);
  return Number.isSafeInteger(groupId) && groupId > 0 ? groupId : undefined;
};

const getFallbackTaskListPageData = (taskListId?: string): TaskListPageData => {
  const selectedId = taskListId ? Number(taskListId) : MOCK_TASKLISTS[0].id;
  const selectedTaskList =
    MOCK_TASKLISTS.find((taskList) => taskList.id === selectedId) ?? MOCK_TASKLISTS[0];

  return {
    taskLists: MOCK_TASKLISTS,
    selectedId: selectedTaskList.id,
    selectedTaskList,
  };
};

const createTaskListDetailPath = (groupId: number, taskListId: number, date?: string) => {
  const searchParams = new URLSearchParams();

  if (date) {
    searchParams.set('date', date);
  }

  const queryString = searchParams.toString();

  return `/groups/${groupId}/task-lists/${taskListId}${queryString ? `?${queryString}` : ''}`;
};

const getTaskListPageData = async ({
  teamId,
  taskListId,
  date,
}: {
  teamId: string;
  taskListId?: string;
  date?: string;
}): Promise<TaskListPageData> => {
  const groupId = getRouteGroupId(teamId);

  if (!groupId) {
    return getFallbackTaskListPageData(taskListId);
  }

  try {
    const group = await serverFetcher<GroupDetail>(`/groups/${groupId}`);

    if (group.taskLists.length === 0) {
      return getFallbackTaskListPageData(taskListId);
    }

    const taskLists = group.taskLists;
    const requestedTaskListId = taskListId ? Number(taskListId) : taskLists[0].id;
    const selectedTaskListId = taskLists.some((taskList) => taskList.id === requestedTaskListId)
      ? requestedTaskListId
      : taskLists[0].id;
    const selectedTaskList = await serverFetcher<TaskList>(
      createTaskListDetailPath(groupId, selectedTaskListId, date),
    );

    return {
      taskLists,
      selectedId: selectedTaskList.id,
      selectedTaskList,
    };
  } catch {
    return getFallbackTaskListPageData(taskListId);
  }
};

const TaskListPage = async ({ params, searchParams }: TaskListPageProps) => {
  const { teamId } = await params;
  const { taskListId, date } = await searchParams;
  const { taskLists, selectedId, selectedTaskList } = await getTaskListPageData({
    teamId,
    taskListId,
    date,
  });

  if (!selectedTaskList) {
    return <div>임시 에러 페이지</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:gap-7 md:px-6 md:py-17.5 xl:px-30 xl:py-30">
      <TaskListHeader name={selectedTaskList.name} />
      <div className="flex flex-col gap-6 xl:flex-row">
        <TaskListSet taskLists={taskLists} selectedId={selectedId} />
        <div className="flex-1">
          <TaskListMain taskList={selectedTaskList} />
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
