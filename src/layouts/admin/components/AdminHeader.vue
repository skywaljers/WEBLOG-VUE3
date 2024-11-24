<template>
  <!-- 白色背景色，高度64px，padding-right为4，border-bottom为slate200 -->
  <div class="bg-white h-[64px] flex pr-4 border-b border-slate-200 border-slate-100">
    <!-- 左边收缩栏 -->
    <!-- cursor-pointer:鼠标指上去变成小手指。 -->
    <!-- flex items-center justify-center:搭配使用，水平居中 -->
    <!-- hover:bg-gray-700：鼠标移动上去，背景色为灰色 -->
    <div
      class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
      @click="handleMenuWidth"
    >
      <el-icon
        ><Fold v-if="menuStore.menuWidth == '300px'" />
        <Expand v-else />
      </el-icon>
    </div>

    <!-- 右边容器，通过mo-auto让其在父容器的右边 -->
    <div class="ml-auto flex">
      <!-- 刷新按钮 -->
      <!-- placement指定对齐方式 -->
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200 mr-2"
          @click="handleRefresh"
        >
          <el-icon><Refresh /></el-icon>
        </div>
      </el-tooltip>
      <!-- 全屏按钮 -->
      <!-- placement指定对齐方式 -->
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200 mr-2"
          @click="toggle"
        >
          <el-icon
            ><FullScreen v-if="!isFullscreen" />
            <Aim v-else />
          </el-icon>
        </div>
      </el-tooltip>

      <!-- 登录用户头像 -->
      <el-dropdown class="flex items-center justify-center">
        <span
          class="el-dropdown-link text-white flex items-center justify-center text-gray-700 text-xs"
        >
          <!-- 头像 -->
          <el-avatar :size="40" src="/src/assets/naruto.jpg"></el-avatar>
          {{ userStore.userInfo.value }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu'
import { useFullscreen } from '@vueuse/core'
import { updatePassword } from '@/api/admin/user'
const menuStore = useMenuStore()
import { useUserStore } from '@/stores/user'

// 引入了用户 Store
const userStore = useUserStore()
const { isFullscreen, toggle } = useFullscreen()
const handleMenuWidth = () => {
  menuStore.handleMenuWidth()
}

const handleRefresh = () => {
  window.location.reload()
}
</script>
