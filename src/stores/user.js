import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/admin/user'
import { removeToken } from '@/composables/cookie'
export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref({})

    // 设置用户信息
    function setUserInfo() {
      getUserInfo().then((res) => {
        if (res.success == true) {
          userInfo.value = res.data
          console.log('set -- userInfo', userInfo.value)
        }
      })
    }

    // 退出登录
    function logout() {
      // 删除 cookie 中的 token 令牌
      removeToken()
      // 删除登录用户信息
      userInfo.value = {}
    }

    return {
      userInfo,
      setUserInfo,
      logout
    }
  },
  {
    // 开启持久化
    persist: true
  }
)
