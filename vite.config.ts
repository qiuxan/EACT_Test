/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {environment} from './src/enviroments/enviroment';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: environment.apiUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles:['./src/vitest.setup.ts'],
    css: true,
    testTimeout: 5000,
    reporters: ['verbose'],
  }
});