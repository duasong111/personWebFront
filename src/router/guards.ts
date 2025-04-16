// src/router/guards.ts

// import { Route, NavigationGuardNext, NavigationGuard } from 'vue-router'

// export const requireAuth: NavigationGuard = (to: Route, from: Route, next: NavigationGuardNext) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' // 或者通过 Vuex 判断
//   if (!isLoggedIn) {
//     next('/login') // 未登录，跳转到登录页面
//   } else {
//     next() // 已登录，继续访问目标页面
//   }
// }
