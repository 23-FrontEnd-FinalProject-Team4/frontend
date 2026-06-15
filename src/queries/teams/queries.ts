import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { postGroup } from '@/apis/group/index';
import type { GroupDetail } from '@/apis/group/type';
import { uploadImage } from '@/apis/image';

interface CreateTeamVariables {
  name: string;
  imageFile: File | null;
}

interface ErrorResponseData {
  message?: string;
}

const createTeam = async ({ name, imageFile }: CreateTeamVariables) => {
  if (!imageFile) {
    return postGroup({ name });
  }

  const formData = new FormData();
  formData.append('image', imageFile);
  const { url } = await uploadImage(formData);

  return postGroup({ name, image: url });
};

export const useCreateTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<GroupDetail, AxiosError<ErrorResponseData>, CreateTeamVariables>({
    mutationFn: createTeam,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-page'] });
      queryClient.invalidateQueries({ queryKey: ['sidebar'] });
    },
  });
};
