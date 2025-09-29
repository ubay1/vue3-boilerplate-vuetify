import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import UnitTest from '@/pages/UnitTest.vue'
import EndToEndTest from '@/pages/EndToEndTest.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/unit-test', component: UnitTest },
  { path: '/e2e', component: EndToEndTest },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
