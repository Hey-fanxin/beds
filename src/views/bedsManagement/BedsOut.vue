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
import { getOutList } from '@/api/management'

const columns = [
  { title: '审单批号', dataIndex: 'order_number' },
  { title: '客户姓名', dataIndex: 'customer.CNAME' },
  { title: '联系手机', dataIndex: 'customer.CONTACT_PHONE' },
  { title: '驿站名称', dataIndex: 'station_name' },
  { title: '床位名称', dataIndex: 'bed_name' },
  { title: '退住日期', dataIndex: 'out_date' },
  { title: '退住原因', dataIndex: 'out_reason' },
  { title: '表单状态', dataIndex: 'approve_status_name', scopedSlots: { customRender: 'approve_status_name' } },
  { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
]
export default {
  name: 'BedsOut',
  components: {
    FromCom
  },
  data () {
    return {
      formData: [
        { type: 'date', label: '退住日期', labelStr: 'date' },
        { type: 'input', label: '客户姓名', labelStr: 'cus_name' },
        { type: 'inputNumber', label: '联系手机', labelStr: 'cus_phone' },
        {
          type: 'select',
          label: '驿站名称',
          labelStr: 'station_code',
          options: this.$store.state['stations']
        },
        { type: 'input', label: '床位名称', labelStr: 'bed_name' },
        {
          type: 'select',
          label: '退住原因',
          labelStr: 'out_reason',
          options: this.$store.state['out_reason']
        },
        {
          type: 'select',
          label: '表单状态',
          labelStr: 'approve_status',
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
        path: '/management/beds-out/create-from'
      })
    },
    formExport: function (form) {
      console.log('export')
    },
    formSearch: function (param) {
      this.loading = true
      getOutList(param).then(rs => {
        this.loading = false
        this.pagination.current = Number(rs.result._meta.currentPage)
        this.pagination.pageSize = Number(rs.result._meta.perPage)
        this.pagination.total = Number(rs.result._meta.totalCount)
        let arr = []
        rs.result.items.forEach((item, index) => {
          arr.push(Object.assign(
            {},
            item,
            {
              key: String(index),
              out_reason: this.$store.state['out_reason'].find(o => o.value == item.out_reason).label,
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
    openInfo: function (record) {
      this.$router.push({
        path: '/management/beds-out/out-info',
        query: {
          id: record.id
        }
      })
    }
  }
}
</script>
