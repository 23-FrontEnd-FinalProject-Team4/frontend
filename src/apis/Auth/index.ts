import clientFetcher from '@/lib/clientFetcher';

import type {
  AuthResponse,
  OAuthSignInRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
} from './type';

export const signUp = async (body: SignUpRequest) => {
  const response = await clientFetcher.post<AuthResponse>('/auth/signUp', body);
  return response.data;
};

export const signIn = async (body: SignInRequest) => {
  const response = await clientFetcher.post<AuthResponse>('/auth/signIn', body);
  return response.data;
};

export const signInWithOAuth = async (provider: string, body: OAuthSignInRequest) => {
  const response = await clientFetcher.post<AuthResponse>(`/auth/signIn/${provider}`, body);
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await clientFetcher.post<RefreshTokenResponse>('/auth/refresh-token', {
    token,
  });
  return response.data;
};
