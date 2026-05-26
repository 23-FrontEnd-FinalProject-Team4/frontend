type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

interface User {
  image: string;
  updatedAt: string;
  createdAt: string;
  nickName: string;
  id: number;
}

interface Task {
  doneBy: {
    user: Pick<User, 'id' | 'image' | 'nickName'> | null;
  };
  writer?: Pick<User, 'id' | 'image' | 'nickName'> | null;
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  frequency: FrequencyType;
  updatedAt: string;
  doneAt: string | null;
  startDate: string | null;
  date: string;
  description: string | null;
  name: string;
  id: number;
}

export interface ResponseGetTaskLists {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

export interface RequestCreateTaskList {
  name: string;
}

export interface ResponseCreateTaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

export interface RequestUpdateTaskListName {
  name?: string;
}

export interface ResponseUpdateTaskListName {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

export interface RequestUpdateTaskListOrder {
  displayIndex: number;
}
