<template>
  <div class="bg-slate-800 h-screen text-white">
    <!-- logo -->
     <div class="flex items-center justify-center h-[64px]">
      <img src="/src/assets/鸣人blog.png" class="h-[105px]"/>
     </div>

     <!-- 菜单栏 -->
      <!-- 下方菜单 -->
      <el-menu :default-active="defaultActive" @select="handleSelect">
        <template v-for="(item,index) in menus" :key="index">
          <el-menu-item :index="item.path">
            <el-icon>
              <!-- 动态图标 -->
               <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
  </div>
</template>

<!-- setup：template中可以直接使用script中定义的变量 -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const menus = [
    {
        'name': '仪表盘',
        'icon': 'Monitor',
        'path': '/admin/index'
    },
    {
        'name': '文章管理',
        'icon': 'Document',
        'path': '/admin/article/list',
    },
    {
        'name': '分类管理',
        'icon': 'FolderOpened',
        'path': '/admin/category/list',
    },
    {
        'name': '标签管理',
        'icon': 'PriceTag',
        'path': '/admin/tag/list',
    },
    {
        'name': '博客设置',
        'icon': 'Setting',
        'path': '/admin/blog/setting',
    },
]

const route = useRouter()

// 根据路由地址判断哪个菜单被选中
const defaultActive = ref(route.path)

// 菜单选择事件
const handleSelect = (path) => {
  console.log(path)
  route.push(path)
}
</script>


<style scoped>
.el-menu {
    background-color: rgb(30 41 59 / 1);
    border-right: 0;
}

.el-sub-menu__title {
    color: #fff;
}

.el-sub-menu__title:hover {
    background-color: #ffffff10;
}

.el-menu-item.is-active {
    background-color: var(--el-color-primary);
    color: #fff;
}

.el-menu-item.is-active:hover {
    background-color: var(--el-color-primary);
}

.el-menu-item {
    color: #fff;
}

.el-menu-item:hover {
    background-color: #ffffff10;
}
</style>