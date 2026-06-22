import { useQuery } from '@tanstack/react-query';

import { getGroupAction } from '@/app/[teamId]/tasklist/_action/taskList';

import { groupKeys } from './queryKey';

export const useGetGroup = ({ groupId }: { groupId: number }) => {
  return useQuery({
    queryKey: groupKeys.detail({ groupId }),
    queryFn: () => getGroupAction({ groupId }),
  });
};
