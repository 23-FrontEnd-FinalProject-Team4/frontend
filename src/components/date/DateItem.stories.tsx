import { DateItem } from './DateItem';

export default {
  component: DateItem,
  title: 'DateItem',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    date: new Date(),
    isSelected: false,
  },
};

export const Selected = {
  args: {
    date: new Date(),
    isSelected: true,
  },
};
