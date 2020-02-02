// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { axios } from './utils/request'
import { VueAxios } from './utils/axios'
import PageLoading from '@/components/PageLoading'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
// import './permission' // permission control
import './route_guard'
import './utils/filter' // global filter
import './components/global.less'

// import Keycloak from 'keycloak-js'

Vue.config.productionTip = false

// const kc = new Keycloak('/keycloak-dev.json')
// kc.init({ onLoad: 'login-required', checkLoginIframe: false, promiseType: 'native' })
//   .then((authenticated) => {
//     axios.interceptors.request.use(config => {
//       return new Promise((resolve, reject) => {
//         kc.updateToken(60)
//           .then(() => {
//             config.headers = { ...config.headers,
//               ...{
//                 Accept: 'application/json',
//                 Authorization: 'Bearer ' + kc.token
//               } }
//             resolve(config)
//           })
//           .catch(() => kc.logout())
//       })
//     })
//     window.g_kc = kc
//     // mount axios Vue.$http and this.$http
//     Vue.use({
//       vm: {},
//       install (Vue) {
//         Vue.use(VueAxios, axios)
//       }
//     })
//     Vue.use(PageLoading)
//     // 验证成功 并 开始创建Vue实例
//     authenticated && new Vue({
//       router,
//       store,
//       created: bootstrap,
//       render: h => h(App)
//     }).$mount('#app')
//   })
//   .catch(() => {
//     console.log('failed to login')
//   })
window.g_kc = {
  token: 'adfdsfsadfdsgdf'
}
Vue.use({
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, axios)
  }
})
Vue.use(PageLoading)
// 验证成功 并 开始创建Vue实例
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
