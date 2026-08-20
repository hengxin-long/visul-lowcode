import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/form-list',
      children: [
        {
          path: '/form-list',
          component: import('@/views/form-list.vue')
        },
        {
          path: '/form-design',
          component: import('@/views/form-design.vue')
        }
      ]
    }
  ],
})

export default router
