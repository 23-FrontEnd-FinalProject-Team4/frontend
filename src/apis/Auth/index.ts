import type {
  AuthResponse,
  OAuthSignInRequest,
  RefreshTokenResponse,
  SignInRequest,
  SignupRequest,
} from '@/apis/auth/type';
import axiosInstance from '@/apis/axiosInstance';

export const signUp = async (body: SignupRequest) => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/signUp', body);
  return data;
};

export const signIn = async (body: SignInRequest) => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/signIn', body);
  return data;
};

export const signInWithOAuth = async (provider: string, body: OAuthSignInRequest) => {
  const { data } = await axiosInstance.post<AuthResponse>(`/auth/signIn/${provider}`, body);
  return data;
};

export const refreshToken = async (token: string) => {
  const { data } = await axiosInstance.post<RefreshTokenResponse>('/auth/refresh-token', {
    token,
  });
  return data;
};
