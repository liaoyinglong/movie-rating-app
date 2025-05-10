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
        'src/app/version/**',
        'src/app/layout.tsx',
        'src/app/not-found.tsx',
      ],
    },
  },
});
