# Gemini Code Review Style Guide

## Language

- 모든 코드 리뷰 코멘트는 한국어로 작성해 주세요.
- 초보 개발자도 이해할 수 있게 쉬운 표현을 사용해 주세요.
- 코드, 파일명, 함수명, 변수명, 라이브러리명은 영어 원문을 유지해 주세요.
- 실무 코드리뷰처럼 친절하지만 명확하게 작성해 주세요.
- 단순 취향보다 버그, 유지보수성, 성능, 접근성, 팀 컨벤션 위주로 리뷰해 주세요.

## Project Context

- 프로젝트명은 Coworkers입니다.
- 업무 배정, 할 일 관리, 팀 현황 공유, 자유게시판 기능을 제공하는 협업 웹 애플리케이션입니다.
- Next.js App Router 기반 프로젝트입니다.
- **Next.js 16.x** (`package.json`의 `next` 버전)를 사용합니다.
- 기술 스택은 Next.js, React, TypeScript입니다.
- Styling은 Tailwind CSS를 사용합니다.
- 서버 상태 관리는 TanStack Query를 사용합니다.
- 클라이언트 상태 관리는 Zustand를 사용할 수 있습니다.
- API 요청은 Axios 기반 `axiosInstance`와 도메인별 API 함수를 사용합니다.
- 협업 도구는 GitHub, Linear, Notion, Figma, Discord를 사용합니다.
- 코드 품질 관리는 ESLint, Prettier를 사용합니다.
- 패키지 매니저는 npm을 사용합니다.
- 배포는 AWS 또는 팀에서 합의한 배포 환경을 기준으로 검토합니다.

## Next.js 16 Review Notes

- 설정/API 유효성을 지적할 때는 **공식 Next.js 16 문서** 또는 `package.json` 버전과 일치하는지 먼저 확인하세요.
- `npm run build`로 확인된 설정이 diff에 포함된 경우, 구버전 Next.js 기준의 validation error 주장은 blocking issue로 올리지 말아주세요.

## Review Priority

다음 순서로 중요도를 두고 리뷰해 주세요.

1. 버그 가능성
2. 인증/토큰 처리 문제
3. API 요청/응답 처리 문제
4. 유지보수성
5. 성능
6. 접근성
7. 팀 컨벤션 위반
8. 단순 스타일

## Folder Structure Convention

프로젝트는 다음 구조를 기준으로 리뷰해 주세요.

- `src/app` : App Router 기반 페이지, 레이아웃, 라우트 그룹
- `src/apis` : Axios API 함수와 도메인별 요청/응답 타입
- `src/apis/axiosInstance.ts` : Axios 기본 설정
- `src/assets/icons` : SVG 아이콘 에셋
- `src/assets/images` : 이미지 에셋
- `src/components/{componentName}` : 재사용 가능한 컴포넌트
- `src/constants` : 전역 상수
- `src/hooks` : 커스텀 훅
- `src/types` : 전역 타입 정의
- `src/utils` : 유틸 함수
- `src/stories` : Storybook 예제 및 스토리 파일

공통 컴포넌트는 `src/components/common`이 아니라 `src/components/{componentName}` 구조를 사용합니다.

## App Router Convention

- `page.tsx`에는 페이지 조합 역할을 우선해 주세요.
- 페이지 내부에 비즈니스 로직이 과하게 들어가면 컴포넌트, 훅, API 함수 분리를 제안해 주세요.
- 라우트 그룹이 추가되는 경우 역할이 명확한지 확인해 주세요.
- 서버 컴포넌트와 클라이언트 컴포넌트의 책임이 명확한지 확인해 주세요.
- 클라이언트 상호작용이 필요한 컴포넌트에만 `'use client'`를 사용하는지 확인해 주세요.

## Component Convention

- 컴포넌트 파일명은 PascalCase를 사용해 주세요.
  - 예: `Modal.tsx`, `ProgressBar.tsx`, `Team.tsx`
- 컴포넌트 함수는 화살표 함수로 작성하는 것을 기준으로 리뷰해 주세요.
  - 예: `const Modal = () => {}`
- 페이지, 레이아웃, 컴포넌트는 `export default`를 사용하는 규칙을 따릅니다.
- 컴포넌트 폴더는 camelCase를 사용합니다.
  - 예: `progressBar`, `taskList`
- 재사용 가능한 컴포넌트는 `src/components/{componentName}` 아래에 위치해야 합니다.
  - 예: `src/components/modal/Modal.tsx`
  - 예: `src/components/progressBar/ProgressBar.tsx`
- 컴포넌트 props 타입은 `ComponentNameProps` 형식을 사용해 주세요.
  - 예: `ModalProps`, `ProgressBarProps`
