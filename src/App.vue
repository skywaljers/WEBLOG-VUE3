<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
/**
 * 自定义顶部加载颜色
 */
#nprogress .bar {
  background: #409eff !important;
}
</style>
