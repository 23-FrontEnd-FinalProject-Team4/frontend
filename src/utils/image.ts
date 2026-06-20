const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const createApiImageUrl = (imagePath: string) => {
  if (!API_BASE_URL) {
    return imagePath;
  }

  try {
    const apiBaseUrl = new URL(API_BASE_URL);
    const basePath = apiBaseUrl.pathname.replace(/\/$/, '');
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    const imageUrlPath = normalizedPath.startsWith(`${basePath}/`)
      ? normalizedPath
      : `${basePath}${normalizedPath}`;

    return `${apiBaseUrl.origin}${imageUrlPath}`;
  } catch {
    return imagePath;
  }
};

export const normalizeImageUrl = (imageUrl?: string | null) => {
  const trimmedImageUrl = imageUrl?.trim();

  if (!trimmedImageUrl) {
    return undefined;
  }

  if (
    trimmedImageUrl.startsWith('http://') ||
    trimmedImageUrl.startsWith('https://') ||
    trimmedImageUrl.startsWith('blob:') ||
    trimmedImageUrl.startsWith('data:')
  ) {
    return trimmedImageUrl;
  }

  return createApiImageUrl(trimmedImageUrl);
};
