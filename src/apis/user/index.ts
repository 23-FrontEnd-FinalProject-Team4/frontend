import clientFetcher from '@/lib/clientFetcher';

import type {
  ChangePasswordRequest,
  Group,
  Membership,
  MessageResponse,
  Profile,
  ResetPasswordRequest,
  SendPasswordResetEmailRequest,
  TaskHistory,
  UpdateProfileRequest,
} from './type';

export const getMyProfile = async () => {
  const response = await clientFetcher.get<Profile>('/user');
  return response.data;
};

export const updateMyProfile = async (body: UpdateProfileRequest) => {
  const response = await clientFetcher.patch<MessageResponse>('/user', body);
  return response.data;
};

export const signOut = async () => {
  const response = await clientFetcher.delete('/user');
  return response.data;
};

export const getMyGroups = async () => {
  const response = await clientFetcher.get<Group[]>('/user/groups');
  return response.data;
};

export const getMyMemberships = async () => {
  const response = await clientFetcher.get<Membership[]>('/user/memberships');
  return response.data;
};

export const getMyTaskHistory = async () => {
  const response = await clientFetcher.get<TaskHistory[]>('/user/history');
  return response.data;
};

export const sendResetPasswordEmail = async (body: SendPasswordResetEmailRequest) => {
  const response = await clientFetcher.post<MessageResponse>(
    '/user/send-reset-password-email',
    body,
  );
  return response.data;
};

export const resetPassword = async (body: ResetPasswordRequest) => {
  const response = await clientFetcher.patch<MessageResponse>('/user/reset-password', body);
  return response.data;
};

export const changePassword = async (body: ChangePasswordRequest) => {
  const response = await clientFetcher.patch<MessageResponse>('/user/password', body);
  return response.data;
};
