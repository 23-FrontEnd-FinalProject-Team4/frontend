import { logout } from '@/app/_actions/logout.action';

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

export const handleProfileMenuSelect = async (
  value: ProfileMenuValue,
  router: ProfileMenuRouter,
) => {
  switch (value) {
    case 'history':
      router.push('/my-history');
      break;
    case 'account':
      router.push('/settings');
      break;
    case 'team':
      router.push('/addteam');
      break;
    case 'logout':
      await logout();
      router.replace('/login');
      break;
    default:
      break;
  }
};
