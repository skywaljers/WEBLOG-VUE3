import axios from 'axios'
// import { getToken } from './composables/auth'
import showMessage from './composables/util'

//创建实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 7000
})

//添加请求拦截器
instance.interceptors.request
  .use
  // function (config) {
  //   //在发送请求之前做些什么
  //   const token = getToken()
  //   console.log('统一添加请求头中的token：' + token)

  //   //当token不为空时
  //   if (token != undefined) {
  //     //添加请求头
  //     console.log('添加请求头...')
  //     config.headers['Authorization'] = 'Bearer ' + token
  //   }
  //   return config
  // },
  // function (error) {
  //   //对请求错误做些什么
  //   return Promise.reject(error)
  // }
  ()

//添加响应拦截器
instance.interceptors.request
  .use
  // function (response) {
  //   //2xx 范围内的状态码都会触发该函数
  //   //对响应数据做些什么
  //   return response.data
  // },
  // function (error) {
  //   //超出2xx范围的状态码都会触发该函数
  //   //对响应错误做点什么

  //   let errorMsg = error.response.data.message || '请求失败'
  //   showMessage(errorMsg, 'error')
  //   return Promise.reject(error)
  // }
  ()

//暴露方法
export default instance
