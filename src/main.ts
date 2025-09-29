import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/css/global.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify, type VuetifyOptions } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import type { VBtn, VTextField, VSelect } from 'vuetify/components'
// Supports weights 100-900
import '@fontsource-variable/montserrat';
import '@mdi/font/css/materialdesignicons.css'

// Ambil props type
type VBtnProps = InstanceType<typeof VBtn>['$props']
type VTextFieldProps = InstanceType<typeof VTextField>['$props']
type VSelectProps = InstanceType<typeof VSelect>['$props']

const vuetifyOptions: VuetifyOptions = {
  components,
  directives,
  defaults: {
    VTextField: {
      density: 'compact',
      hideDetails: 'auto',
    } as VTextFieldProps,
    VSelect: {
      density: 'compact',
      hideDetails: 'auto',
    } as VSelectProps,
    VBtn: {
      density: 'compact',
      size: 'small',
      variant: 'flat',
    } as VBtnProps,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#fafafa',     // soft light bg
          surface: '#ffffff',        // card / drawer
          primary: '#4f46e5',        // indigo-600
          secondary: '#64748b',      // slate-500
          info: '#3b82f6',           // blue-500
          success: '#22c55e',        // green-500
          warning: '#eab308',        // yellow-500
          error: '#ef4444',          // red-500
          onBackground: '#1e293b',   // text
          onSurface: '#334155',      // text on card
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#1a1a1a',     // soft dark bg
          surface: '#222222',        // card / drawer
          primary: '#6366f1',        // indigo-500
          secondary: '#94a3b8',      // slate-400
          info: '#60a5fa',           // blue-400
          success: '#4ade80',        // green-400
          warning: '#facc15',        // yellow-400
          error: '#f87171',          // red-400
          onBackground: '#f1f5f9',   // text
          onSurface: '#e2e8f0',      // text on card
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
}
const vuetify = createVuetify(vuetifyOptions)


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
