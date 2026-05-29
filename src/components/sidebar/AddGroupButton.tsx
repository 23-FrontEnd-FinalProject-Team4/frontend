import Link from 'next/link';

import PlusIcon from '@/assets/icons/plus.svg?react';

export default function AddGroupButton() {
  return (
    <Link
      href="/addteam"
      type="button"
      className="border-brand-primary text-brand-primary text-md hover:bg-brand-primary hover:text-brand-secondary my-3 flex w-full items-center justify-center gap-1 rounded-full border px-3 py-2 transition-colors duration-200"
    >
      <PlusIcon className="h-4 w-4" />팀 추가하기
    </Link>
  );
}
