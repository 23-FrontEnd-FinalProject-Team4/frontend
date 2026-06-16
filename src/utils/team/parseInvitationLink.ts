interface ParsedInvitationLink {
  userEmail: string | null;
  token: string;
}

export const parseInvitationLink = (link: string): ParsedInvitationLink | null => {
  const trimmed = link.trim();

  if (!trimmed) {
    return null;
  }

  try {
    const url = trimmed.includes('://') ? new URL(trimmed) : new URL(trimmed, 'http://localhost');
    const userEmail =
      (url.searchParams.get('userEmail') ?? url.searchParams.get('email'))?.trim() || null;
    const token = url.searchParams.get('token')?.trim();

    if (!token) {
      return null;
    }

    return { userEmail, token };
  } catch {
    return null;
  }
};
