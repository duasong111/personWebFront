import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ManagePage from '@/pages/ManagePage.vue'
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
      name: 'zhuye',
      path: '/home',
      component: IndexPage,
    },
    {
      name: 'guanli',
      path: '/manage',
      component: ManagePage,
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
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' // 或者通过 Vuex 判断
    if (!isLoggedIn) {
      next('/login') // 未登录，跳转到登录页面
    } else {
      next() // 已登录，继续访问目标页面
    }
  }
})

export default router
