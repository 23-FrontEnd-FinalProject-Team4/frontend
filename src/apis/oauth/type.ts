export type OAuthProvider = 'GOOGLE' | 'KAKAO';

export interface OAuthAppRequest {
  appKey: string;
  appSecret?: string;
  provider: OAuthProvider;
}

export interface OAuthAppResponse {
  id: number;
  teamId: string;
  provider: OAuthProvider;
  appKey: string;
  appSecret: string | null;
  createdAt: string;
  updatedAt: string;
}
