import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    hmr: {
      host: '7aef277c-72de-456c-842f-6ee53fd95dae.preview.emergentagent.com',
      protocol: 'wss',
      clientPort: 443
    }
  },
  build: {
    outDir: 'build',
  },
})