import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layouts/index.vue'
import { useAppStore } from '@/stores/app'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/form-list',
      children: [
        {
          path: 'form-list',
          component: () => import('@/views/form-list/index.vue'),
          meta: {
            title: '全部表单',
            breadcrumb: ['工作台', '全部表单']
          }
        },

      ]
    },
    {
      // id可选，新建表单不传id，编辑表单传id
      path: '/form-design/:id?',
      component: () => import('@/views/form-design/index.vue'),
      meta: {
        title: '新建表单',
        breadcrumb: ['工作台', '新建表单']
      }
    }
  ],
})

/** 设置路由守卫 */
/** 路由跳转前开启loading效果 */
router.beforeEach((to, from) => {
  const appStore = useAppStore()
  appStore.setGlobalLoading(true)
})

/** 路由跳转后关闭loading效果 */
router.afterEach(() => {
  const appStore = useAppStore()
  appStore.setGlobalLoading(false)
})

export default router
