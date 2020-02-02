import Mock from 'mockjs2'
import { builder, getQueryParameters, getBody } from '../util'

const cusList = (options) => {
  const query = getQueryParameters(options)
  if (!query['per-page']) query['per-page'] = 10
  if (!query['page']) query['page'] = 1
  const rs = {
    items: [],
    _meta: {}
  }
  for (let i = 0; i < 120; i++) {
    rs.items.push({
      ID: '123456__' + i,
      CNAME: '客户姓名__' + i,
      SEX: ['男', '女'][i % 2],
      AGE: i + '',
      CRED_NO: '130000000__' + i,
      CONTACT_PHONE: '123456789',
      CUS_TYPE: ['类型1', '类型2', '类型3'][i % 3],
      ETHNIC: ['满族', '汉族', '回族', '苗族'][i % 4]
    })
  }
  rs._meta = {
    totalCount: String(rs.items.length),
    pageCount: String(Math.ceil(rs.items.length / query['per-page'])),
    currentPage: query['page'],
    perPage: query['per-page']
  }
  return builder(rs)
}
const bedList = (options) => {
  const query = getQueryParameters(options)
  if (!query['per-page']) query['per-page'] = 10
  if (!query['page']) query['page'] = 1
  const rs = {
    items: [],
    _meta: {}
  }
  for (let i = 0; i < 130; i++) {
    rs.items.push({
      'id': 846209,
      'code': '846209__' + i,
      'name': '床位名称',
      'position': '床位置',
      'type': '床型',
      'status': i % 2,
      'occupation': (i % 3) + 1,
      'station_id': 53331541,
      'station_name': '驿站名称__' + i,
      'building_id': 13915818,
      'building_name': '楼宇名称',
      'room_id': -4794809,
      'room_name': '房间名称',
      'floor_id': 50579155,
      'floor_name': '楼层名称',
      'customer': {
        'ID': '8145721',
        'CNAME': '客户姓名',
        'SEX': ['男', '女'][i % 2],
        'AGE': 30,
        'ETHNIC': '民族',
        'BIRTHDAY': '2020-02-02',
        'CONTACT_PHONE': '联系手机',
        'CONTACT_TEL': 'culpa cupidatat tempor',
        'CONTACT_OTHER': 'velit in qui aliquip'
      },
      'in_date': '2014-12-14',
      'bed_in_id': 76222273,
      'price': [1900, 2000, 2100, 2200, 2300][i % 4]
    })
  }
  rs._meta = {
    totalCount: String(rs.items.length),
    pageCount: String(Math.ceil(rs.items.length / query['per-page'])),
    currentPage: query['page'],
    perPage: query['per-page']
  }
  return builder(rs)
}
const reservations = (options) => {
  const query = getQueryParameters(options)
  if (!query['per-page']) query['per-page'] = 10
  if (!query['page']) query['page'] = 1
  const list = {
    items: [],
    meta: {}
  }
  for (let i = 0; i <= 100; i++) {
    list.items.push({
      'id': '123',
      'order_number': '123456',
      'contact_name': '预约联系人__' + i,
      'contact_phone': '1366666666',
      'end_date': '2020-05-12',
      'approve_status': (i % 4) + '',
      'customer': {
        'CNAME': '客户姓名',
        'ID': '客户编号',
        'SEX': ['男', '女', '未知'][i % 3],
        'ETHNIC': ['满族', '汉族', '回族', '苗族'][i % 4],
        'AGE': 30,
        'CONTACT_PHONE': '13588888888',
        'CONTACT_TEL': '010-2134567',
        'CONTACT_OTHER': '无其他联系'
      },
      'station_name': '驿站名称--' + i
    })
  }
  list.meta = {
    totalCount: String(list.items.length),
    pageCount: String(Math.ceil(list.items.length / query['per-page'])),
    currentPage: query['page'],
    perPage: query['per-page']
  }
  return builder(list)
}
const createReservation = (options) => {
  const body = getBody(options)
  console.log(body, '创建新的床位预约时的请求参数')
  return builder({ id: 1 }, '', 200)
}
const getReservationInfo = (options) => {
  const _info = {
    reserve_data: {
      id: '1',
      cus_id: '11',
      contact_name: '预约联系人',
      contact_phone: '预约手机号',
      start_date: '开始时间',
      end_date: '结束时间',
      money_status: '1',
      remark: '备注',
      bed_id: '床位id',
      process_instance_id: '',
      order_number: '审批单号',
      creator_id: '',
      creator_name: '创建人姓名',
      approve_dept_name: '审批部门名称',
      approve_status: '2',
      create_date: '创建时间',
      update_date: '更新时间',
      station_name: '驿站名称',
      'customer': {
        'ID': '123456__',
        'CNAME': '客户姓名__',
        'SEX': '女',
        'ETHNIC': 'labore sed',
        'AGE': 35,
        'CONTACT_PHONE': '123456789',
        'CONTACT_TEL': '213214235',
        'CONTACT_OTHER': '无'
      },
      bed_name: '床位名称',
      room_name: '房间名称',
      floor_name: '楼层名称',
      building_id: '建筑id',
      building_name: '建筑物名称'
    },
    process_data: [
      {
        date: '2020-02-02',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-03',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-04',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-05',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      }
    ]
  }
  return builder(_info)
}
const getStayInList = (options) => {
  const query = getQueryParameters(options)
  console.log(query, '获取入住列表接口的参数')
  if (!query['per-page']) query['per-page'] = 10
  if (!query['page']) query['page'] = 1
  const _list = {
    items: [],
    _meta: {}
  }
  for (let i = 0; i <= 100; i++) {
    _list.items.push({
      id: '12345677',
      order_number: '231432412',
      contact_name: '入住联系人__' + i,
      contact_phone: '入住联系电话',
      in_date: '2020-05-12',
      approve_status: (i % 4) + '',
      customer: {
        ID: '123456__' + i,
        CNAME: '客户姓名__' + i,
        SEX: ['男', '女'][i % 2],
        CONTACT_PHONE: '123456789'
      },
      station_name: '驿站名称__' + i,
      room_name: '房间名称__' + i,
      bed_name: '床位名称__' + i
    })
  }
  _list._meta = {
    totalCount: String(_list.items.length),
    pageCount: String(Math.ceil(_list.items.length / query['per-page'])),
    currentPage: query['page'],
    perPage: query['per-page']
  }
  return builder(_list)
}
const createStayIn = (options) => {
  const query = getBody(options)
  console.log(query, '创建床位入住时的参数')
  return builder({ id: 1 }, '', 200)
}
const getStayInInfo = (options) => {
  const query = getQueryParameters(options)
  console.log(query, '获取入住详情时的参数')
  const _info = {
    reserve_data: {
      id: '1',
      cus_id: '11',
      contact_name: '入住联系人',
      contact_phone: '入住手机号',
      sign_date: '签约日期',
      in_date: '入住日期',
      meal_need: '1',
      include_status: '0',
      remark: '备注',
      bed_id: '床位id',
      process_instance_id: '',
      order_number: '审批单号',
      creator_id: '',
      creator_name: '创建人姓名',
      approve_dept_name: '审批部门名称',
      approve_status: '2',
      create_date: '创建时间',
      update_date: '更新时间',
      customer: {
        'ID': '123456__',
        'CNAME': '客户姓名__',
        'SEX': '男',
        'ETHNIC': 'labore sed',
        'AGE': 35,
        'CONTACT_PHONE': '123456789',
        'CONTACT_TEL': '213214235',
        'CONTACT_OTHER': '无'
      },
      station_name: '驿站名称',
      bed_name: '床位名称',
      room_name: '房间名称',
      floor_name: '楼层名称',
      building_id: '建筑id',
      building_name: '建筑物名称'
    },
    process_data: [
      {
        date: '2020-02-02',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-03',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-04',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-05',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      }
    ]
  }
  return builder(_info)
}
const getOutList = (options) => {
  const query = getQueryParameters(options)
  console.log(query, '获取退住列表时的参数')
  if (!query['per-page']) query['per-page'] = 10
  if (!query['page']) query['page'] = 1
  const _list = {
    items: [],
    _meta: {}
  }
  for (let i = 0; i <= 100; i++) {
    _list.items.push({
      'id': '1234567',
      'cus_id': '232',
      'out_date': '2020-02-05',
      'out_reason': (i % 5) + '',
      'remark': 'amet',
      'bed_id': 'culpa ut cillum occaecat ipsum',
      'process_instance_id': 'Excepteur ut minim',
      'creator_id': 'dolor id incididunt laborum in',
      'creator_name': 'Excepteur mollit ut',
      'approve_dept_name': 'anim sunt commodo enim eu',
      'approve_status': (i % 4) + '',
      'create_date': 'commodo proident',
      'update_date': '2020-02-03',
      'bed_in_id': '1223',
      'approve_agree_date': null,
      'order_number': '32453253432',
      'code': '32412234',
      'bed': {
        'id': '32143',
        'code': '321412',
        'name': '床位名称__' + i,
        'room_id': '23321312',
        'bed_position': 'cillum m',
        'remark': 'laborum dolore sit esse',
        'status': 'nulla sit ut',
        'type': 'pariatur sed veniam sit do',
        'price': '2100',
        'create_date': '2020-03-05',
        'update_date': '2020-03-05'
      },
      'station_name': '驿站名称__' + i,
      'customer': {
        'ID': '123456__' + i,
        'CNAME': '客户姓名__' + i,
        'SEX': ['男', '女'][i % 2],
        'ETHNIC': 'labore sed',
        'AGE': 35,
        'CONTACT_PHONE': '123456789',
        'CONTACT_TEL': '213214235',
        'CONTACT_OTHER': '无'
      },
      'bed_name': '床位名称__' + i
    })
  }
  _list._meta = {
    totalCount: String(_list.items.length),
    pageCount: String(Math.ceil(_list.items.length / query['per-page'])),
    currentPage: query['page'],
    perPage: query['per-page']
  }
  return builder(_list)
}
const getBedOutInfo = (options) => {
  const query = getQueryParameters(options)
  console.log(query, '获取床位退住详情时的参数')
  const _info = {
    reserve_data: {
      'id': 'sint',
      'cus_id': 'eu qui magna quis',
      'out_date': '2020-02-02',
      'out_reason': '1',
      'remark': 'elit',
      'bed_id': 'sit',
      'process_instance_id': 'proident reprehenderit aute',
      'creator_id': 'sint nostrud dolor',
      'creator_name': 'reprehenderit ullamco in',
      'approve_dept_name': '所在部门',
      'approve_status': 'nostrud nulla laboris officia',
      'create_date': 'aliquip anim magna esse laboris',
      'update_date': 'ipsum eiusmod',
      'bed_in_id': 'ut',
      'approve_agree_date': null,
      'order_number': '12345667',
      'customer': {
        'ID': 'ipsum ex ut laborum non',
        'CNAME': '客户姓名',
        'SEX': '女',
        'ETHNIC': '民族',
        'AGE': '34',
        'CONTACT_PHONE': 'cillum ipsum dolore ex',
        'CONTACT_OTHER': 'fugiat aliqua',
        'CONTACT_TEL': 'id culpa eiusmod labore'
      },
      'station_status': 'ea in nisi irure',
      'station_name': '驿站名称',
      'bed_name': '床位名称',
      'bed_status': 'minim consectetur ut reprehenderit',
      'room_name': '房间名称',
      'room_status': 'voluptate',
      'floor_name': '楼层名称',
      'floor_status': 'Ut deserunt sed quis eu',
      'building_id': 'pariatur nulla culpa',
      'building_name': '楼宇名称',
      'building_status': 57679139.22089335
    },
    process_data: [
      {
        date: '2020-02-02',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-03',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-04',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-05',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      }
    ]
  }
  return builder(_info)
}
const createBedOut = (options) => {
  const query = getBody(options)
  console.log(query, '创建床位退住时的参数')
  return builder({ id: 1 }, '', 200)
}
const getSwitchList = (options) => {
  const query = getQueryParameters(options)
  console.log(query, '获取床位调换列表时的参数')
  if (!query['per-page']) query['per-page'] = 10
  if (!query['page']) query['page'] = 1
  const _list = {
    items: [],
    _meta: {}
  }
  for (let i = 0; i <= 100; i++) {
    _list.items.push({
      'id': '12345677',
      'cus_id': '12345677',
      'standard_price_diff': 'veniam eu reprehenderit off',
      'discount_price_diff': 'et',
      'remark': 'laborum aute',
      'out_bed_id': 'non et ullamco ip',
      'in_bed_id': 'cupidatat et',
      'process_instance_id': 'ullamco Ut',
      'creator_id': 'dolor sunt',
      'creator_name': 'ut pariatur',
      'approve_dept_name': 'ut velit',
      'approve_status': (i % 4) + '',
      'create_date': 'commodo mollit in amet',
      'update_date': 'enim in',
      'bed_in_id': 'ut ad',
      'order_number': '231432412',
      'in_code': 'voluptate id in',
      'out_code': 'velit adipisicing labor',
      'outBed': {
        'id': 'dolore consequat aute',
        'code': 'adipisicing aliquip est',
        'name': '调出-床位名称',
        'room_id': 'reprehenderit sunt tempor nostrud',
        'bed_position': 'irure ex proident',
        'remark': 'esse dolor ex',
        'status': 'cupidatat eu veniam nostrud',
        'type': 'dolore laborum Ut',
        'price': 'veniam amet ipsum fugiat',
        'create_date': 'in Ut',
        'update_date': 'velit do'
      },
      'inBed': {
        'id': 'et e',
        'code': 'sint irure officia ut',
        'name': '调入-床位名称',
        'room_id': 'tempor aliqua aute',
        'bed_position': 'aliqua inc',
        'remark': 'in commodo',
        'status': 'labore',
        'type': '',
        'price': 'irure quis',
        'create_date': 'sed id Lorem eiusmod',
        'update_date': 'eu'
      },
      'customer': {
        'ID': 'ut ex minim',
        'CNAME': '客户姓名__' + i,
        'SEX': 'id laboris mollit est',
        'ETHNIC': 'nostrud laborum dolore ullamco',
        'AGE': '',
        'CONTACT_PHONE': '联系手机',
        'CONTACT_TEL': 'c',
        'CONTACT_OTHER': 'nos'
      },
      'in_station_name': '调入-驿站名称',
      'out_station_name': '调出-驿站名称',
      'switch_date': '2020-02-02'
    })
  }
  _list._meta = {
    totalCount: String(_list.items.length),
    pageCount: String(Math.ceil(_list.items.length / query['per-page'])),
    currentPage: query['page'],
    perPage: query['per-page']
  }
  return builder(_list)
}
const createSwitch = (options) => {
  const query = getBody(options)
  console.log(query, '创建床位调换时的参数')
  return builder({ id: 1 }, '', 200)
}
const getSwitchInfo = (options) => {
  const query = getQueryParameters(options)
  console.log(query, '获取床位调换时的参数')
  const _info = {
    reserve_data: {
      'id': '1234567',
      'cus_id': '123123213',
      'standard_price_diff': '0',
      'discount_price_diff': '0',
      'remark': 'proident est',
      'out_bed_id': '1',
      'in_bed_id': '2',
      'process_instance_id': '123',
      'creator_id': '1',
      'creator_name': 'cupidatat consectetur',
      'approve_dept_name': '所在部门',
      'approve_status': '1',
      'create_date': '2020-06-06',
      'update_date': '2020-06-06',
      'bed_in_id': '1',
      'order_number': '213213123123123',
      'customer': {
        'ID': '213',
        'CNAME': '客户姓名',
        'SEX': '男',
        'ETHNIC': '1231243657890',
        'AGE': '23',
        'CONTACT_PHONE': '23213123',
        'CONTACT_TEL': '98763421',
        'CONTACT_OTHER': '23456'
      },
      'out_station_data': {
        'station_status': '2',
        'station_name': '驿站名称',
        'bed_name': '床位名称',
        'bed_status': '3',
        'room_name': '房间名称',
        'room_status': '1',
        'floor_name': '楼层名称',
        'floor_status': '2',
        'building_id': '123',
        'building_name': '楼宇名称',
        'building_status': 1
      },
      'in_station_data': {
        'station_status': '2',
        'station_name': '驿站名称',
        'bed_name': '床位名称',
        'bed_status': '3',
        'room_name': '房间名称',
        'room_status': '1',
        'floor_name': '楼层名称',
        'floor_status': '2',
        'building_id': '123',
        'building_name': '楼宇名称',
        'building_status': 1
      },
      'switch_date': '2020-09-09'
    },
    process_data: [
      {
        date: '2020-02-02',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-03',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-04',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      },
      {
        date: '2020-02-05',
        type: '审批中',
        name: '上司',
        avatar: 'aaaa'
      }
    ]
  }
  return builder(_info)
}
Mock.mock(/\/api\/cus-list/, 'get', cusList)
Mock.mock(/\/api\/beds/, 'get', bedList)

// 预约
Mock.mock(/\/api\/reservations\/\d+/, 'get', getReservationInfo)
Mock.mock(/\/api\/reservations/, 'get', reservations)
Mock.mock(/\/api\/reservations/, 'post', createReservation)

// 入住
Mock.mock(/\/api\/check-ins\/\d+/, 'get', getStayInInfo)
Mock.mock(/\/api\/check-ins/, 'get', getStayInList)
Mock.mock(/\/api\/check-ins/, 'post', createStayIn)

// 退住
Mock.mock(/\/api\/check-outs\/\d+/, 'get', getBedOutInfo)
Mock.mock(/\/api\/check-outs/, 'get', getOutList)
Mock.mock(/\/api\/check-outs/, 'post', createBedOut)

// 调换
Mock.mock(/\/api\/switchs\/\d+/, 'get', getSwitchInfo)
Mock.mock(/\/api\/switchs/, 'get', getSwitchList)
Mock.mock(/\/api\/check-ins\/\d+\/switch/, 'post', createSwitch)
