<template>
  <!-- 外层容器 -->
  <el-container>
    
    <!-- 左侧边栏 -->
    <el-aside :width="menuStore.menuWidth" class="transition-all">
      <AdminMenu></AdminMenu>
    </el-aside>

    <!-- 主容器 -->
     <el-container>
       <!-- 顶部容器 -->
        <el-header>
          <AdminHeader></AdminHeader>
        </el-header>

        <!-- 主容器 -->
        <el-main>
          <!-- 主内容，根据路由动态展示不同页面 -->
           <AdminTagList class="transition-all"></AdminTagList>
           <router-view></router-view>
        </el-main>

        <!-- 底部 -->
        <el-footer>
          <AdminFooter></AdminFooter>
        </el-footer>
     </el-container>
  </el-container>
</template>

<script setup>
// 引入组件
import AdminFooter from './components/AdminFooter.vue'
import AdminHeader from './components/AdminHeader.vue'
import AdminMenu from './components/AdminMenu.vue'
import AdminTagList from './components/AdminTagList.vue'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()
</script>

<style scoped>
.el-header {
  padding: 0;
}
</style>

