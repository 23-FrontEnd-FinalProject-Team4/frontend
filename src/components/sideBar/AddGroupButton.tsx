import Link from 'next/link';

import PlusIcon from '@/assets/icons/plus.svg?react';
import { cn } from '@/utils/cn';

export default function AddGroupButton() {
  return (
    <Link
      href="/addteam"
      className={cn(
        'border-brand-primary text-brand-primary text-md hover:bg-brand-primary hover:text-brand-secondary my-3 flex items-center justify-center gap-1 rounded-full border px-3 py-2 transition-colors',
      )}
    >
      <PlusIcon className="h-4 w-4" />팀 추가하기
    </Link>
  );
}
