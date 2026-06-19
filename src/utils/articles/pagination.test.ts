import { describe, expect, it } from 'vitest';

import { getVisiblePages } from './pagination';

describe('getVisiblePages', () => {
  it('첫 페이지', () => {
    expect(getVisiblePages(1, 10)).toEqual([1, 2, 3, 4, 5]);
  });

  it('중간 페이지', () => {
    expect(getVisiblePages(5, 10)).toEqual([3, 4, 5, 6, 7]);
  });

  it('전체 페이지가 5개 이하', () => {
    expect(getVisiblePages(1, 3)).toEqual([1, 2, 3]);
  });

  it('마지막 페이지', () => {
    expect(getVisiblePages(10, 10)).toEqual([6, 7, 8, 9, 10]);
  });
});
