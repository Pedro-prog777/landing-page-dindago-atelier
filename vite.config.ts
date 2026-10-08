import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
      // Fotografias enviadas pelo painel são servidas pelo backend.
      '/uploads': {
        target: 'http://localhost:3333',
        changeOrigin: true,
      },
    },
  },
})
