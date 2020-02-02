import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const info = (options) => {
  const body = getQueryParameters(options)
  console.log(body)
  const userInfo = {
    'id': '4291d7da9005377ec9aec4a71ea837f',
    'sessionId': body.session_id,
    'realm': body.realm,
    'name': body.name,
    'username': body.name,
    'password': '',
    'avatar': '/avatar2.jpg',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': body.name,
    'createTime': body.auth_time,
    'merchantCode': 'TLif2btpzg079h15bk',
    'deleted': 0,
    'roleId': body.name,
    'role': {}
  }
  const defultPermission = ['statistics', 'management', 'basicfile', '404', 'user', 'exceprion']
  const adminPermission = ['out_registration', 'permission']
  userInfo.role.permissionList = defultPermission
  if (body.name === 'admin') {
    userInfo.role.permissionList = defultPermission.concat(adminPermission)
  }
  return builder(userInfo)
}

Mock.mock(/\/user\/info/, 'get', info)
