import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginsAutoI18n, { YoudaoTranslator } from 'vite-auto-i18n-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginsAutoI18n({
      deepScan: true,
      originLang: 'zh-cn',
      translateType: 'full-auto',
      targetLangList: ['en', 'zh-cn'],
      translator: new YoudaoTranslator({
        appId: 'XXXX', // 填写你的有道翻译appId
        appKey: 'XXXX', // 填写你的有道翻译appKey
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
      },
    },
  },
})
