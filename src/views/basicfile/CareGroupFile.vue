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
      <a slot="operation" slot-scope="text, record" @click="openInfo(record)">查看详情</a>
    </a-table>
  </a-card>
</template>
<script>
import FromCom from '@/components/FromSearch/InputSearch'
import { getSwitchList } from '@/api/management'

const columns = [
  { title: '审单批号', dataIndex: 'order_number' },
  { title: '客户姓名', dataIndex: 'cus_name' },
  { title: '联系手机', dataIndex: 'phone_num' },
  { title: '调换时间', dataIndex: 'switch_date' },
  { title: '调出-驿站名称', dataIndex: 'out_station_name' },
  { title: '调出-床位名称', dataIndex: 'out_bed' },
  { title: '调入-驿站名称', dataIndex: 'in_station_name' },
  { title: '调入-床位名称', dataIndex: 'in_bed' },
  { title: '表单状态', dataIndex: 'approve_status_name', scopedSlots: { customRender: 'approve_status_name' } },
  { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
]
export default {
  name: 'CareGroupFile',
  components: {
    FromCom
  },
  data () {
    return {
      formData: [
        { type: 'date', label: '调换日期', labelStr: 'date' },
        { type: 'input', label: '客户姓名', labelStr: 'name' },
        { type: 'inputNumber', label: '联系手机', labelStr: 'phone' },
        {
          type: 'select',
          label: '调出驿站名称',
          labelStr: 'out_station_code',
          options: this.$store.state['stations']
        },
        { type: 'input', label: '调出房间名称', labelStr: 'out_room_name' },
        { type: 'input', label: '调出床位名称', labelStr: 'out_bed_name' },
        {
          type: 'select',
          label: '调入驿站名称',
          labelStr: 'in_station_code',
          options: this.$store.state['stations']
        },
        { type: 'input', label: '调入房间名称', labelStr: 'in_room_name' },
        { type: 'input', label: '调入床位名称', labelStr: 'in_bed_name' },
        {
          type: 'select',
          label: '表单状态',
          labelStr: 'approve_status_code',
          options: this.$store.state['approve_status']
        }
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
        path: '/management/beds-switch/create-from'
      })
    },
    formExport: function (form) {
      console.log('export')
    },
    formSearch: function (param) {
      this.loading = true
      getSwitchList(param).then(rs => {
        this.loading = false
        this.pagination.current = Number(rs.result._meta.currentPage)
        this.pagination.pageSize = Number(rs.result._meta.perPage)
        this.pagination.total = Number(rs.result._meta.totalCount)
        rs.result.items.forEach(item => {
          item.approve_status_name = this.$store.state.approve_status.find(o => o.value == item.approve_status).label
        })
        this.list = rs.result.items
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
    openInfo: function (record) {
      this.$router.push({
        path: '/management/beds-switch/switch-info',
        query: {
          id: record.id
        }
      })
    }
  }
}
</script>
