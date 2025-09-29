# vue3-boilerplate

> Vue 3, Typescript, Eslint, Prettier, Pinia, Vue Router, Vitest + Vue Test Utils, Playwright, Github Actions

---

## Auto import like nuxt:

install deps

> npm i -D eslint-plugin-unused-imports unplugin-auto-import
> npm i vue-global-api

main.ts:

```ts
import 'vue-global-api' // -> add this
```

vite.config.ts:

```ts
import AutoImport from 'unplugin-auto-import/vite'

plugins: [
  AutoImport({
    imports: [
      'vue', // ref, reactive, computed, watch, dll
      'vue-router', // useRoute, useRouter
      'pinia', // defineStore, storeToRefs
    ],
    dirs: ['src/composables'], // auto-import custom composables
    dts: 'src/auto-imports.d.ts',
    eslintrc: {
      enabled: true, // auto-generate eslintrc config
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true,
    },
  }),
]
```

eslint.config.ts:

```ts
import autoImportConfig from './.eslintrc-auto-import.json' assert { type: 'json' }

{
  files: ['**/*.{ts,vue}'],
  languageOptions: {
    globals: autoImportConfig.globals,
  },
},
```

and then running `npm run dev`

---

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the end-to-end tests with UI
npm run test:e2e-ui
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
