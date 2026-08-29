/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { createEnglishHtml } from './src/i18n/localized-html';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'emit-english-entry-point',
      enforce: 'post',
      generateBundle(_, bundle) {
        const index = bundle['index.html'];
        if (!index || index.type !== 'asset') return;
        this.emitFile({
          type: 'asset',
          fileName: 'en/index.html',
          source: createEnglishHtml(String(index.source))
        });
      }
    }
  ],
  test: {
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**']
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
