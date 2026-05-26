import axiosInstance from '@/apis/axiosInstance';
import type { OAuthAppRequest, OAuthAppResponse } from '@/apis/oauth/type';

export const registerOAuthApp = async (teamId: string, body: OAuthAppRequest) => {
  const { data } = await axiosInstance.post<OAuthAppResponse>(`/${teamId}/oauthApps`, body);
  return data;
};
