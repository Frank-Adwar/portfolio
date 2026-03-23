import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    /** Modern baseline — smaller output than legacy ES5. */
    target: 'es2022',
    cssMinify: true,
    /** Long cache for hashed assets; host should serve with gzip/brotli + CDN. */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react/')
          ) {
            return 'react-vendor'
          }
          if (id.includes('react-router')) {
            return 'router'
          }
          if (id.includes('lucide-react')) {
            return 'icons'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
