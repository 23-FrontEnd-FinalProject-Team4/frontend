'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/button/Button';

export default function NoTeamActions() {
  const router = useRouter();

  return (
    <div className="mt-8 flex w-full max-w-46.5 flex-col gap-2.5 md:mt-12">
      <Button
        type="button"
        variant="primary-filled"
        fullWidth
        className="md:text-md h-12 min-w-0 rounded-lg px-0 py-0 text-xs"
        onClick={() => router.push('/addteam')}
      >
        팀 생성하기
      </Button>
      <Button
        type="button"
        variant="primary-outline"
        fullWidth
        className="md:text-md h-12 min-w-0 rounded-lg px-0 py-0 text-xs"
        onClick={() => router.push('/jointeam')}
      >
        팀 참여하기
      </Button>
    </div>
  );
}
