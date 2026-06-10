import TaskListHeader from './_components/TaskListHeader';
import TaskListMain from './_components/TaskListMain';
import TaskListSet from './_components/TaskListSet';
import { MOCK_TASKLISTS } from './_constants/mockData';

interface TaskListPageProps {
  params: Promise<{ teamId: string }>;
  searchParams: Promise<{ taskListId?: string; date?: string }>;
}

const TaskListPage = async ({ params, searchParams }: TaskListPageProps) => {
  const { teamId } = await params;
  // 추후에 API를 통해 받아올 예정

  const { taskListId } = await searchParams;
  // taskListId가 없으면 첫 번째 목록을 기본값으로 사용
  const selectedId = taskListId ? Number(taskListId) : MOCK_TASKLISTS[0].id;
  const selectedTaskList = MOCK_TASKLISTS.find((taskList) => taskList.id === selectedId);

  if (!selectedTaskList) {
    return <div>임시 에러 페이지</div>;
  }

  return (
    <div className="flex flex-col gap-5 p-4 md:gap-7 md:px-6 md:py-17.5 xl:px-30 xl:py-30">
      <TaskListHeader name={selectedTaskList.name} />
      <div className="flex flex-col gap-6 xl:flex-row">
        <TaskListSet taskLists={MOCK_TASKLISTS} />
        <div className="flex-1">
          <TaskListMain taskList={selectedTaskList} />
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
