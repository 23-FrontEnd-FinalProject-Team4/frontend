import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { GroupDetail } from '@/apis/group/type';
import { updateTeamAction } from '@/app/(team)/[teamId]/editteam/_actions/updateTeam.action';
import { createTeamAction } from '@/app/(team)/addteam/_actions/createTeam.action';
import { joinTeamAction } from '@/app/(team)/jointeam/_actions/join-team.action';
import { JoinTeamError } from '@/app/(team)/jointeam/join-team.error';
import {
  createTeamTaskListAction,
  deleteTeamAction,
  deleteTeamMemberAction,
  getTeamInvitationAction,
} from '@/app/[teamId]/_actions/team-page.action';

import { teamKeys } from './queryKeys';

interface CreateTeamTaskListVariables {
  groupId: number;
  name: string;
}

interface CreateTeamVariables {
  name: string;
  imageFile: File | null;
}

interface DeleteTeamVariables {
  groupId: number;
}

interface DeleteTeamMemberVariables {
  groupId: number;
  memberUserId: number;
}

interface GetTeamInvitationVariables {
  groupId: number;
}

interface JoinTeamVariables {
  teamLink: string;
}

interface UpdateTeamVariables {
  groupId: number;
  name: string;
  imageFile: File | null;
  currentImage: string | null;
}

export class CreateTeamMutationError extends Error {
  readonly isDuplicateName: boolean;

  constructor(message: string, isDuplicateName = false) {
    super(message);
    this.name = 'CreateTeamMutationError';
    this.isDuplicateName = isDuplicateName;
  }
}

export class UpdateTeamMutationError extends Error {
  readonly isDuplicateName: boolean;

  constructor(message: string, isDuplicateName = false) {
    super(message);
    this.name = 'UpdateTeamMutationError';
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

const joinTeam = async ({ teamLink }: JoinTeamVariables) => {
  const result = await joinTeamAction({ teamLink });

  if (!result.success) {
    throw new JoinTeamError(result.error, result.code);
  }

  return result.data;
};

const updateTeam = async ({ groupId, name, imageFile, currentImage }: UpdateTeamVariables) => {
  const formData = new FormData();
  formData.append('groupId', String(groupId));
  formData.append('name', name);

  if (currentImage) {
    formData.append('currentImage', currentImage);
  }

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const result = await updateTeamAction(formData);

  if (!result.success) {
    throw new UpdateTeamMutationError(result.error, result.isDuplicateName);
  }

  return result.data;
};

const createTeamTaskList = async ({ groupId, name }: CreateTeamTaskListVariables) => {
  const result = await createTeamTaskListAction({ groupId, name });

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
};

const deleteTeam = async ({ groupId }: DeleteTeamVariables) => {
  const result = await deleteTeamAction({ groupId });

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
};

const deleteTeamMember = async ({ groupId, memberUserId }: DeleteTeamMemberVariables) => {
  const result = await deleteTeamMemberAction({ groupId, memberUserId });

  if (!result.success) {
    throw new Error(result.error);
  }
};

const getTeamInvitation = async ({ groupId }: GetTeamInvitationVariables) => {
  const result = await getTeamInvitationAction({ groupId });

  if (!result.success) {
    throw new Error(result.error);
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

export const useJoinTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ groupId: number }, JoinTeamError, JoinTeamVariables>({
    mutationFn: joinTeam,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-page'] });
      queryClient.invalidateQueries({ queryKey: ['sidebar'] });
    },
  });
};

export const useUpdateTeamMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<GroupDetail, UpdateTeamMutationError, UpdateTeamVariables>({
    mutationFn: updateTeam,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['team-page'] });
      queryClient.invalidateQueries({ queryKey: ['sidebar'] });
    },
  });
};

export const useCreateTeamTaskListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateTeamTaskListVariables>({
    mutationFn: createTeamTaskList,
    retry: false,
    onSuccess: (_data, variables) => {
      return queryClient.invalidateQueries({
        queryKey: teamKeys.group({ groupId: variables.groupId }),
      });
    },
  });
};

export const useDeleteTeamMutation = () => {
  return useMutation<void, Error, DeleteTeamVariables>({
    mutationFn: deleteTeam,
    retry: false,
  });
};

export const useDeleteTeamMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteTeamMemberVariables>({
    mutationFn: deleteTeamMember,
    retry: false,
    onSuccess: (_data, variables) => {
      return queryClient.invalidateQueries({
        queryKey: teamKeys.group({ groupId: variables.groupId }),
      });
    },
  });
};

export const useTeamInvitationMutation = () => {
  return useMutation<string, Error, GetTeamInvitationVariables>({
    mutationFn: getTeamInvitation,
    retry: false,
  });
};
