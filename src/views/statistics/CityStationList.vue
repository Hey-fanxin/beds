<template>
  <div class="component__city-station-list">
    <TitleBack :title="title" />
    <CardList :list="data" @checkItem="openFloorInfo">
      <template slot="content" slot-scope="{item, index}">
        <a-row>
          <a-col :span="10">
            <a-avatar
              shape="square"
              style="font-size:24px"
              :size="48"
              :class="'avatar-' + (index % 2)"
            >
              {{ item.name[0] }}
            </a-avatar>
            <div class="station-info">
              <h5>{{ item.name }}</h5>
              <p>{{ item.address }}</p>
              <a-badge :status="item.status | FStatus" :text="item.status" />
            </div>
          </a-col>
          <a-col :span="14">
            <ul class="beds-info">
              <li class="total"><span>{{ item.bed_count.busy + item.bed_count.idle }}</span>床位总数</li>
              <li class="busy"><span>{{ item.bed_count.busy }}</span>已用床位</li>
              <li class="idle"><span>{{ item.bed_count.idle }}</span>可用床位</li>
            </ul>
          </a-col>
        </a-row>
      </template>
    </CardList>
  </div>
</template>
<script>
import TitleBack from '@/components/TitleBack'
import { CardList } from '@/components/List'
import { getStationList } from '@/api/statistics'

export default {
  name: 'CityStationList',
  components: {
    TitleBack, CardList
  },
  data () {
    return {
      title: '',
      data: [],
      loading: true
    }
  },
  created () {
    this.loading = true
    const query = this.$route.query
    this.title = query.name + '分区'
    getStationList({ city: query.name }).then(rs => {
      this.setData(rs)
    })
  },
  filters: {
    FStatus: function (value) {
      switch (value) {
        case '已启用' :
          return 'success'
        case '已停用' :
          return 'default'
        case '建设中' :
          return 'processing'
      }
    }
  },
  methods: {
    setData: function (rs) {
      this.data = rs.result.items
      this.loading = false
    },
    openFloorInfo: function (item) {
      this.$router.push({
        path: '/statistics/bedsview/city-station-list/station-info',
        query: { id: item.id, name: item.name }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../variables.less';

.component__city-station-list{
  .avatar-0{
    margin-top: 21px;
    background-image: url('../../assets/avatar-0.png')
  }
  .avatar-1{
    margin-top: 21px;
    background-image: url('../../assets/avatar-1.png')
  }
  .station-info{
    float: right;
    width: calc(100% - 68px);
    border-right: 1px solid #EBEEF5;
    h5{
      font-size:  16px;
      color: #303133;
    }
    p{
      font-size: 14px;
      color: #909399
    }
  }
  .beds-info{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    padding: 0 24px;
    li{
      width: 33.3333%;
      text-align: right;
      color: #606266;
      font-size: 14px;
      span{
        display: inline-block;
        padding:20px;
        border: 2px solid #606266;
        font-size: 18px;
        border-radius: 50%;
        margin-right: 12px;
      }
      &.busy{
        color: @processing;
        span{
          border-color: @processing;
        }
      }
      &.idle{
        color: @success;
        span{
          border-color: @success;
        }
      }
    }
  }
}
</style>
