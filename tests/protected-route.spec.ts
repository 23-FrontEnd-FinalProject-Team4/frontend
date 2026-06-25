import { expect, test } from '@playwright/test';

test('비로그인 사용자는 보호 페이지 접근 시 로그인으로 리다이렉트된다', async ({ page }) => {
  await page.context().clearCookies();

  await page.goto('/settings');
  await page.waitForURL(/\/login/);

  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '계정 설정' })).not.toBeVisible();
});
