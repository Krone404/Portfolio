// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // or '/your-repo/' if you're deploying to a sub-path
  build: {
    outDir: '../' // Build files go to the parent folder
  },
  plugins: [react()]
})
