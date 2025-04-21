import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import autofit from 'autofit.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './api/api'
const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$api = api
app.use(ElementPlus)
app.use(pinia)
app.use(router) // 使用路由
app.mount('#app')
