<template>
  <div>
    <TitleBack title="床位入住详情" />
    <a-card :loading="loading" title="入住信息" :bordered="false" :style="{ marginTop: '2em' }">
      <a-row :gutter="24">
        <a-col :span="4" class="list-icon">
          <a-icon type="solution" class="icon-btn"/>
        </a-col>
        <a-col :span="20">
          <a-row :gutter="24" class="stay-in-info-list">
            <a-col :span="12"><span>审批单号 :</span>{{ stayIn.order_number }}</a-col>
            <a-col :span="12"><span>所在部门 :</span>{{ stayIn.approve_dept_name }}</a-col>
            <a-col :span="12"><span>入住联系人 :</span>{{ stayIn.contact_name }}</a-col>
            <a-col :span="12"><span>联系电话 :</span>{{ stayIn.contact_phone }}</a-col>
            <a-col :span="12"><span>签约日期 :</span>{{ stayIn.sign_date }}</a-col>
            <a-col :span="12"><span>入住日期 :</span>{{ stayIn.in_date }}</a-col>
            <a-col :span="12"><span>餐饮需求 :</span>{{ stayIn.meal_need ? $store.state['meal_need'].find(o => o.value == stayIn.meal_need).label : '' }}</a-col>
            <a-col :span="12"><span>是否包房 :</span>{{ stayIn.include_status ? $store.state['include_status'].find(o => o.value == stayIn.include_status).label : '' }}</a-col>
            <a-col :span="12"><span>备注 :</span>{{ stayIn.remark }}</a-col>
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
            <a-col :span="12"><span>驿站名称 :</span>{{ stayIn.station_name }}</a-col>
            <a-col :span="12"><span>楼层名称 :</span>{{ stayIn.floor_name }}</a-col>
            <a-col :span="12"><span>楼宇名称 :</span>{{ stayIn.building_name }}</a-col>
            <a-col :span="12"><span>房间名称 :</span>{{ stayIn.room_name }}</a-col>
            <a-col :span="12"><span>床位名称 :</span>{{ stayIn.bed_name }}</a-col>
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
            <a-col :span="12"><span>客户姓名 :</span>{{ stayIn.customer.CNAME }}</a-col>
            <a-col :span="12"><span>年龄 :</span>{{ stayIn.customer.AGE }}</a-col>
            <a-col :span="12"><span>性别 :</span>{{ stayIn.customer.SEX }}</a-col>
            <a-col :span="12"><span>民族 :</span>{{ stayIn.customer.ETHNIC }}</a-col>
            <a-col :span="12"><span>联系手机 :</span>{{ stayIn.customer.CONTACT_PHONE }}</a-col>
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
import { getStayInInfo } from '@/api/management'
export default {
  name: 'StayInInfo',
  components: { TitleBack },
  data () {
    return {
      loading: true,
      stayIn: { customer: {} },
      process: []
    }
  },
  created () {
    const query = this.$route.query
    getStayInInfo(query.id).then(rs => {
      this.loading = false
      this.stayIn = rs.result.reserve_data
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
