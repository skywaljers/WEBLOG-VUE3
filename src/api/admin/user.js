import axios from '@/axios'

//登录接口
export function login(username, password) {
  return axios.post('/auth/login', { username, password })
}

export function updatePassword(data) {
  return axios.put('/user/updatePassword', data)
}
