import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: '..',
  plugins: [react()],
  build: {
    outDir: 'user_interface/dist' // Add this line
  }
})
