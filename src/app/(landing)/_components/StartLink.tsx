import Link from 'next/link';

interface StartLinkProps {
  className?: string;
  href: string;
}

export default function StartLink({ className, href }: StartLinkProps) {
  return (
    <Link
      href={href}
      className={`bg-brand-primary hover:bg-interaction-hover focus-visible:ring-brand-primary inline-flex h-12 w-40 items-center justify-center rounded-xl px-7 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${className ?? ''}`}
    >
      지금 시작하기
    </Link>
  );
}
