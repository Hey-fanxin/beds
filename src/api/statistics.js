import { axios } from '@/utils/request.js'

export function getTotalAssets (parameter) {
  return axios({
    url: '/api/statistics/resource',
    method: 'get',
    params: parameter
  })
}
export function getStatisticsTodo (parameter) {
  return axios({
    url: '/api/statistics/todo',
    method: 'get',
    params: parameter
  })
}
export function getStatisticsBedsUsage (parameter) {
  return axios({
    url: '/api/statistics/bed-usage',
    method: 'get',
    params: parameter
  })
}
export function getStatisticsBedsUsageByCity (parameter) {
  return axios({
    url: '/api/statistics/bed-usage-by-city',
    method: 'get',
    params: parameter
  })
}
export function getStationList (parameter) {
  return axios({
    url: '/api/stations',
    method: 'get',
    params: parameter
  })
}
export function getStationsInfo (parameter) {
  return axios({
    url: '/api/stations/' + parameter,
    method: 'get'
  })
}
export function getBuildingsInfo (parameter) {
  return axios({
    url: '/api/buildings/' + parameter,
    method: 'get'
  })
}
export function getFloorsInfo (parameter) {
  return axios({
    url: '/api/floors/' + parameter,
    method: 'get'
  })
}
export function getRoomsInfo (parameter) {
  return axios({
    url: '/api/rooms/' + parameter,
    method: 'get'
  })
}
export function getBedsInfo (parameter) {
  return axios({
    url: '/api/beds/' + parameter,
    method: 'get'
  })
}
