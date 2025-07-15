# ARTINUS Frontend Assignment

DummyJSON Products API를 사용한 상품 목록/상세 페이지 구현


## 🚀 배포 URL
https://artinus-seokwon.vercel.app/

## 📋 개발 환경
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Package Manager**: Yarn

## 📌 개발 내용

### 상품 목록 페이지 (/)
- 20개씩 상품 로딩
- 무한 스크롤 (Intersection Observer)
- 카드 형태 그리드 레이아웃
- 로딩 스피너 및 에러 처리

### 상품 상세 페이지 (/products/[id])
- 상품 이미지 갤러리
- 상품 정보 (제목, 가격, 할인율, 설명, 태그)
- 재고 정보 및 추가 메타데이터

### 주요 구현사항
- Zustand를 활용한 상태 관리
- TypeScript 타입 정의
- 반응형 디자인
- SEO 최적화

## 📦 상태 관리 (Zustand)

1. 상품 목록 관리 (useProductStore)
- 상품 데이터, 필터링, 정렬, 검색
- 무한 스크롤 구현
- 로딩 상태 관리

2. 상품 상세 관리 (useProductDetailStore)
- 단일 상품 상세 정보
- 상품 상세 페이지 전용


### 개발 환경 실행
```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

### 프로덕션 빌드
```bash
# 빌드
yarn build
```




**© 2025 ARTINUS Frontend Assignment**  
Powered by [DummyJSON API](https://dummyjson.com)