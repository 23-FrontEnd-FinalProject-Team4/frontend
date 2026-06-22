import 'server-only';

import type { Group } from '@/apis/user/type';
import { serverFetcher } from '@/lib/serverFetcher';

const DEFAULT_REDIRECT_PATH = '/no-team';

export const getSafeRedirectPath = (redirectPath?: string | null): string | undefined => {
  if (
    !redirectPath ||
    !redirectPath.startsWith('/') ||
    redirectPath.startsWith('//') ||
    redirectPath.includes('\\')
  ) {
    return undefined;
  }

  return redirectPath;
};

export const getPostLoginRedirectPath = async ({
  redirectPath,
}: {
  redirectPath?: string | null;
}): Promise<string> => {
  const safeRedirectPath = getSafeRedirectPath(redirectPath);

  if (safeRedirectPath) {
    return safeRedirectPath;
  }

  const groups = await serverFetcher<Group[]>('/user/groups');

  const firstGroupId = groups[0]?.id;

  return firstGroupId ? `/${firstGroupId}` : DEFAULT_REDIRECT_PATH;
};
