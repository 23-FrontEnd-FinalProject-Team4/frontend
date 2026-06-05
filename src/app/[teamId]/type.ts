import type { StaticImageData } from 'next/image';

export type TeamPageRole = 'ADMIN' | 'MEMBER';
export type TaskStatus = 'today' | 'scheduled' | 'done';

export interface TeamPageMember {
  id: number;
  name: string;
  email: string;
  imageUrl?: StaticImageData;
}

export interface TeamPageTask {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskListItem {
  id: number;
  title: string;
  status: TaskStatus;
  doneCount: number;
  totalCount: number;
  tasks: TeamPageTask[];
}

export interface TaskStatusSection {
  status: TaskStatus;
  label: string;
}
