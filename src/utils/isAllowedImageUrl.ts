const ALLOWED_HOSTNAMES = ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'] as const;

const isCloudFrontHost = (hostname: string) => hostname.endsWith('.cloudfront.net');

export const isAllowedImageUrl = (url: string | null | undefined): url is string => {
  if (!url) {
    return false;
  }

  if (url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('/')) {
    return true;
  }

  try {
    const { protocol, hostname } = new URL(url);

    if (protocol !== 'https:') {
      return false;
    }

    return (
      ALLOWED_HOSTNAMES.includes(hostname as (typeof ALLOWED_HOSTNAMES)[number]) ||
      isCloudFrontHost(hostname)
    );
  } catch {
    return false;
  }
};
