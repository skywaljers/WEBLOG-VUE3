import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import nProgress from 'nprogress'

//消息提示
// customClass用于传入自定义样式，默认为空；
export function showMessage(message = '提示内容', type = 'success', customClass = '') {
  return ElMessage({
    type: type,
    message,
    customClass
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
