import { expect, describe, it } from 'vitest';
import { getWeekDates } from './getWeekDates';

describe('getWeekDates', () => {
  it('월 경계 테스트', () => {
    // Arrange
    const testDate = new Date('2026-03-01');
    const expected = [
      new Date('2026-02-26'),
      new Date('2026-02-27'),
      new Date('2026-02-28'),
      new Date('2026-03-01'),
      new Date('2026-03-02'),
      new Date('2026-03-03'),
      new Date('2026-03-04'),
    ];

    // Act
    const result = getWeekDates(testDate);

    // Assert
    expect(result).toEqual(expected);
  });

  it('연도 경계 테스트', () => {
    // Arrange
    const testDate = new Date('2026-01-01');
    const expected = [
      new Date('2025-12-29'),
      new Date('2025-12-30'),
      new Date('2025-12-31'),
      new Date('2026-01-01'),
      new Date('2026-01-02'),
      new Date('2026-01-03'),
      new Date('2026-01-04'),
    ];

    // Act
    const result = getWeekDates(testDate);

    // Assert
    expect(result.length).toBe(7);
    expect(result).toEqual(expected);
  });
});
