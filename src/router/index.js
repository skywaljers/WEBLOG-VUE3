import Login from '@/pages/admin/login.vue'
import Index from '@/pages/frontend/index.vue'
import AdminIndex from '@/pages/admin/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '@/layouts/admin/AdminLayout.vue'
import AdminArticleList from '@/pages/admin/article-list.vue'
import AdminCategoryList from '@/pages/admin/category-list.vue'
import AdminTagList from '@/pages/admin/tag-list.vue'
import AdminBlogSetting from '@/pages/admin/blog-setting.vue'
import ArchiveList from '@/pages/frontend/archive-list.vue'
import CategoryList from '@/pages/frontend/category-list.vue'
import CategoryArticleList from '@/pages/frontend/category-article-list.vue'
import TagList from '@/pages/frontend/tag-list.vue'

//统一声明路由
const routes = [
  {
    path: '/', //路由地址
    component: Index, //对应组件
    meta: {
      //meta信息
      title: 'weblog 首页' //页面标题
    }
  },
  {
    path: '/login', //路由地址
    component: Login, //对应组件
    meta: {
      //meta信息
      title: 'weblog 登录页' //页面标题
    }
  },
  {
    path: '/archive/list', // 归档页
    component: ArchiveList,
    meta: {
      // meta 信息
      title: 'Weblog 归档页'
    }
  },
  {
    path: '/category/list', // 分类页
    component: CategoryList,
    meta: {
      // meta 信息
      title: 'Weblog 分类页'
    }
  },
  {
    path: '/category/article/list', // 分类文章页
    component: CategoryArticleList,
    meta: {
      // meta 信息
      title: 'Weblog 分类文章页'
    }
  },
  {
    path: '/tag/list', // 标签列表页
    component: TagList,
    meta: {
      // meta 信息
      title: 'Weblog 标签列表页'
    }
  },
  {
    path: '/admin', //后台首页
    component: Admin, //对应Admin.vue文件
    children: [
      {
        path: '/admin/index',
        component: AdminIndex, //主内容区域，具体需要渲染的内容
        meta: {
          title: 'Admin 后台首页'
        }
      },
      {
        path: '/admin/article/list',
        component: AdminArticleList, //主内容区域，具体需要渲染的内容
        meta: {
          title: '文章管理'
        }
      },
      {
        path: '/admin/category/list',
        component: AdminCategoryList, //主内容区域，具体需要渲染的内容
        meta: {
          title: '分类管理'
        }
      },
      {
        path: '/admin/tag/list',
        component: AdminTagList, //主内容区域，具体需要渲染的内容
        meta: {
          title: '标签管理'
        }
      },
      {
        path: '/admin/blog/setting',
        component: AdminBlogSetting, //主内容区域，具体需要渲染的内容
        meta: {
          title: '博客设置'
        }
      }
    ]
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
