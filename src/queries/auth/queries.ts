import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/apis/Auth';
import { loginAction } from '@/app/(auth)/login/_actions/login.action';

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const useLoginMutation = ({ onSuccess, onError }: MutationOptions = {}) => {
  return useMutation({
    mutationFn: loginAction,
    retry: false,
    onSuccess,
    onError,
  });
};

export const useSignupMutation = ({ onSuccess, onError }: MutationOptions = {}) => {
  return useMutation({
    mutationFn: signUp,
    retry: false,
    onSuccess,
    onError,
  });
};
