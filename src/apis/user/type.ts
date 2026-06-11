export interface Group {
  id: number;
  teamId: string;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export type MembershipRole = 'ADMIN' | 'MEMBER';

export interface Membership {
  userId: number;
  groupId: number;

  role: MembershipRole;

  userName: string;
  userEmail: string;
  userImage: string | null;

  group: Group;
}

export interface Profile {
  id: number;
  teamId: string;

  email: string;
  nickname: string;
  image: string | null;

  createdAt: string;
  updatedAt: string;

  memberships: Membership[];
}

export interface UpdateProfileRequest {
  nickname?: string;
  image?: string | null;
}

export type TaskFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface TaskHistory {
  id: number;
  recurringId: number;

  writerId: number;
  userId: number;

  displayIndex: number;

  name: string;
  description: string;
  frequency: TaskFrequency;
  date: string;
  doneAt: string;
  deletedAt: string | null;
  updatedAt: string;
}

export interface SendPasswordResetEmailRequest {
  email: string;
  redirectUrl: string;
}

export interface ResetPasswordRequest {
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface ChangePasswordRequest {
  password: string;
  passwordConfirmation: string;
}

export interface MessageResponse {
  message: string;
}
