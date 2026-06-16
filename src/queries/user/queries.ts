import { useQuery } from '@tanstack/react-query';

import { getMyProfile } from '@/apis/user';

import { USER_QUERY_KEY } from './queryKey';

export const useMeQuery = () => {
  return useQuery({
    queryKey: USER_QUERY_KEY.me,
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
  });
};
