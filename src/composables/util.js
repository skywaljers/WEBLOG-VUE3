import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

//消息提示
// customClass用于传入自定义样式，默认为空；
export function showMessage(message = '提示内容', type = 'success', customClass = '') {
  return ElMessage({
    type: type,
    message,
    customClass
  })
}

export default showMessage
