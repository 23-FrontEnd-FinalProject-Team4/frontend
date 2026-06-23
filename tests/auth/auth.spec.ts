import { expect, test } from '@playwright/test';

test.describe('회원 가입', () => {
  function createUser() {
    const name = crypto.randomUUID().substring(0, 8);

    return {
      name,
      email: `${name}@email.com`,
      password: `${name}123!`,
    };
  }

  test('회원 가입 실패 테스트', async ({ page }) => {
    const { name, email, password } = createUser();
    const failPassword = `${password}123`;

    await page.goto('/signup');

    await page.getByLabel('이름').fill(name);
    await page.getByLabel('이메일').fill(email);
    await page.getByRole('textbox', { name: '비밀번호', exact: true }).fill(password);
    await page.getByRole('textbox', { name: '비밀번호 확인', exact: true }).fill(failPassword);

    await expect(page.getByRole('button', { name: '회원가입' })).toBeDisabled();
  });

  test('회원 가입 성공 테스트', async ({ page }) => {
    const { name, email, password } = createUser();

    await page.goto('/signup');

    await page.getByLabel('이름').fill(name);
    await page.getByLabel('이메일').fill(email);
    await page.getByRole('textbox', { name: '비밀번호', exact: true }).fill(password);
    await page.getByRole('textbox', { name: '비밀번호 확인', exact: true }).fill(password);

    await page.getByRole('button', { name: '회원가입' }).click();

    await expect(page).toHaveURL('/login');
  });
});

test.describe('로그인', () => {
  test('로그인 성공 테스트', async ({ page }) => {
    const email = process.env.E2E_EMAIL!;
    const password = process.env.E2E_PASSWORD!;

    await page.goto('/login');

    await page.getByRole('textbox', { name: '이메일' }).fill(email);
    await page.getByRole('textbox', { name: '비밀번호', exact: true }).fill(password);
    await page.getByRole('button', { name: '로그인' }).click();

    await expect(page).toHaveURL(/\/no-team|\/[0-9]+/);
  });

  test('로그인 실패 테스트', async ({ page }) => {
    const email = 'wrongemail@qwe.qwe';
    const password = 'wrongpassword1!';

    await page.goto('/login');
    await page.getByRole('textbox', { name: '이메일' }).fill(email);
    await page.getByRole('textbox', { name: '비밀번호', exact: true }).fill(password);
    await page.getByRole('button', { name: '로그인' }).click();

    await expect(page).toHaveURL('/login');
    await expect(page.getByText('존재하지 않는 이메일입니다')).toBeVisible();
  });
});
