<template>
  <div class="page-header-index-wide">
    <a-card :loading="loading" :bordered="false" title="资产总览" :style="{ marginBottom: '24px' }">
      <ul class="card-body">
        <li v-for="(item, index) in allNumberList" :key="index">
          <p>{{item.title}}</p>
          <h1>{{item.count}}</h1>
        </li>
      </ul>
    </a-card>
    <a-card :loading="loading" :bordered="false" title="资产总览" :style="{ marginBottom: '24px' }">
      <ul class="card-body">
        <li v-for="(item, index) in allNumberList" :key="index">
          <p>{{item.title}}</p>
          <h1>{{item.count}}</h1>
        </li>
      </ul>
    </a-card>

    <a-card :loading="loading" :bordered="false" title="床位统计" :bodyStyle="{padding: '20px 0'}" :style="{ marginBottom: '24px' }">
      <a-row>
        <a-col :xl="6" :lg="6" :md="6" :sm="6" :xs="6">
          <div style="text-align:center">
            <circle-progress
              :id="1"
              :width="150"
              :radius="20"
              :progress="30"
              :delay="150"
              :duration="1000"
              :barColor="'#F2AE57'"
              :backgroundColor="'#FFE8CC'"
              :isRound="true"
              :isAnimation="true"
              :timeFunction="'cubic-bezier(0.99, 0.01, 0.22, 0.94)'"
            />
          </div>
          <ul class="beds-total">
            <li v-for="(item, index) in allBedsList" :key="index">
              <span>{{item.title}}:</span>
              <span>{{item.count}}</span>
            </li>
          </ul>
        </a-col>
        <a-col :xl="18" :lg="18" :md="18" :sm="18" :xs="18">
          <ul>
            <li v-for="(item, index) in siteList" :key="index">
              <a-row>
                <a-col :xl="2" :lg="2" :md="2" :sm="2" :xs="2"></a-col>
                <a-col :xl="4" :lg="4" :md="4" :sm="4" :xs="4">
                  <h1>{{item.progress}}</h1>
                </a-col>
                <a-col :xl="16" :lg="16" :md="16" :sm="16" :xs="16">
                  <p>{{item.currentCount+'/'+item.totalCount}}</p>
                </a-col>
              </a-row>
              <a-row>
                <a-col :xl="2" :lg="2" :md="2" :sm="2" :xs="2">
                  <span>{{item.name}}</span>
                </a-col>
                <a-col :xl="20" :lg="20" :md="20" :sm="20" :xs="20">
                  <a-progress :percent="30" :showInfo="false" />
                </a-col>
              </a-row>
            </li>
          </ul>
        </a-col>
      </a-row>
    </a-card>
    <a-card :loading="loading" :bordered="false" title="入住率趋势图">
      <div id="node-1"></div>
    </a-card>
  </div>
</template>

<script>
// import moment from 'moment'
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import CircleProgress from '@/components/CriclProgress'
import { mixinDevice } from '@/utils/mixin'

const allNumberList = [
  { title: '驿站总数', count: '20' },
  { title: '床位总数', count: '20' },
  { title: '可用床位', count: '20' },
  { title: '设备总数', count: '20' }
]
const allBedsList = [
  { title: '总占用', count: '20' },
  { title: '居住中', count: '20' },
  { title: '已预约', count: '20' },
  { title: '已逾期', count: '20' }
]
const siteList = [
  { name: '北京', progress: '30', currentCount: 35, totalCount: 100 },
  { name: '北京', progress: '30', currentCount: 35, totalCount: 100 },
  { name: '北京', progress: '30', currentCount: 35, totalCount: 100 },
  { name: '北京', progress: '30', currentCount: 35, totalCount: 100 },
  { name: '北京', progress: '30', currentCount: 35, totalCount: 100 },
  { name: '北京', progress: '30', currentCount: 35, totalCount: 100 }
]
export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: { CircleProgress },
  data () {
    return {
      loading: true,

      allNumberList,
      allBedsList,
      siteList
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
      this.$nextTick(() => {
        this.setChart()
      })
    }, 1000)
  },
  methods: {
    setChart: function () {
      // 在一行中保存多个城市的数据，需要将数据转换成
      // {month: 'Jan', city: 'Tokyo', temperature: 3.9}
      const data = [
        { month: 'Jan', beijing: 7.0, shanghai: 3.9 },
        { month: 'Feb', beijing: 6.9, shanghai: 4.2 },
        { month: 'Mar', beijing: 94.5, shanghai: 70.7 },
        { month: 'Apr', beijing: 14.5, shanghai: 8.5 },
        { month: 'May', beijing: 18.4, shanghai: 11.9 },
        { month: 'Jun', beijing: 59.5, shanghai: 15.2 },
        { month: 'Jul', beijing: 25.2, shanghai: 17.0 },
        { month: 'Aug', beijing: 26.5, shanghai: 16.6 },
        { month: 'Sep', beijing: 23.3, shanghai: 14.2 },
        { month: 'Oct', beijing: 18.3, shanghai: 90.3 },
        { month: 'Nov', beijing: 60.9, shanghai: 6.6 },
        { month: 'Dec', beijing: 9.6, shanghai: 4.8 }
      ]
      const ds = new DataSet()
      const dv = ds.createView().source(data)
      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
      dv.transform({
        type: 'fold',
        fields: [ 'beijing', 'shanghai' ], // 展开字段集
        key: 'city', // key字段
        value: 'val' // value字段
      })
      const chart = new G2.Chart({
        container: 'node-1',
        forceFit: true,
        height: 500
      })
      chart.source(dv, {
        month: {
          range: [ 0, 1 ]
        },
        val: {
          ticks: [ 0, 20, 40, 60, 80, 100 ]
        }
      })
      chart.tooltip({
        crosshairs: {
          type: 'line'
        }
      })
      chart.legend(true, {
        itemFormatter: function (val) {
          return { beijing: '北京', shanghai: '上海' }[val]
        }
      })
      chart.axis('val', {
        label: {
          formatter: val => {
            return val + '%'
          }
        }
      })
      chart
        .line()
        .position('month*val')
        .color('city')
        .shape('smooth')
      chart.render()
    }
  }
}
</script>

<style lang="less" scoped>
  .page-header-index-wide{
    .card-body{
      margin-top: 1em;
      display: flex;
      align-items: center;
      li{
        width: 25%;
        text-align: center;
        border-right: 1px solid #e8e8e8;
        &:last-child{
          border-right: none;
        }
        p{
          font-size: 18px;
        }
        h1{
          font-size: 32px;
        }
      }
    }
    .beds-total{
      margin-top: 1em;
      padding:0 15px;
      li{
        padding: 15px;
        font-size: 18px;
        text-align: center;
        border-bottom: 1px solid #e8e8e8;
        &:last-child{
          border-bottom: none;
        }
        span:last-child{
          padding-left: 10px;
        }
      }
    }
  }
</style>
