'use client';

import { useState } from 'react';
import TaskListHeader from './TaskListHeader';
import TaskListSet from './TaskListSet';
import TaskListMain from './TaskListMain';
import { TaskList } from '@/apis/group/type';

// data fetching을 위한 props
const TaskListPageClient = ({ taskLists }: { taskLists: TaskList[] }) => {
  // Mock data
  const [selectedId, setSelectedId] = useState<number>(taskLists[0].id);
  const selectedTaskList = taskLists.find((t) => t.id === selectedId) ?? taskLists[0];

  return (
    <div className="flex flex-col gap-5 p-4 md:gap-7 md:px-6 md:py-17.5 xl:px-30 xl:py-30">
      <TaskListHeader name={selectedTaskList.name} />
      <div className="flex flex-col gap-6 xl:flex-row">
        <TaskListSet
          selectedTaskList={selectedTaskList}
          onSelectedTaskListId={setSelectedId}
          taskLists={taskLists}
        />
        <div className="flex-1">
          <TaskListMain taskList={selectedTaskList} />
        </div>
      </div>
    </div>
  );
};

export default TaskListPageClient;
