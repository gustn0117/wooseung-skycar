# 우승 스카이차 (Wooseung SkyCAR) - 한국 스카이카 렌탈 회사 웹사이트

A modern, fully responsive Next.js website for a Korean sky car (스카이차) rental company.

## 프로젝트 구조

```
wooseung-skycar/
├── public/
│   └── images/              # 프로젝트 이미지 파일
│       ├── logo.png         # 회사 로고
│       ├── truck.png        # 스카이차 이미지 (투명 PNG)
│       ├── work-photo.jpg   # 작업 현장 사진
│       ├── icon1.png        # 작은 아이콘
│       └── review1-4.jpg    # 고객 리뷰 프로필 사진
├── src/
│   └── app/
│       ├── layout.tsx       # 레이아웃 (폰트 설정 포함)
│       ├── globals.css      # 글로벌 스타일 및 Tailwind
│       └── page.tsx         # 메인 페이지 (모든 섹션)
├── package.json             # 의존성
├── tsconfig.json           # TypeScript 설정
├── tailwind.config.ts      # Tailwind CSS 설정
├── postcss.config.mjs      # PostCSS 설정
└── next.config.ts          # Next.js 설정
```

## 주요 기능

### 섹션들

1. **Header/Navigation**
   - 회사 로고 및 이름 (우승스카이차)
   - 네비게이션 링크 (회사소개, 서비스 안내, 문의하기)
   - 전화번호 (010-5811-5297)

2. **Hero Section**
   - 파란색 그래디언트 배경
   - 큰 텍스트 ("신속한 대응, 완벽한 작업")
   - 스카이차 트럭 이미지
   - CTA 버튼

3. **Process Section**
   - 3단계 프로세스 표시
   - 아이콘 및 화살표 분리자
   - 노란색 배경 아이콘

4. **About Section**
   - 작업 현장 사진 (오버레이 포함)
   - 회사 소개 텍스트
   - 파란색 체크마크가 있는 3개의 핵심 가치

5. **FAQ Section**
   - 4개의 자주 묻는 질문
   - 수동 아코디언 기능
   - 부드러운 애니메이션

6. **Reviews Section**
   - 가로 스크롤 가능한 리뷰 카드
   - 5개 별점 표시
   - 고객 사진 및 이름
   - NAVER 실제 후기 배지

7. **Contact/CTA Section**
   - 왼쪽: 대담한 제목, 전화, 이메일
   - 오른쪽: 문의 양식 (이름, 이메일, 메시지)
   - 황색 "문의 접수" 버튼

8. **Footer**
   - 회사 정보
   - 연락처

## 기술 스택

- **Next.js 15** - React 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **Google Fonts** - Noto Sans KR (한글), Figtree (영어)
- **Next.js Image Component** - 최적화된 이미지 로딩

## 설치 및 실행

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 디자인 특징

- **색상 팔레트**
  - 주색: #2563EB (파란색)
  - 강조색: #F5C542 (황색/금색)
  
- **반응형 디자인**
  - 모바일, 태블릿, 데스크톱 완벽 지원
  - Tailwind의 반응형 클래스 사용

- **폰트**
  - 한글: Noto Sans KR
  - 영어: Figtree

- **사용성 기능**
  - 부드러운 스크롤
  - 아코디언 FAQ
  - 가로 스크롤 리뷰 섹션
  - 클릭 가능한 네비게이션 링크

## 아코디언 기능

FAQ 섹션은 `expandedFAQ` 상태를 사용하여 클릭하면 확장/축소되는 아코디언 기능을 제공합니다.

## 문의 양식

문의 양식은 클라이언트 측에서 상태 관리되며, 제출 시 콘솔에 기록되고 사용자에게 확인 메시지를 표시합니다. 실제 백엔드 연결을 위해서는 API 라우트를 추가해야 합니다.

## 이미지 요구사항

프로젝트에 필요한 이미지들:
- `logo.png` - 회사 로고
- `truck.png` - 스카이차 트럭 이미지 (투명 PNG 권장)
- `work-photo.jpg` - 작업 현장 사진
- `icon1.png` - 작은 아이콘 (현재는 사용하지 않음, 미래용)
- `review1.jpg`, `review2.jpg`, `review3.jpg`, `review4.jpg` - 고객 프로필 사진

## 라이센스

이 프로젝트는 우승 스카이차를 위해 만들어졌습니다.

## 연락처

**우승 스카이차**
- 전화: 010-5811-5297
- 이메일: contact@wooseung-skycar.com
