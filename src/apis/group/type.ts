export interface Member {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: null | string;
  role: string;
}

export interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: unknown[]; //추후 tasks 발견하면 수정
}

export interface GroupDetail {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  members: Member[];
  taskLists: TaskList[];
}

export interface GetGroupMemeberParams {
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
