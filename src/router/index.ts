import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CreateNewTable from '@/components/CreateNewTable.vue'
//创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: LoginPage,
    },
    {
      name: 'show',
      path: '/show',
      component: () => import('@/components/show/showTech.vue'),
    },
    {
      name: 'zhuye',
      path: '/home',
      component: IndexPage,
      children: [
        {
          name: 'AddTable',
          path: 'addTable',
          component: CreateNewTable,
        },
      ],
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 如果访问的是登录页面，则直接允许
  if (to.name === 'login') {
    next()
  } else {
    // 否则，检查是否已经登录
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      next('/login') // 未登录，跳转到登录页面
    } else {
      next() // 已登录，继续访问目标页面
    }
  }
})

export default router
