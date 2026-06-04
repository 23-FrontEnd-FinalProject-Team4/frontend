import sampleImage from '@/assets/images/sample.png';

import type { Article } from '@/components/articles/ArticleCard.type';

export const mockArticles: Article[] = [
  {
    id: 1,
    title: '커피믹스 털이범 신고1',
    content:
      '어제 탕비실에 커피믹스 새로 다 채워놨는데 오늘 아침에 하나도 남김없이 사라졌습니다. 혹시 커피 믹스 괴도를 보신 분이 있으시면 알려주세요. 제보는 운영지원팀 김믹스로 부탁드립니다.',
    image: sampleImage.src,
    writer: '김믹스',
    createdAt: '2026. 06. 04',
    likeCount: 999,
    commentCount: 10,
    updatedAt: '2026. 06. 04',
  },
  {
    id: 2,
    title: '커피믹스 털이범 신고2',
    content:
      '어제 탕비실에 커피믹스 새로 다 채워놨는데 오늘 아침에 하나도 남김없이 사라졌습니다. 혹시 커피 믹스 괴도를 보신 분이 있으시면 알려주세요. 제보는 운영지원팀 김믹스로 부탁드립니다.',
    image: undefined,
    writer: '이믹스',
    createdAt: '2026. 06. 03',
    likeCount: 52,
    commentCount: 10,
    updatedAt: '2026. 06. 03',
  },
  {
    id: 3,
    title: '커피믹스 털이범 신고3',
    content:
      '어제 탕비실에 커피믹스 새로 다 채워놨는데 오늘 아침에 하나도 남김없이 사라졌습니다. 혹시 커피 믹스 괴도를 보신 분이 있으시면 알려주세요. 제보는 운영지원팀 김믹스로 부탁드립니다.',
    image: sampleImage.src,
    writer: '박믹스',
    createdAt: '2026. 06. 02',
    likeCount: 3,
    commentCount: 10,
    updatedAt: '2026. 06. 02',
  },
];
