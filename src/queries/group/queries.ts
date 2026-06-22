import { useQuery } from '@tanstack/react-query';

import { getGroupAction, getGroupsAction } from '@/app/[teamId]/tasklist/_action/group';

import { groupKeys } from './queryKey';

export const useGetGroup = ({ groupId }: { groupId: number }) => {
  return useQuery({
    queryKey: groupKeys.detail({ groupId }),
    queryFn: () => getGroupAction({ groupId }),
  });
};

export const useGetGroups = () => {
  return useQuery({
    queryKey: groupKeys.all(),
    queryFn: () => getGroupsAction(),
  });
};
