import { serverFetcher } from '@/lib/serverFetcher';

import type { AuthResponse, OAuthSignInRequest } from './type';

export const signInWithOAuth = async (provider: string, body: OAuthSignInRequest) => {
  return serverFetcher<AuthResponse>(`/auth/signIn/${provider}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};
