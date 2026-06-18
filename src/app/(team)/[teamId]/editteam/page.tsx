import { notFound } from 'next/navigation';

import { getGroupServer } from '@/apis/group/server';

import EditTeamForm from './_components/EditTeamForm';

interface EditTeamPageProps {
  params: Promise<{ teamId: string }>;
}

const EditTeam = async ({ params }: EditTeamPageProps) => {
  const { teamId } = await params;
  const groupId = Number(teamId);

  if (!Number.isSafeInteger(groupId) || groupId <= 0) {
    notFound();
  }

  let group;

  try {
    group = await getGroupServer({ id: groupId });
  } catch {
    notFound();
  }

  return (
    <div className="bg-background-primary rounded-[20px]">
      <div className="px-[21px] py-[60px] md:px-[45px]">
        <EditTeamForm
          key={groupId}
          groupId={groupId}
          initialName={group.name}
          initialImageUrl={group.image}
        />
      </div>
    </div>
  );
};

export default EditTeam;
