import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'src/__tests__/e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: './src/__tests__/unit/setup.ts',
      server: {
        deps: {
          inline: ['vuetify'],
        },
      },
    },
  }),
)
