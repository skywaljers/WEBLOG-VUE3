<template>
  <!-- 使用grid网格布局，并指定列数为2，高度占满全屏 -->
  <div class="grid grid-cols-2 h-screen">
    <!-- 默认先适配移动端，占2列，order用于指定排列顺序，md用于适配pc端 -->
    <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900">
      <!-- 指定为flex布局，并设置为屏幕垂直水平居中，高度为100% -->
      <div
        class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInLeft animate__fast"
      >
        <h2 class="font-bold text-4xl mb-7 text-white">naruto 博客登录</h2>
        <p class="text-white">
          一款由 Springboot + Mybatis Plus + Vue 3.2 + Vite 4 开发的前后端博客。
        </p>
        <img src="@/assets/developer.png" alt="" class="w-1/2" />
      </div>
    </div>

    <!-- 右边栏 -->
    <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
      <!-- flex-col指定子元素垂直排列 -->
      <div
        class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast"
      >
        <!-- 大标题，设置字体粗细，大小，下边距 -->
        <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
        <!-- 设置flex布局，内容垂直水平居中，文字颜色，内容水平方向x轴距 -->
        <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
          <!-- 左边横线，高度为1px，宽度为16，背景色 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <!-- 引入Element Plus表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5  -->
        <!-- ref="formRef" ： 添加表单引用，用于方便的获取表单； 
          :rules="rules" : 对表单添加字段校验规则；
          :model="form" ：将表单和 form 变量绑定在一起；
        -->
        <el-form class="w-5/6 md:w-2/5" ref="formRef" :rules="rules" :model="form">
          <el-form-item prop="username">
            <!-- 输入框组件 -->
            <el-input
              size="large"
              v-model="form.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
            />
          </el-form-item>
          <!-- 密码框组件 -->
          <el-form-item prop="password">
            <el-input
              size="large"
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              clearable
              show-password
            />
          </el-form-item>
          <el-form-item>
            <!-- 登录按钮 ，宽度设置为100%-->
            <el-button
              class="w-full mt-2"
              @click="onSubmit"
              size="large"
              type="primary"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/admin/user'
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import router from '@/router'
import { showMessage } from '@/composables/util'
import { ElMessage } from 'element-plus'
import { setToken } from '@/composables/cookie'

//定义响应式的表单对象
const form = reactive({
  username: '',
  password: ''
})

//表单引用
const formRef = ref(null)

//登录按钮加载
const loading = ref(false)

//按回车键后，执行登录事件
function onKeyUp(e) {
  console.log(e)
  if (e.key == 'Enter') {
    onSubmit()
  }
}

//添加键盘监听
onMounted(() => {
  console.log('添加键盘监听')
  document.addEventListener('keyup', onKeyUp)
})

//移除键盘监听
onBeforeMount(() => {
  document.removeEventListener('keyup', onKeyUp)
})

//登录
const onSubmit = () => {
  console.log('登录')

  //先校验 form 表单字段
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log('表单校验不通过')
      return false
    }
    loading.value = true
    //showMessage('登录成功')
    //router.push('/admin/index')

    login(form.username, form.password)
      .then((res) => {
        console.log(res)

        if (res.success == true) {
          //提示登录成功
          showMessage('登录成功')
          let token = res.data.tokenValue
          console.log("token: "+token);
          
          setToken(token)
          router.push('/admin/index')
        } else {
          //获取服务器端返回的错误信息
          let message = res.message
          //提示信息
          showMessage(message, 'error')
        }
      })
      .finally(() => {
        //结束加载
        loading.value = false
      })
  })
}

const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    }
  ]
}
</script>
