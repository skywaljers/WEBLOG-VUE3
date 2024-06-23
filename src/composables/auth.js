import { useCookies } from '@vueuse/integrations/useCookies'

//存储在Cookie中的token的key
const TOKEN_KEY = 'Authentication'
const cookie = useCookies()

//获取token值
export function getToken() {
  return cookie.get(TOKEN_KEY)
}

//设置Token到cookie中
export function setToken(token) {
  return cookie.set(TOKEN_KEY, token)
}

//删除Token
export function removeToken() {
  return cookie.remove(TOKEN_KEY)
}
