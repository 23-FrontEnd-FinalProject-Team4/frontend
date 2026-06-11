import TeamPageClient from './_components/TeamPageClient';

interface TeamPageProps {
  params: Promise<{
    teamId: string;
  }>;
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { teamId } = await params;

  return <TeamPageClient teamId={teamId} />;
}
