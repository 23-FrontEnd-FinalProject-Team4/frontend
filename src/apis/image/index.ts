import clientFetcher from '@/lib/clientFetcher';

import { UploadImageResponse } from './type';

export const uploadImage = async (formData: FormData) => {
  const response = await clientFetcher.post<UploadImageResponse>('/images/upload', formData);
  return response.data;
};
