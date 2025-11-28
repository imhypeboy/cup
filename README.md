# Developer Portfolio & Blog

개발자 포트폴리오 및 블로그 웹사이트입니다.

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📦 기술 스택

- **React 18** - UI 라이브러리
- **Tailwind CSS 3** - 유틸리티 CSS 프레임워크
- **Framer Motion** - 애니메이션 라이브러리
- **React Router** - 라우팅
- **Vite** - 빌드 도구

## ✨ 주요 기능

- **포트폴리오**: 프로젝트 갤러리 및 기술 스택 소개
- **블로그**: 개발 경험과 학습 내용 공유
- **인증 시스템**: 로그인, 회원가입, 비밀번호 찾기
- **글 작성**: 로그인 후 블로그 포스트 작성
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 📁 프로젝트 구조

```
src/
├── pages/           # 페이지 컴포넌트
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   └── ForgotPasswordPage.jsx
├── components/      # 재사용 가능한 컴포넌트
│   ├── auth/       # 인증 관련
│   ├── blog/       # 블로그 관련
│   └── common/     # 공통 컴포넌트
├── contexts/       # Context API
│   └── AuthContext.jsx
├── hooks/          # 커스텀 훅
└── utils/          # 유틸리티 함수
```

## 🎯 주요 페이지

- `/` - 홈 (포트폴리오)
- `/login` - 로그인
- `/signup` - 회원가입
- `/forgot-password` - 비밀번호 찾기

## 🔧 커스터마이징

각 컴포넌트의 내용을 수정하여 본인의 포트폴리오로 커스터마이징할 수 있습니다.

- `pages/HomePage.jsx`: 메인 페이지 레이아웃
- `components/Hero.jsx`: 히어로 섹션
- `components/About.jsx`: 자기소개 및 기술 스택
- `components/Projects.jsx`: 프로젝트 정보
- `components/Blog.jsx`: 블로그 포스트
- `components/Contact.jsx`: 연락처 정보
