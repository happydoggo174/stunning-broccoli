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
  define:{
    __VUE_OPTIONS_API__:false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    sourcemap:false,
    target:'chrome109'
  },
  server:{
    watch: {
      usePolling: true,
      ignored: ['**/.git/**','**/dist/**','**/node_modules/**'],
      interval: 100 // checks files every 100ms  
    },
    headers:{
       "Content-Security-Policy": "frame-ancestors 'none';script-src 'self'; object-src 'none'; base-uri 'self';style-src-elem 'self'",
       "X-Frame-Options": "DENY",
    }
  },
  watch: {
      usePolling: true,
      ignored: ['**/.git/**'],
      interval: 100 // checks files every 100ms  
  },
})
