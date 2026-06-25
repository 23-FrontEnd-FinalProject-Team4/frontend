import { expect, test } from '@playwright/test';
import path from 'node:path';

const TEST_IMAGE_PATH = path.join(process.cwd(), 'src/assets/images/sample.png');

const getTestCredentials = () => {
  const email = process.env.E2E_TEST_EMAIL;
  const password = process.env.E2E_TEST_PASSWORD;

  if (!email || !password) {
    return null;
  }

  return { email, password };
};

test('로그인 사용자가 게시글 작성, 좋아요, 댓글 등록을 할 수 있다', async ({ page }) => {
  const credentials = getTestCredentials();

  if (!credentials) {
    test.skip(true, 'E2E_TEST_EMAIL, E2E_TEST_PASSWORD 환경 변수가 필요합니다.');
    return;
  }

  const { email, password } = credentials;
  const title = `E2E 테스트 게시글 ${Date.now()}`;
  const content = `E2E 테스트 본문 ${Date.now()}`;
  const comment = `E2E 테스트 댓글 ${Date.now()}`;

  await test.step('로그인한다', async () => {
    await page.goto('/login?redirect=/articles');
    await page.locator('#login-email').fill(email);
    await page.locator('#login-password').fill(password);
    await page.getByRole('button', { name: '로그인' }).click();
    await page.waitForURL(/\/articles/);
  });

  await test.step('자유게시판 페이지로 이동한다', async () => {
    await expect(page.getByRole('heading', { name: '자유게시판' })).toBeVisible();
  });

  await test.step('글쓰기 버튼을 클릭한다', async () => {
    await page.getByRole('button', { name: '글쓰기' }).click();
    await expect(page).toHaveURL(/\/articles\/write/);
    await expect(page.getByRole('heading', { name: '게시글 쓰기' })).toBeVisible();
  });

  await test.step('제목과 내용을 입력한다', async () => {
    await page.getByPlaceholder('제목을 입력해주세요.').fill(title);
    await page.getByPlaceholder('내용을 입력해주세요.').fill(content);
  });

  await test.step('이미지를 첨부한다', async () => {
    await page.locator('#article-image').setInputFiles(TEST_IMAGE_PATH);
    await expect(page.getByAltText('미리보기')).toBeVisible();
  });

  await test.step('등록 버튼을 클릭해 게시글을 등록한다', async () => {
    await page.getByRole('button', { name: '등록하기' }).click();
    await page.waitForURL(/\/articles\/\d+/, { timeout: 30_000 });
  });

  await test.step('작성한 게시글 상세 페이지로 이동한다', async () => {
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
  });

  await test.step('좋아요 버튼을 클릭한다', async () => {
    const likeButton = page.getByRole('button', { name: '좋아요' });

    await expect(likeButton).toContainText('0');
    await likeButton.click();
  });

  await test.step('좋아요 상태가 반영된다', async () => {
    const likeButton = page.getByRole('button', { name: '좋아요' });

    await expect(likeButton).toContainText('1');
    await expect(likeButton).toHaveClass(/text-brand-primary/);
  });

  await test.step('댓글 입력창에 댓글을 입력한다', async () => {
    await page.getByPlaceholder('댓글을 달아주세요').fill(comment);
  });

  await test.step('댓글 등록 버튼을 클릭한다', async () => {
    await page.getByRole('button', { name: '댓글 등록' }).click();
  });

  await test.step('작성한 댓글이 화면에 노출된다', async () => {
    await expect(page.getByText(comment)).toBeVisible();
  });

  await test.step('프로필 메뉴에서 로그아웃을 선택한다', async () => {
    await page.getByRole('button', { name: '프로필 메뉴' }).click();
    await page.getByRole('menuitem', { name: '로그아웃' }).click();
  });

  await test.step('로그인 페이지로 이동한다', async () => {
    await page.waitForURL(/\/login/);
    await expect(page.getByRole('heading', { name: '로그인' })).toBeVisible();
  });
});
