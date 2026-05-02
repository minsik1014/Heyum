// [v1.1.2] 혜윰 백그라운드 서비스 워커 - OpenAI(GPT) 버전
console.log("혜윰 v1.1.2 로드 완료 - OpenAI 모드");

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'CLAUDE_API_CALL') { // 기존 컴포넌트 호환을 위해 타입명 유지
    callOpenAIAPI(request.payload)
      .then(response => sendResponse({ success: true, data: response }))
      .catch(error => {
        console.error("!!! OpenAI API 에러 !!!", error);
        sendResponse({ success: false, error: error.message });
      });
    return true; 
  }
});

async function callOpenAIAPI({ systemPrompt, userPrompt }: { systemPrompt: string, userPrompt: string }) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey || apiKey.includes('여기에')) {
    throw new Error('OpenAI API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 가장 빠르고 저렴한 모델
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err: any) {
    throw new Error(err.message || '네트워크 연결 실패');
  }
}
