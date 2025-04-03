import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBlogSettingsDetail } from '@/api/frontend/blogsettings'

export const useBlogSettingsStore = defineStore('blogSettings', () => {
  // 博客设置信息
  const blogSettings = ref({})

  // 设置博客设置信息
  function getBlogSettings() {
    getBlogSettingsDetail().then((res) => {
      if (res.success) {
        blogSettings.value = res.data
        console.log('set-- blogSettings', blogSettings.value)
      }
    })
  }

  return {
    blogSettings,
    getBlogSettings
  }
})
