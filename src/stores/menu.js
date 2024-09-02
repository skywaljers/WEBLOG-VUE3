import { defineStore } from 'pinia'
import {ref} from 'vue'

// pinia是全局状态管理器,用于声明store方法
export const useMenuStore =defineStore('menu',() => {
  // 左边栏菜单默认宽度,全局变量
  const menuWidth = ref("300px")

  // 展开或伸缩左边栏菜单
  function handleMenuWidth(){
    menuWidth.value = menuWidth.value == '300px' ? '64px':'300px'
  }

  return {menuWidth,handleMenuWidth}
})