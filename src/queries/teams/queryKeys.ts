interface TeamKeyParams {
  groupId: number;
  teamId: string;
  date: string;
}

export const teamKeys = {
  all: ['team-page'] as const,
  group: ({ groupId }: Pick<TeamKeyParams, 'groupId'>) =>
    [...teamKeys.all, String(groupId)] as const,
  detail: ({ teamId, date }: Pick<TeamKeyParams, 'teamId' | 'date'>) =>
    [...teamKeys.all, teamId, date] as const,
};
