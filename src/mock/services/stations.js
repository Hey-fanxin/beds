import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const stationInfo = (option) => {
  const body = getQueryParameters(option)
  const info = {
    serial_id: 12345667890,
    address: body.address,
    state: '交付使用中',
    price_rage: {
      max: 2200,
      min: 1800
    },
    total_beds: 72,
    total_room: 23,
    remaining_beds: 12,
    remaining_room: 8
  }
  return builder(info)
}
Mock.mock(/\/api\/beds\/station-info/, 'get', stationInfo)
