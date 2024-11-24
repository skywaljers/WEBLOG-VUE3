import axios from '@/axios'

//登录接口
export function login(username, password) {
  return axios.post('/auth/login', { username, password })
}

export function updatePassword(data) {
  return axios.put('/admin/user/updatePassword', { data })
}

// 获取登录用户信息
export function getUserInfo() {
  return axios.post('/admin/user/info')
}
