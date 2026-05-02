import React, { useState } from 'react';

interface PromptModalProps {
  onClose: () => void;
  onApply: (text: string) => void;
}

interface RefactorOption {
  id: string;
  label: string;
  description: string;
  content: string;
  emoji: string;
}

const PromptModal: React.FC<PromptModalProps> = ({ onClose, onApply }) => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState<RefactorOption[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefactor = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const prompts = [
      {
        id: 'detailed',
        label: 'Academic',
        emoji: '📚',
        description: '학술적이고 상세한 설명을 유도하는 전문 프롬프트',
        systemPrompt: "사용자의 한국어 요청을 분석하여, 학술적이고 상세한 설명을 유도하는 구조적인 전문 영문 프롬프트로 딱 하나만 변환해서 결과만 보여줘."
      },
      {
        id: 'practical',
        label: 'Practical',
        emoji: '💻',
        description: '실용적인 예시와 핵심 위주의 답변을 유도하는 프롬프트',
        systemPrompt: "사용자의 한국어 요청을 분석하여, 실용적인 코드 예제와 핵심 위주의 답변을 유도하는 영문 프롬프트로 딱 하나만 변환해서 결과만 보여줘."
      }
    ];

    try {
      const results = await Promise.all(prompts.map(p => 
        new Promise<RefactorOption>((resolve, reject) => {
          chrome.runtime.sendMessage({
            type: 'CLAUDE_API_CALL',
            payload: { systemPrompt: p.systemPrompt, userPrompt: input }
          }, response => {
            if (response.success) {
              resolve({
                id: p.id, label: p.label, emoji: p.emoji, description: p.description, content: response.data
              });
            } else {
              reject(response.error);
            }
          });
        })
      ));
      setOptions(results);
      setSelectedId(results[0].id);
    } catch (error) {
      alert("혜윰 서비스 호출 중 오류: " + error);
    } finally {
      setLoading(false);
    }
  };

  const selectedOption = options.find(opt => opt.id === selectedId);

  return (
    <div style={overlayStyle}>
      <div style={containerStyle}>
        {/* Header: Clean & Sophisticated */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={logoCircleStyle}>🌸</div>
            <div style={titleAreaStyle}>
              <h2 style={titleStyle}>혜윰 프롬프트 리팩토링</h2>
              <span style={subtitleStyle}>한국어 의도를 완벽한 영문으로 최적화합니다.</span>
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle}>&times;</button>
        </div>
        
        <div style={scrollableBodyStyle}>
          {/* Input Area */}
          <div style={inputContainerStyle}>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="무엇을 도와드릴까요? 한국어로 자유롭게 입력하세요..."
              style={textareaStyle}
            />
            <div style={inputFooterStyle}>
              <span style={charCountStyle}>{input.length} 자</span>
              <button 
                onClick={handleRefactor} 
                disabled={loading || !input.trim()}
                style={{
                  ...actionButtonStyle,
                  opacity: (loading || !input.trim()) ? 0.6 : 1,
                  backgroundColor: loading ? '#f0f0f0' : '#FF69B4',
                  color: loading ? '#999' : 'white',
                }}
              >
                {loading ? '분석 중...' : '영문 최적화 ✨'}
              </button>
            </div>
          </div>

          {/* Options Area */}
          {options.length > 0 && (
            <div style={optionsAreaStyle}>
              <p style={sectionLabelStyle}>추천 스타일 선택</p>
              <div style={tabGridStyle}>
                {options.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => setSelectedId(opt.id)}
                    style={{
                      ...tabStyle,
                      borderColor: selectedId === opt.id ? '#FF69B4' : '#f0f0f0',
                      backgroundColor: selectedId === opt.id ? '#FFF9FB' : 'white',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{opt.emoji}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '13px', color: selectedId === opt.id ? '#FF1493' : '#333' }}>{opt.label}</div>
                      <div style={{ fontSize: '11px', color: '#999' }}>{opt.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedOption && (
                <div style={previewBoxStyle}>
                  <div style={previewHeaderStyle}>리팩토링 결과 미리보기</div>
                  <div style={resultContentStyle}>{selectedOption.content}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Action */}
        {options.length > 0 && selectedOption && (
          <div style={footerStyle}>
            <button 
              onClick={() => onApply(selectedOption.content)}
              style={finalButtonStyle}
            >
              이대로 ChatGPT에 질의하기 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Grammarly Inspired Styles ---
const overlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(4px)',
  display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000,
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  width: '580px',
  maxHeight: '85vh',
  borderRadius: '24px',
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  display: 'flex', flexDirection: 'column',
  overflow: 'hidden',
  fontFamily: '"Pretendard", -apple-system, sans-serif',
};

const headerStyle: React.CSSProperties = {
  padding: '24px 28px',
  borderBottom: '1px solid #f5f5f5',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
};

const logoCircleStyle: React.CSSProperties = {
  width: '40px', height: '40px',
  backgroundColor: '#FFF0F5',
  borderRadius: '12px',
  display: 'flex', justifyContent: 'center', alignItems: 'center',
  fontSize: '20px',
  border: '1px solid #FFE4E1',
};

const titleAreaStyle: React.CSSProperties = { textAlign: 'left' };
const titleStyle: React.CSSProperties = { margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#333' };
const subtitleStyle: React.CSSProperties = { fontSize: '12px', color: '#999' };

const scrollableBodyStyle: React.CSSProperties = {
  padding: '28px', overflowY: 'auto', flexGrow: 1,
};

const inputContainerStyle: React.CSSProperties = {
  border: '1px solid #f0f0f0',
  borderRadius: '16px',
  backgroundColor: '#fcfcfc',
  padding: '16px',
  transition: 'border-color 0.2s',
};

const textareaStyle: React.CSSProperties = {
  width: '100%', height: '120px', border: 'none', background: 'transparent',
  resize: 'none', outline: 'none', fontSize: '15px', color: '#333', lineHeight: '1.6',
};

const inputFooterStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  marginTop: '12px', borderTop: '1px solid #f5f5f5', paddingTop: '12px',
};

const charCountStyle: React.CSSProperties = { fontSize: '11px', color: '#bbb' };

const actionButtonStyle: React.CSSProperties = {
  padding: '8px 20px', borderRadius: '10px', border: 'none',
  fontWeight: 'bold', fontSize: '13px', cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(255, 105, 180, 0.2)',
};

const optionsAreaStyle: React.CSSProperties = { marginTop: '24px', textAlign: 'left' };
const sectionLabelStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 'bold', color: '#666', marginBottom: '12px' };

const tabGridStyle: React.CSSProperties = {
  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px',
};

const tabStyle: React.CSSProperties = {
  padding: '16px', borderRadius: '16px', border: '2px solid #f0f0f0',
  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
  transition: 'all 0.2s ease',
};

const previewBoxStyle: React.CSSProperties = {
  padding: '20px', borderRadius: '16px', backgroundColor: '#f9f9f9',
  border: '1px dashed #FFE4E1', textAlign: 'left',
};

const previewHeaderStyle: React.CSSProperties = { fontSize: '11px', color: '#FF69B4', fontWeight: 'bold', marginBottom: '8px' };
const resultContentStyle: React.CSSProperties = { fontSize: '13.5px', color: '#444', lineHeight: '1.6', whiteSpace: 'pre-wrap' };

const footerStyle: React.CSSProperties = {
  padding: '24px 28px', borderTop: '1px solid #f5f5f5', backgroundColor: '#fff',
};

const finalButtonStyle: React.CSSProperties = {
  width: '100%', padding: '16px', backgroundColor: '#FF1493',
  color: 'white', border: 'none', borderRadius: '14px',
  fontWeight: 'bold', fontSize: '15px', cursor: 'pointer',
  boxShadow: '0 6px 20px rgba(255, 20, 147, 0.3)',
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none', border: 'none', color: '#ccc',
  fontSize: '32px', cursor: 'pointer', lineHeight: 1,
};

export default PromptModal;
