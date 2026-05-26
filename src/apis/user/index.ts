import axiosInstance from '@/apis/axiosInstance';
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
} from '@/apis/user/type';

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get<Profile>('/user');
  return data;
};

export const updateMyProfile = async (body: UpdateProfileRequest): Promise<MessageResponse> => {
  const { data } = await axiosInstance.patch<MessageResponse>('/user', body);
  return data;
};

export const signOut = async () => {
  const { data } = await axiosInstance.delete('/user');
  return data;
};

export const getMyGroups = async () => {
  const { data } = await axiosInstance.get<Group[]>('/user/groups');
  return data;
};

export const getMyMemberships = async () => {
  const { data } = await axiosInstance.get<Membership[]>('/user/memberships');
  return data;
};

export const getMyTaskHistory = async () => {
  const { data } = await axiosInstance.get<TaskHistory[]>('/user/history');
  return data;
};

export const sendResetPasswordEmail = async (body: SendPasswordResetEmailRequest) => {
  const { data } = await axiosInstance.post<MessageResponse>(
    '/user/send-reset-password-email',
    body,
  );
  return data;
};

export const resetPassword = async (body: ResetPasswordRequest) => {
  const { data } = await axiosInstance.patch<MessageResponse>('/user/reset-password', body);
  return data;
};

export const changePassword = async (body: ChangePasswordRequest) => {
  const { data } = await axiosInstance.patch<MessageResponse>('/user/password', body);
  return data;
};
