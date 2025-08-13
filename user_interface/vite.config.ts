import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: '..', // Sets the project root to the parent directory (repository root)
  plugins: [react()],
  build: {
    outDir: 'user_interface/dist', // Output to 'user_interface/dist' relative to the new root
    rollupOptions: {
      input: 'index.html', // Explicitly tell Rollup to use index.html from the root
    },
  },
})
