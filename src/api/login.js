import { axios } from '@/utils/request'

export function getInfo (option) {
  return axios({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
      name: option.tokenParsed && option.tokenParsed.preferred_username,
      auth_time: option.tokenParsed && option.tokenParsed.auth_time,
      session_id: option.sessionId,
      realm: option.realm
    }
  })
}

export function logout () {
  return new Promise((resolve, reject) => {
    window.g_kc.logout()
    resolve()
  })
}
