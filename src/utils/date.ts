type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60;
type HourInterval = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;

export const generateMinutesByInterval = (interval: MinuteInterval = 1) => {
  return Array.from({ length: 60 / interval }, (_, i) => i * interval);
};

export const generateHoursByInterval = (interval: HourInterval = 1) => {
  return Array.from({ length: 24 / interval }, (_, i) => i * interval);
};

export const formatYearMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);

  return `${year}년 ${month}월`;
};

export const formatYearMonthDay = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  return `${year}년 ${month}월 ${day}일`;
};

export const formatISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const addDays = (date: Date, days: number) => {
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

export const getWeekDatesAround = (selectedDate: Date) => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 3 + i);
    return date;
  });
};
