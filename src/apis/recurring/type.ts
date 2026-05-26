type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

interface RequestBaseTaskRecurring {
  name: string;
  description?: string | null;
  startDate?: string | null;
}

interface RequestMonthlyRecurring extends RequestBaseTaskRecurring {
  frequencyType: Extract<FrequencyType, 'MONTHLY'>;
  monthDay: number;
}

interface RequestWeeklyRecurring extends RequestBaseTaskRecurring {
  frequencyType: Extract<FrequencyType, 'WEEKLY'>;
  weekDays: number[];
}

interface RequestDailyRecurring extends RequestBaseTaskRecurring {
  frequencyType: Extract<FrequencyType, 'DAILY'>;
}

interface RequestOnceRecurring extends RequestBaseTaskRecurring {
  frequencyType: Extract<FrequencyType, 'ONCE'>;
}

export type RequestCreateTaskRecurring =
  | RequestMonthlyRecurring
  | RequestWeeklyRecurring
  | RequestDailyRecurring
  | RequestOnceRecurring;

export interface RequestUpdateTaskRecurring {
  name?: string;
  description?: string;
  startDate?: string;
  frequencyType?: FrequencyType;
  monthDay?: number;
  weekDays?: number[];
}

export interface ResponseTaskRecurring {
  writerId: number;
  groupId: number;
  taskListId: number;
  monthDay: number;
  weekDays: number[];
  frequencyType: FrequencyType;
  updatedAt: string;
  createdAt: string;
  description: string;
  name: string;
  id: number;
  startDate: string;
}
