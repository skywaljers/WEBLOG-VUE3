import { useCookies } from '@vueuse/integrations/useCookies';

// 存储在cookie中的标签页的key
const TAG_LIST_KEY = 'tagList';
const cookie = useCookies()

// 获取TabList
export const getTabList = () => {
  return cookie.get(TAG_LIST_KEY);
}

// 设置TabList
export const setTabList = (tabList) => {
  cookie.set(TAG_LIST_KEY, tabList);
}