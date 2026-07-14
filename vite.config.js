import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80, lossless: false },
    })
  ],
  server: {
    host: true, // Expone el servidor a tu red local (0.0.0.0)
    port: 3000  // Cambia el puerto a 3000 para evitar bloqueos
  }
})
