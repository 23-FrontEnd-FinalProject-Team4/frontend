import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signUp } from '@/apis/auth';
import type { AuthResponse, SignInRequest, SignUpRequest } from '@/apis/auth/type';
import { resetPassword, sendResetPasswordEmail } from '@/apis/user';
import type {
  MessageResponse,
  ResetPasswordRequest,
  SendPasswordResetEmailRequest,
} from '@/apis/user/type';
import { type LogoutActionResult, logoutAction } from '@/app/(auth)/_actions/logout.action';
import { type LoginActionResult, loginAction } from '@/app/(auth)/login/_actions/login.action';
import { BusinessError } from '@/lib/error';
import { USER_QUERY_KEY } from '@/queries/user/queryKey';

export const useLoginMutation = () => {
  return useMutation<LoginActionResult, Error, SignInRequest>({
    mutationFn: async (data) => {
      const result = await loginAction(data);

      if (!result.success) {
        throw new BusinessError(result.error);
      }

      return result;
    },
    retry: false,
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<LogoutActionResult, Error>({
    mutationFn: async () => {
      const result = await logoutAction();

      if (!result.success) {
        throw new BusinessError(result.error);
      }

      return result;
    },
    onSuccess: async () => {
      await queryClient.removeQueries({ queryKey: USER_QUERY_KEY.me });
    },
    retry: false,
  });
};

export const useSignupMutation = () => {
  return useMutation<AuthResponse, Error, SignUpRequest>({
    mutationFn: signUp,
    retry: false,
  });
};

export const useSendResetPasswordEmailMutation = () => {
  return useMutation<MessageResponse, Error, SendPasswordResetEmailRequest>({
    mutationFn: sendResetPasswordEmail,
    retry: false,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation<MessageResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
    retry: false,
  });
};
