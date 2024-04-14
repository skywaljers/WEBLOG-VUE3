import '@/assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import App from '@/App.vue'
import 'animate.css'

//导入路由
import router from '@/router'
const app = createApp(App)

//应用路由
app.use(router)
app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
