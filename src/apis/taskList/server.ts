import { serverFetcher } from '@/lib/serverFetcher';

import { TaskList } from '../group/type';
import { GetTaskListsParams } from './type';

export const getTaskListServer = async ({ groupId, id, date }: GetTaskListsParams) => {
  const requestURL = `/groups/${groupId}/task-lists/${id}` + (date ? `?date=${date}` : '');
  return await serverFetcher<TaskList>(requestURL);
};
