import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getMyProfile } from '@/apis/user';
import type {
  ChangePasswordRequest,
  MessageResponse,
  UpdateProfileRequest,
} from '@/apis/user/type';
import {
  changePasswordAction,
  updateMyProfileAction,
} from '@/app/settings/_actions/settings.action';

import { USER_QUERY_KEY } from './queryKey';

export const useMeQuery = () => {
  return useQuery({
    queryKey: USER_QUERY_KEY.me,
    queryFn: getMyProfile,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateMyProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, UpdateProfileRequest>({
    mutationFn: async (payload) => {
      const result = await updateMyProfileAction(payload);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.me });
    },
  });
};

export const useChangePasswordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, ChangePasswordRequest>({
    mutationFn: async (payload) => {
      const result = await changePasswordAction(payload);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.me });
    },
  });
};
