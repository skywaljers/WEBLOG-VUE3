import { ref } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { setTabList,getTabList} from '@/composables/cookie'

export function useTabList() {
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

  // 初始化标签
  function initTabList() {
    // 从cookie中获取缓存起来的标签导航栏数据
    let tabs = getTabList()
    if(tabs !=null) {
      tabList.value = tabs
    }
  }

  // 处理关闭标签菜单事件
  const handleCloseTab = (command) => {
      // 首页路由
      let indexPath = '/admin/index'
      // 处理关闭其他
      if (command == 'closeOtherTab') {
          // 仅过滤出首页和当前页
          tabList.value = tabList.value.filter((tab) => tab.path == indexPath || tab.path == activeTab.value)
      } else if (command == 'closeAllTab') { // 处理关闭全部
          // 切换回首页
          activeTab.value = indexPath
          // 只保留首页
          tabList.value = tabList.value.filter((tab) => tab.path == indexPath)
      // 切换标签页
          tabChange(activeTab.value)
      }
      
      // 设置到 cookie 中
      setTabList(tabList.value)
  }

  initTabList()

  return { menuStore,tabList, activeTab, tabChange, removeTab, handleCloseTab }
}
