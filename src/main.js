import '@/assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
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

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// 启用pinia
app.use(pinia)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
