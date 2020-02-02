<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <FromCom
      :data="formData"
      @submit="formSubmit"
      @resetFields="formResetFields"
      @create="formCreate"
      @_export="formExport"
    />
    <a-table
      :columns="columns"
      :dataSource="list"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      style="marginTop:12px;"
    >
      <span slot="approve_status_name" slot-scope="approve_status_name, record" :class="'table-column-approve-status status-' + record.approve_status">
        {{ approve_status_name }}
      </span>
      <a slot="operation" slot-scope="text, record" @click="openReservationInfo(record)">查看详情</a>
    </a-table>
  </a-card>
</template>

<script>
import FromCom from '@/components/FromSearch/InputSearch'
import { getReservations } from '@/api/management'

const columns = [
  { title: '审单批号', dataIndex: 'order_number' },
  { title: '用户姓名', dataIndex: 'customer.CNAME' },
  { title: '联系手机', dataIndex: 'customer.CONTACT_PHONE' },
  { title: '驿站名称', dataIndex: 'station_name' },
  { title: '预约结束日期', dataIndex: 'end_date' },
  { title: '预约联系人', dataIndex: 'contact_name' },
  { title: '联系电话', dataIndex: 'contact_phone' },
  { title: '表单状态', dataIndex: 'approve_status_name', scopedSlots: { customRender: 'approve_status_name' } },
  { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
]
export default {
  name: 'BedsReservation',
  components: {
    FromCom
  },
  data () {
    return {
      formData: [
        { type: 'date', label: '预约结束日期', labelStr: 'date' },
        { type: 'input', label: '客户姓名', labelStr: 'cus_name' },
        { type: 'inputNumber', label: '联系手机', labelStr: 'cus_phone' },
        {
          type: 'select',
          label: '驿站名称',
          labelStr: 'station_code',
          options: this.$store.state['stations']
        },
        { type: 'input', label: '房间名称', labelStr: 'room_name' },
        { type: 'input', label: '床位名称', labelStr: 'bed_name' },
        {
          type: 'select',
          label: '表单状态',
          labelStr: 'approve_status',
          options: this.$store.state['approve_status']
        },
        { type: 'input', label: '预约联系人', labelStr: 'contact_name' },
        { type: 'inputNumber', label: '联系电话', labelStr: 'contact_phone' }
      ],
      columns,
      pagination: {
        pageSizeOptions: ['10', '15', '20', '25'],
        showTotal: total => `共 ${total} 条`,
        showSizeChanger: true,
        pageSize: 10,
        current: 1
      },
      param: {},
      list: [],
      loading: false
    }
  },
  mounted () {
    this.formSearch()
  },
  methods: {
    formSubmit: function (values) {
      let _param = {}
      for (let name in values) {
        if (values['date']) {
          _param['start_date'] = values.date[0].format('YYYY-MM-DD')
          _param['end_date'] = values.date[1].format('YYYY-MM-DD')
        } else if (values[name]) {
          _param[name] = values[name]
        }
      }
      this.param = Object.assign({}, _param)
      this.formSearch(this.param)
    },
    formResetFields: function () {
      this.param = Object.assign({})
    },
    formCreate: function () {
      this.$router.push({
        path: '/management/beds-reservation/create-from'
      })
    },
    formExport: function (form) {
      console.log('export')
    },
    formSearch: function (param) {
      this.loading = true
      getReservations(param).then(rs => {
        this.loading = false
        this.pagination.current = Number(rs.result.meta.currentPage)
        this.pagination.pageSize = Number(rs.result.meta.perPage)
        this.pagination.total = Number(rs.result.meta.totalCount)
        let arr = []
        rs.result.items.forEach((item, index) => {
          arr.push(Object.assign(
            {},
            item,
            {
              key: String(index),
              approve_status_name: this.$store.state.approve_status.find(o => o.value == item.approve_status).label
            }
          ))
        })
        this.list = arr.sort((n1, n2) => {
          return n1.approve_status - n2.approve_status
        })
      })
    },
    handleTableChange: function (pagination, filters, sorter) {
      if (pagination.pageSize !== this.pagination.pageSize) {
        this.pagination.pageSize = pagination.pageSize
        return false
      }
      this.loading = true
      if (pagination.current !== this.pagination.current) {
        const _param = {
          'page': pagination.current,
          'per-page': pagination.pageSize
        }
        const param = Object.assign({}, _param, this.param)
        this.formSearch(param)
      }
    },
    openReservationInfo: function (record) {
      this.$router.push({
        path: '/management/beds-reservation/view-reservation-info',
        query: {
          id: record.id
        }
      })
    }
  }
}
</script>
