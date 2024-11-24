import '@/assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
// 引入全局状态管理 Pinia
import pinia from '@/stores'
import App from '@/App.vue'
import 'animate.css'
import 'nprogress/nprogress.css'

//导入路由
import router from '@/router'
//导入全局路由守卫
import '@/permission'
const app = createApp(App)

//应用路由
app.use(router)
app.mount('#app')
// 启用pinia
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
