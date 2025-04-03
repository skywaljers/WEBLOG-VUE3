import axios from '@/axios'

export function getBlogSettingsDetail() {
  return axios.post('/blog/settings/detail')
}
