import type { TaskListItem, TaskStatus, TaskStatusSection, TeamPageMember } from '../type';

export const TEAM_PAGE_MEMBERS: TeamPageMember[] = [
  { id: 1, name: '최일우', email: 'test@codeit.com', role: 'ADMIN' },
  { id: 2, name: '이차현', email: 'test@codeit.com', role: 'MEMBER' },
  { id: 3, name: '이수진', email: 'test@codeit.com', role: 'MEMBER' },
  { id: 4, name: '정태양', email: 'test@codeit.com', role: 'MEMBER' },
];

const TASK_TITLES = [
  '법인 설립 안내 드리기',
  '법인 설립 필요 변경 등기 비용 안내 드리기',
  '임직주수신청서를 바탕으로 등기신청서 작성하기',
];

const createTaskList = (id: number, status: TaskStatus): TaskListItem => ({
  id,
  title: '법인 설립',
  status,
  doneCount: 5,
  totalCount: 5,
  tasks: TASK_TITLES.map((title, index) => ({
    id: index + 1,
    title,
    done: status === 'done' || index === TASK_TITLES.length - 1,
  })),
});

export const TASK_LISTS: TaskListItem[] = [
  createTaskList(1, 'today'),
  createTaskList(2, 'today'),
  createTaskList(3, 'scheduled'),
  createTaskList(4, 'scheduled'),
  createTaskList(5, 'scheduled'),
  createTaskList(6, 'scheduled'),
  createTaskList(9, 'scheduled'),
  createTaskList(10, 'scheduled'),
  createTaskList(7, 'done'),
  createTaskList(8, 'done'),
];

export const TASK_STATUS_SECTIONS: TaskStatusSection[] = [
  { status: 'today', label: '오늘' },
  { status: 'scheduled', label: '예정됨' },
  { status: 'done', label: '완료' },
];
