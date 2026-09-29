import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  base:
    command === 'serve'
      ? '/'
      : process.env.VITE_BASE_PATH ||
        '/anthologie-numerique/',
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
