import { describe, expect, it } from 'vitest';

import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('유효한 날짜를 YYYY. MM. DD 형식으로 반환한다', () => {
    expect(formatDate('2026-06-12T15:30:00.000Z')).toBe('2026. 06. 12');
  });

  it('유효하지 않은 날짜 입력은 빈 문자열을 반환한다', () => {
    expect(formatDate('not-a-date')).toBe('');
  });
});
