import axiosInstance from '@/apis/axiosInstance';

import type { OAuthAppRequest, OAuthAppResponse } from './type';

export const registerOAuthApp = async (body: OAuthAppRequest) => {
  const response = await axiosInstance.post<OAuthAppResponse>(`/oauthApps`, body);
  return response.data;
};
