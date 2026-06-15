import type { Task } from '@/apis/task/type';
import clientFetcher from '@/lib/clientFetcher';

import type {
  GetGroupMemberParams,
  GetGroupTasksParams,
  GroupDetail,
  Member,
  PostGroupAcceptInvitationParams,
  PostGroupMember,
} from './type';

export const getGroup = async ({ id }: Pick<GroupDetail, 'id'>) => {
  const { data } = await clientFetcher.get<GroupDetail>(`/groups/${id}`);
  return data;
};

export const patchGroup = async ({
  id,
  image,
  name,
}: Pick<GroupDetail, 'id' | 'image' | 'name'>) => {
  const { data } = await clientFetcher.patch<GroupDetail>(`/groups/${id}`, { image, name });
  return data;
};

export const deleteGroup = async ({ id }: Pick<GroupDetail, 'id'>) => {
  await clientFetcher.delete(`/groups/${id}`);
};

export const postGroup = async ({
  image,
  name,
}: Pick<GroupDetail, 'name'> & { image?: GroupDetail['image'] }) => {
  const body: { name: string; image?: string } = { name };

  if (image) {
    body.image = image;
  }

  const { data } = await clientFetcher.post<GroupDetail>(`/groups`, body);
  return data;
};

export const getGroupMember = async ({ id, memberUserId }: GetGroupMemberParams) => {
  const { data } = await clientFetcher.get<Member>(`/groups/${id}/member/${memberUserId}`);
  return data;
};

export const deleteGroupMember = async ({ id, memberUserId }: GetGroupMemberParams) => {
  await clientFetcher.delete(`/groups/${id}/member/${memberUserId}`);
};

export const getGroupInvitation = async ({ id }: Pick<GroupDetail, 'id'>) => {
  const { data } = await clientFetcher.get<string>(`/groups/${id}/invitation`);
  return data;
};

export const postGroupAcceptInvitation = async ({
  userEmail,
  token,
}: PostGroupAcceptInvitationParams) => {
  const { data } = await clientFetcher.post<{ groupId: number }>(`/groups/accept-invitation`, {
    userEmail,
    token,
  });
  return data;
};

export const postGroupMember = async ({ id, userEmail }: PostGroupMember) => {
  const { data } = await clientFetcher.post(`/groups/${id}/member`, { userEmail });
  return data;
};

export const getGroupTasks = async ({ id, date }: GetGroupTasksParams) => {
  const { data } = await clientFetcher.get<Task[]>(`/groups/${id}/tasks`, {
    params: {
      date,
    },
  });
  return data;
};
