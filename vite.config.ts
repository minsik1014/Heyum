import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: "혜윰 (Heyum) v1.1.0", // 버전 대폭 상승
  version: "1.1.0",
  description: "한국어로 입력하고 영어로 질의하는 심리스 AI 워크플로우",
  action: {
    default_popup: "index.html",
  },
  permissions: ["storage", "activeTab", "scripting"],
  host_permissions: [
    "https://chatgpt.com/*",
    "https://claude.ai/*",
    "https://gemini.google.com/*",
    "https://api.openai.com/*"
  ],
  background: {
    service_worker: "src/background.ts",
    type: "module"
  },
  content_scripts: [
    {
      "matches": [
        "https://chatgpt.com/*",
        "https://claude.ai/*",
        "https://gemini.google.com/*"
      ],
      "js": [
        "src/content.tsx"
      ]
    }
  ]
})

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    hmr: { port: 5173 },
    cors: true,
  },
})
