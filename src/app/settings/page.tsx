import SettingProfileFormSection from './_components/SettingProfileFormSection';
import SettingSaveBar from './_components/SettingSaveBar';

const SettingPage = () => {
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <section className="flex w-full max-w-[780px] flex-col gap-5">
        <SettingProfileFormSection />
        <SettingSaveBar />
      </section>
    </main>
  );
};

export default SettingPage;
