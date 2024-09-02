<template>
  <div
    class="fixed top-[64px] h-[44px] px-2 right-0 z-50 flex items-center bg-white transition-all"
    :style="{ left: menuStore.menuWidth }"
  >
    <el-tabs
      v-model="activeTab"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
      style="min-width: 10px"
      @tab-change="tabChange"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path != '/admin/index'"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
    <!-- 右侧下拉菜单 -->
    <span class="ml-auto flex items-center justify-center h-[32px] w-[32px]">
      <el-dropdown class="ml-auto">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="removeOtherTab">关闭其他</el-dropdown-item>
            <el-dropdown-item @click="removeTabAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div class="h-[44px]"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { setTabList,getTabList} from '@/composables/tag-list'

const menuStore = useMenuStore()

const route = useRoute()

const router = useRouter()
// let tabIndex = 2
const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '仪表盘',
    path: '/admin/index'
  }
])

const tabChange = (path) => {
  console.log(path)

  // 设置被激活的tab标签
  activeTab.value = path
  router.push(path)
}

// 在路由切换前被调用
onBeforeRouteUpdate((to, from) => {
  //打印控制台日志
  console.log({
    title: to.meta.title,
    path: to.path
  })
  // 设置被激活的Tab标签
  activeTab.value = to.path
  // 添加Tab标签页
  addTab({
    title: to.meta.title,
    path: to.path
  })
})

// 添加标签页
const addTab = (tab) => {
  // 标签是否存在
  let isTabNoNotExisted = tabList.value.findIndex((item) => item.path === tab.path) == -1
  if (isTabNoNotExisted) {
    tabList.value.push(tab)
  }
  // 将tablist列表存储到cookie中
  setTabList(tabList.value)
}


// 删除标签
const removeTab = (path) => {
  let tabs = tabList.value
  let actTab = activeTab.value
  //判断删除的是否是当前激活的标签
  if (actTab === path) {
    // 删除当前激活的标签
    tabs.forEach((tab, index) => {
      if (tab.path === path) {
        let nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          actTab = nextTab.path
        }
      }
    })
  }

  activeTab.value = actTab

  //过滤掉被删除的标签
  tabList.value = tabs.filter((tab) => tab.path !== path)

  // 存储到cookie中
  setTabList(tabList.value)

  // 切换标签页
  tabChange(activeTab.value)
}

function initTabList() {
  // 从cookie中获取缓存起来的标签导航栏数据
  let tabs = getTabList()
  if(tabs !=null) {
    tabList.value = tabs
  }
}

initTabList()
</script>
<style>
.el-tabs__item {
  font-size: 12px;
  border: 1px solid #d8dce5 !important;
  border-radius: 3px !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  margin-left: 0.1rem !important;
  margin-right: 0.1rem !important;
}

.el-tabs__item.is-active {
  background-color: var(--el-color-primary) !important;
  color: #fff;
}

.el-tabs__item.is-active::before {
  content: '';
  background-color: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 4px;
}

.el-tabs {
  height: 32px;
}

.el-tabs__header {
  margin-bottom: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0;
}

.el-tabs--card > .el-tabs__header .el-tabs__item {
  height: 32px;
  line-height: 32px;
  border: 0;
  background: #fff;
}

.el-tabs--card > .el-tabs__header {
  border: 0;
}

.el-tabs__nav-prev,
.el-tabs__nav-next {
  line-height: 35px;
}

.is-disabled {
  cursor: not-allowed;
  color: #d1d5db;
}
</style>
