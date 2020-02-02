<template>
  <div>
    <TitleBack title="床位预约详情" />
    <a-card :loading="loading" title="预约信息" :bordered="false" :style="{ marginTop: '2em' }">
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="solution" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="reservation-info-list">
            <a-col :span="12"><span>审批单号 :</span>{{ reservation.order_number }}</a-col>
            <a-col :span="12"><span>所在部门 :</span>{{ reservation.approve_dept_name }}</a-col>
            <a-col :span="12"><span>预约联系人 :</span>{{ reservation.contact_name }}</a-col>
            <a-col :span="12"><span>预约结束日期 :</span>{{ reservation.end_date }}</a-col>
            <a-col :span="12"><span>备注 :</span>{{ reservation.remark }}</a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-divider />
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="solution" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="reservation-info-list">
            <a-col :span="12"><span>驿站名称 :</span>{{ reservation.station_name }}</a-col>
            <a-col :span="12"><span>楼层名称 :</span>{{ reservation.floor_name }}</a-col>
            <a-col :span="12"><span>楼宇名称 :</span>{{ reservation.building_name }}</a-col>
            <a-col :span="12"><span>房间名称 :</span>{{ reservation.room_name }}</a-col>
            <a-col :span="12"><span>床位名称 :</span>{{ reservation.bed_name }}</a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-divider />
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="idcard" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="reservation-info-list">
            <a-col :span="12"><span>客户姓名 :</span>{{ reservation.customer.CNAME }}</a-col>
            <a-col :span="12"><span>年龄 :</span>{{ reservation.customer.AGE }}</a-col>
            <a-col :span="12"><span>性别 :</span>{{ reservation.customer.SEX }}</a-col>
            <a-col :span="12"><span>民族 :</span>{{ reservation.customer.ETHNIC }}</a-col>
            <a-col :span="12"><span>联系手机 :</span>{{ reservation.customer.CONTACT_PHONE }}</a-col>
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
import { getReservationInfo } from '@/api/management'
export default {
  name: 'ReservationInfo',
  components: { TitleBack },
  data () {
    return {
      loading: true,
      reservation: { customer: {} },
      process: []
    }
  },
  created () {
    const query = this.$route.query
    getReservationInfo(query.id).then(rs => {
      this.loading = false
      this.reservation = rs.result.reserve_data
      this.process = rs.result.process_data
    })
  }
}
</script>
<style lang="less" scoped>
.reservation-info-list{
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
