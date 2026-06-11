import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/apis/Auth';
import type { AuthResponse } from '@/apis/Auth/type';
import { loginAction } from '@/app/(auth)/login/_actions/login.action';

interface LoginMutationOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface SignupMutationOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: unknown) => void;
}

export const useLoginMutation = ({ onSuccess, onError }: LoginMutationOptions = {}) => {
  return useMutation({
    mutationFn: loginAction,
    retry: false,
    onSuccess,
    onError,
  });
};

export const useSignupMutation = ({ onSuccess, onError }: SignupMutationOptions = {}) => {
  return useMutation({
    mutationFn: signUp,
    retry: false,
    onSuccess,
    onError,
  });
};
