'use server';

import type { GroupDetail } from '@/apis/group/type';
import type { UploadImageResponse } from '@/apis/image/type';
import { getErrorMessage, isDuplicateNameError } from '@/lib/error';
import { serverFetcher } from '@/lib/serverFetcher';
import { teamCreateSchema } from '@/schemas/team.schema';

export type CreateTeamActionResult =
  | { success: true; data: GroupDetail }
  | { success: false; error: string; isDuplicateName?: boolean };

export const createTeamAction = async (formData: FormData): Promise<CreateTeamActionResult> => {
  const parsedPayload = teamCreateSchema.safeParse({
    name: formData.get('name'),
  });

  if (!parsedPayload.success) {
    return {
      success: false,
      error: parsedPayload.error.issues[0]?.message ?? '입력값을 다시 확인해주세요.',
    };
  }

  try {
    const { name } = parsedPayload.data;
    const imageFile = formData.get('image');
    let image: string | undefined;

    if (imageFile instanceof File && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('image', imageFile);

      const { url } = await serverFetcher<UploadImageResponse>('/images/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      image = url;
    }

    const body = image ? { name, image } : { name };
    const group = await serverFetcher<GroupDetail>('/groups', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return { success: true, data: group };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, '팀 생성 중 오류가 발생했어요.'),
      isDuplicateName: isDuplicateNameError(error),
    };
  }
};
