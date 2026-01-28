
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // If you deploy to https://<USERNAME>.github.io/<REPO>/, 
  // set 'base' to '/<REPO>/'. For root domains or custom domains, use './' or '/'
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
