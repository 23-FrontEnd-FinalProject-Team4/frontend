import { expect, describe, it } from 'vitest';
import { generateHoursByInterval, generateMinutesByInterval, getWeekDatesAround } from './date';

describe('date', () => {
  describe('generateMinutesByInterval', () => {
    it('30분 간격 테스트', () => {
      // Arrange
      const interval = 30;
      const expected = [0, 30];

      // Act
      const result = generateMinutesByInterval(interval);

      // Assert
      expect(result).toEqual(expected);
    });

    it('인수 없는 경우 테스트', () => {
      // Arrange
      const expected = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      ];

      // Act
      const result = generateMinutesByInterval();

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('generateHoursByInterval', () => {
    it('6시간 간격 테스트', () => {
      // Arrange
      const interval = 6;
      const expected = [0, 6, 12, 18];

      // Act
      const result = generateHoursByInterval(interval);

      // Assert
      expect(result).toEqual(expected);
    });

    it('인수 없는 경우 테스트', () => {
      // Arrange
      const expected = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      ];

      // Act
      const result = generateHoursByInterval();

      // Assert
      expect(result).toEqual(expected);
    });
  });
});

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
    const result = getWeekDatesAround(testDate);

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
    const result = getWeekDatesAround(testDate);

    // Assert
    expect(result.length).toBe(7);
    expect(result).toEqual(expected);
  });
});
