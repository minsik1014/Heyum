# 혜윰 (Heyum) 🧠✨
> **"한국어로 생각하고, 영어로 대화하다."**  
> AI와의 대화를 더 깊고 풍부하게 만드는 심리스(Seamless) 번역 워크플로우 솔루션

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript&logoColor=white)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)

---

## 🌟 프로젝트 소개
**혜윰(Heyum)**은 한국어 사용자가 영미권 AI 모델(ChatGPT, Claude, Gemini 등)을 사용할 때 겪는 언어 장벽을 허물기 위해 개발된 크롬 확장프로그램입니다. 

단순한 번역기가 아닙니다. 사용자가 한국어로 질문을 입력하면, 이를 최적의 영어 프롬프트로 변환하여 AI에게 전달하고, 다시 한국어로 결과를 받아보는 일련의 과정을 하나의 흐름으로 연결합니다.

## ✨ 주요 기능
- 🚀 **실시간 번역 팝업**: 한국어 입력 즉시 영어로 번역된 프롬프트 확인 및 수정.
- 🤖 **멀티 플랫폼 지원**: ChatGPT, Claude, Gemini 등 주요 AI 인터페이스 완벽 대응.
- 🎨 **커스텀 UI**: 기존 웹사이트의 UI를 해치지 않으면서도 접근성 높은 플로팅 메뉴 제공.
- 📝 **Markdown 및 하이라이트**: 번역 결과의 가독성을 높여주는 코드 하이라이팅 및 마크다운 렌더링.

## 🛠 기술 스택
- **Core**: `React 19`, `TypeScript`
- **Build Tool**: `Vite`, `@crxjs/vite-plugin` (현대적인 확장프로그램 개발 환경)
- **Library**: 
  - `react-markdown`, `remark-gfm` (문서 렌더링)
  - `react-syntax-highlighter` (코드 가독성)
- **Manifest**: `MV3` (Chrome Manifest Version 3) 준수

## ⚙️ 시작하기

### 1. 설치 및 빌드
```bash
# 저장소 복제
git clone https://github.com/your-username/heyum-extension.git

# 의존성 설치
npm install

# 개발 모드 실행
npm run dev

# 프로덕션 빌드
npm run build
```

### 2. 브라우저 로드
1. Chrome 브라우저에서 `chrome://extensions/` 접속
2. 오른쪽 상단 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램을 로드합니다** 클릭
4. 프로젝트의 `dist` 폴더 선택

## 📸 스크린샷
| Floating Menu | Translation Box | Prompt Modal |
| :---: | :---: | :---: |
| ![Menu](https://via.placeholder.com/200x150?text=Floating+Menu) | ![Translation](https://via.placeholder.com/200x150?text=Translation+Box) | ![Modal](https://via.placeholder.com/200x150?text=Prompt+Modal) |
*(실제 스크린샷 이미지를 `assets` 폴더에 넣고 경로를 수정해 주세요!)*

## 📄 라이선스
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Developed with ❤️ by Heyum Team**
