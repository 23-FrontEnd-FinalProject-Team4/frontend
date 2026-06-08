import KebabIcon from '@/assets/icons/kebab.svg';

import Profile from '@/components/profile/Profile';

export default function ArticleHeader({
  writer,
  createdAt,
  title,
}: {
  writer: string;
  createdAt: string;
  title: string;
}) {
  return (
    <header className="border-border-primary mb-4 flex w-full items-start justify-between border-b pb-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-text-primary text-2lg font-bold">{title} </h1>
        <div className="flex items-center gap-2">
          <Profile alt="작성자 프로필" size="md" src={null} />
          <span className="text-text-primary text-md">{writer}</span>
          <div className="bg-text-default h-3 w-px" />
          <span className="text-text-disabled text-md">{createdAt}</span>
        </div>
      </div>
      <button>
        <KebabIcon className="size-6" />
      </button>
    </header>
  );
}
