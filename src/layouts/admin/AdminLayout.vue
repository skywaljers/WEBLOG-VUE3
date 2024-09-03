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
        <!-- v-slot="{ Component }" 是 Vue 3 中的插槽语法。它表示为<router-view>组件定义了一个插槽，并将当前路由的组件赋值给了 Component 变量 -->
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <!-- <component :is="Component" /> -->
            <KeepAlive :max="10">
              <component :is="Component" />
            </KeepAlive>
          </transition>
          <!-- 指定最多缓存10个组件 -->
        </router-view>
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


/* 内容区域过渡动画：淡入淡出效果 */
/* 刚开始进入时 */
.fade-enter-from {
    /* 透明度 */
    opacity: 0;
}

/* 刚开始结束 */
.fade-enter-to {
    opacity: 1;
}

/* 刚开始离开 */
.fade-leave-from {
  opacity: 1;
}

/* 离开已结束 */
.fade-leave-to {
  opacity: 0;
}

/* 离开进行中 */
.fade-leave-active {
    transition: all 0.3s;
}

/* 进入进行中 */
.fade-enter-active {
    transition: all 0.3s;
    transition-delay: 0.3s;
}
</style>
