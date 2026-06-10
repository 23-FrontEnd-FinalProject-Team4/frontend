import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from './cookie';
import {
  clearAuthTokens,
  getAccessToken,
  getAuthTokens,
  getRefreshToken,
  hasAuthTokens,
  setAccessToken,
  setAuthTokens,
} from './token';

vi.mock('server-only', () => ({}));

const cookieState = new Map<string, string>();
const cookieOptionState = new Map<string, unknown>();

const mockStore = {
  set: vi.fn((key: string, value: string, options?: unknown) => {
    cookieState.set(key, value);
    cookieOptionState.set(key, options);
  }),
  get: vi.fn((key: string) => {
    const value = cookieState.get(key);
    return value == null ? undefined : { value };
  }),
  delete: vi.fn((key: string) => {
    cookieState.delete(key);
  }),
};

vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => mockStore),
}));

describe('authentication token management', () => {
  beforeEach(() => {
    cookieState.clear();
    cookieOptionState.clear();
    vi.clearAllMocks();
  });

  it('setAuthTokens는 access 토큰과 refresh 토큰을 쿠키에 저장한다', async () => {
    const accessToken = 'access-token';
    const refreshToken = 'refresh-token';

    await setAuthTokens({ accessToken, refreshToken });

    expect(mockStore.set).toHaveBeenCalledWith(
      ACCESS_TOKEN_KEY,
      accessToken,
      accessTokenCookieOptions,
    );
    expect(mockStore.set).toHaveBeenCalledWith(
      REFRESH_TOKEN_KEY,
      refreshToken,
      refreshTokenCookieOptions,
    );
    expect(await getAccessToken()).toBe(accessToken);
    expect(await getRefreshToken()).toBe(refreshToken);
  });

  it('setAccessToken은 access 토큰만을 갱신한다', async () => {
    await setAuthTokens({ accessToken: 'old-access', refreshToken: 'fixed-refresh' });

    await setAccessToken('new-access');

    const tokens = await getAuthTokens();
    expect(tokens).toEqual({
      accessToken: 'new-access',
      refreshToken: 'fixed-refresh',
    });
  });

  it('hasAuthTokens는 access 토큰과 refresh 토큰이 모두 있을 때만 true를 반환한다', async () => {
    await setAccessToken('only-access');

    expect(await hasAuthTokens()).toBe(false);

    await setAuthTokens({ accessToken: 'access', refreshToken: 'refresh' });
    expect(await hasAuthTokens()).toBe(true);
  });

  it('clearAuthTokens는 access 토큰과 refresh 토큰을 모두 삭제한다', async () => {
    await setAuthTokens({ accessToken: 'access', refreshToken: 'refresh' });

    await clearAuthTokens();

    expect(mockStore.delete).toHaveBeenCalledWith(ACCESS_TOKEN_KEY);
    expect(mockStore.delete).toHaveBeenCalledWith(REFRESH_TOKEN_KEY);
    expect(await getAuthTokens()).toEqual({
      accessToken: null,
      refreshToken: null,
    });
  });
});
