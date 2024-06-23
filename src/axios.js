import axios from 'axios'

//创建实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 7000
})

//暴露方法
export default instance
