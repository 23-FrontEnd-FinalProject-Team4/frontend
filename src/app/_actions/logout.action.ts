'use server';

import { clearAuthTokens } from '@/utils/auth/token';

export async function logout() {
  await clearAuthTokens();
}
