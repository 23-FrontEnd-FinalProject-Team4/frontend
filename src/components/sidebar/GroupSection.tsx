import { useParams } from 'next/navigation';

import GroupItem from '@/components/sidebar/GroupItems';

type Group = {
  id: number;
  name: string;
};

const MOCK_GROUPS: Group[] = [
  {
    id: 1,
    name: '경영관리팀',
  },
  {
    id: 2,
    name: '디자인팀',
  },
  {
    id: 3,
    name: '프론트엔드팀',
  },
];

export default function GroupSection({
  collapsed,
  selected,
}: {
  collapsed: boolean;
  selected: boolean;
}) {
  const { id } = useParams();
  const currentGroupId = Number(id);
  return (
    <section className={`flex flex-col gap-4 ${collapsed ? 'justify-center' : ''}`}>
      {MOCK_GROUPS.map((group) => (
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
