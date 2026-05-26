import axiosInstance from '@/apis/axiosInstance';

import { UploadImageResponse } from './type';

export const uploadImage = async (formData: FormData) => {
  const response = await axiosInstance.post<UploadImageResponse>('/api/images/upload', formData);
  return response.data;
};
