import { axios } from '@/utils/request.js'

export function getCusList (parameter) {
  return axios({
    url: '/api/cus-list',
    method: 'get',
    params: parameter
  })
}
export function getBedList (parameter) {
  return axios({
    url: '/api/beds',
    method: 'get',
    params: parameter
  })
}

// 预约
export function getReservations (parameter) {
  return axios({
    url: '/api/reservations',
    method: 'get',
    params: parameter
  })
}
export function createReservation (parameter) {
  return axios({
    url: '/api/reservations',
    method: 'post',
    data: parameter
  })
}
export function getReservationInfo (parameter) {
  return axios({
    url: '/api/reservations/' + parameter,
    method: 'get'
  })
}

// 入住
export function getStayInList (parameter) {
  return axios({
    url: '/api/check-ins',
    method: 'get',
    params: parameter
  })
}
export function createStayIn (parameter) {
  return axios({
    url: '/api/check-ins',
    method: 'post',
    data: parameter
  })
}
export function getStayInInfo (parameter) {
  return axios({
    url: '/api/check-ins/' + parameter,
    method: 'get'
  })
}

// 退住
export function getOutList (parameter) {
  return axios({
    url: '/api/check-outs',
    method: 'get',
    params: parameter
  })
}
export function getBedOutInfo (parameter) {
  return axios({
    url: '/api/check-outs/' + parameter,
    method: 'get'
  })
}
export function createBedOut (parameter) {
  return axios({
    url: '/api/check-outs',
    method: 'post',
    data: parameter
  })
}

// 调换
export function getSwitchList (parameter) {
  return axios({
    url: '/api/switchs',
    method: 'get',
    params: parameter
  })
}
export function getSwitchInfo (parameter) {
  return axios({
    url: '/api/switchs/' + parameter,
    method: 'get'
  })
}
export function createSwitch (parameter) {
  return axios({
    url: '/api/check-ins/' + parameter.switch_id + '/switch',
    method: 'post',
    data: parameter
  })
}

// 导出
export function bedsExport (parameter) {
  return axios({
    path: '/api/beds/export',
    method: 'get',
    params: parameter
  })
}
export function reservationsExport (parameter) {
  return axios({
    path: '/api/reservations/export',
    method: 'get',
    params: parameter
  })
}
export function checkInsExport (parameter) {
  return axios({
    path: '/api/check-ins/export',
    method: 'get',
    params: parameter
  })
}
export function checkOutExport (parameter) {
  return axios({
    path: '/api/check-out/export',
    method: 'get',
    params: parameter
  })
}
export function bedSwitchExport (parameter) {
  return axios({
    path: '/api/bed-switch/export',
    method: 'get',
    params: parameter
  })
}
