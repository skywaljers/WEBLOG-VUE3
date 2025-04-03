<template>
  <div
    v-if="categories && categories.length > 0"
    class="w-full p-5 mb-3 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- 标签标题 -->
    <h2 class="flex items-center mb-2 font-bold text-gray-900 uppercase dark:text-white">
      <!-- 标签图标 -->
      <svg
        t="1743687485159"
        class="icon w-4 h-4 mr-2"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2171"
        width="200"
        height="200"
      >
        <path d="M656 240V16H144v992h736V240z" fill="#FEEB9E" p-id="2172"></path>
        <path d="M656 16v224h224z" fill="#E6C45F" p-id="2173"></path>
        <path
          d="M895.904 239.824a15.536 15.536 0 0 0-4.464-10.48L666.656 4.56a15.376 15.376 0 0 0-10.336-4.432L656 0H160a32 32 0 0 0-32 32v960a32 32 0 0 0 32 32h704a32 32 0 0 0 32-32V240l-0.096-0.176zM672 54.096L841.904 224H672V54.096zM864 992H160V32h480v224h224v736z"
          fill="#2B3139"
          p-id="2174"
        ></path>
        <path
          d="M458.368 611.904l-127.312-127.312a15.84 15.84 0 0 0-22.464 0 15.84 15.84 0 0 0 0 22.464L425.52 624l-116.928 116.944a15.84 15.84 0 0 0 0 22.464 15.84 15.84 0 0 0 22.464 0l127.28-127.28c0.336-0.288 0.752-0.384 1.072-0.704a15.888 15.888 0 0 0 4.64-11.424 15.696 15.696 0 0 0-4.64-11.408c-0.304-0.288-0.704-0.4-1.04-0.688zM704 736H512a16 16 0 1 0 0 32h192a16 16 0 1 0 0-32z"
          fill="#2B3139"
          p-id="2175"
        ></path>
      </svg>
      分类
    </h2>
    <!-- 分类列表 -->
    <div
      class="text-sm font-medium text-gray-600 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <a
        @click="goCategoryArticleListPage(category.id, category.name)"
        v-for="(category, index) in categories"
        :key="index"
        class="flex items-center w-full px-4 py-2 rounded-lg border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
      >
        <svg
          class="w-3.5 h-3.5 mr-1.5 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 21 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5"
          />
        </svg>
        {{ category.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { getCategoryList } from '@/api/frontend/category'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// 引入路由
const router = useRouter()

// 所有分类
const categories = ref([])
getCategoryList().then((res) => {
  if (res.success) {
    categories.value = res.data
  }
})

// 跳转分类文章列表页
const goCategoryArticleListPage = (id, name) => {
  // 跳转时通过 query 携带参数（分类 ID、分类名称）
  router.push({ path: '/category/article/list', query: { id, name } })
}
</script>
