import SettingProfileFormSection from './_components/SettingProfileFormSection';
import SettingSaveBar from './_components/SettingSaveBar';

export default function SettingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-[780px] flex-col gap-5">
        <SettingProfileFormSection />
        <SettingSaveBar />
      </div>
    </div>
  );
}
