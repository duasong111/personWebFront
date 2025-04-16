import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ManagePage from '@/pages/ManagePage.vue'

//创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'zhuye',
      path: '/home',
      component: IndexPage,
    },
    {
      name: 'denglu',
      path: '/login',
      component: LoginPage,
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
//将路由暴露出去

export default router
