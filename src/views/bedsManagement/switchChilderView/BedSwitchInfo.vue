<template>
  <div>
    <TitleBack title="床位调换详情" />
    <a-card :loading="loading" title="调换信息" :bordered="false" :style="{ marginTop: '2em' }">
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="solution" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="stay-in-info-list">
            <a-col :span="12"><span>审批单号 :</span>{{ info.order_number }}</a-col>
            <a-col :span="12"><span>所在部门 :</span>{{ info.approve_dept_name }}</a-col>
            <a-col :span="12"><span>客户姓名 :</span>{{ info.customer.CNAME }}</a-col>
            <a-col :span="12"><span>联系电话 :</span>{{ info.customer.CONTACT_PHONE }}</a-col>
            <a-col :span="12"><span>标准差价 :</span>{{ info.standard_price_diff }}</a-col>
            <a-col :span="12"><span>折扣后差价 :</span>{{ info.discount_price_diff }}</a-col>
            <a-col :span="12"><span>调换日期 :</span>{{ info.switch_date }}</a-col>
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
            <a-col :span="12"><span>驿站名称 :</span>{{ info.out_station_data.station_name }}</a-col>
            <a-col :span="12"><span>楼层名称 :</span>{{ info.out_station_data.floor_name }}</a-col>
            <a-col :span="12"><span>楼宇名称 :</span>{{ info.out_station_data.building_name }}</a-col>
            <a-col :span="12"><span>房间名称 :</span>{{ info.out_station_data.room_name }}</a-col>
            <a-col :span="12"><span>床位名称 :</span>{{ info.out_station_data.bed_name }}</a-col>
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
            <a-col :span="12"><span>驿站名称 :</span>{{ info.in_station_data.station_name }}</a-col>
            <a-col :span="12"><span>楼层名称 :</span>{{ info.in_station_data.floor_name }}</a-col>
            <a-col :span="12"><span>楼宇名称 :</span>{{ info.in_station_data.building_name }}</a-col>
            <a-col :span="12"><span>房间名称 :</span>{{ info.in_station_data.room_name }}</a-col>
            <a-col :span="12"><span>床位名称 :</span>{{ info.in_station_data.bed_name }}</a-col>
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
import { getSwitchInfo } from '@/api/management'
export default {
  name: 'BedSwitchInfo',
  components: { TitleBack },
  data () {
    return {
      loading: true,
      info: {
        in_station_data: {},
        out_station_data: {},
        customer: {}
      },
      process: {}
    }
  },
  created () {
    const query = this.$route.query
    getSwitchInfo(query.id).then(rs => {
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
