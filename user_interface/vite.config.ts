import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for Netlify deployment
export default defineConfig({
  plugins: [react()],
  root: '.', // Current folder (user_interface) is the root
  build: {
    outDir: 'dist',        // Output will go to user_interface/dist
    emptyOutDir: true,     // Clear previous builds
    rollupOptions: {
      input: 'index.html', // Entry point relative to root
    },
  },
  server: {
    open: true,            // Opens browser on local dev server
  },
})
