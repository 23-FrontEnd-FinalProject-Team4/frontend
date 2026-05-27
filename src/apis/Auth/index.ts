import axiosInstance from '@/apis/axiosInstance';

import type {
  AuthResponse,
  OAuthSignInRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignUpRequest,
} from './type';

export const signUp = async (body: SignUpRequest) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/signUp', body);
  return response.data;
};

export const signIn = async (body: SignInRequest) => {
  const response = await axiosInstance.post<AuthResponse>('/auth/signIn', body);
  return response.data;
};

export const signInWithOAuth = async (provider: string, body: OAuthSignInRequest) => {
  const response = await axiosInstance.post<AuthResponse>(`/auth/signIn/${provider}`, body);
  return response.data;
};

export const refreshToken = async (token: string) => {
  const response = await axiosInstance.post<RefreshTokenResponse>('/auth/refresh-token', {
    token,
  });
  return response.data;
};
