import Image from 'next/image';

import type { ArticleContentProps } from '@/components/articlesDetail/ArticleDetail.type';

export default function ArticleContent({ content, image }: ArticleContentProps) {
  return (
    <div className="text-text-primary text-md">
      {content}
      {image && (
        <div className="mt-4 flex justify-start">
          <Image
            src={image}
            alt="article image"
            className="mt-4 h-auto max-h-[400px] w-auto object-contain"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
}
