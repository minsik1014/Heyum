import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FloatingMenuProps {
  selection: string;
  position: { top: number; left: number };
  onClose: () => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ selection, position, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [expanded, setExpanded] = useState(false); // 아이콘 클릭 시 확장 상태

  const handleAction = (type: 'translate' | 'explain') => {
    setLoading(true);
    setResult('');

    const systemPrompt = type === 'translate'
      ? "너는 IT 전문 번역가야. 다음 영문 텍스트를 자연스러운 한국어로 번역해줘."
      : "너는 친절한 AI 전문가야. 다음 영문 텍스트의 문맥과 기술 개념을 한국어로 쉽고 자세하게 설명해줘.";

    chrome.runtime.sendMessage({
      type: 'CLAUDE_API_CALL',
      payload: { systemPrompt, userPrompt: selection }
    }, response => {
      setLoading(false);
      if (response.success) {
        setResult(response.data);
      } else {
        setResult("오류: " + response.error);
      }
    });
  };

  return (
    <div 
      style={{ ...containerStyle, top: position.top, left: position.left }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1단계: Grammarly 스타일의 동그란 혜윰 아이콘 (최초 노출) */}
      {!expanded && !result && !loading && (
        <div 
          style={circleIconStyle} 
          onClick={() => setExpanded(true)}
          title="혜윰 도우미 열기"
        >
          🌸
        </div>
      )}

      {/* 2단계: 아이콘 클릭 시 나타나는 가로형 액션 바 */}
      {expanded && !result && !loading && (
        <div style={pillMenuStyle}>
          <button onClick={() => handleAction('translate')} style={menuItemStyle}>🌸 번역</button>
          <div style={dividerStyle} />
          <button onClick={() => handleAction('explain')} style={menuItemStyle}>💡 설명</button>
          <div style={dividerStyle} />
          <button onClick={onClose} style={{ ...menuItemStyle, color: '#ccc' }}>&times;</button>
        </div>
      )}

      {/* 3단계: 결과가 있을 때 보여주는 정밀 해설 카드 */}
      {(loading || result) && (
        <div style={resultCardStyle}>
          <div style={cardHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '14px' }}>🌸</span>
              <span>혜윰 도우미</span>
            </div>
            <button onClick={onClose} style={closeButtonStyle}>&times;</button>
          </div>
          <div style={cardBodyStyle}>
            {loading ? (
              <div style={loadingAreaStyle}>
                <div className="heyum-pulse">혜윰이 분석하고 있어요... ⏳</div>
              </div>
            ) : (
              <div className="heyum-markdown-result">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
              </div>
            )}
          </div>
          {!loading && (
            <div style={cardFooterStyle}>
              드래그된 문맥을 바탕으로 분석되었습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Styles (Grammarly Inspired & Heyum Pink) ---
const containerStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 10001,
  fontFamily: '"Pretendard", -apple-system, sans-serif',
  pointerEvents: 'auto',
  userSelect: 'none',
};

const circleIconStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  backgroundColor: 'white',
  border: '2px solid #FF69B4',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '16px',
  boxShadow: '0 4px 10px rgba(255, 105, 180, 0.3)',
  transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

const pillMenuStyle: React.CSSProperties = {
  display: 'flex',
  backgroundColor: 'white',
  borderRadius: '24px',
  padding: '4px 8px',
  border: '1px solid #FFE4E1',
  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
  alignItems: 'center',
  animation: 'heyumFadeIn 0.2s ease-out',
};

const menuItemStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: '6px 12px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#FF1493',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
};

const dividerStyle: React.CSSProperties = {
  width: '1px',
  height: '14px',
  backgroundColor: '#FFE4E1',
};

const resultCardStyle: React.CSSProperties = {
  width: '300px',
  backgroundColor: 'white',
  borderRadius: '16px',
  boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
  border: '1px solid #FFE4E1',
  overflow: 'hidden',
  animation: 'heyumSlideUp 0.3s ease-out',
};

const cardHeaderStyle: React.CSSProperties = {
  padding: '12px 16px',
  backgroundColor: '#FFF9FB',
  borderBottom: '1px solid #FFE4E1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#FF1493',
  fontSize: '12px',
  fontWeight: 'bold',
};

const cardBodyStyle: React.CSSProperties = {
  padding: '16px',
  maxHeight: '350px',
  overflowY: 'auto',
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#333',
};

const loadingAreaStyle: React.CSSProperties = {
  padding: '20px 0',
  textAlign: 'center',
  color: '#FF69B4',
  fontWeight: '500',
};

const cardFooterStyle: React.CSSProperties = {
  padding: '10px 16px',
  backgroundColor: '#fdfdfd',
  borderTop: '1px solid #f1f1f1',
  fontSize: '11px',
  color: '#999',
  textAlign: 'center',
};

const closeButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#FF69B4',
  fontSize: '20px',
  cursor: 'pointer',
  lineHeight: 1,
};

export default FloatingMenu;
