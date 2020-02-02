import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const getTotalAssets = (options) => {
  const _rs = {
    'customer': {
      'total': 3456,
      'cities': [
        {
          'name': '北京',
          'total': '2345'
        }, {
          'name': '杭州',
          'total': '2345'
        }, {
          'name': '德州',
          'total': '2345'
        }, {
          'name': '丽江',
          'total': '2345'
        }
      ]
    },
    'station': {
      'total': 44,
      'in_progress': '23',
      'enable': '21',
      'cities': [
        {
          'name': '北京',
          'total': '10'
        },
        {
          'name': '杭州',
          'total': '4'
        },
        {
          'name': '德州',
          'total': '1'
        },
        {
          'name': '丽江',
          'total': '7'
        }
      ]
    },
    'bed': {
      'total': '45678',
      'idle': '12345',
      'busy': 345567,
      'cities': [
        {
          'name': '北京',
          'idle': '213',
          'busy': '321',
          'total': 456
        },
        {
          'name': '杭州',
          'idle': '213',
          'busy': '321',
          'total': 456
        },
        {
          'name': '德州',
          'idle': '213',
          'busy': '321',
          'total': 456
        },
        {
          'name': '丽江',
          'idle': '213',
          'busy': '321',
          'total': 456
        }
      ]
    },
    'device': {
      'total': '98765'
    }
  }
  return builder(_rs)
}
const getStatisticsTodo = (options) => {
  const _rs = {
    reservation: 23,
    check_in: 132,
    check_out: 7,
    switch: 12
  }
  return builder(_rs)
}
const getStatisticsBedsUsage = (options) => {
  const _rs = {
    usage: 45,
    total: 3232,
    check_in: 1344,
    reservation: 2351
  }
  return builder(_rs)
}
const getStatisticsBedsUsageByCity = (options) => {
  const _rs = {
    now: [],
    history: []
  }
  for (let i = 0; i < 10; i++) {
    _rs.now.push({
      city: '北京',
      total: 130,
      busy: 123
    })
    _rs.history.push({
      city: '北京',
      items: [
        { month: 'Jan', total: 67, busy: 56 },
        { month: 'Feb', total: 69, busy: 63 },
        { month: 'Mar', total: 73, busy: 70 },
        { month: 'Apr', total: 78, busy: 75 },
        { month: 'May', total: 85, busy: 79 },
        { month: 'Jun', total: 90, busy: 87 },
        { month: 'Jul', total: 92, busy: 89 },
        { month: 'Aug', total: 94, busy: 90 },
        { month: 'Sep', total: 97, busy: 93 },
        { month: 'Oct', total: 102, busy: 98 },
        { month: 'Nov', total: 112, busy: 108 },
        { month: 'Dec', total: 130, busy: 116 }
      ]
    })
  }
}
const getStationList = (options) => {
  const query = getQueryParameters(options)
  console.log(query, '获取城市驿站列表时的参数')
  if (!query['per-page']) query['per-page'] = 10
  if (!query['page']) query['page'] = 1
  const _rs = {
    items: [
      {
        'id': 5458509704339676,
        'code': '12324456',
        'name': '海淀元到大东社区养老服务驿站',
        'province': '北京市',
        'city': '北京市',
        'area': '海淀区',
        'address': '远大东社区103号4号楼3F',
        'remark': '备注',
        'creator_name': '创建人姓名',
        'create_date': '2007-04-12',
        'status': '建设中',
        'bed_count': {
          'disable': 12,
          'busy': 12,
          'idle': 12
        },
        'building_count': 8
      },
      {
        'id': 5458509704339676,
        'code': '12324456',
        'name': '海淀元到大东社区养老服务驿站',
        'province': '北京市',
        'city': '北京市',
        'area': '海淀区',
        'address': '远大东社区103号4号楼3F',
        'remark': '备注',
        'creator_name': '创建人姓名',
        'create_date': '2007-04-12',
        'status': '已启用',
        'bed_count': {
          'disable': 12,
          'busy': 12,
          'idle': 12
        },
        'building_count': 8
      },
      {
        'id': 5458509704339676,
        'code': '12324456',
        'name': '海淀元到大东社区养老服务驿站',
        'province': '北京市',
        'city': '北京市',
        'area': '海淀区',
        'address': '远大东社区103号4号楼3F',
        'remark': '备注',
        'creator_name': '创建人姓名',
        'create_date': '2007-04-12',
        'status': '已停用',
        'bed_count': {
          'disable': 12,
          'busy': 12,
          'idle': 12
        },
        'building_count': 8
      }
    ],
    _links: {
      'self': {
        'href': 'offi'
      }
    }
  }
  _rs._meta = {
    'totalCount': String(_rs.items.length),
    'pageCount': String(Math.ceil(_rs.items.length / query['per-page'])),
    'currentPage': query['page'],
    'perPage': query['per-page']
  }
  return builder(_rs)
}
const getStationsInfo = (options) => {
  const _rs = {
    'id': 76163812,
    'code': '76163812',
    'name': '海淀元到大东社区养老服务驿站',
    'province': '所属省',
    'city': '所属城市',
    'area': '所属区县',
    'address': '远大东社区103号4号楼3F',
    'remark': ')mHGM4',
    'creator_name': 'sPzDL',
    'create_date': '1984-04-22 06:10:42',
    'status': '已启用',
    'bed_count': {
      'disable': 12,
      'busy': 6,
      'idle': 6
    },
    'buildings': [
      {
        'id': 3519727748684328,
        'code': 'FNqY%C',
        'name': 'rTfF@',
        'station_id': null,
        'status': 'SD3Qp',
        'remark': 'iUhJwps',
        'create_date': '2012-03-25 08:54:54'
      },
      {
        'id': 7603130560474192,
        'code': 'C13*1oT',
        'name': ')bQ96qv',
        'station_id': null,
        'status': 'W4DeR9',
        'remark': 'ADFT$',
        'create_date': '2015-05-23 09:47:33'
      },
      {
        'id': 367822693958520,
        'code': '8Vn^P',
        'name': 'sjLz',
        'station_id': null,
        'status': '[b4R$',
        'remark': '@Zy1',
        'create_date': '2017-01-31 07:27:46'
      }
    ],
    'room_count': 40,
    'price': {
      'min': 1800,
      'max': 2300
    }
  }
  return builder(_rs)
}
const getBuildingsInfo = (options) => {
  const _rs = {}
  return builder(_rs)
}
const getFloorsInfo = (options) => {
  const _rs = {}
  return builder(_rs)
}
const getRoomsInfo = (options) => {
  const _rs = {}
  return builder(_rs)
}
const getBedsInfo = (options) => {
  const _rs = {}
  return builder(_rs)
}
Mock.mock(/\/api\/statistics\/resource/, 'get', getTotalAssets)
Mock.mock(/\/api\/statistics\/todo/, 'get', getStatisticsTodo)
Mock.mock(/\/api\/statistics\/bed-usage/, 'get', getStatisticsBedsUsage)
Mock.mock(/\/api\/statistics\/bed-usage-by-city/, 'get', getStatisticsBedsUsageByCity)

Mock.mock(/\/api\/stations\/\d+/, 'get', getStationsInfo)
Mock.mock(/\/api\/stations/, 'get', getStationList)

Mock.mock(/\/api\/buildings\/\d+/, 'get', getBuildingsInfo)
Mock.mock(/\/api\/floors\/\d+/, 'get', getFloorsInfo)
Mock.mock(/\/api\/rooms\/\d+/, 'get', getRoomsInfo)
Mock.mock(/\/api\/beds\/\d+/, 'get', getBedsInfo)
