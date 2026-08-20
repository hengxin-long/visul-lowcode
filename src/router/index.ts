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
          component: import('@/views/form-list/index.vue'),
          meta: {
            title: '全部表单',
            breadcrumb: ['工作台', '全部表单']
          }
        },
        {
          path: '/form-design',
          component: import('@/views/form-design.vue'),
          meta: {
            title: '新建表单',
            breadcrumb: ['工作台', '新建表单']
          }
        }
      ]
    }
  ],
})

export default router
