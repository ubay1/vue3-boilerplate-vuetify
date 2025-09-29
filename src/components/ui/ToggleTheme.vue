<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
const emit = defineEmits(['change'])
const isDark = ref(false)

const toggleTheme = () => {
  const newTheme = isDark.value ? 'dark' : 'light'
  // theme.global.name.value = newTheme
  theme.change(newTheme)
  localStorage.setItem('app-theme', newTheme)
  emit('change', isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('app-theme')
  if (saved) {
    // theme.global.name.value = saved
    theme.change(saved)
    isDark.value = saved === 'dark'
    emit('change', isDark.value)
  }
})
</script>

<template>
  <VSwitch
    v-model="isDark"
    inset
    hide-details
    @change="toggleTheme"
    :color="isDark ? 'primary' : 'primary'"
    class="theme-switch"
  >
    <template #thumb>
      <VIcon :icon="isDark ? 'mdi-weather-night' : 'mdi-weather-sunny'" :size="!isDark ? 24 : 12" />
    </template>
  </VSwitch>
</template>

<style scoped>
.theme-switch .v-selection-control__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
