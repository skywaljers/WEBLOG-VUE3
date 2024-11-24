import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import nProgress from 'nprogress'
import 'element-plus/es/components/message-box/style/css'

//消息提示
// customClass用于传入自定义样式，默认为空；
export function showMessage(message = '提示内容', type = 'success', customClass = '') {
  return ElMessage({
    type: type,
    message,
    customClass
  })
}

// 弹出确认框
export function showModel(content = '提示内容', type = 'warning', title = '') {
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type
  })
}

//显示页面加载Loading
export function showPageLoading() {
  nProgress.start()
}

//隐藏页面加载Loading
export function hidePageLoading() {
  nProgress.done()
}

export default showMessage
