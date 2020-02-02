<template>
  <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
    <FromCom
      :data="formData"
      @submit="formSubmit"
      @resetFields="formResetFields"
      hideCreateBtn
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
      <a slot="room_name" slot-scope="text, record" @click="openInfo(record)">{{ text }}</a>
    </a-table>
  </a-card>
</template>

<script>
import FromCom from '@/components/FromSearch/InputSearch'
import { getBedList } from '@/api/management'

const columns = [
  { title: '驿站名称', dataIndex: 'station_name' },
  { title: '楼宇名称', dataIndex: 'building_name' },
  { title: '楼层名称', dataIndex: 'floor_name' },
  { title: '房间名称', dataIndex: 'room_name', scopedSlots: { customRender: 'room_name' } },
  { title: '床位名称', dataIndex: 'name' },
  { title: '照护组', dataIndex: 'care_group' },
  { title: '入住状态', dataIndex: 'occupation_name' },
  { title: '入住日期', dataIndex: 'in_date' },
  { title: '客户姓名', dataIndex: 'customer.CNAME' },
  { title: '联系手机', dataIndex: 'customer.CONTACT_PHONE' },
  { title: '性别', dataIndex: 'customer.SEX' }
]
export default {
  name: 'BedsStatistics',
  components: {
    FromCom
  },
  data () {
    return {
      formData: [
        {
          type: 'select',
          label: '驿站名称',
          labelStr: 'station_id',
          options: this.$store.state['stations']
        },
        { type: 'input', label: '房间名称', labelStr: 'room_name' },
        { type: 'input', label: '床位名称', labelStr: 'bed_name' },
        // { type: 'input', label: '照护组', labelStr: 'care_group' },
        {
          type: 'select',
          label: '入住状态',
          labelStr: 'occupation',
          options: this.$store.state['occupation']
        },
        { type: 'date', label: '入住日期', labelStr: 'date' },
        { type: 'input', label: '客户姓名', labelStr: 'customer_name' },
        { type: 'inputNumber', label: '联系手机', labelStr: 'customer_phone' }
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
          _param['check_in_begin_date'] = values.date[0].format('YYYY-MM-DD')
          _param['check_in_end_date'] = values.date[1].format('YYYY-MM-DD')
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
    formExport: function (form) {
      console.log('export')
    },
    formSearch: function (param) {
      this.loading = true
      getBedList(param).then(rs => {
        this.loading = false
        this.pagination.current = Number(rs.result._meta.currentPage)
        this.pagination.pageSize = Number(rs.result._meta.perPage)
        this.pagination.total = Number(rs.result._meta.totalCount)
        var arr = []
        rs.result.items.forEach((item, index) => {
          arr.push(Object.assign(
            {},
            item,
            {
              key: String(index),
              occupation_name: this.$store.state.occupation.find(o => o.value == item.occupation).label
            }
          ))
        })
        this.list = arr
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
        path: '/management/beds-reservation/view-reservation-info',
        query: {
          id: record.id
        }
      })
    }
  }
}
</script>
