type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60;
type HourInterval = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export const generateMinutesByInterval = (interval: MinuteInterval = 1) => {
  return Array.from({ length: 60 / interval }, (_, i) => i * interval);
};

export const generateHoursByInterval = (interval: HourInterval = 1) => {
  return Array.from({ length: 24 / interval }, (_, i) => i * interval);
};
