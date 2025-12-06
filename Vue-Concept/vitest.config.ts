import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'dist/',
          'e2e/',
          '**/*.spec.ts',
          '**/*.config.ts',
          '**/icons/**',
          'src/main.ts'
        ],
        include: [
          'src/**/*.{ts,vue}'
        ],
        all: true,
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    },
  }),
)
