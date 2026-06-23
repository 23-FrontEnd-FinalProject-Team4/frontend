'use server';

import { GroupDetail } from '@/apis/group/type';
import { Group } from '@/apis/user/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const getGroupAction = async ({ groupId }: { groupId: number }) => {
  return await serverFetcher<GroupDetail>(`/groups/${groupId}`);
};

export const getGroupsAction = async () => {
  return await serverFetcher<Group[]>(`/user/groups`);
};
