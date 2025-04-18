import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import autofit from 'autofit.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router) // 使用路由
// autofit.init({
//   dw: 1920, // 设计稿宽度
//   dh: 1080, // 设计稿高度
//   el: '#app', // 缩放的根节点
// })
app.mount('#app')
