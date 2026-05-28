export const getWeekDates = (selectedDate: Date) => {
  const dates: Date[] = [];
  const start = new Date(selectedDate);
  start.setDate(start.getDate() - 3);
  const end = new Date(selectedDate);
  end.setDate(end.getDate() + 3);

  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};
