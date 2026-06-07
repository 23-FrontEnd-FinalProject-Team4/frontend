import { TaskList } from '@/apis/group/type';

export interface TaskListHeaderProps {
  name: string;
}

export interface TaskListSetProps {
  selectedTaskList?: TaskList;
  onSelectedTaskListId: (taskListId: number) => void;
  taskLists: TaskList[];
}

export interface TaskListTitleProps {
  taskName: string;
  selectedDate: Date;
  onToday: () => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onChangeDate: (date: Date) => void;
}
