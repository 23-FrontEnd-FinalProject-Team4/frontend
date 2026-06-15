import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { GroupDetail } from '@/apis/group/type';
import { createTeamAction } from '@/app/(team)/addteam/_actions/createTeam.action';

interface CreateTeamVariables {
  name: string;
  imageFile: File | null;
}

class CreateTeamMutationError extends Error {
  readonly isDuplicateName: boolean;

  constructor(message: string, isDuplicateName = false) {
    super(message);
    this.name = 'CreateTeamMutationError';
    this.isDuplicateName = isDuplicateName;
  }
}

const createTeam = async ({ name, imageFile }: CreateTeamVariables) => {
  const formData = new FormData();
  formData.append('name', name);

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const result = await createTeamAction(formData);

  if (!result.success) {
    throw new CreateTeamMutationError(result.error, result.isDuplicateName);
  }

  return result.data;
};

export const useCreateTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<GroupDetail, CreateTeamMutationError, CreateTeamVariables>({
    mutationFn: createTeam,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-page'] });
      queryClient.invalidateQueries({ queryKey: ['sidebar'] });
    },
  });
};

export { CreateTeamMutationError };
