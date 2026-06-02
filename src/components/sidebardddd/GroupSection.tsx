import { useParams } from 'next/navigation';

import GroupItem from '@/components/sidebardddd/GroupItems';

import type { GroupSectionProps } from './type';

export default function GroupSection({ groups, collapsed }: GroupSectionProps) {
  const params = useParams<{ id: string }>();
  const currentGroupId = Number(params?.id);
  return (
    <section className={`flex flex-col gap-4 ${collapsed ? 'justify-center' : ''}`}>
      {groups.map((group) => (
        <GroupItem
          key={group.id}
          id={group.id}
          name={group.name}
          selected={group.id === currentGroupId}
          collapsed={collapsed}
        />
      ))}
    </section>
  );
}
