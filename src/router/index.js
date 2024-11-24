import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

//统一声明路由
const routes = [
  {
    path: '/', //路由地址
    component: Login, //对应组件
    meta: {
      //meta信息
      title: '持续集成系统 - DevOps' //页面标题
    }
  },
  {
    path: '/admin/index',
    component: AdminIndex,
    meta: {
      title: '后台管理 - DevOps'
    }
  }
]

//创建路由
const router = createRouter({
  //指定路由的历史管理方式，hash模式指的是url的路径是通过hash符号#进行标识
  history: createWebHashHistory(),
  routes
})

//ES6 模块导出语句，用于将 router 对象导出，以便其他文件可以导入和使用这个对象
export default router
