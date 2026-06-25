import type { NextRequest } from 'next/server';

const HTTP_PROTOCOL_PATTERN = /^https?:\/\//;

export const getSiteUrl = (request: NextRequest): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (envUrl && HTTP_PROTOCOL_PATTERN.test(envUrl)) {
    return envUrl.replace(/\/$/, '');
  }

  return request.nextUrl.origin;
};
