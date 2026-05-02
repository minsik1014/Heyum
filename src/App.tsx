import React, { useState } from 'react';
import PromptModal from './components/PromptModal';

function App() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div style={scrollContainerStyle}>
      {/* Navigation - 배경색과 그림자 추가로 가시성 확보 */}
      <nav style={navStyle}>
        <div style={logoAreaStyle}>🌸 혜윰 (Heyum)</div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button style={navCtaStyle}>크롬에 추가하기</button>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section style={{ ...sectionStyle, backgroundColor: '#ffffff' }}>
        <div style={heroContentStyle}>
          <div style={taglineStyle}>The New AI Workflow</div>
          <h1 style={titleStyle}>
            가장 완벽한 <span style={highlightStyle}>한국어</span> 질의,<br />
            가장 똑똑한 <span style={highlightStyle}>영어</span> 답변.
          </h1>
          <p style={descriptionStyle}>
            언어의 장벽을 넘어 AI의 잠재력을 100% 끌어내세요.<br />
            혜윰이 당신의 한국어 의도를 정교한 영문 프롬프트로 리팩토링합니다.
          </p>
          <div style={actionGroupStyle}>
            <button onClick={() => setShowDemo(true)} style={mainButtonStyle}>지금 바로 체험하기</button>
            <div style={scrollDownHint}>아래로 스크롤하여 더 알아보기 ↓</div>
          </div>
        </div>
      </section>

      {/* Section 2: Feature 1 */}
      <section style={{ ...sectionStyle, backgroundColor: '#fdf2f8' }}>
        <div style={featureContentStyle}>
          <div style={featureIconStyle}>✨</div>
          <h2 style={featureTitleStyle}>지능형 프롬프트 리팩토링</h2>
          <p style={featureDescStyle}>
            단순한 번역이 아닙니다. AI 전문가의 문법을 담아<br />
            가장 정확한 답변을 유도하는 구조적 영문으로 변환합니다.
          </p>
          <div style={previewBoxStyle}>
            <div style={{ color: '#666', marginBottom: '10px', fontSize: '14px' }}>Q: "파이썬 웹 크롤링 알려줘"</div>
            <div style={{ color: '#be185d', fontWeight: 'bold', fontSize: '16px' }}>"Act as a Senior Python Developer, provide a structured guide..."</div>
          </div>
        </div>
      </section>

      {/* Section 3: Feature 2 */}
      <section style={{ ...sectionStyle, backgroundColor: '#ffffff' }}>
        <div style={featureContentStyle}>
          <div style={featureIconStyle}>🌸</div>
          <h2 style={featureTitleStyle}>실시간 한국어 로컬라이징</h2>
          <p style={featureDescStyle}>
            영어 답변이 쏟아져도 당황하지 마세요.<br />
            혜윰이 생성과 동시에 정밀한 한국어 해석을 함께 보여줍니다.
          </p>
          <div style={cardRowStyle}>
            <div style={miniCardStyle}>영문 답변 생성</div>
            <div style={{ fontSize: '24px', color: '#FF1493' }}>→</div>
            <div style={{ ...miniCardStyle, backgroundColor: '#FF69B4', color: 'white' }}>즉시 한국어 번역</div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section style={{ ...sectionStyle, backgroundColor: '#111827', color: 'white' }}>
        <div style={featureContentStyle}>
          <h2 style={{ ...featureTitleStyle, color: 'white' }}>당신의 AI 경험을<br />업그레이드할 시간입니다.</h2>
          <p style={{ ...featureDescStyle, color: '#9ca3af' }}>
            수만 명의 사용자가 혜윰을 통해 언어의 한계를 극복하고 있습니다.<br />
            지금 바로 크롬 브라우저에 무료로 추가하세요.
          </p>
          <button style={largeButtonStyle}>혜윰 크롬 확장 프로그램 설치</button>
        </div>
        <footer style={footerStyle}>© 2026 혜윰 (Heyum). Seamless AI Bridge.</footer>
      </section>

      {/* Modal */}
      {showDemo && (
        <PromptModal 
          onClose={() => setShowDemo(false)} 
          onApply={(text) => alert(`복사되었습니다: ${text}`)} 
        />
      )}
    </div>
  );
}

