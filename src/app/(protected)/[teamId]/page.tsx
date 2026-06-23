import { formatISODate } from '@/utils/date';

import TeamPageClient from './_components/TeamPageClient';

interface TeamPageProps {
  params: Promise<{
    teamId: string;
  }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params;
  const initialDate = formatISODate(new Date());

  return <TeamPageClient teamId={teamId} initialDate={initialDate} />;
}
