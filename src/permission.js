import router from '@/router/index'
import { getToken } from './composables/cookie'
import showMessage, { hidePageLoading, showPageLoading } from './composables/util'

//全局路由前置守卫
//通过使用 router.beforeEach 注册一个全局前置守卫，每个守卫默认接受两个参数：
// to: 即将要进入的目标；
// from: 当前导航正要离开的路由；
// next : 可额外添加的参数，用于手动控制跳转哪个页面；
// next() 必须设置，否则不会跳转目标路由。
router.beforeEach((to, from, next) => {
  console.log('==> 全局路由前置守卫')
  showPageLoading()
  //校验是否登录，未登录则跳转登录页
  let token = getToken()
  if (!token && to.path.startsWith('/admin')) {
    // showMessage('请先登录', 'warning')
    next({ path: '/login' })
    hidePageLoading()
  } else if (token && to.path == '/login') {
    //用户已登陆，且重复访问登录页
    showMessage('请勿重复登录', 'warning')
    //跳转到后台首页
    next({ path: '/admin/index' })
  } else {
    next()
  }
  next()
})

//全局路由后置守卫
router.afterEach((to, from) => {
  //动态设置页面Title
  let title = (to.meta.title ? to.meta.title : '') + ' - naruto'
  document.title = title
  hidePageLoading()
})
