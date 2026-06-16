export const JOIN_TEAM_ERROR_CODE = {
  INVALID_LINK: 'INVALID_LINK',
  VALIDATION: 'VALIDATION',
  API: 'API',
} as const;

export type JoinTeamErrorCode = (typeof JOIN_TEAM_ERROR_CODE)[keyof typeof JOIN_TEAM_ERROR_CODE];

export class JoinTeamError extends Error {
  readonly code: JoinTeamErrorCode;

  constructor(message: string, code: JoinTeamErrorCode) {
    super(message);
    this.name = 'JoinTeamError';
    this.code = code;
  }
}
