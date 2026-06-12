import { Task } from '@/apis/task/type';
import { getDoneTasksByDate } from '@/utils/task';

import MyHistoryClient from './_components/MyHistoryClient';
import { MOCK_TASKLISTS } from './_constants/mockData';

const MyHistoryPage = () => {
  const MOCK_DATA: Task[] = MOCK_TASKLISTS[0].tasks;

  const doneTasksByDate = getDoneTasksByDate(MOCK_DATA);

  return (
    <div className="bg-background-secondary px-4 py-6 md:px-6 xl:px-25 xl:py-10">
      <h1 className="text-text-primary mb-6 text-xl font-bold">마이 히스토리</h1>
      <div className="flex w-full flex-col gap-10 rounded-2xl bg-white p-4">
        {doneTasksByDate.map(([date, tasks]) => (
          <div key={date}>
            <span className="text-text-primary mb-4 block text-lg font-medium">{date}</span>
            <MyHistoryClient tasks={tasks} />
          </div>
        ))}
        {doneTasksByDate.length === 0 && (
          <div className="text-text-default flex flex-col items-center py-50 text-center text-xl">
            <span className="text-text-default mb-2">아직 완료된 작업이 없어요.</span>
            <span className="text-text-default">하나씩 완료해가며 히스토리를 만들어보세요!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHistoryPage;
