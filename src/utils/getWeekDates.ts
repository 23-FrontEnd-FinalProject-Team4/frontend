export const getWeekDates = (selectedDate: Date) => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 3 + i);
    return date;
  });
};
