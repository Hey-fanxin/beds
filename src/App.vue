<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {

  }
}
</script>
<style lang="less">
@import './variables.less';

*{
  padding: 0;
  margin: 0;
  list-style: none;
}
#app {
  height: 100%;
}
.ant-card,
.ant-modal-content{
  border-radius: 10px !important;
}
.ant-modal-header{
  border-radius: 10px 10px 0 0 !important;
}
.ant-layout{
  .table-column-approve-status{
    display: flex;
    justify-items: center;
    align-items: center;
    &::before{
      display: inline-block;
      content: ' ';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
    }
    &.status-0::before{
      background: @processing;
    }
    &.status-1::before{
      background: @error;
    }
    &.status-2::before{
      background: @success;
    }
    &.status-3::before{
      background: @default;
    }
  }
  .ant-badge-status-success{
    background-color: @success;
  }
  .ant-badge-status-error{
    background-color: @error;
  }
  .ant-badge-status-default{
    background-color: @default;
  }
  .ant-badge-status-processing{
    background-color: @processing;
  }
  .ant-badge-status-warning{
    background-color: @warning;
  }
}
</style>
