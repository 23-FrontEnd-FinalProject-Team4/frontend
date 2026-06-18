import { expect, test } from '@playwright/test';

test('로그인 페이지가 보인다', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
  await expect(page.locator('#login-email')).toBeVisible();
  await expect(page.locator('#login-password')).toBeVisible();
  await expect(page.getByRole('button', { name: '로그인' })).toBeVisible();
});
