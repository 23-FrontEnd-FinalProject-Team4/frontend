import { serverFetcher } from '@/lib/serverFetcher';

import type {
  AuthResponse,
  OAuthSignInRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './type';

export const signInWithOAuth = async (provider: string, body: OAuthSignInRequest) => {
  return serverFetcher<AuthResponse>(`/auth/signIn/${provider}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const refreshAccessToken = async (
  body: RefreshTokenRequest,
): Promise<RefreshTokenResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Refresh token failed');
  }

  return response.json() as Promise<RefreshTokenResponse>;
};
