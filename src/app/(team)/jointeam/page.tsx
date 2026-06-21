import { redirect } from 'next/navigation';

import { hasAuthTokens } from '@/utils/auth/token';

import JoinTeamForm from './_components/JoinTeamForm';

interface JoinTeamPageProps {
  searchParams: Promise<{
    email?: string;
    token?: string;
    userEmail?: string;
  }>;
}

const createInitialTeamLink = ({
  email,
  token,
  userEmail,
}: Awaited<JoinTeamPageProps['searchParams']>) => {
  if (!token) {
    return '';
  }

  const params = new URLSearchParams({ token });
  const invitationEmail = userEmail ?? email;

  if (invitationEmail) {
    params.set('userEmail', invitationEmail);
  }

  return `/jointeam?${params.toString()}`;
};

const JoinTeam = async ({ searchParams }: JoinTeamPageProps) => {
  const resolvedSearchParams = await searchParams;
  const initialTeamLink = createInitialTeamLink(resolvedSearchParams);
  const isLoggedIn = await hasAuthTokens();

  if (!isLoggedIn) {
    const redirectPath = initialTeamLink || '/jointeam';
    redirect(`/login?redirect=${encodeURIComponent(redirectPath)}`);
  }

  return (
    <div className="bg-background-primary rounded-[20px]">
      <div className="px-[21px] py-[60px] md:px-[45px]">
        <JoinTeamForm key={initialTeamLink} initialTeamLink={initialTeamLink} />
      </div>
    </div>
  );
};

export default JoinTeam;
