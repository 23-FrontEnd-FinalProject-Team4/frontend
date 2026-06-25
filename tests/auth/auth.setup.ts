import { expect, test as setup } from '@playwright/test';

setup('인증', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('textbox', { name: '이메일' }).fill(process.env.E2E_EMAIL!);
  await page
    .getByRole('textbox', { name: '비밀번호', exact: true })
    .fill(process.env.E2E_PASSWORD!);
  await page.getByRole('button', { name: '로그인' }).click();

  await expect(page).toHaveURL(/\/no-team|\/[0-9]+/);

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});
