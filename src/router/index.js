import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/dashboard/Index.vue'
import blogRoutes from './blogRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Index,
    },
    ...blogRoutes
  ],
})

export default router
