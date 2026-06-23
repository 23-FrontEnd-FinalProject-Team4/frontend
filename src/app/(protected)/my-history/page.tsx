import { getMyTaskHistoryServer } from '@/apis/user/server';

import EmptyHistory from './_components/EmptyHistory';
import HistoryMain from './_components/HistoryMain';

const MyHistoryPage = async () => {
  const { tasksDone } = await getMyTaskHistoryServer();
  return (
    <div className="bg-background-secondary px-4 py-6 md:px-6 xl:px-25 xl:py-10">
      <h1 className="text-text-primary mb-6 text-xl font-bold">마이 히스토리</h1>
      <div className="flex w-full flex-col gap-10 rounded-2xl bg-white p-4">
        {tasksDone.length === 0 ? <EmptyHistory /> : <HistoryMain tasks={tasksDone} />}
      </div>
    </div>
  );
};

export default MyHistoryPage;
