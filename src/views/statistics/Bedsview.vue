<template>
  <a-row>
    <a-col :span="18">
      <div :style="{width: '100%', height: '100%', overflow: 'hidden'}">
        <div ref="node-map" :style="{height: '800px'}"></div>
      </div>
    </a-col>
    <a-col :span="6" class="beds-view-card-box">
      <a-card>
        <a-row>
          <a-col :span="12">
            <h2>{{ data.customer.total }}</h2>
            <p>客户总数</p>
          </a-col>
          <a-col :span="12">
            <a-icon type="step-backward" />
          </a-col>
        </a-row>
        <a-row></a-row>
      </a-card>
      <a-card>
        <a-row>
          <a-col :span="12">
            <h2>{{ data.customer.total }}</h2>
            <p>照护师总数</p>
          </a-col>
          <a-col :span="12">
            <a-icon type="step-backward" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <h2>{{ data.customer.total }}</h2>
            <p>四星级</p>
          </a-col>
          <a-col :span="12">
            <h2>{{ data.customer.total }}</h2>
            <p>五星级</p>
          </a-col>
        </a-row>
      </a-card>
      <a-card>
        <a-row>
          <a-col :span="12">
            <h2>{{ data.station.total }}</h2>
            <p>驿站总数</p>
          </a-col>
          <a-col :span="12">
            <a-icon type="step-backward" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <h2>{{ data.station.enable }}</h2>
            <p>营业中</p>
          </a-col>
          <a-col :span="12">
            <h2>{{ data.station.in_progress }}</h2>
            <p>建设中</p>
          </a-col>
        </a-row>
      </a-card>
      <a-card>
        <a-row>
          <a-col :span="12">
            <h2>{{ data.bed.total }}</h2>
            <p>床位总量</p>
          </a-col>
          <a-col :span="12">
            <a-icon type="step-backward" />
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <h2>{{ data.bed.busy }}</h2>
            <p>使用</p>
          </a-col>
          <a-col :span="12">
            <h2>{{ data.bed.idle }}</h2>
            <p>空闲中</p>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import mapConfig from './map/mapConfig.js'
import { geoCoordMap } from './map/GeoCoordMap'
import { axios } from '@/utils/request.js'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/geo'
import { addEvent } from '@/utils/misc'
import { getTotalAssets } from '@/api/statistics'
import _ from 'lodash'

export default {
  name: 'Monitor',
  data () {
    return {
      mapOptions: {},
      data: {
        customer: {},
        bed: {},
        station: {}
      }
    }
  },
  activated () {
    axios.get('/maps/china.json').then((res) => {
      echarts.registerMap('china', res)
    }).then(() => {
      getTotalAssets().then((res) => {
        this.updateOption(res.result, 'station')
        this.data = res.result
      }).catch((error) => {
        if (error.response && error.response.status === 401) {
          // AuthService.signout(() => {
          //   this.props.history.push("/login");
          // });
        }
      })
    })
  },
  watch: {
    'mapOptions': function () {
      this.renderChart()
    }
  },
  methods: {
    updateOption: function (esresponse, type) {
      const citys = esresponse.station.cities
      const config = _.find(mapConfig, (item) => {
        return item.type === type
      })
      const option = {
        tooltip: {
          show: true,
          trigger: 'item',
          textStyle: {
            color: '#9bccf5',
            align: 'left'
          },
          backgroundColor: config.labelBG
        },
        title: {
          text: config.title,
          x: 'center',
          top: '20px',
          textStyle: {
            color: '#333',
            fontSize: 22,
            fontWeight: 500
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#152432',
              borderColor: '#213c52'
            },
            emphasis: {
              areaColor: '#20456a'
            }
          }
        },
        series: [
          {
            name: config.seriesName,
            type: 'scatter',
            coordinateSystem: 'geo',
            data: [],
            // symbolSize: config.symbolSize,
            symbolSize: function (val) {
              return Number(val[2]) + 5
            },
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#28ffd9'
              },
              emphasis: {
                borderWidth: 6,
                borderColor: 'rgba(40, 255, 217, 0.5)'
              }
            },
            animation: true,
            animationEasing: 'quarticInOut'
          },
          {
            name: config.seriesName,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            // symbolSize: config.symbolSize,
            symbolSize: function (val) {
              return Number(val[2]) + 5
            }
          }
        ]
      }
      const data = []
      for (let i = 0; i < citys.length; i++) {
        const city = _.trim(citys[i].name, '市')
        const geoCoord = geoCoordMap[city]
        if (geoCoord) {
          const bed = _.find(esresponse.bed.cities, item => item.name == citys[i].name)
          data.push({
            name: city,
            value: geoCoord.concat([
              citys[i].total,
              _.find(esresponse.customer.cities, item => item.name == citys[i].name).total,
              bed.total,
              bed.idle
            ])
          })
        }
      }
      option.series[0].data = data
      option.series[1].data = data.sort(function (a, b) {
        return b.value - a.value
      })
      option.tooltip.formatter = (params) => {
        return `${params.data.name} <br/>
          ${config.bucket1 + params.data.value[2]} <br/>
          ${config.bucket2 + params.data.value[3]} <br />
          ${config.bucket3 + params.data.value[4]} <br />
          ${config.bucket4 + params.data.value[5]} <br />
        `
      }
      this.mapOptions = option
    },
    renderChart: function () {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs['node-map'])
        this.chart.showLoading({ text: '数据加载中...' })
        this.chart.on('click', (param) => {
          if (!param.data) {
            return false
          }
          this.$router.push({
            path: '/statistics/bedsview/city-station-list',
            query: {
              name: param.data.name,
              values: JSON.stringify(param.data.value.slice(2))
            }
          })
        })
        addEvent(window, 'resize', this.resizeEchart)
      }
      if (this.mapOptions && !_.isEmpty(this.mapOptions)) {
        // 绘制图表
        this.chart.hideLoading()
        this.chart.setOption(this.mapOptions)
      }
    },
    resizeEchart: function () {
      if (this.chart && !this.chart.isDisposed()) {
        this.chart.resize()
      }
    }
  }
}
</script>
<style lang="less" scoped>
.beds-view-card-box{
  .ant-card{
    margin-bottom: 2em;
    &:last-child{
      margin-bottom: 0;
    }
    .ant-row:last-child{
      margin-top: 3em;
    }
  }
  .ant-col-12{
    p,h2{
      margin-bottom: 0;
      text-align: center;
    }
  }
}
</style>
