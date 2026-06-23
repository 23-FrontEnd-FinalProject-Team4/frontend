import { expect, test } from '@playwright/test';

import { OPTIONS } from '@/constants/listItem';

test('할 일 목록 CRUD', async ({ page }) => {
  const testTaskListName = `e2e-${Date.now()}`;
  const updatedTaskListName = `${testTaskListName} 수정됨`;

  await page.goto(`/${process.env.E2E_TEAM_ID}`);

  // Create
  await page.getByRole('button', { name: '할일 추가하기 +' }).click();
  await page.getByPlaceholder('목록 명을 입력해주세요').fill(testTaskListName);
  await page.getByRole('button', { name: '만들기' }).click();

  await expect(page.getByLabel(`${testTaskListName} 할 일 목록으로 이동`)).toBeVisible();

  // Update
  await page.getByLabel(`${testTaskListName} 메뉴 열기`).click();
  await expect(page.getByRole('menuitem', { name: OPTIONS[0].label })).toBeVisible();

  await page.getByRole('menuitem', { name: OPTIONS[0].label }).click();
  await expect(page.locator('input[type="text"]')).toHaveValue(testTaskListName);

  await page.locator('input[type="text"]').fill(updatedTaskListName);
  await page.getByRole('button', { name: '수정하기' }).click();
  await expect(page.getByLabel(`${updatedTaskListName} 메뉴 열기`)).toBeVisible();

  // Delete
  await page.getByLabel(`${updatedTaskListName} 메뉴 열기`).click();
  await expect(page.getByRole('menuitem', { name: OPTIONS[1].label })).toBeVisible();

  await page.getByRole('menuitem', { name: OPTIONS[1].label }).click();
  await expect(page.getByRole('button', { name: OPTIONS[1].label })).toBeVisible();

  await page.getByRole('button', { name: '삭제하기' }).click();
  await expect(page.getByLabel(`${updatedTaskListName} 할 일 목록으로 이동`)).toHaveCount(0);
});
