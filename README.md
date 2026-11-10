# DUOBACK React

> **이 프로젝트는 [DUOBACK Fit](https://github.com/lyh6763/duoback-fit)으로 리뉴얼되었습니다.**
> 기획부터 다시 설계해 Next.js 16 · TypeScript로 새로 만들었습니다 — 체형 기반 의자 추천(Fit Finder), 비교, 매장 안내.
> 배포: https://duoback-fit.vercel.app
>
> 아래는 리뉴얼 이전 버전(React SPA 쇼핑몰)의 기록입니다.

듀오백 브랜드 쇼핑몰을 React SPA로 재구성한 포트폴리오 프로젝트입니다. 기존 정적 페이지의 브랜드 톤과 상품 탐색 흐름을 유지하면서, 라우팅, 상품 필터링, 검색 모달, 장바구니 상태 관리를 React 컴포넌트 중심으로 분리했습니다.

이 저장소는 공식 판매·고객지원 사이트가 아닌 독립 포트폴리오입니다. 가격과 사양은 2026-10-14 듀오백 공식몰의 기본 판매가와 치수 도면에서 옮긴 스냅숏이고, 사양표 항목마다 원문 링크를 달았습니다. 공식 자료에서 찾지 못한 값은 `—`로 표시하며, 제품 사진은 참고 이미지입니다. 실제 결제·주문 전송·A/S 접수는 제공하지 않습니다. 주문 내용 확인은 장바구니를 보존하는 체험이고, A/S 입력 내용은 전송하거나 저장하지 않습니다. 검증되지 않은 리뷰 통계·인증·판매 순위·연혁·매장 연락처는 공개 화면에서 제거했습니다.

## 개요

- 프로젝트 유형: React 기반 이커머스 UI 리디자인
- 역할: UI 퍼블리싱, 컴포넌트 구조 설계, 상품/장바구니 인터랙션 구현
- 주요 화면: 홈, 제품 목록, 제품 상세, 모델 비교, 장바구니, 선택 가이드(브랜드), 구매 전 확인(고객지원)
- 주요 목표: 브랜드 첫인상 강화, 제품 탐색 흐름 개선, 상태 기반 쇼핑 인터랙션 구현

## 주요 기능

- `react-router-dom` 기반 페이지 라우팅(`HashRouter`)
- 예산·조건 탐색: 카테고리와 예산 상한(직접 입력 또는 15·20·35·50만원 이하)으로 후보를 좁히고, 등록순·가격순 정렬과 그리드/리스트 보기를 고른다. 조건은 URL 쿼리에 남아 공유·뒤로 가기에도 유지된다.
- 모델 비교(최대 3개): 목록과 상세에서 담고 하단 트레이로 확인한 뒤, `/compare`에서 가격·좌판 높이·팔걸이 등을 나란히 보거나 차이 나는 항목만 본다. 비교 목록은 현재 탭의 `sessionStorage`에 저장된다.
- 제품 상세: 각도별 참고 이미지 갤러리, 참고 이미지 색상·수량 선택, 방향키·Home/End로 이동하는 탭, 출처 링크가 달린 사양표
- `localStorage` 기반 장바구니 저장, 수량/삭제/합계 계산, 결제 없이 주문 내용만 확인하는 체험
- 제품명/키워드 기반 검색 모달(포커스 가두기, `Escape`로 닫으면 원래 버튼으로 포커스 복귀)
- 모바일 메뉴(포커스 가두기, `Escape`로 닫기)와 반응형 레이아웃
- 공통 구매 전 확인 안내, FAQ 아코디언, A/S 입력 체험, 매장 방문 체크리스트

## 기술 스택

- React 19
- Vite 8
- React Router 7
- CSS Modules 없이 페이지/기능별 CSS 분리
- ESLint

## 폴더 구조

```text
src/
  components/        공통, 홈, 상품, 상세, 장바구니, 비교 트레이 컴포넌트
  context/           장바구니·비교 Context
  data/              카테고리, 상품(공식몰 스냅숏), 구매 전 확인 안내 데이터
  pages/             라우트 단위 페이지
  styles/            전역, 페이지별, 반응형 스타일
  utils/             가격 포맷, 에셋 경로, 탐색·비교, 장바구니 값 정규화
tests/               node:test 기반 데이터·탐색 테스트
scripts/build.mjs    비ASCII 경로 빌드 우회 스크립트
docs/                점검·개선 기록, 가격 출처 스냅숏
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

정적 검증과 테스트:

```bash
npm run lint
npm test
```

## 검증 메모

2026-11-10, `fix/trust-cleanup` 보존 후 `fix/keyboard-overflow`에서 확인한 결과:

- `npm run lint`: 경고 0
- `npm test`: 14개 통과(제품 데이터·가격 스냅숏 대조, 예산 탐색, 비교 목록, 장바구니 값 정규화)
- `npm run build:direct`: ASCII 임시 경로의 소스 사본에서 프로덕션 빌드 통과
- 1920·1440·768·375px의 28개 화면에서 가로 넘침·콘솔 오류·실패한 자산 요청 없음. 검색·모바일 메뉴·상세 탭·비교 트레이를 키보드로 확인
- 본문 바로가기가 현재 라우트·필터를 유지하고 본문으로 포커스를 옮기도록 수정. 상세 그리드의 최소 너비를 풀어 375px 화면의 문서 너비 380px 문제 해결
- GitHub Actions(`deploy.yml`)는 `main` 푸시 때 `npm install`과 `npm run build`만 실행합니다. 린트와 테스트는 로컬에서 돌립니다.

## 배포

- Live: https://lyh6763.github.io/duoback-react/
- Repository: https://github.com/lyh6763/duoback-react
- `main` 브랜치에 push하면 GitHub Actions가 `dist`를 GitHub Pages로 배포합니다.

## 참고 메모

- `docs/hero-section-revision-plan.md`는 히어로 섹션 개선 방향을 정리한 작업 메모입니다. (해당 개선안은 현재 구현 완료)
- `docs/ai-impression-audit.md`는 2026-10-14 수정 전 기준 점검, `docs/improvement-phase-one.md`는 그 뒤 1차 개선 기록입니다. `docs/product-verification.sources.json`은 공식몰 가격 스냅숏으로, `npm test`가 상품 가격을 이 파일과 대조합니다.
- `public/images/products`의 스튜디오 사진을 참고 이미지로 사용합니다. 공식 판매 색상·형태는 상세 페이지의 원문 링크에서 확인합니다.
- 정적 배포와 GitHub Pages 경로 대응을 위해 Vite `base`와 라우터 설정을 배포 친화적으로 조정했습니다.
- `npm run build`는 `scripts/build.mjs`를 거칩니다. 프로젝트 경로에 비ASCII 문자(예: `포트폴리오`)가 포함된 Windows 환경에서 Vite/Rollup이 실패하는 문제를 피하려고, 빌드 시 ASCII 임시 폴더로 소스를 복사한 뒤 `dist`만 회수합니다. 경로가 ASCII인 환경(CI 포함)에서는 우회 없이 `vite build`를 그대로 실행하며, `npm run build:direct`로 우회 로직 없이 빌드할 수도 있습니다.
