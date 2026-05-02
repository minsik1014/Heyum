# 🌸 혜윰 (Heyum)
> **"한국어로 입력하고 영어로 질의하며, 한글로 결과를 확인하는 심리스(Seamless) AI 워크플로우"**

'혜윰'은 사용자가 ChatGPT, Claude, Gemini 등의 AI 서비스 페이지 내에서 별도의 이동 없이 즉시 사용할 수 있는 **브라우저 확장 프로그램(Chrome Extension) 기반의 프롬프트 최적화 및 로컬라이징 서비스**입니다.

## ✨ 핵심 기능 (Core Features)

### 1. 지능형 프롬프트 리팩토링 (Intelligent Refactoring)
- 사용자가 한국어로 질문을 입력하면, AI가 가장 정교하게 이해할 수 있는 **구조적 영문 프롬프트**로 변환합니다.
- 사용자의 의도에 따라 **Academic(학술적/상세형)** 또는 **Practical(실용적/코드중심)** 옵션을 선택하여 즉시 질의할 수 있습니다.

### 2. 답변 실시간 로컬라이징 (Real-time Localization)
- 영문 질의를 통해 도출된 고성능의 영문 답변을 실시간으로 감지하여 **정밀한 한국어 해석**으로 변환해 보여줍니다.
- 마크다운 문법과 코드 하이라이팅을 지원하여 가독성 높은 한국어 보고서를 제공합니다.

### 3. 드래그 앤 설명 (Grammarly 스타일 플로팅 메뉴)
- AI 답변 중 이해하기 어려운 문장을 드래그하면 즉시 **[🌸 번역 | 💡 설명]** 메뉴가 나타납니다.
- 단순히 번역을 넘어 문맥과 기술 개념에 대한 친절한 해설을 제공합니다.

### 4. 토큰 효율성 기반의 경제적 질의
- 한국어 대비 토큰 소모량이 적은 영어를 질의 언어로 채택하여, AI 사용 비용을 최소화하는 **'경제적 필터'** 역할을 수행합니다.

## 🎨 디자인 철학
- **Grammarly 스타일**: 복잡하지 않고 세련된 UI/UX를 지향하며, 웹 페이지의 흐름을 방해하지 않는 비침습적 디자인을 적용했습니다.
- **Pink Identity**: 부드럽고 전문적인 핑크 테마를 사용하여 사용자 친화적인 브랜드 이미지를 구축했습니다.

## 🛠 기술 스택 (Tech Stack)
- **Frontend**: React 18, TypeScript, Vite
- **Extension**: @crxjs/vite-plugin (HMR 지원)
- **AI Engine**: OpenAI GPT-4o (Background Service Worker 연동)
- **Styling**: Vanilla CSS, React-Markdown, Syntax-Highlighter

## 🚀 시작하기

### 설치 및 실행
1. 저장소를 클론합니다.
   ```bash
   git clone git@github.com:minsik1014/Heyum.git
   ```
2. 의존성 패키지를 설치합니다.
   ```bash
   npm install
   ```
3. 환경 변수를 설정합니다.
   - `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
   - `VITE_OPENAI_API_KEY`에 본인의 OpenAI API 키를 입력합니다.
4. 개발 모드로 실행합니다.
   ```bash
   npm run dev
   ```
5. 크롬 브라우저에서 확장 프로그램을 로드합니다.
   - `chrome://extensions` 접속 -> '개발자 모드' ON
   - '압축해제된 확장 프로그램을 로드' -> 프로젝트 폴더 내 `dist` 폴더 선택

### 웹 서비스 확인
- `npm run dev` 실행 후 `http://localhost:5173`에 접속하면 혜윰의 공식 랜딩 페이지를 확인할 수 있습니다.

## 📄 라이선스
Copyright © 2026 혜윰 (Heyum). All rights reserved.