- JSX가 너무 길거나 조건 분기가 복잡하면 하위 컴포넌트 분리를 제안해 주세요.
- 컴포넌트가 하나의 책임만 가지는지 확인해 주세요.
- Button 공통 컴포넌트처럼 아직 개발 중인 의존 컴포넌트가 있다면, 추후 교체하기 쉬운 구조인지 확인해 주세요.

## Tailwind CSS Convention

- Styling은 Tailwind CSS 기준으로 리뷰해 주세요.
- Figma 디자인 토큰은 `src/app/globals.css`의 Tailwind theme token을 우선 활용해 주세요.
- 중복되는 색상, 폰트 크기, 배경색은 임의 hex 값보다 전역 token 사용을 제안해 주세요.
- Tailwind className이 지나치게 길어지면 상수 분리나 하위 컴포넌트 분리를 제안해 주세요.
- 반응형은 모바일, 태블릿, 데스크탑 기준으로 고려해 주세요.
- 불필요한 inline style은 지양하되, 진행률 width처럼 동적 값이 필요한 경우는 허용합니다.
- Tailwind arbitrary value는 디자인 시안이나 토큰으로 설명 가능한 경우에만 사용하도록 리뷰해 주세요.

## TypeScript Convention

- `any` 사용은 지양해 주세요.
- 불가피하게 `any`를 사용하는 경우 이유가 명확해야 합니다.
- interface와 type 이름은 PascalCase를 사용해 주세요.
- 타입 이름 뒤에 불필요하게 `Type`, `Interface`를 붙이지 않는 방향을 권장해 주세요.
- props 타입은 명확하게 정의해 주세요.
- optional 값은 안전하게 처리해 주세요.
- 사용하지 않는 타입, 변수, import는 제거해 주세요.
- API 응답 타입은 도메인 API 폴더의 `type.ts`에 정의하는 것을 기준으로 리뷰해 주세요.

## API & Axios Convention

- API 요청 함수는 `src/apis` 아래에 도메인별로 분리해 주세요.
  - 예: `src/apis/task/index.ts`
  - 예: `src/apis/comment/index.ts`
- 도메인별 요청/응답 타입은 같은 폴더의 `type.ts`에 정의해 주세요.
  - 예: `src/apis/task/type.ts`
- Axios 기본 설정은 `src/apis/axiosInstance.ts`에서 관리합니다.
- GET, POST, PATCH, DELETE 요청은 한 프로젝트 안에서 일관된 Axios 기반 방식으로 작성해 주세요.
- API 호출 로직이 컴포넌트 안에 직접 길게 들어가면 API 함수나 React Query hook 분리를 제안해 주세요.
- loading, error, empty 상태 처리를 확인해 주세요.
- API 응답 데이터의 null/undefined 가능성을 안전하게 처리했는지 확인해 주세요.
- 에러 메시지는 사용자가 이해할 수 있는 형태인지 확인해 주세요.

## TanStack Query Convention

- 서버 데이터 조회에는 TanStack Query 사용을 우선 고려해 주세요.
- 생성, 수정, 삭제 후 관련 query invalidation이 필요한지 확인해 주세요.
- 낙관적 업데이트가 필요한 UX인지 검토해 주세요.
- `staleTime`, `gcTime`, refetch 정책이 의도에 맞는지 확인해 주세요.
- query key가 중복되거나 문자열로 흩어져 있으면 상수화를 제안해 주세요.
- 서버 상태와 단순 UI 상태가 섞여 있으면 분리를 제안해 주세요.

## Authentication Convention

- JWT 토큰 처리는 일관된 방식으로 관리해 주세요.
- 인증이 필요한 API와 필요 없는 API가 명확히 구분되어야 합니다.
- Axios Interceptor에서 토큰을 주입하는 구조를 우선 고려해 주세요.
- 토큰 관련 로직이 여러 파일에 중복되면 분리를 제안해 주세요.
- 토큰 만료, 인증 실패 상황에 대한 처리를 확인해 주세요.

## Hooks Convention

- 커스텀 훅 이름은 `use`로 시작해야 합니다.
- 훅 내부의 책임이 너무 많으면 분리를 제안해 주세요.
- API 요청 hook과 UI 상태 hook의 책임이 섞이지 않았는지 확인해 주세요.
- 같은 query/mutation 로직이 반복되면 hook 분리를 제안해 주세요.

## Constants & Utils Convention

- 같은 문자열, 숫자, 경로가 반복되면 상수화를 제안해 주세요.
- 날짜 포맷, 퍼센트 계산, storage 접근 같은 반복 로직은 유틸 함수 분리를 권장해 주세요.
- 전역 상수는 UPPER_SNAKE_CASE를 사용해 주세요.
  - 예: `API_BASE_URL`, `MAX_FILE_SIZE`

