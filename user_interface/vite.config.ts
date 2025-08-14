import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',          // user_interface folder is root
  build: {
    outDir: 'dist',   // output goes to user_interface/dist
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html', // entry point relative to root
    },
  },
})
