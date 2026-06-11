import SecessionIcon from '@/assets/icons/secession.svg';

import EditableProfileImage from '@/components/editableProfileImage/EditableProfileImage';
import FormField from '@/components/formField/FormField';

const SettingProfileFormSection = () => {
  return (
    <section className="bg-background-primary w-full rounded-2xl p-8 md:p-18">
      <h1 className="text-medium font-semibold">계정 설정</h1>

      <form id="settings-profile-form" className="mt-8 flex flex-col gap-4 pb-6">
        <figure className="mb-4 flex justify-center">
          <EditableProfileImage src="/images/default-profile.png" size="lg" />
        </figure>

        <FormField
          id="settings-name"
          label="이름"
          defaultValue="안해나"
          placeholder="이름을 입력해주세요."
        />
        <FormField
          id="settings-email"
          label="이메일"
          defaultValue="codeit@codeit.com"
          placeholder="이메일을 입력해주세요."
          isDisabled
        />
        <FormField
          id="settings-password"
          label="비밀번호"
          type="password"
          defaultValue="dddd"
          isDisabled
          rightButtonText="변경하기"
        />

        <button type="button" className="text-status-danger mt-2 flex items-center gap-1">
          <SecessionIcon aria-hidden />
          <span>회원 탈퇴하기</span>
        </button>
      </form>
    </section>
  );
};

export default SettingProfileFormSection;
