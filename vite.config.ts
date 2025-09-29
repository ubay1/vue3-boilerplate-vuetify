import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue', // ref, reactive, computed, watch, dll
        'vue-router', // useRoute, useRouter
        'pinia', // defineStore, storeToRefs
        'vitest', // vitest auto import
      ],
      dirs: ['src/composables'], // auto-import custom composables
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // auto-generate eslintrc config
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