// --- Styles (명시적 색상 지정 및 레이아웃 보정) ---
const scrollContainerStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  scrollBehavior: 'smooth',
  fontFamily: '"Pretendard", -apple-system, sans-serif',
  backgroundColor: '#ffffff',
};

const navStyle: React.CSSProperties = {
  position: 'fixed', top: 0, width: '100%',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '20px 5%', // 여백을 퍼센트로 변경하여 잘림 방지
  zIndex: 1000,
  boxSizing: 'border-box',
  backgroundColor: 'rgba(255, 255, 255, 0.95)', // 배경색 명시
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid #eee',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
};

const logoAreaStyle: React.CSSProperties = { fontSize: '20px', fontWeight: '900', color: '#db2777' };
const navCtaStyle: React.CSSProperties = {
  backgroundColor: '#FF69B4', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px'
};

const sectionStyle: React.CSSProperties = {
  height: '100vh',
  scrollSnapAlign: 'start',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 5%',
  textAlign: 'center',
  position: 'relative',
  boxSizing: 'border-box',
};

const heroContentStyle: React.CSSProperties = { maxWidth: '1000px', width: '100%' };
const taglineStyle: React.CSSProperties = { fontSize: '14px', fontWeight: 'bold', color: '#db2777', letterSpacing: '2px', marginBottom: '20px', textTransform: 'uppercase' };
const titleStyle: React.CSSProperties = { fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: '900', lineHeight: '1.2', color: '#000000', marginBottom: '30px' };
const highlightStyle: React.CSSProperties = { color: '#FF1493' };
const descriptionStyle: React.CSSProperties = { fontSize: 'clamp(16px, 2vw, 20px)', color: '#1f2937', lineHeight: '1.8', marginBottom: '50px', maxWidth: '700px', margin: '0 auto 50px' };
const actionGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' };

const mainButtonStyle: React.CSSProperties = {
  backgroundColor: '#FF1493', color: 'white', border: 'none', padding: '18px 40px', borderRadius: '40px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 25px rgba(255, 20, 147, 0.3)',
};

const scrollDownHint: React.CSSProperties = { fontSize: '14px', color: '#6b7280', marginTop: '40px' };

const featureContentStyle: React.CSSProperties = { maxWidth: '800px', width: '100%' };
const featureIconStyle: React.CSSProperties = { fontSize: '48px', marginBottom: '20px' };
const featureTitleStyle: React.CSSProperties = { fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: '#000000', marginBottom: '20px' };
const featureDescStyle: React.CSSProperties = { fontSize: 'clamp(15px, 1.5vw, 18px)', color: '#374151', lineHeight: '1.7', marginBottom: '40px' };

const previewBoxStyle: React.CSSProperties = {
  backgroundColor: 'white', padding: '24px', borderRadius: '20px', border: '1px solid #f9a8d4', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', textAlign: 'left', display: 'inline-block', width: '90%', maxWidth: '500px',
};

const cardRowStyle: React.CSSProperties = { display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' };
const miniCardStyle: React.CSSProperties = { padding: '15px 25px', borderRadius: '15px', backgroundColor: 'white', border: '1px solid #e5e7eb', fontWeight: 'bold', fontSize: '15px', color: '#111827' };

const largeButtonStyle: React.CSSProperties = {
  backgroundColor: '#ffffff', color: '#111827', border: 'none', padding: '18px 40px', borderRadius: '40px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px',
};

const footerStyle: React.CSSProperties = { position: 'absolute', bottom: '30px', fontSize: '12px', color: '#9ca3af' };

export default App;
