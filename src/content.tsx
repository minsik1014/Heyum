import React from 'react';
import { createRoot } from 'react-dom/client';
import PromptModal from './components/PromptModal';
import TranslationBox from './components/TranslationBox';
import FloatingMenu from './components/FloatingMenu';

console.log("혜윰(Heyum) v1.1.8 - Perfect History Lock");

const SITE_CONFIGS: Record<string, any> = {
  chatgpt: { selectors: ['#prompt-textarea'], inputSelector: '#prompt-textarea', responseSelector: '.markdown.prose' },
  gemini: { selectors: ['.input-area-container'], inputSelector: 'div[contenteditable="true"]', responseSelector: '.message-content' },
  claude: { selectors: ['div[contenteditable="true"]'], inputSelector: 'div[contenteditable="true"]', responseSelector: '.font-claude-message' }
};

let floatingRoot: any = null;
let lastCapturedText = "";
let translationRoots = new Map();
let completionTimers = new Map();

// 1. 페이지 로드 시점의 모든 메시지를 과거 내역으로 마킹하는 함수
function lockExistingMessagesAsHistory() {
  const siteType = getSiteType();
  if (!siteType) return;
  const config = SITE_CONFIGS[siteType];
  const responses = document.querySelectorAll(config.responseSelector);
  
  responses.forEach((el) => {
    const element = el as HTMLElement;
    if (!element.hasAttribute('data-heyum-processed')) {
      // 초기 로드 시 발견된 모든 요소는 수동 버튼 모드로 설정
      injectManualTranslateButton(element);
    }
  });
}

// 2. 수동 번역 버튼 주입 (과거 내역용)
function injectManualTranslateButton(element: HTMLElement) {
  if (element.hasAttribute('data-heyum-processed')) return;
  
  element.setAttribute('data-heyum-processed', 'true');
  element.setAttribute('data-heyum-type', 'history');

  const container = document.createElement('div');
  container.style.marginTop = '10px';
  element.after(container);

  const root = createRoot(container);
  translationRoots.set(element, root);

  root.render(
    <button 
      onClick={() => handleFinalTranslation(element, element.innerText, true)}
      style={manualButtonStyle}
    >
      🌸 혜윰으로 이 답변 해석하기
    </button>
  );
}

// 3. 실시간 답변 감지 (로드 이후 생성된 '신규' 메시지만 처리)
function observeAIResponse() {
  const siteType = getSiteType();
  if (!siteType) return;
  const config = SITE_CONFIGS[siteType];
  const responses = document.querySelectorAll(config.responseSelector);
  
  if (responses.length > 0) {
    const latestResponse = responses[responses.length - 1] as HTMLElement;
    
    // 이미 처리된(과거 내역이거나 버튼이 달린) 것이라면 실시간 감지 건너뜀
    if (latestResponse.hasAttribute('data-heyum-processed')) return;

    // 새로운 메시지가 생성되어 글자가 올라오기 시작할 때
    const currentText = latestResponse.innerText.trim();
    if (currentText && currentText !== lastCapturedText) {
      lastCapturedText = currentText;
      
      if (completionTimers.has(latestResponse)) clearTimeout(completionTimers.get(latestResponse));

      // 실시간 답변이 멈추면(완료되면) 자동 번역 실행
      const timer = setTimeout(() => {
        handleFinalTranslation(latestResponse, currentText, false);
      }, 2500);
      completionTimers.set(latestResponse, timer);
    }
  }
}

// 4. 번역 실행 함수
async function handleFinalTranslation(element: HTMLElement, text: string, isManual: boolean) {
  if (element.hasAttribute('data-heyum-translated')) return;
  
  // 자동 번역인 경우, 수동 버튼이 생기지 않도록 미리 마킹
  if (!isManual) {
    element.setAttribute('data-heyum-processed', 'true');
    element.setAttribute('data-heyum-type', 'live');
  }
  
  element.setAttribute('data-heyum-translated', 'true');

  if (!translationRoots.has(element)) {
    const container = document.createElement('div');
    element.after(container);
    translationRoots.set(element, createRoot(container));
  }

  translationRoots.get(element).render(<TranslationBox originalText={text} translatedText="🌸 혜윰이 정밀 해석 중입니다..." />);

  chrome.runtime.sendMessage({
    type: 'CLAUDE_API_CALL',
    payload: { 
      systemPrompt: "IT 전문 번역가로서 다음 영문 답변을 마크다운 형식을 유지하며 한국어로 번역해줘. 코드는 번역하지 말고 원문을 유지해줘.", 
      userPrompt: text 
    }
  }, response => {
    if (response.success) {
      translationRoots.get(element).render(<TranslationBox originalText={text} translatedText={response.data} />);
    } else {
      translationRoots.get(element).render(<TranslationBox originalText={text} translatedText={`해석 실패: ${response.error}`} />);
      element.removeAttribute('data-heyum-translated');
    }
  });
}

