const mapConfig = [
  {
    type: 'station',
    title: '全国驿站数量分布图',
    subTitle: '驿站总数量 : ',
    seriesName: '驿站数',
    bucket1: '总驿站 : ',
    bucket2: '总客户 : ',
    bucket3: '总床位 : ',
    bucket4: '可用床 : ',
    bucket5: { key: 'in_use', label: '营业中 : ' },
    bucket6: { key: 'under_construction', label: '建设中 : ' },
    symbolSize: (val) => {
      if (val[2] < 3) {
        return 12
      } else if (val[2] > 10) {
        return 40
      } else {
        return val[2] * 4
      }
    },
    labelBG: 'rgba(16,87,244,0.6)'
  },
  {
    type: 'customer',
    title: '全国客户数量分布图',
    subTitle: '客户总数量 : ',
    seriesName: '客户数',
    bucket1: '总客户数 : ',
    bucket2: { key: 'site', label: '驻站数 : ' },
    bucket3: { key: 'home', label: '驻家数 : ' },
    symbolSize: (val) => {
      if (val[2] < 6) {
        return 12
      } else if (val[2] > 20) {
        return 40
      } else {
        return val[2] * 2
      }
    },
    labelBG: 'rgba(78,218,119,0.6)'
  },
  {
    type: 'hly',
    title: '全国护理员分布图',
    subTitle: '总护理员数 : ',
    seriesName: '护理员数',
    bucket1: '总护理员数 : ',
    bucket2: { key: 'on', label: '工作中 : ' },
    bucket3: { key: 'off', label: '待岗中 : ' },
    symbolSize: (val) => {
      if (val[2] < 6) {
        return 18
      } else if (val[2] > 20) {
        return 60
      } else {
        return val[2] * 3
      }
    },
    labelBG: 'rgba(238,126,51,0.6)'
  },
  {
    type: 'bed',
    title: '全国床位分布图',
    subTitle: '总床位数 : ',
    seriesName: '床位数',
    bucket1: '总床位数 : ',
    bucket2: { key: 'busy', label: '使用中 : ' },
    bucket3: { key: 'free', label: '空闲中 : ' },
    symbolSize: (val) => {
      if (val[2] < 6) {
        return 24
      } else if (val[2] > 20) {
        return 80
      } else {
        return val[2] * 4
      }
    },
    labelBG: 'rgba(235,95,51,0.6)'
  }
]
export default mapConfig
