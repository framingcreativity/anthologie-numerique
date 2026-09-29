import { defineConfig, loadEnv } from 'vite';
import { basePath } from './src/app/data/pages.json';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command, mode }) => ({
  base:
    command === 'serve'
      ? '/'
      : loadEnv(mode, root, 'VITE_').VITE_BASE_PATH || basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(
        root,
        './src/app',
      ),
    },
  },
}));
