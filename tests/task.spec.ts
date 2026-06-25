import { expect, test } from '@playwright/test';

import { OPTIONS } from '@/constants/listItem';

test.describe('할 일 페이지', () => {
  test('할 일 CRUD', async ({ page }) => {
    const testTaskName = `e2e-${Date.now()}-할일`;
    const testTaskDescription = `${testTaskName}-설명`;
    const updatedTaskName = `${testTaskName} 수정됨`;

    await page.goto(`/${process.env.E2E_TEAM_ID}/tasklist`);

    // Create
    await expect(page.getByLabel('할 일 추가하기')).toBeVisible();

    await page.getByLabel('할 일 추가하기').click();
    await expect(page.getByText('할 일 만들기')).toBeVisible();
    await expect(page.getByLabel('할 일 제목')).toBeVisible();

    await page.getByLabel('할 일 제목').fill(testTaskName);
    await page.getByLabel('할 일 메모').fill(testTaskDescription);
    await page.getByRole('button', { name: '만들기' }).click();
    await expect(page.getByText(testTaskName)).toBeVisible();

    // Update
    await expect(page.getByLabel(`${testTaskName} 메뉴 열기`)).toBeVisible();

    await page.getByLabel(`${testTaskName} 메뉴 열기`).click();
    await expect(page.getByRole('menuitem', { name: OPTIONS[0].label })).toBeVisible();

    await page.getByRole('menuitem', { name: OPTIONS[0].label }).click();
    await expect(page.getByLabel('할 일 제목')).toHaveValue(testTaskName);

    await page.getByLabel('할 일 제목').fill(testTaskName + ' 수정됨');
    await page.getByLabel('할 일 메모').fill(testTaskDescription + ' 수정됨');
    await page.getByRole('button', { name: '수정하기' }).click();

    // Toggle
    await expect(page.getByText(`${updatedTaskName}`)).toBeVisible();
    await page.getByText(`${updatedTaskName}`).click();
    await expect(page.getByText(`${updatedTaskName}`)).toHaveClass(/line-through/);

    await page.getByText(`${updatedTaskName}`).click();
    await expect(page.getByText(`${updatedTaskName}`)).not.toHaveClass(/line-through/);

    // Delete
    await page.getByLabel(`${updatedTaskName} 메뉴 열기`).click();
    await expect(page.getByRole('menuitem', { name: OPTIONS[1].label })).toBeVisible();

    await page.getByRole('menuitem', { name: OPTIONS[1].label }).click();
    await expect(page.getByRole('button', { name: OPTIONS[1].label })).toBeVisible();

    await page.getByRole('button', { name: '삭제하기' }).click();
    await expect(page.getByLabel(`${updatedTaskName} 할 일 목록으로 이동`)).toHaveCount(0);
  });

  test('할 일 상세 창 테스트', async ({ page }) => {
    const testTaskName = `e2e-${Date.now()}-할일`;
    const testTaskDescription = `${testTaskName}-설명`;

    await page.goto(`/${process.env.E2E_TEAM_ID}/tasklist`);

    // 할 일 추가
    await expect(page.getByLabel('할 일 추가하기')).toBeVisible();

    await page.getByLabel('할 일 추가하기').click();
    await expect(page.getByText('할 일 만들기')).toBeVisible();
    await expect(page.getByLabel('할 일 제목')).toBeVisible();

    await page.getByLabel('할 일 제목').fill(testTaskName);
    await page.getByLabel('할 일 메모').fill(testTaskDescription);
    await page.getByRole('button', { name: '만들기' }).click();
    await expect(page.getByText(testTaskName)).toBeVisible();

    // 할 일 클릭
    await expect(page.getByLabel(`${testTaskName} 할 일 상세 보기`)).toBeVisible();
    await page.getByLabel(`${testTaskName} 할 일 상세 보기`).click();

    await page.getByRole('button', { name: '완료하기' }).click();
    await expect(page.getByRole('button', { name: '완료 취소하기' })).toBeVisible();

    await page.getByRole('button', { name: '완료 취소하기' }).click();
    await expect(page.getByRole('button', { name: '완료하기' })).toBeVisible();

    // 댓글 확인
    const comment = `${testTaskName}-댓글`;
    await expect(page.getByPlaceholder('댓글을 달아주세요')).toBeVisible();
    await page.getByPlaceholder('댓글을 달아주세요').fill(comment);
    await expect(page.getByLabel('댓글 등록')).toBeVisible();
    await page.getByLabel('댓글 등록').click();
    await expect(page.getByText(comment)).toBeVisible();
    await expect(page.getByLabel('메뉴', { exact: true })).toBeVisible();

    // 댓글 수정
    const updatedComment = `${comment}-수정됨`;
    await page.getByLabel('메뉴', { exact: true }).click();

    await expect(page.getByRole('menuitem', { name: OPTIONS[0].label })).toBeVisible();
    await page.getByRole('menuitem', { name: OPTIONS[0].label }).click();
    await page.getByLabel('댓글 수정').fill(updatedComment);
    await page.getByRole('button', { name: '수정하기' }).click();

    await expect(page.getByText(updatedComment)).toBeVisible();
    await expect(page.getByText(comment, { exact: true })).toHaveCount(0);

    // 댓글 삭제
    await page.getByLabel('메뉴', { exact: true }).click();

    await page.getByRole('menuitem', { name: OPTIONS[1].label }).click();
    await expect(page.getByText(updatedComment)).toHaveCount(0);
  });
});
