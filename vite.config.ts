import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      /*
       * Frontend e API rodam em portas diferentes no desenvolvimento. O proxy
       * faz as duas parecerem a mesma origem para o navegador, o que evita
       * CORS e deixa o cookie de sessão viajar normalmente.
       */
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
