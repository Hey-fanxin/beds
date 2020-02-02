<template>
  <div>
    <TitleBack title="创建床位调换" :showBack="false">
      <template slot="extra">
        <a-button class="title-extra-btn" type="danger" @click="giveUp">放弃</a-button>
        <a-button class="title-extra-btn" type="primary" :disabled="hasErrors(switchForm.getFieldsError())" @click="viewSubmit">提交</a-button>
      </template>
    </TitleBack>
    <a-card title="调出床位" :bordered="false" :style="{ marginTop: '2em' }">
      <a-row :gutter="24">
        <a-col :span="4">
          <a-icon v-if="!outBedInfo.station_name" type="plus-circle" class="icon-btn" @click="openModal('out_beds')" />
          <a-icon v-else type="file-protect" class="icon-btn" @click="openModal('out_beds')" />
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" v-if="outBedInfo.station_name" class="bed-info">
            <a-col :span="12"><span>驿站名称 :</span>{{ outBedInfo.station_name }}</a-col>
            <a-col :span="12"><span>楼层名称 :</span>{{ outBedInfo.station_name }}</a-col>
            <a-col :span="12"><span>楼宇名称 :</span>{{ outBedInfo.building_name }}</a-col>
            <a-col :span="12"><span>房间名称 :</span>{{ outBedInfo.room_name }}</a-col>
            <a-col :span="12"><span>床位名称 :</span>{{ outBedInfo.name }}</a-col>
            <a-col :span="12"><span>定价 :</span>{{ outBedInfo.price }}</a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="客户信息" :bordered="false" :style="{marginTop: '2em'}">
      <a-row :gutter="24">
        <a-col :span="4">
          <a-icon v-if="!outBedInfo.customer.CNAME" type="plus-circle" class="icon-btn" @click="openModal('out_beds')" />
          <a-icon v-else type="solution" class="icon-btn" @click="openModal('out_beds')" />
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" v-if="outBedInfo.customer.CNAME" class="cus-info">
            <a-col :span="12"><span>客户姓名 :</span>{{ outBedInfo.customer.CNAME }}</a-col>
            <a-col :span="12"><span>年龄 :</span>{{ outBedInfo.customer.AGE }}</a-col>
            <a-col :span="12"><span>性别 :</span>{{ outBedInfo.customer.SEX }}</a-col>
            <a-col :span="12"><span>民族 :</span>{{ outBedInfo.customer.ETHNIC }}</a-col>
            <a-col :span="12"><span>联系手机 :</span>{{ outBedInfo.customer.CONTACT_PHONE }}</a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="调入床位" :bordered="false" :style="{marginTop: '2em'}">
      <a-row :gutter="24">
        <a-col :span="4">
          <a-icon v-if="!inBedInfo.station_name" type="plus-circle" class="icon-btn" @click="openModal('in_beds')" />
          <a-icon v-else type="file-protect" class="icon-btn" @click="openModal('in_beds')" />
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" v-if="inBedInfo.station_name" class="bed-info">
            <a-col :span="12"><span>驿站名称 :</span>{{ inBedInfo.station_name }}</a-col>
            <a-col :span="12"><span>楼层名称 :</span>{{ inBedInfo.station_name }}</a-col>
            <a-col :span="12"><span>楼宇名称 :</span>{{ inBedInfo.building_name }}</a-col>
            <a-col :span="12"><span>房间名称 :</span>{{ inBedInfo.room_name }}</a-col>
            <a-col :span="12"><span>床位名称 :</span>{{ inBedInfo.name }}</a-col>
            <a-col :span="12"><span>定价 :</span>{{ inBedInfo.price }}</a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="退住信息" :bordered="false" :style="{ marginTop: '2em' }">
      <a-row :gutter="24">
        <a-col :span="4">
          <a-icon type="idcard" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-form
            id="ant-bed-out-form"
            :form="switchForm"
          >
            <a-form-item
              label="标准差价"
              v-bind="formItemLayout"
            >
              <inputNumber
                placeholder="自动计算"
                disabled
                v-decorator="[
                  'standard_price',
                  { initialValue: '' }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="调换日期"
              v-bind="formItemLayout"
            >
              <a-date-picker
                v-decorator="[
                  'switch_date',
                  {
                    rules: [{ type: 'object', required: true, message: '请选择调换日期！' }]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="折后差价"
              v-bind="formItemLayout"
            >
              <inputNumber
                v-decorator="[
                  'discount_price',
                  { initialValue: '' }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="备注"
              v-bind="formItemLayout"
            >
              <a-textarea
                placeholder="请输入"
                :autosize="{ minRows: 3, maxRows: 6 }"
                v-decorator="[
                  'remark'
                ]"
              />
            </a-form-item>
            <a-form-item
              label="所在部门"
              v-bind="formItemLayout"
            >
              <a-select
                v-decorator="[
                  'approve_dept_name',
                  {rules: [{ required: true, message: '请选择所在部门!' }]}
                ]"
                placeholder="请选择"
              >
                <a-select-option v-for="(item, index) in $store.state['approve_dept_name']" :key="index" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
    <a-modal
      ref="modal_ele"
      :title="modalTitle"
      width="80vw"
      centered
      :destroyOnClose="true"
      :footer="null"
      :maskClosable="false"
      v-model="showModal"
      @cancel="() => showModal = !showModal"
    >
      <div class="ant-modal-search-form">
        <a-form
          :form="modalForm"
          @submit="modalFormSubmit"
        >
          <a-row :gutter="16">
            <a-col
              v-for="(item, index) in modalFormSearchItems"
              :key="index"
              :span="parseInt((24 - 3) / modalFormSearchItems.length)"
            >
              <a-form-item :label="item.label" :wrapperCol="{span: 18}">
                <a-input
                  v-decorator="[
                    item.labelStr
                  ]"
                  :placeholder="item.placeholder"
                />
              </a-form-item>
            </a-col>
            <a-col :span="3" :push="modalFormSearchItems.length > 2 ? 0 : 1" :style="{ textAlign: 'right' }">
              <a-form-item :wrapperCol="{span: 24}">
                <a-button
                  type="primary"
                  html-type="submit"
                  icon="search"
                >
                  搜索
                </a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div>
        <a-table
          :columns="columns"
          :dataSource="tableData"
          @change="handleTableChange"
          :pagination="pagination"
          :loading="tableLoading"
        >
          <a slot="operation" slot-scope="text, record" :style="{ color: (modalTitle != '选择床位/客户' && record.occupation == '2') && '#ccc' }" @click="electItem(record)">选择</a>
        </a-table>
      </div>
    </a-modal>
  </div>
