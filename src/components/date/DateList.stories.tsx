import DateList from './DateList';

export default {
  component: DateList,
  title: 'DateList',
  tags: ['autodocs'],
};

export const Today = {
  args: {
    selectedDate: new Date(),
  },
};

export const Tomorrow = {
  args: {
    selectedDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
};
