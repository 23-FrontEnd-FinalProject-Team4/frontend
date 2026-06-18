import type {
  ChangePasswordRequest,
  MessageResponse,
  Profile,
  TaskHistory,
  UpdateProfileRequest,
} from '@/apis/user/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const getMyProfileServer = async () => {
  return serverFetcher<Profile>('/user');
};

export const updateMyProfileServer = async (body: UpdateProfileRequest) => {
  return serverFetcher<MessageResponse>('/user', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

export const changePasswordServer = async (body: ChangePasswordRequest) => {
  return serverFetcher<MessageResponse>('/user/password', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

export const getMyTaskHistoryServer = async () => {
  return await serverFetcher<{ tasksDone: TaskHistory[] }>('/user/history');
};
