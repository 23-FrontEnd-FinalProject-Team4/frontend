import AlertIcon from '@/assets/icons/alert.svg';

const SettingSaveBar = () => {
  return (
    <aside className="bg-brand-primary text-md mx-6 flex items-center justify-between rounded-xl px-4 py-3 text-white">
      <p className="flex items-center gap-2">
        <AlertIcon className="h-4 w-4 text-white" aria-hidden />
        <span>이름과 프로필 사진 변경</span>
      </p>
      <button
        type="submit"
        form="settings-profile-form"
        className="bg-background-primary text-brand-primary rounded-lg px-4 py-2"
      >
        변경사항 저장하기
      </button>
    </aside>
  );
};

export default SettingSaveBar;
