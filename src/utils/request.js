import Vue from 'vue'
import _axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'

import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = _axios.create({
  // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    console.log(token)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

export { service as axios }
