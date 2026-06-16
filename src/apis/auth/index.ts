import clientFetcher from '@/lib/clientFetcher';

import type { AuthResponse, RefreshTokenResponse, SignInRequest, SignUpRequest } from './type';

export const signUp = async (body: SignUpRequest) => {
  const response = await clientFetcher.post<AuthResponse>('/auth/signUp', body);
  return response.data;
};

export const signIn = async (body: SignInRequest) => {
  const response = await clientFetcher.post<AuthResponse>('/auth/signIn', body);
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await clientFetcher.post<RefreshTokenResponse>('/auth/refresh-token', {
    token,
  });
  return response.data;
};