## Naming Convention

- 컴포넌트명과 타입명은 PascalCase를 사용해 주세요.
  - 예: `Button`, `ModalProps`, `ProgressBarSize`
- 변수명과 함수명은 camelCase를 사용해 주세요.
  - 예: `taskListId`, `handleClick`
- boolean 값은 `is`, `has`, `should`, `can` 접두사를 사용해 주세요.
  - 예: `isOpen`, `hasError`, `shouldFetch`, `canEdit`
- 배열 변수는 복수형 또는 `List`를 사용해 주세요.
  - 예: `tasks`, `taskList`, `userReviewList`
- 내부 이벤트 핸들러는 `handle + 행위` 형식을 사용해 주세요.
  - 예: `handleSubmit`, `handleInputChange`
- 자식 컴포넌트에 전달하는 이벤트 props는 `on + 행위` 형식을 사용해 주세요.
  - 예: `onClick`, `onSubmit`, `onClose`
- 이미지 에셋 파일명은 snake_case를 사용해 주세요.
  - 예: `check_white.svg`, `landing_img_large.png`

## Accessibility

- 이미지에는 적절한 `alt` 속성을 작성해 주세요.
- 장식용 이미지는 `alt=""`와 `aria-hidden` 사용이 적절한지 확인해 주세요.
- 클릭 가능한 요소가 버튼 역할이면 `button` 태그 사용을 권장해 주세요.
- 페이지 이동 목적이면 `Link` 사용을 권장해 주세요.
- 모달, 드롭다운, 메뉴는 키보드 접근성을 고려해 주세요.
- `role`, `aria-*` 속성이 실제 의미와 맞는지 확인해 주세요.
- 중요한 정보를 색상에만 의존하지 않도록 해 주세요.

## Code Quality

- 사용하지 않는 코드, 주석, `console.log`는 제거해 주세요.
- 중복 로직은 함수나 컴포넌트로 분리하는 것을 제안해 주세요.
- 의미 없는 변수명은 지양해 주세요.
  - 예: `data`, `temp`, `item`만 단독으로 남용하지 않기
- 복잡한 조건문은 읽기 쉽게 분리하는 것을 권장해 주세요.
- 컴포넌트가 너무 커지면 역할별 분리를 제안해 주세요.
- PR에 확인용 preview page, 임시 이미지, 테스트용 코드가 포함되지 않았는지 확인해 주세요.

## Branch Convention

브랜치 전략은 다음 기준을 따릅니다.

- `main` : 실제 배포 브랜치
- `dev` : 개발 통합 브랜치
- `feature/*` : 새로운 기능 개발 브랜치

리뷰 시 브랜치 목적과 PR 내용이 일치하는지 확인해 주세요.

## Commit Convention

커밋 메시지는 다음 규칙을 따릅니다.

- `Feat`: 새로운 기능 추가
- `Fix`: 버그 수정
- `Docs`: 문서 수정
- `Style`: 코드 formatting, 세미콜론 누락 등 코드 자체 변경이 없는 경우
- `Refactor`: 코드 리팩토링
- `Test`: 테스트 코드 추가 또는 리팩토링
- `Chore`: 패키지 매니저 수정, 빌드 설정, 기타 수정

커밋 메시지 설명은 한국어로 작성합니다.

예:

- `Feat: 모달 공통 컴포넌트 구현`
- `Fix: 로그인 에러 메시지 처리 수정`
- `Refactor: 프로그레스바 진행률 계산 로직 분리`

커밋은 작게 나누어 자주 작성하는 것을 권장해 주세요.

## PR Review Convention

- PR은 하나의 목적에 집중하는 것을 권장해 주세요.
- PR 설명과 실제 변경 내용이 일치하는지 확인해 주세요.
- 리뷰 코멘트는 문제, 이유, 개선 방향 순서로 작성해 주세요.
- 단순 취향 차이는 blocking 하지 말고 제안 정도로 남겨 주세요.
- 중요한 문제는 명확하게 수정 요청해 주세요.
- Linear 이슈 번호와 PR 내용이 연결되어 있는지 확인해 주세요.

## Must Review

다음 항목은 발견 시 반드시 리뷰해 주세요.

- `any` 사용
- `console.log` 제거 누락
- 사용하지 않는 import
- loading/error/empty 상태 누락
- 인증 토큰 처리 중복
- Axios 요청 로직이 컴포넌트에 과하게 들어간 경우
- Tailwind className 오타 또는 존재하지 않는 token 사용
- 반응형 깨짐 가능성
- `alt` 누락
- 접근성 속성 오용
- 브랜치/커밋 컨벤션 위반
- 확인용 preview page, 임시 파일, 스크린샷 파일 커밋 포함
