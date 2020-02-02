import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  state: {
    out_reason: [
      { label: '服务不满意', value: '0' },
      { label: '合同到期', value: '2' },
      { label: '服务终止', value: '1' },
      { label: '老人离世', value: '3' },
      { label: '其他', value: '4' }
    ],
    approve_status: [
      { label: '审批中', value: '0' },
      { label: '审批通过', value: '2' },
      { label: '审批拒绝', value: '1' },
      { label: '已取消', value: '3' }
    ],
    stations: [
      { label: '西红门顾养', value: '1' },
      { label: '海淀春梦园', value: '2' },
      { label: '海淀社区1', value: '3' }
    ],
    meal_need: [
      { label: '正常餐', value: '0' },
      { label: '糖尿病餐', value: '1' },
      { label: '流质餐', value: '2' }
    ],
    approve_dept_name: [
      { label: '客服', value: '0' },
      { label: '照护', value: '1' },
      { label: '财务', value: '2' }
    ],
    include_status: [
      { label: '否', value: '0' },
      { label: '是', value: '1' }
    ],
    deposit: [
      { label: '未交', value: '0' },
      { label: '已交', value: '1' }
    ],
    occupation: [
      { label: '入住中', value: '2' },
      { label: '预约中', value: '3' },
      { label: '未入住', value: '1' }
    ]
  },
  mutations: {

  },
  actions: {

  },
  getters
})
