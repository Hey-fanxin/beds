<template>
  <div class="component__city-station-info-box">
    <TitleBack :title="title" />
    <a-card :loading="infoloading" title="基本信息" :bordered="false" :style="{ marginTop: '2em' }">
      <a-row class="station-info">
        <a-col :span="8">
          <span>编号：</span> <span>{{ stationInfo.code }}</span>
        </a-col>
        <a-col :span="8">
          <span>状态：</span> <span>{{ stationInfo.status }}</span>
        </a-col>
        <a-col :span="8">
          <span>总床位：</span> <span>{{ stationInfo.bed_count.disable + stationInfo.bed_count.busy + stationInfo.bed_count.idle }}</span>
        </a-col>
        <a-col :span="8">
          <span>总房间：</span> <span>{{ stationInfo.room_count }}</span>
        </a-col>
        <a-col :span="8">
          <span>剩余床位：</span> <span>{{ stationInfo.bed_count.idle }}</span>
        </a-col>
        <a-col :span="8">
          <span>价格：</span> <span>{{ '￥'+stationInfo.price.min+'~ ￥'+stationInfo.price.max }}</span>
        </a-col>
        <a-col :span="8">
          <span>地址：</span> <span>{{ stationInfo.address }}</span>
        </a-col>
      </a-row>
    </a-card>
    <div class="station-buildings-list">
      <a-tabs>
        <a-tab-pane tab="Tab 1 2332" key="1">Content of tab 1</a-tab-pane>
        <a-tab-pane tab="Tab 2" key="2">Content of tab 2</a-tab-pane>
        <a-tab-pane tab="Tab 3" key="3">Content of tab 3</a-tab-pane>
      </a-tabs>
      <Tabs :list="stationInfo.buildings" @change="buildingChange"/>
    </div>
    <div class="room-filer-list">
      <strong :style="{ marginRight: '32px' }">选择房间:</strong>
      <template>
        <a-button
          v-for="(item, i) in roomFilerList"
          :key="i"
          @click="roomFilerCheck(item.value)"
          :type="item.type"
          style="margin-right: 10px"
        >
          {{ item.label }}
        </a-button>
      </template>
    </div>
  </div>
</template>
<script>
import TitleBack from '@/components/TitleBack'
import Tabs from '@/components/tabs'
import { getStationsInfo } from '@/api/statistics'

export default {
  name: 'CityStationInfo',
  components: {
    TitleBack, Tabs
  },
  data () {
    return {
      title: '',
      infoloading: true,
      stationInfo: {
        price: {},
        bed_count: {},
        buildings: []
      },
      roomFilerList: [
        { label: '全部', value: 1, type: 'primary' },
        { label: '男士', value: 2, type: 'link' },
        { label: '女士', value: 3, type: 'link' },
        { label: '空床', value: 4, type: 'link' }
      ]
    }
  },
  mounted () {
    const query = this.$route.query
    this.title = query.name
    this.infoloading = true
    getStationsInfo(query.id).then(rs => {
      console.log(rs, '城市驿站详情信息')
      this.stationInfo = rs.result
      this.infoloading = false
    })
  },
  methods: {
    buildingChange: function (item) {
      console.log(item, 'buildings')
    },
    roomFilerCheck: function (val) {
      this.roomFilerList.forEach(item => {
        if (item.value == val) {
          item.type = 'primary'
        } else {
          item.type = 'link'
        }
      })
    }
  }
}
</script>
<style lang="less" >
@import '~@/variables.less';

.component__city-station-info-box{
  .ant-card{
    border-radius: 10px 10px 0 0 !important;
  }
  .ant-card-wider-padding .ant-card-body{
    padding-bottom: 0px;
  }
  .station-info{
    .ant-col-8{
      padding: 8px 0;
      span{
        color: #303133;
        font-size: 14px;
      }
    }
  }
  .station-buildings-list{
    background: #fff;
    padding-top: 1em;
    .ant-tabs-bar{
      margin: 0;
      .ant-tabs-ink-bar{
        bottom: 2px;
        &::after{
          content: ' ';
          width: 10px;
          height: 10px;
          border-left: 3px solid @processing;
          border-bottom: 3px solid @processing;
          position: absolute;
          left: calc(50% - 2px);
          bottom: -8px;
        }
      }
    }
  }
  .room-filer-list{
    margin-top: 1em;
    background: #fff;
    border-radius: 10px;
    padding: 14px 32px;
    .ant-btn.ant-btn-link{
      color: #606266;
      &:hover{
        color: darken(#606266, 10%) !important;
        border-color: transparent !important;
      }
    }
  }
}
</style>
