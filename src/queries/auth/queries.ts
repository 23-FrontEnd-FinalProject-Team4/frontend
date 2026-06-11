import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/apis/Auth';
import type { AuthResponse, SignInRequest, SignUpRequest } from '@/apis/Auth/type';
import { type LoginActionResult, loginAction } from '@/app/(auth)/login/_actions/login.action';

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useLoginMutation = ({ onSuccess, onError }: MutationOptions = {}) => {
  return useMutation<LoginActionResult, Error, SignInRequest>({
    mutationFn: async (payload) => {
      const result = await loginAction(payload);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result;
    },
    retry: false,
    onSuccess,
    onError,
  });
};

export const useSignupMutation = ({ onSuccess, onError }: MutationOptions = {}) => {
  return useMutation<AuthResponse, Error, SignUpRequest>({
    mutationFn: signUp,
    retry: false,
    onSuccess,
    onError,
  });
};
