import type { UploadImageResponse } from '@/apis/image/type';
import { serverFetcher } from '@/lib/serverFetcher';

export const uploadImageServer = async (formData: FormData) => {
  return serverFetcher<UploadImageResponse>('/images/upload', {
    method: 'POST',
    body: formData,
  });
};
