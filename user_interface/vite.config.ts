import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // important for routing, make sure this matches your deployment path
  plugins: [react()],
});
