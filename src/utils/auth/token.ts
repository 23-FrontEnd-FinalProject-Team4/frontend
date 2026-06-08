import { cookies } from 'next/headers';

import 'server-only';

import type { AuthTokens } from './type';

const ACCESS_TOKEN_KEY = 'coworkers:accessToken';
const REFRESH_TOKEN_KEY = 'coworkers:refreshToken';

const isProd = process.env.NODE_ENV === 'production';

const accessTokenOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? ('none' as const) : ('lax' as const),
  path: '/',
  maxAge: 60 * 60, //TODO: 임의로 1시간으로 지정 유효 기간 논의 필요
};

const refreshTokenOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? ('none' as const) : ('lax' as const),
  path: '/',
  maxAge: 60 * 60 * 24 * 14, //TODO: 임의로 14일로 지정 유효 기간 논의 필요
};

export async function setAuthTokens({ accessToken, refreshToken }: AuthTokens) {
  const store = await cookies();
  store.set(ACCESS_TOKEN_KEY, accessToken, accessTokenOptions);
  store.set(REFRESH_TOKEN_KEY, refreshToken, refreshTokenOptions);
}

export async function setAccessToken(accessToken: string) {
  const store = await cookies();
  store.set(ACCESS_TOKEN_KEY, accessToken, accessTokenOptions);
}

export async function getAccessToken() {
  const store = await cookies();
  return store.get(ACCESS_TOKEN_KEY)?.value ?? null;
}

export async function getRefreshToken() {
  const store = await cookies();
  return store.get(REFRESH_TOKEN_KEY)?.value ?? null;
}

export async function getAuthTokens() {
  const store = await cookies();
  return {
    accessToken: store.get(ACCESS_TOKEN_KEY)?.value ?? null,
    refreshToken: store.get(REFRESH_TOKEN_KEY)?.value ?? null,
  };
}

export async function hasAuthTokens() {
  const { accessToken, refreshToken } = await getAuthTokens();
  return Boolean(accessToken && refreshToken);
}

export async function clearAuthTokens() {
  const store = await cookies();
  store.delete(ACCESS_TOKEN_KEY);
  store.delete(REFRESH_TOKEN_KEY);
}
