type DateInput = string | number | Date;

export const formatDate = (input: DateInput) => {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const [year, month, day] = date.toISOString().slice(0, 10).split('-');

  return `${year}. ${month}. ${day}`;
};
