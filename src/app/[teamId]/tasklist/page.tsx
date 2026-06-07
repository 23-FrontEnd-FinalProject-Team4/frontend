import TaskListPageClient from './_components/TaskListPageClient';
import { MOCK_TASKLISTS } from './_constants/mockData';

interface TaskListPageProps {
  params: Promise<{
    teamId: string;
  }>;
}

const TaskListPage = async ({ params }: TaskListPageProps) => {
  const { teamId } = await params;
  // 추후에 API를 통해 받아올 예정

  return <TaskListPageClient taskLists={MOCK_TASKLISTS} />;
};

export default TaskListPage;
