import axiosInstance from '@/apis/axiosInstance';
import type { OAuthAppRequest, OAuthAppResponse } from '@/apis/oauth/type';

export const registerOAuthApp = async (body: OAuthAppRequest) => {
  const { data } = await axiosInstance.post<OAuthAppResponse>(`/oauthApps`, body);
  return data;
};
