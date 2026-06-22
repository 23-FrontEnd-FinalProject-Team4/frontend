import type { StaticImageData } from 'next/image';

import type { TeamMember } from '@/components/team/type';

export type TeamPageRole = 'ADMIN' | 'MEMBER';
export type TaskStatus = 'today' | 'scheduled' | 'done';

export interface TeamPageMember extends TeamMember {
  id: number;
  name: string;
  email: string;
  imageUrl?: string | StaticImageData;
  role: TeamPageRole;
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
  date?: string;
  doneCount: number;
  totalCount: number;
  tasks: TeamPageTask[];
}

export interface TaskStatusSection {
  status: TaskStatus;
  label: string;
}
