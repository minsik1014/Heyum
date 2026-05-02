import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TranslationBoxProps {
  originalText: string;
  translatedText: string;
}

const TranslationBox: React.FC<TranslationBoxProps> = ({ originalText, translatedText }) => {
  if (!originalText) return null;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🌸</span>
          <span style={{ fontWeight: 'bold', letterSpacing: '-0.5px' }}>혜윰 정밀 로컬라이징</span>
        </div>
        <span style={badgeStyle}>AI Verified</span>
      </div>
      
      <div className="heyum-markdown-body" style={bodyStyle}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div style={codeWrapperStyle}>
                  <div style={codeHeaderStyle}>{match[1]}</div>
                  <SyntaxHighlighter
                    style={vscDarkPlus as any}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ margin: 0, borderRadius: '0 0 12px 12px', fontSize: '13px' }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code style={inlineCodeStyle} {...props}>
                  {children}
                </code>
              );
            },
            h1: ({ children }) => <h1 style={h1Style}>{children}</h1>,
            h2: ({ children }) => <h2 style={h2Style}>{children}</h2>,
            p: ({ children }) => <p style={pStyle}>{children}</p>,
            ul: ({ children }) => <ul style={listStyle}>{children}</ul>,
            li: ({ children }) => <li style={listItemStyle}>{children}</li>,
          }}
        >
          {translatedText || "답변을 정밀 해석하고 있습니다..."}
        </ReactMarkdown>
      </div>

      <div style={footerStyle}>
        본 해석은 혜윰이 생성하였으며, 원문 코드의 무결성을 유지합니다.
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #FFE4E1',
  borderRadius: '20px',
  margin: '16px 0',
  boxShadow: '0 10px 30px rgba(255, 105, 180, 0.15)',
  overflow: 'hidden',
  fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
  color: '#2c3e50',
};

const headerStyle: React.CSSProperties = {
  padding: '14px 20px',
  backgroundColor: '#FFF9FB',
  borderBottom: '1px solid #FFE4E1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#FF1493',
};

const bodyStyle: React.CSSProperties = {
  padding: '24px',
  lineHeight: '1.7',
};

const badgeStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 'bold',
  backgroundColor: '#FF69B4',
  color: 'white',
  padding: '3px 10px',
  borderRadius: '20px',
  textTransform: 'uppercase',
};

// Typography Styles
const h1Style: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', margin: '20px 0 12px', color: '#333' };
const h2Style: React.CSSProperties = { fontSize: '17px', fontWeight: 'bold', margin: '18px 0 10px', color: '#444' };
const pStyle: React.CSSProperties = { margin: '0 0 12px', fontSize: '15px' };
const listStyle: React.CSSProperties = { paddingLeft: '20px', marginBottom: '12px' };
const listItemStyle: React.CSSProperties = { marginBottom: '6px', fontSize: '14.5px' };

const inlineCodeStyle: React.CSSProperties = {
  backgroundColor: '#F0F0F0',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '14px',
  color: '#e83e8c',
  fontFamily: 'monospace',
};

// Code Block Styles
const codeWrapperStyle: React.CSSProperties = {
  margin: '16px 0',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
};

const codeHeaderStyle: React.CSSProperties = {
  backgroundColor: '#2d2d2d',
  color: '#aaa',
  padding: '6px 16px',
  fontSize: '11px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  borderBottom: '1px solid #444',
  display: 'flex',
  justifyContent: 'space-between',
};

const footerStyle: React.CSSProperties = {
  padding: '12px 20px',
  backgroundColor: '#fdfdfd',
  fontSize: '12px',
  color: '#999',
  borderTop: '1px solid #f1f1f1',
  textAlign: 'center',
};

export default TranslationBox;
