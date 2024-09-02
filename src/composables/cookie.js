import { useCookies } from '@vueuse/integrations/useCookies'

const cookie = useCookies()
//存储在Cookie中的token的key
const TOKEN_KEY = 'Authentication'
// 存储在cookie中的标签页的key
const TAG_LIST_KEY = 'tagList';


//----------------------------获取token值--------------------------------
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



//----------------------------获取TabList--------------------------------
export const getTabList = () => {
  return cookie.get(TAG_LIST_KEY);
}

// 设置TabList
export const setTabList = (tabList) => {
  cookie.set(TAG_LIST_KEY, tabList);
}