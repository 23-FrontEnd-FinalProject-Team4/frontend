import { serverFetcher } from '@/lib/serverFetcher';

import { GroupDetail } from './type';

export const getGroupServer = async ({ id }: Pick<GroupDetail, 'id'>) => {
  return await serverFetcher<GroupDetail>(`/groups/${id}`);
};
