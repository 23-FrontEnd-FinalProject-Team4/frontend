import type { Profile } from '@/apis/user/type';
import { getMyProfileAction } from '@/app/settings/_actions/settings.action';

import AccountSettingForm from './_components/AccountSettingForm';

const SettingPage = async () => {
  const profileResult = await getMyProfileAction();
  const initialProfile: Profile | null = profileResult.success ? profileResult.data : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-4">
      <AccountSettingForm initialProfile={initialProfile} />
    </main>
  );
};

export default SettingPage;
