interface groupKeyParams {
  groupId: number;
}

export const groupKeys = {
  all: () => ['group'] as const,
  detail: ({ groupId }: groupKeyParams) => [...groupKeys.all(), groupId] as const,
};
