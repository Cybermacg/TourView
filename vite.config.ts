import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/restcountries': {
        target: 'https://api.restcountries.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/restcountries/, ''),
      },
    },
  },
  build: {
    // Split large vendor libs into separate cached chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['motion'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})
