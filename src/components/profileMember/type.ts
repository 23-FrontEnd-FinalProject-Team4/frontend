import { HTMLAttributes } from 'react';

export interface MemberData {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: 'ADMIN' | 'MEMBER';
}

export interface ProfileMemberProps extends HTMLAttributes<HTMLDivElement> {
  member: MemberData;
  //케밥 버튼 이벤트 핸들러
  onKebabClick?: (member: MemberData) => void;
}
