import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  cacheDir:".buildcache",
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    sourcemap:false,
  },
  server:{
    watch: {
      usePolling: true,
      ignored: ['**/.git/**'],
      interval: 100 // checks files every 100ms  
    },
  },
  watch: {
      usePolling: true,
      ignored: ['**/.git/**'],
      interval: 100 // checks files every 100ms  
  },
  base:'/crispy-system/'
})
