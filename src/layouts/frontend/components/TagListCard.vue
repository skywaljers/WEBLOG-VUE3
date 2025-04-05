<template>
  <div
    v-if="tags && tags.length > 0"
    class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- 标签标题 -->
    <h2 class="flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white">
      <!-- 标签图标 -->
      <svg
        t="1743687544055"
        class="icon w-4 h-4 mr-2"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3276"
        width="200"
        height="200"
      >
        <path
          d="M912.576 614.4l-298.026667 298.048a85.333333 85.333333 0 0 1-120.682666 0L110.933333 518.272a60.629333 60.629333 0 0 1-25.898666-49.621333L85.333333 149.333333a64.64 64.64 0 0 1 63.082667-64.213333L490.496 85.333333a62.848 62.848 0 0 1 50.752 15.253334c-0.533333-0.533333 371.328 393.237333 371.328 393.237333a85.333333 85.333333 0 0 1 0 120.576zM362.666667 266.666667a74.666667 74.666667 0 1 0 74.666666 74.666666 74.666667 74.666667 0 0 0-74.666666-74.666666z m370.432 184.234666a32 32 0 0 0-45.269334 0L461.568 677.184a32 32 0 0 0 45.248 45.248l226.282667-226.282667a32 32 0 0 0 0-45.248z"
          fill="#FCBD3F"
          p-id="3277"
        ></path>
      </svg>
      标签
    </h2>
    <h2 class="mb-1 font-bold text-gray-900 uppercase dark:text-white">标签</h2>
    <!-- 标签列表 -->
    <span
      v-for="(tag, index) in tags"
      :key="index"
      class="inline-block mb-1 cursor-pointer bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:bg-green-900 dark:text-green-300"
      @click="goTagArticleListPage(tag.id, tag.name)"
    >
      {{ tag.name }}
    </span>
  </div>
</template>

<script setup>
import { getTagList } from '@/api/frontend/tag'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 所有标签
const tags = ref([])
getTagList().then((res) => {
  if (res.success) {
    tags.value = res.data
  }
})

// 跳转标签文章列表页
const goTagArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（标签 ID、标签名称）
  console.log('---开始跳转标签详情页')
  router.push({ path: '/tag/article/list', query: { id, name } })
}
</script>
