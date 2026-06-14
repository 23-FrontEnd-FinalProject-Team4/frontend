import type { Task } from '@/apis/task/type';

export type GroupMemberRole = 'ADMIN' | 'MEMBER';

export interface Member {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: null | string;
  role: GroupMemberRole;
}

export interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
}

export interface GroupDetail {
  id: number;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  members: Member[];
  taskLists: TaskList[];
}

export interface GetGroupMemberParams {
  id: GroupDetail['id'];
  memberUserId: Member['userId'];
}

export interface PostGroupAcceptInvitationParams {
  userEmail: Member['userEmail'];
  token: string;
}

export interface PostGroupMember {
  id: GroupDetail['id'];
  userEmail: Member['userEmail'];
}

export interface GetGroupTasksParams {
  id: GroupDetail['id'];
  date?: string;
}
