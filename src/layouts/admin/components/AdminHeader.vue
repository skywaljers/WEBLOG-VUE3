<template>
  <!-- 白色背景色，高度64px，padding-right为4，border-bottom为slate200 -->
  <div class="bg-white h-[64px] flex pr-4 border-b border-slate-200 border-slate-100">
    <!-- 左边收缩栏 -->
    <!-- cursor-pointer:鼠标指上去变成小手指。 -->
    <!-- flex items-center justify-center:搭配使用，水平居中 -->
    <!-- hover:bg-gray-700：鼠标移动上去，背景色为灰色 -->
    <div
      class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200"
      @click="handleMenuWidth"
    >
      <el-icon
        ><Fold v-if="menuStore.menuWidth == '300px'" />
        <Expand v-else />
      </el-icon>
    </div>

    <!-- 右边容器，通过mo-auto让其在父容器的右边 -->
    <div class="ml-auto flex">
      <!-- 刷新按钮 -->
      <!-- placement指定对齐方式 -->
      <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom">
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200 mr-2"
          @click="handleRefresh"
        >
          <el-icon><Refresh /></el-icon>
        </div>
      </el-tooltip>
      <!-- 全屏按钮 -->
      <!-- placement指定对齐方式 -->
      <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
        <div
          class="w-[42px] h-[64px] cursor-pointer flex items-center justify-center text-gray-700 hover:bg-gray-200 mr-2"
          @click="toggle"
        >
          <el-icon
            ><FullScreen v-if="!isFullscreen" />
            <Aim v-else />
          </el-icon>
        </div>
      </el-tooltip>

      <!-- 登录用户头像 -->
      <el-dropdown class="flex items-center justify-center">
        <span
          class="el-dropdown-link text-white flex items-center justify-center text-gray-700 text-xs"
        >
          <!-- 头像 -->
          <el-avatar :size="40" src="/src/assets/naruto.jpg"></el-avatar>
          {{ userStore.userInfo.value }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCommand('updatePassword')">修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleCommand('logout')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <FormDialog ref="formDialogRef" title="修改密码" destroyOnClose @submit="onSubmit">
    <el-form ref="formRef" :rules="rules" :model="form">
      <el-form-item label="用户名" prop="username" label-width="120px">
        <el-input
          size="large"
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
          disabled
        />
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          clearable
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword" label-width="120px">
        <el-input
          size="large"
          type="password"
          v-model="form.rePassword"
          placeholder="请确认密码"
          clearable
          show-password
        />
      </el-form-item>
    </el-form>
  </FormDialog>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu'
import { useFullscreen } from '@vueuse/core'
import { ref, reactive, watch } from 'vue'
import { updatePassword } from '@/api/admin/user'
const menuStore = useMenuStore()
import { useUserStore } from '@/stores/user'
import { showMessage, showModel } from '@/composables/util'
import { useRouter } from 'vue-router'
import FormDialog from '@/components/FormDialog.vue'

// 引入了用户 Store
const userStore = useUserStore()
const router = useRouter()
const formRef = ref(null)
const formDialogRef = ref(null)
const form = reactive({
  username: userStore.userInfo.username || '',
  password: '',
  rePassword: ''
})

// 规则校验
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
  ],
  rePassword: [
    {
      required: true,
      message: '确认密码不能为空',
      trigger: 'blur'
    }
  ]
}
const { isFullscreen, toggle } = useFullscreen()
const handleMenuWidth = () => {
  menuStore.handleMenuWidth()
}

watch(
  () => userStore.userInfo.username,
  (newValue, oldValue) => {
    // 在这里处理变化后的值
    console.log('新值:', newValue)
    console.log('旧值:', oldValue)

    // 可以在这里执行任何你需要的逻辑
    // 重新将新的值，设置会 form 对象中
    form.username = newValue
  }
)

const handleUpdatePwd = () => {
  formDialogRef.value.open()
}
const onSubmit = () => {
  // 先验证 form 表单字段
  formRef.value.validate((valid) => {
    if (!valid) {
      console.log('表单验证不通过')
      return false
    }
    formDialogRef.value.showBtnLoading()

    if (form.password != form.rePassword) {
      showMessage('两次密码输入不一致，请检查！', 'warning')
      return
    }

    // 调用修改用户密码接口
    updatePassword(form)
      .then((res) => {
        console.log(res)
        // 判断是否成功
        if (res.success == true) {
          showMessage('密码重置成功，请重新登录！')
          // 退出登录
          userStore.logout()

          // 隐藏对话框
          formDialogRef.value.close()

          // 跳转登录页
          router.push('/login')
        } else {
          // 获取服务端返回的错误消息
          let message = res.message
          // 提示消息
          showMessage(message, 'error')
        }
      })
      .finally(() => formDialogRef.value.closeBtnLoading())
  })
}

// 下拉菜单事件处理
const handleCommand = (command) => {
  // 更新密码
  if (command == 'updatePassword') {
    // 省略...
    handleUpdatePwd()
  } else if (command == 'logout') {
    // 退出登录
    logout()
  }
}

// 退出登录
function logout() {
  showModel('是否确认要退出登录？').then(() => {
    userStore.logout()
    showMessage('退出登录成功！')
    // 跳转登录页
    router.push('/login')
  })
}

const handleRefresh = () => {
  window.location.reload()
}
</script>
