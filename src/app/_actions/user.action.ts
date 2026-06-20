'use server';

import type { User } from '@/apis/auth/type';
import { serverFetcher } from '@/lib/serverFetcher';

export async function getMyProfileAction() {
  return await serverFetcher<User>('/user');
}
