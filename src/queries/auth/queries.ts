import { useMutation } from '@tanstack/react-query';

import { signIn, signUp } from '@/apis/Auth';
import type { AuthResponse } from '@/apis/Auth/type';

interface AuthMutationOptions {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: unknown) => void;
}

export const useLoginMutation = ({ onSuccess, onError }: AuthMutationOptions = {}) => {
  return useMutation({
    mutationFn: signIn,
    retry: false,
    onSuccess,
    onError,
  });
};

export const useSignupMutation = ({ onSuccess, onError }: AuthMutationOptions = {}) => {
  return useMutation({
    mutationFn: signUp,
    retry: false,
    onSuccess,
    onError,
  });
};
