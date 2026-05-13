import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/anonimitzar-imatges/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsDir: 'static',
  },
})
