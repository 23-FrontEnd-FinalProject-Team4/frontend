import Image from 'next/image';

import type { ArticleContentProps } from '@/app/articles/_components/articlesDetail/Detail.type';
import { isAllowedImageUrl } from '@/utils/isAllowedImageUrl';

const ArticleContent = ({ content, image }: ArticleContentProps) => {
  return (
    <div className="text-text-primary text-md leading-7 md:text-lg">
      {content}
      {/* api 연동 시 수정 필요 */}
      {isAllowedImageUrl(image) && (
        <div className="mt-4 flex justify-start">
          <Image
            src={image}
            alt="article image"
            className="h-auto max-h-[400px] w-auto object-contain"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleContent;
