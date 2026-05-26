export interface User {
  teamId: string;
  id: number;
  email: string;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  image?: string;
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface OAuthSignInRequest {
  token: string;
  state?: string;
  redirectUri?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

