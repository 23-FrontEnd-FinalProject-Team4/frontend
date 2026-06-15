import { useParams, usePathname } from 'next/navigation';

import GroupItem from '@/components/sideBar/GroupItems';
import type { GroupSectionProps } from '@/components/sideBar/type';
import { cn } from '@/utils/cn';

export default function GroupSection({ groups, collapsed }: GroupSectionProps) {
  const params = useParams<{ id: string }>();
  const pathname = usePathname() ?? '';
  const currentGroupId = Number(params?.id);

  return (
    <section
      className={cn('flex flex-col gap-2 md:gap-4', collapsed ? 'items-center' : 'items-stretch')}
    >
      {groups.map((group) => (
        <GroupItem
          key={group.id}
          id={group.id}
          name={group.name}
          route={group.route}
          image={group.image}
          selected={group.route ? pathname.startsWith(group.route) : group.id === currentGroupId}
          collapsed={collapsed}
        />
      ))}
    </section>
  );
}
