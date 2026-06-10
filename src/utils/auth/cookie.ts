const isProd = process.env.NODE_ENV === 'production';

const baseCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax' as const,
  path: '/',
};

export const ACCESS_TOKEN_KEY = 'coworkers:accessToken';
export const REFRESH_TOKEN_KEY = 'coworkers:refreshToken';

export const accessTokenCookieOptions = {
  ...baseCookieOptions,
  maxAge: 60 * 60, // TODO: 임의로 1시간으로 지정, 유효 기간 논의 필요
};

export const refreshTokenCookieOptions = {
  ...baseCookieOptions,
  maxAge: 60 * 60 * 24 * 14, // TODO: 임의로 14일로 지정, 유효 기간 논의 필요
};
