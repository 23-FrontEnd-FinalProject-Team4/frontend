import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/apis/auth/client';
import type { AuthResponse, SignInRequest, SignUpRequest } from '@/apis/auth/type';
import { resetPassword, sendResetPasswordEmail } from '@/apis/user';
import type {
  MessageResponse,
  ResetPasswordRequest,
  SendPasswordResetEmailRequest,
} from '@/apis/user/type';
import { type LoginActionResult, loginAction } from '@/app/(auth)/login/_actions/login.action';

export const useLoginMutation = () => {
  return useMutation<LoginActionResult, Error, SignInRequest>({
    mutationFn: async (data) => {
      const result = await loginAction(data);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result;
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