const manualButtonStyle: React.CSSProperties = {
  backgroundColor: '#FFF0F5',
  color: '#FF1493',
  border: '1px solid #FFB6C1',
  borderRadius: '12px',
  padding: '8px 16px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  margin: '10px 0',
  boxShadow: '0 2px 5px rgba(255, 105, 180, 0.1)'
};

// --- 공통 로직 ---
function getSiteType() {
  const host = window.location.hostname;
  if (host.includes('chatgpt.com')) return 'chatgpt';
  if (host.includes('gemini.google.com')) return 'gemini';
  if (host.includes('claude.ai')) return 'claude';
  return null;
}

function applyToInput(text: string) {
  const siteType = getSiteType();
  if (!siteType) return;
  const config = SITE_CONFIGS[siteType];
  const inputArea = document.querySelector(config.inputSelector) as HTMLElement;
  if (inputArea) {
    if (inputArea.tagName === 'TEXTAREA') (inputArea as HTMLTextAreaElement).value = text;
    else inputArea.innerText = text;
    inputArea.dispatchEvent(new Event('input', { bubbles: true }));
    if (modalRoot) modalRoot.render(null);
  }
}

let modalRoot: any = null;
function showModal() {
  if (!modalRoot) {
    const container = document.createElement('div');
    container.id = 'heyum-modal-root';
    document.body.appendChild(container);
    modalRoot = createRoot(container);
  }
  modalRoot.render(<PromptModal onClose={() => modalRoot.render(null)} onApply={applyToInput} />);
}

function injectHeyumButton() {
  const siteType = getSiteType();
  if (!siteType) return;
  const config = SITE_CONFIGS[siteType];
  let target = null;
  for (const s of config.selectors) { if (document.querySelector(s)) { target = document.querySelector(s); break; } }
  if (!target || document.getElementById("heyum-injected-button")) return;
  const btn = document.createElement("button");
  btn.id = "heyum-injected-button";
  btn.innerText = "혜윰";
  Object.assign(btn.style, {
    backgroundColor: "#FF69B4", color: "white", border: "2px solid white", borderRadius: "20px",
    padding: "8px 16px", cursor: "pointer", fontWeight: "bold", zIndex: "999", margin: "0 10px 12px 0"
  });
  btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); showModal(); };
  if (siteType === 'claude') target.parentElement?.appendChild(btn); else target.after(btn);
}

document.addEventListener('mouseup', () => {
  setTimeout(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 2) {
      const rect = selection?.getRangeAt(0).getBoundingClientRect();
      if (rect) {
        if (!floatingRoot) {
          const container = document.createElement('div');
          container.id = 'heyum-floating-root';
          document.body.appendChild(container);
          floatingRoot = createRoot(container);
        }
        floatingRoot.render(
          <FloatingMenu 
            selection={text} 
            position={{ 
              top: rect.bottom + 5, // 선택 영역 바로 아래
              left: rect.right - 20 // 선택 영역의 오른쪽 끝부분
            }} 
            onClose={() => floatingRoot.render(null)} 
          />
        );
      }
    }
  }, 50);
});

document.addEventListener('mousedown', (e) => {
  const menuEl = document.getElementById('heyum-floating-root');
  if (menuEl && !menuEl.contains(e.target as Node)) { if (floatingRoot) floatingRoot.render(null); }
});

const observer = new MutationObserver(() => { 
  injectHeyumButton(); 
  // 페이지 로드 이후에도 새로운 답변이 아닌 기존에 있었으나 늦게 나타난 메시지들 처리
  lockExistingMessagesAsHistory(); 
  // 새로 생성되는 신규 답변 실시간 체크
  observeAIResponse(); 
});

observer.observe(document.body, { childList: true, subtree: true });
// 초기 실행
lockExistingMessagesAsHistory();
injectHeyumButton();
