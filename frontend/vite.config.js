import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // VITE_BASE: subcaminho de publicação (GitHub Pages em https://usuario.github.io/altlearn/ usa "/altlearn/")
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  server: {
    // em desenvolvimento, /api é encaminhado para o Laravel (php artisan serve)
    proxy: { '/api': { target: process.env.VITE_PROXY_TARGET || 'http://127.0.0.1:8000', changeOrigin: true } },
    // permite abrir o site de desenvolvimento pelo celular através de um túnel https
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok-free.dev', '.loca.lt'],
  },
})
