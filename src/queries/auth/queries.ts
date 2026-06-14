import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/apis/Auth';
import type { AuthResponse, SignInRequest, SignUpRequest } from '@/apis/Auth/type';
import { sendResetPasswordEmail } from '@/apis/user';
import type { MessageResponse, SendPasswordResetEmailRequest } from '@/apis/user/type';
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
