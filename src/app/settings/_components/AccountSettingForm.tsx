'use client';

import { useState } from 'react';

import type { Profile } from '@/apis/user/type';
import SecessionIcon from '@/assets/icons/secession.svg';

import PasswordChangeForm from './PasswordChangeForm';
import ProfileUpdateForm from './ProfileUpdateForm';
import SettingSaveBar from './SettingSaveBar';

type AccountSettingFormProps = {
  initialProfile: Profile | null;
};

const AccountSettingForm = ({ initialProfile }: AccountSettingFormProps) => {
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  const [hasPasswordValue, setHasPasswordValue] = useState(false);

  const isSaveBarVisible = isProfileChanged || isPasswordEditMode;

  const isSaveButtonDisabled = !isProfileChanged && !hasPasswordValue;

  const handleSave = async () => {
    // TODO:
    // 프로필 저장
    // 비밀번호 저장
  };

  return (
    <>
      <section className="bg-background-primary w-full max-w-[780px] rounded-2xl p-8 md:p-12">
        <h1 className="text-medium font-semibold">계정 설정</h1>

        <ProfileUpdateForm initialProfile={initialProfile} onProfileChange={setIsProfileChanged} />

        <PasswordChangeForm
          onEditModeChange={setIsPasswordEditMode}
          onPasswordValueChange={setHasPasswordValue}
        />

        <button type="button" className="text-status-danger mt-4 flex items-center gap-1">
          <SecessionIcon aria-hidden />
          <span>회원 탈퇴하기</span>
        </button>
      </section>

      {isSaveBarVisible && (
        <div className="w-full max-w-[780px]">
          <SettingSaveBar
            description="변경사항이 있습니다."
            buttonText="저장하기"
            disabled={isSaveButtonDisabled}
            onSave={handleSave}
          />
        </div>
      )}
    </>
  );
};

export default AccountSettingForm;
