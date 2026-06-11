import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCustomSearchParams = <
  T extends Partial<{ [key: string]: string[] | undefined }>,
>() => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const urlSearchParams = searchParams ? new URLSearchParams(searchParams) : null;

  function setSearchParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      if (!value.length) urlSearchParams?.delete(key);
      else urlSearchParams?.set(key, String(value.join('|')));
    });

    const paramsToString = urlSearchParams?.toString();
    const query = paramsToString ? `?${paramsToString}` : '';

    router.push(`${pathname}${query}`);
  }

  return { searchParams, setSearchParams };
};
