import axiosInstance from '../axiosInstance';
import {
  GetGroupMemeberParams,
  GroupDetail,
  Member,
  PostGroupAcceptInvitationParams,
  PostGroupMember,
} from './type';

// GET 그룹 조회
export const getGroup = async ({ id }: Pick<GroupDetail, 'id'>) => {
  const response = await axiosInstance.get<GroupDetail>(`/groups/${id}`);
  return response.data;
};

// PATCH 그룹 수정
export const patchGroup = async ({
  id,
  image,
  name,
}: Pick<GroupDetail, 'id' | 'image' | 'name'>) => {
  const response = await axiosInstance.patch<GroupDetail>(`/groups/${id}`, { image, name });
  return response.data;
};

// DELETE 그룹 삭제
export const deleteGroup = async ({ id }: Pick<GroupDetail, 'id'>) => {
  const response = await axiosInstance.delete(`/groups/${id}`);
  return response.data;
};

// POST 그룹 생성
export const postGroup = async ({ image, name }: Pick<GroupDetail, 'image' | 'name'>) => {
  const response = await axiosInstance.post<GroupDetail>(`/groups`, { image, name });
  return response.data;
};

// GET 그룹 멤버 조회
export const getGroupMember = async ({ id, memberUserId }: GetGroupMemeberParams) => {
  const response = await axiosInstance.get<Member>(`/groups/${id}/member/${memberUserId}`);
  return response.data;
};

// DELETE 멤버 제거
export const deleteGroupMember = async ({ id, memberUserId }: GetGroupMemeberParams) => {
  const response = await axiosInstance.delete(`/groups/${id}/member/${memberUserId}`);
  return response.data;
};

// GET 초대 토큰 발급
export const getGroupInvitation = async ({ id }: Pick<GroupDetail, 'id'>) => {
  const response = await axiosInstance.get<string>(`/groups/${id}/invitation`);
  return response.data;
};

// POST 초대 수락
export const postGroupAcceptInvitation = async ({
  userEmail,
  token,
}: PostGroupAcceptInvitationParams) => {
  const response = await axiosInstance.post<{ groupId: number }>(`/groups/accept-invitation`, {
    userEmail,
    token,
  });
  return response.data;
};

// POST 멤버 추가
export const postGroupMember = async ({ id, userEmail }: PostGroupMember) => {
  const response = await axiosInstance.post(`/groups/${id}/member`, { userEmail });
  return response.data;
};

// task가 정해지지 않아서 정해지면 만들어 놓겠습니다.
// export const getGroupTasks = async ({ id, date }) => {
//   const response = await axiosInstance.get(`/groups/${id}/tasks`, { date });
//   return response.data;
// };
