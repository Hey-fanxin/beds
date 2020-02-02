import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const usageByCity = (option) => {
  const body = getQueryParameters(option)
  const mapData = {
    now: [
      { city: '北京', total: 50, busy: 30 },
      { city: '杭州', total: 10, busy: 3 },
      { city: '温州', total: 20, busy: 7 },
      { city: '丽江', total: 30, busy: 10 }
    ]
  }
  if (body['with-history'] && body['with-history'] === 1) {
    mapData.history = [
      {
        city: 'beijing',
        item: {
          month: '12',
          total: 40,
          busy: 25
        }
      }
    ]
  }
  return builder(mapData)
}
const cityStationList = (option) => {
  const body = getQueryParameters(option)
  console.log(body, 'city station list body')
  const data = [
    {
      name: '海淀远大东社区养老服务驿站',
      address: '北京市-北京市-海淀区-远大园六区 6号楼2F',
      type: '交付使用中',
      beds_total: 22,
      available: 14,
      used: 6
    },
    {
      name: '海淀远大东社区养老服务驿站',
      address: '北京市-北京市-海淀区-远大园六区 6号楼2F',
      type: '交付使用中',
      beds_total: 22,
      available: 14,
      used: 6
    }
  ]
  return builder(data)
}

Mock.mock(/\/api\/beds\/usage-by-city/, 'get', usageByCity)
Mock.mock(/\/api\/beds\/city-station-list/, 'get', cityStationList)
