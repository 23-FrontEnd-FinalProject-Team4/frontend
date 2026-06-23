import { logoutAction } from '@/app/(auth)/_actions/logout.action';

export type ProfileMenuValue = 'history' | 'account' | 'team' | 'logout';

export const PROFILE_MENU_OPTIONS: Array<{ label: string; value: ProfileMenuValue }> = [
  { label: '마이 히스토리', value: 'history' },
  { label: '계정 설정', value: 'account' },
  { label: '팀 참여', value: 'team' },
  { label: '로그아웃', value: 'logout' },
];

type ProfileMenuRouter = {
  push: (href: string) => void;
  replace: (href: string) => void;
};

export const ROUTES = {
  JOIN_TEAM: '/jointeam',
  SETTINGS: '/settings',
  MY_HISTORY: '/my-history',
  LOGIN: '/login',
} as const;

export const handleProfileMenuSelect = async (
  value: ProfileMenuValue,
  router: ProfileMenuRouter,
) => {
  switch (value) {
    case 'history':
      router.push(ROUTES.MY_HISTORY);
      break;
    case 'account':
      router.push(ROUTES.SETTINGS);
      break;
    case 'team':
      router.push(ROUTES.JOIN_TEAM);
      break;
    case 'logout':
      await logoutAction();
      router.replace(ROUTES.LOGIN);
      break;
    default:
      break;
  }
};
