<template>
  <div class="background-image">
    <div class="header">登入成功</div>
  </div>
</template>

<script setup>
// 你可以在这里引入其他需要的逻辑或组件
</script>

<style scoped>
.background-image {
  /* 使用背景图片 */
  background-image: url('/src/assets/background.jpg');
  /* 背景图片大小覆盖整个容器 */
  background-size: cover;
  /* 背景图片位置居中 */
  background-position: center;
  /* 背景图片不重复 */
  background-repeat: no-repeat;
  /* 容器高度设置为100%视窗高度 */
  height: 100vh;
  /* 容器宽度设置为100%视窗宽度 */
  width: 100%;
  /* 居中内部元素 */
  display: flex;
  justify-content: center;
  /* 移除垂直居中 */
  align-items: flex-start;
  /* 相对定位，以便 header 可以使用绝对定位 */
  position: relative;
}

.header {
  /* 绝对定位 */
  position: absolute;
  /* 顶部间距 */
  top: 100px;
  /* 水平居中 */
  left: 50%;
  transform: translateX(-50%);
  /* 文本样式 */
  font-size: 40px;
  color: rgb(0, 0, 0);
}
</style>
