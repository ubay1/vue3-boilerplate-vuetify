<script setup lang="ts">
import ToggleTheme from '@/components/ui/ToggleTheme.vue'
import { useDisplay, useTheme } from 'vuetify'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const theme = useTheme()
const { smAndUp } = useDisplay()

const showDrawer = ref(true)
const menuItems = [
  { title: 'Home', icon: 'mdi-home', to: '/' },
  { title: 'Unit Test', icon: 'mdi-shield-account-variant-outline', to: '/unit-test' },
  { title: 'E2E Test', icon: 'mdi-shield-account-variant-outline', to: '/e2e' },
]
const navigate = (to: string) => {
  router.push(to)
}
</script>

<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      width="200"
      location="left"
      :color="theme.global.name.value === 'dark' ? 'surface' : 'background'"
      v-model="showDrawer"
      :permanent="smAndUp"
    >
      <v-list-item
        class="pa-3"
        title="Vuetify Boilerplate"
        subtitle="Veevalidate + Zod"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list density="comfortable" nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="route.path === item.to"
          @click="navigate(item.to)"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar
      flat
      :color="theme.global.name.value === 'dark' ? 'surface' : 'primary'"
      :style="[
        `border-bottom: ${theme.global.name.value === 'dark' ? '1px solid rgb(68 68 71)' : '1px solid #dfdfdf'}`,
      ]"
    >
      <template v-slot:prepend>
        <!-- <v-app-bar-nav-icon size="32" @click="showDrawer = !showDrawer"></v-app-bar-nav-icon> -->
        <v-btn icon class="ma-2" size="34" @click="showDrawer = !showDrawer">
          <v-icon size="26">mdi-menu</v-icon>
        </v-btn>
      </template>
      <!-- <v-app-bar-title>Vuetify Boilerplate</v-app-bar-title> -->
      <template #append>
        <ToggleTheme />
      </template>
    </v-app-bar>

    <!-- Main -->
    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <v-footer
      app
      :color="theme.global.name.value === 'dark' ? 'surface' : 'primary'"
      :style="[
        `border-top: ${theme.global.name.value === 'dark' ? '1px solid rgb(68 68 71)' : '1px solid #dfdfdf'}`,
      ]"
    >
      <span class="mx-auto">&copy; 2025 My App</span>
    </v-footer>
  </v-app>
</template>
