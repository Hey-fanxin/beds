// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse, navIconBedActive, navIconLimitActive } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/statistics/bedsview',
    children: [
      // statistics 统计
      {
        path: '/statistics',
        component: RouteView,
        redirect: '/statistics/alldata',
        meta: { title: '统计', keepAlive: true, icon: bxAnaalyse, permission: [ 'statistics' ] },
        children: [
          {
            path: '/statistics/alldata',
            name: 'Alldata',
            component: () => import('@/views/statistics/Alldata'),
            meta: { title: '数据总览', keepAlive: true, permission: [ 'statistics' ] }
          },
          {
            path: '/statistics/bedsview',
            name: 'Bedsview',
            component: () => import('@/views/statistics/Bedsview'),
            meta: { title: '驿站视图', keepAlive: true, permission: [ 'statistics' ] }
          }
        ]
      },

      // management 床位管理
      {
        path: '/management',
        component: RouteView,
        meta: { title: '床位管理', icon: navIconBedActive, permission: [ 'management' ] },
        children: [
          {
            path: '/management/beds-reservation',
            name: 'BedsReservation',
            component: () => import('@/views/bedsManagement/BedsReservation'),
            meta: { title: '床位预约', keepAlive: true, permission: [ 'management' ] }
          },
          {
            path: '/management/beds-stay-in',
            name: 'BedsStayIn',
            component: () => import('@/views/bedsManagement/BedsStayIn'),
            meta: { title: '床位入住', keepAlive: true, permission: [ 'management' ] }
          },
          {
            path: '/management/beds-out',
            name: 'BedsOut',
            component: () => import('@/views/bedsManagement/BedsOut'),
            meta: { title: '床位退住', keepAlive: true, permission: [ 'management' ] }
          },
          {
            path: '/management/beds-switch',
            name: 'BedsSwitch',
            component: () => import('@/views/bedsManagement/BedsSwitch'),
            meta: { title: '床位调换', keeplAlive: true, permission: [ 'management' ] }
          },
          {
            path: '/management/beds-statistics',
            name: 'BedsStatistics',
            component: () => import('@/views/bedsManagement/BedsStatistics'),
            meta: { title: '床位统计表', keepAlive: true, permission: [ 'management' ] }
          }
        ]
      },

      // basic-file  基础档案
      {
        path: '/basic-file',
        component: PageView,
        meta: { title: '基础档案', icon: navIconLimitActive, permission: [ 'basicfile' ] },
        children: [
          // {
          //   path: '/list/table-list/:pageNo([1-9]\\d*)?',
          //   name: 'TableListWrapper',
          //   hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
          //   component: () => import('@/views/list/TableList'),
          //   meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
          // },
          {
            path: '/basic-file/station-file',
            name: 'StationFile',
            component: () => import('@/views/basicfile/StationFile'),
            meta: { title: '驿站管理', keepAlive: true, permission: [ 'basicfile' ] }
          },
          {
            path: '/basic-file/equipment-file',
            name: 'EquipmentFile',
            component: () => import('@/views/basicfile/EquipmentFile'),
            meta: { title: '设备管理', keepAlive: true, permission: [ 'basicfile' ] }
          },
          {
            path: '/basic-file/care-group-file',
            name: 'CareGroupFile',
            component: () => import('@/views/basicfile/CareGroupFile'),
            meta: { title: '照护组管理', keepAlive: true, permission: [ 'basicfile' ] }
          }
        ]
      },

      // go to out  register 外出登记
      {
        path: '/out-registration',
        component: RouteView,
        meta: { title: '外出登记', icon: 'profile', permission: [ 'out_registration' ] },
        children: [
          {
            path: '/out-registration/go-out',
            name: 'GoOut',
            component: () => import('@/views/out_registration/GoOut'),
            meta: { title: '外出登记表', permission: [ 'out_registration' ] }
          }
          // {
          //   path: '/profile/advanced',
          //   name: 'ProfileAdvanced',
          //   component: () => import('@/views/profile/advanced/Advanced'),
          //   meta: { title: '高级详情页', permission: [ 'profile' ] }
          // }
        ]
      },

      // permissionManagement
      {
        path: '/permission',
        component: PageView,
        meta: { title: '权限管理', icon: 'check-circle-o', permission: [ 'permission' ] },
        children: [
          {
            path: '/permission/user',
            name: 'User',
            component: () => import(/* webpackChunkName: "result" */ '@/views/permission/User'),
            meta: { title: '用户管理', keepAlive: false, hiddenHeaderContent: true, permission: [ 'permission' ] }
          },
          {
            path: '/permission/role',
            name: 'Role',
            component: () => import(/* webpackChunkName: "result" */ '@/views/permission/Role'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'permission' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/public',
    component: BasicLayout,
    children: [
      {
        path: '/statistics/bedsview/city-station-list',
        name: 'CityStationList',
        component: () => import('@/views/statistics/CityStationList'),
        meta: { title: '市区驿站列表', keepAlive: false, permission: [ 'statistics' ] }
      },
      {
        path: '/statistics/bedsview/city-station-list/station-info',
        name: 'CityStationInfo',
        component: () => import('@/views/statistics/CityStationInfo'),
        meta: { title: '驿站信息', keepAlive: false, permission: [ 'statistics' ] }
      },
      {
        path: '/management/beds-reservation/create-from',
        name: 'CreateReservation',
        component: () => import('@/views/bedsManagement/reservationChilderView/CreateReservation'),
        meta: { title: '创建床位预约', keepAlive: false, permission: [ 'management' ] }
      },
      {
        path: '/management/beds-reservation/view-reservation-info',
        name: 'ReservationInfo',
        component: () => import('@/views/bedsManagement/reservationChilderView/ReservationInfo'),
        meta: { title: '预约详情', keepAlive: false, permission: [ 'management' ] }
      },
      {
        path: '/management/beds-stay-in/create-from',
        name: 'CreateStayIn',
        component: () => import('@/views/bedsManagement/stayinChilderView/CreateStayIn'),
        meta: { title: '创建床位入住', keepAlive: false, permission: [ 'management' ] }
      },
      {
        path: '/management/beds-stay-in/view-stay-in-info',
        name: 'StayInInfo',
        component: () => import('@/views/bedsManagement/stayinChilderView/StayInInfo'),
        meta: { title: '入住详情', keepAlive: false, permission: [ 'management' ] }
      },
      {
        path: '/management/beds-out/create-from',
        name: 'CreateBedOut',
        component: () => import('@/views/bedsManagement/bedOutChilderView/CreateBedOut'),
        meta: { title: '创建床位退住', keepAlive: false, permission: [ 'management' ] }
      },
      {
        path: '/management/beds-out/out-info',
        name: 'OutInfo',
        component: () => import('@/views/bedsManagement/bedOutChilderView/OutInfo'),
        meta: { title: '退住详情', keepAlive: false, permission: [ 'management' ] }
      },
      {
        path: '/management/beds-switch/create-from',
        name: 'CreateBedSwitch',
        component: () => import('@/views/bedsManagement/switchChilderView/CreateBedSwitch'),
        meta: { title: '创建床位调换', keepAlive: false, permission: [ 'management' ] }
      },
      {
        path: '/management/beds-switch/switch-info',
        name: 'BedSwitchInfo',
        component: () => import('@/views/bedsManagement/switchChilderView/BedSwitchInfo'),
        meta: { title: '调换详情', keepAlive: false, permission: [ 'management' ] }
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
