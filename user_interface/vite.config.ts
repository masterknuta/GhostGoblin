import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: '..', // This tells Vite to look for the project root (where index.html is) one directory up.
  plugins: [react()],
})
