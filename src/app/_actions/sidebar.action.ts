'use server';

import type { Group } from '@/apis/user/type';
import { getErrorMessage } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';

export type GetMyGroupsActionResult =
  | { success: true; data: Group[] }
  | { success: false; error: string };

export const getMyGroupsAction = async (): Promise<GetMyGroupsActionResult> => {
  try {
    const myGroups = await serverFetcher<Group[]>('/user/groups');

    return { success: true, data: myGroups };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '팀 목록을 불러오지 못했습니다.'),
    };
  }
};
