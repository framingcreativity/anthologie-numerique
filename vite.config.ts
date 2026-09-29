import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',

    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');

        return path.resolve(
          root,
          'src/assets',
          filename,
        );
      }

      return null;
    },
  };
}

export default defineConfig(({ command }) => ({
  base:
    command === 'serve'
      ? '/'
      : process.env.VITE_BASE_PATH ||
        '/anthologie-numerique/',
  plugins: [
    figmaAssetResolver(),
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
