import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    'process.env.VITEST': 'true',
  },
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./config/setup-tests.ts'],
    typecheck: {
      enabled: true,
    },
    coverage: {
      include: ['src/**'],
      exclude: [
        'src/components/ui/**',
        'src/database/**',
        'src/app/\\[locale\\]/version/**',
        'src/app/\\[locale\\]/layout.tsx',
        'src/app/\\[locale\\]/\\[...catchall\\]/**',
        'src/utils/test-utils.tsx',
      ],
    },
  },
});
