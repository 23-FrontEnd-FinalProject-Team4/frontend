import clientFetcher from '@/lib/clientFetcher';

import type { OAuthAppRequest, OAuthAppResponse } from './type';

export const registerOAuthApp = async (body: OAuthAppRequest) => {
  const response = await clientFetcher.post<OAuthAppResponse>(`/oauthApps`, body);
  return response.data;
};
