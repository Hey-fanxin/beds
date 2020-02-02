<template>
  <div>
    <TitleBack title="床位退住详情" />
    <a-card :loading="loading" title="退住信息" :bordered="false" :style="{ marginTop: '2em' }">
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="solution" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="stay-in-info-list">
            <a-col :span="12"><span>审批单号 :</span>{{ info.order_number }}</a-col>
            <a-col :span="12"><span>所在部门 :</span>{{ info.approve_dept_name }}</a-col>
            <a-col :span="12"><span>退住日期 :</span>{{ info.out_date }}</a-col>
            <a-col :span="12"><span>退住原因 :</span>{{ info.out_reason ? $store.state['out_reason'].find(o => o.value == info.out_reason).label : '' }}</a-col>
            <a-col :span="12"><span>备注 :</span>{{ info.remark }}</a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-divider />
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="solution" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="stay-in-info-list">
            <a-col :span="12"><span>驿站名称 :</span>{{ info.station_name }}</a-col>
            <a-col :span="12"><span>楼层名称 :</span>{{ info.floor_name }}</a-col>
            <a-col :span="12"><span>楼宇名称 :</span>{{ info.building_name }}</a-col>
            <a-col :span="12"><span>房间名称 :</span>{{ info.room_name }}</a-col>
            <a-col :span="12"><span>床位名称 :</span>{{ info.bed_name }}</a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-divider />
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="idcard" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="stay-in-info-list">
            <a-col :span="12"><span>客户姓名 :</span>{{ info.customer.CNAME }}</a-col>
            <a-col :span="12"><span>年龄 :</span>{{ info.customer.AGE }}</a-col>
            <a-col :span="12"><span>性别 :</span>{{ info.customer.SEX }}</a-col>
            <a-col :span="12"><span>民族 :</span>{{ info.customer.ETHNIC }}</a-col>
            <a-col :span="12"><span>联系手机 :</span>{{ info.customer.CONTACT_PHONE }}</a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-card>
    <a-card :loading="loading" title="操作信息" :bordered="false" :style="{ marginTop: '2em' }">
      <a-timeline>
        <a-timeline-item v-for="(item, index) in process" :key="index">
          <a-icon slot="dot" type="clock-circle-o" style="font-size: 20px;" />
          <a-row :gutter="24">
            <a-col :span="4" :style="{ textAlign: 'center' }">{{ item.date }}</a-col>
            <a-col :span="3" :style="{ textAlign: 'center' }">{{ item.name }}</a-col>
            <a-col :span="4">{{ item.type }}</a-col>
          </a-row>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </div>
</template>
<script>
import TitleBack from '@/components/TitleBack'
import { getBedOutInfo } from '@/api/management'
export default {
  name: 'OutInfo',
  components: { TitleBack },
  data () {
    return {
      loading: true,
      info: { customer: {} },
      process: []
    }
  },
  created () {
    const query = this.$route.query
    getBedOutInfo(query.id).then(rs => {
      this.loading = false
      this.info = rs.result.reserve_data
      this.process = rs.result.process_data
    })
  }
}
</script>
<style lang="less" scoped>
.stay-in-info-list{
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
.list-icon{
  text-align: center;
  .icon-btn{
    font-size: 80px;
    margin: 10px auto;
  }
}
.ant-timeline-item{
  padding: 0 0 38px;
}
</style>
