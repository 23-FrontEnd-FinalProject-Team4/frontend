import 'server-only';

import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const createRequestUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
  }

  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const requestPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${requestPath}`;
};

const createServerHeaders = async (optionsHeaders?: HeadersInit) => {
  const headers = new Headers(optionsHeaders);
  const cookieHeader = (await cookies()).toString();

  if (cookieHeader && !headers.has('Cookie')) {
    headers.set('Cookie', cookieHeader);
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
};

export const serverFetcher = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(createRequestUrl(path), {
    ...options,
    headers: await createServerHeaders(options.headers),
    cache: options.cache ?? 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('Content-Type');

  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
};
