# DUOBACK React

듀오백 브랜드 쇼핑몰을 React SPA로 재구성한 포트폴리오 프로젝트입니다. 기존 정적 페이지의 브랜드 톤과 상품 탐색 흐름을 유지하면서, 라우팅, 상품 필터링, 검색 모달, 장바구니 상태 관리를 React 컴포넌트 중심으로 분리했습니다.

## 개요

- 프로젝트 유형: React 기반 이커머스 UI 리디자인
- 역할: UI 퍼블리싱, 컴포넌트 구조 설계, 상품/장바구니 인터랙션 구현
- 주요 화면: 홈, 제품 목록, 제품 상세, 장바구니, 브랜드, 고객지원
- 주요 목표: 브랜드 첫인상 강화, 제품 탐색 흐름 개선, 상태 기반 쇼핑 인터랙션 구현

## 주요 기능

- `react-router-dom` 기반 페이지 라우팅
- 제품 카테고리 필터, 정렬, 그리드/리스트 보기 전환
- 제품 상세 이미지 갤러리, 컬러 선택, 수량 선택
- `localStorage` 기반 장바구니 저장 및 수량/삭제/합계 계산
- 제품명/키워드 기반 검색 모달
- 모바일 메뉴와 반응형 레이아웃
- FAQ 아코디언, A/S 신청 폼, 매장 안내 등 고객지원 화면

## 기술 스택

- React 19
- Vite 8
- React Router 7
- CSS Modules 없이 페이지/기능별 CSS 분리
- ESLint

## 폴더 구조

```text
src/
  components/        공통, 홈, 상품, 상세, 장바구니 컴포넌트
  context/           장바구니 Context
  data/              카테고리 및 상품 데이터
  pages/             라우트 단위 페이지
  styles/            전역, 페이지별, 반응형 스타일
  utils/             가격 포맷 유틸
```

## 실행 방법

```bash
npm install
npm run dev
```

프로덕션 빌드:

```bash
npm run build
npm run preview
```

정적 검증:

```bash
npm run lint
```

## 검증 메모

- `npm run lint`: 통과
- `npm install`: 통과
- `npm run build`: 통과
- GitHub Actions Pages 배포: 통과

## 배포

- Live: https://lyh6763.github.io/duoback-react/
- Repository: https://github.com/lyh6763/duoback-react
- `main` 브랜치에 push하면 GitHub Actions가 `dist`를 GitHub Pages로 배포합니다.

## 참고 메모

- `hero-section-revision-plan.md`는 히어로 섹션 개선 방향을 정리한 작업 메모입니다.
- `public/images/products`의 실제 제품 이미지를 사용합니다.
- 정적 배포와 GitHub Pages 경로 대응을 위해 Vite `base`와 라우터 설정을 배포 친화적으로 조정했습니다.