</template>

<script>
import TitleBack from '@/components/TitleBack'
import inputNumber from '@/components/FromSearch/InputNumber'
import { getBedList, createSwitch } from '@/api/management'

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

export default {
  name: 'CreateBedSwitch',
  components: { TitleBack, inputNumber },
  data () {
    return {
      hasErrors,
      outBedInfo: { customer: {} },
      inBedInfo: {},
      modalTitle: '',
      showModal: false,
      modalForm: this.$form.createForm(this),
      switchForm: this.$form.createForm(this),
      modalFormSearchItems: [],
      columns: [],
      list: [],
      pagination: {
        pageSizeOptions: ['10', '15', '20', '25'],
        showSizeChanger: true,
        pageSize: 10,
        current: 1
      },
      tableLoading: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 8 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 10 },
          sm: { span: 14 }
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.switchForm.validateFields()
    })
  },
  computed: {
    tableData: function () {
      return this.modalTitle == '选择床位/客户' ? this.list.filter(o => o.occupation == '2') : this.list
    }
  },
  methods: {
    giveUp: function () {
      this.$confirm({
        title: '提示',
        content: '表单尚未保存，是否现在离开',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.$router.go(-1)
        }
      })
    },
    viewSubmit: function () {
      if (!this.outBedInfo.id) {
        this.$message.warning('请添加要调出的床位/客户信息！')
        return false
      }
      if (!this.inBedInfo.id) {
        this.$message.warning('请添加要调入的床位！')
        return false
      }
      this.$confirm({
        title: '提示',
        content: '确认提交床位调换审批 ？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            this.switchForm.validateFields((err, values) => {
              if (!err) {
                const _param = {
                  cus_id: this.outBedInfo.ID,
                  out_bed_id: this.outBedInfo.id,
                  in_bed_id: this.inBedInfo.id,
                  standard_price_diff: values.standard_price || '0',
                  discount_price_diff: values.discount_price || '0',
                  switch_date: values.switch_date.format('YYYY-MM-DD'),
                  remark: values.remark || '',
                  approve_dept_name: this.$store.state['approve_dept_name'].find(o => o.value == values.approve_dept_name).label,
                  approve_dept_id: values.approve_dept_name
                }
                createSwitch(_param).then(rs => {
                  if (rs.code === 200) {
                    resolve()
                    this.$success({
                      content: '提交成功',
                      onOk: () => this.$router.replace({
                        path: '/management/beds-switch/switch-info',
                        query: { id: rs.result.id }
                      })
                    })
                  }
                })
              }
            })
          }).catch(() => console.log('Oops errors!'))
        }
      })
    },
    openModal: function (type) {
      this.list = []
      this.pagination.total = 0
      if (type === 'out_beds') {
        this.modalTitle = '选择床位/客户'
        this.modalFormSearchItems = [
          { label: '驿站名称', labelStr: 'station_name', placeholder: '北京' },
          { label: '床位名称', labelStr: 'bed_name', placeholder: '01床' },
          { label: '客户姓名', labelStr: 'customer_name', placeholder: '张三' }
        ]
        this.columns = [
          { title: '客户姓名', dataIndex: 'customer.CNAME' },
          { title: '联系手机', dataIndex: 'customer.CONTACT_PHONE' },
          { title: '驿站名称', dataIndex: 'station_name' },
          { title: '楼宇名称', dataIndex: 'building_name' },
          { title: '房间名称', dataIndex: 'room_name' },
          { title: '床位名称', dataIndex: 'name' },
          { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
        ]
      }
      if (type === 'in_beds') {
        this.modalTitle = '选择调入床位'
        this.modalFormSearchItems = [
          { label: '驿站名称', labelStr: 'station_name', placeholder: '北京' },
          { label: '床位名称', labelStr: 'bed_name', placeholder: '01床' }
        ]
        this.columns = [
          { title: 'ID', dataIndex: 'code' },
          { title: '驿站名称', dataIndex: 'station_name' },
          { title: '楼宇名称', dataIndex: 'building_name' },
          { title: '房间名称', dataIndex: 'room_name' },
          { title: '床位名称', dataIndex: 'name' },
          { title: '位置', dataIndex: 'position' },
          { title: '类型', dataIndex: 'type' },
          { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
        ]
      }
      this.showModal = true
    },
    modalFormSubmit: function (e) {
      e.preventDefault()
      this.modalForm.validateFields((err, values) => {
        if (!err) {
          this.tableLoading = true
          const _params = {}
          for (let name in values) {
            _params[name] = values[name] && values[name]
          }
          this.params = _params
          this.getData(_params)
        }
      })
    },
    electItem: function (item) {
      if (this.modalTitle === '选择调入床位') {
        if (item.occupation != '2') {
          this.inBedInfo = item
          this.showModal = false
        }
      } else {
        this.outBedInfo = item
        this.showModal = false
      }
      if (this.inBedInfo.id && this.outBedInfo.id) {
        this.switchForm.setFieldsValue({ standard_price: this.inBedInfo.price - this.outBedInfo.price })
      }
    },
    handleTableChange: function (pagination, filters, sorter) {
      if (pagination.pageSize !== this.pagination.pageSize) {
        this.pagination.pageSize = pagination.pageSize
        return false
      }
      this.tableLoading = true
      if (pagination.current !== this.pagination.current) {
        const _param = {
          'page': pagination.current,
          'per-page': pagination.pageSize
        }
        const params = Object.assign({}, _param, this.param)
        this.getData(params)
      }
    },
    getData: function (params) {
      getBedList(params).then(rs => {
        let arr = []
        rs.result.items.forEach((item, index) => {
          arr.push(Object.assign(
            {
              key: String(index)
            },
            item
          ))
        })
        this.list = arr
        this.tableLoading = false
        this.setPagination(rs)
      })
    },
    setPagination: function (rs) {
      this.pagination.current = Number(rs.result._meta.currentPage)
      this.pagination.pageSize = Number(rs.result._meta.perPage)
      this.pagination.total = Number(rs.result._meta.totalCount)
    }
  }
}
</script>
<style lang="less" scoped>
.title-extra-btn{
  margin-right: 1em;
  margin-top: 4px;
}
.icon-btn{
  font-size: 90px;
}
.ant-modal-search-form .ant-form-item {
  display: flex;
}
.ant-modal-search-form-item .ant-form-item-control-wrapper {
  flex: 1;
}
.cus-info,.bed-info{
  .ant-col-12{
    font-size: 17px;
    padding: 4px 0;
    span{
      display: inline-block;
      width: 30%;
      text-align: right;
      padding: 0 4px;
      margin-right: 14px;
    }
  }
}
#ant-bed-out-form .ant-form-item-label label{
  font-size: 15px;
}
</style>
